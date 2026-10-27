import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ManifestData {
  totalFrames: number;
  width: number;
  height: number;
  neutralFrameIndex: number;
  leftmostFrameIndex: number;
  rightmostFrameIndex: number;
  hasRightClip: boolean;
  namingPattern: string;
}

export const AvatarCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Bitmaps or cached images
  const bitmapsRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const manifestRef = useRef<ManifestData>({
    totalFrames: 72,
    width: 1280,
    height: 720,
    neutralFrameIndex: 71, // Center / neutral
    leftmostFrameIndex: 0,
    rightmostFrameIndex: 71,
    hasRightClip: false,
    namingPattern: '/frames/frame_%03d.webp',
  });

  const targetFrameRef = useRef<number>(71);
  const currentFrameRef = useRef<number>(71);
  const isIdleRef = useRef<boolean>(true);
  const lastMouseMoveTimeRef = useRef<number>(Date.now());
  const isVisibleRef = useRef<boolean>(true);
  const [posterLoaded, setPosterLoaded] = useState<boolean>(false);

  // 1. Instant poster frame load to eliminate blank flash
  useEffect(() => {
    const poster = new Image();
    poster.src = '/frames/frame_071.webp';
    poster.onload = () => {
      setPosterLoaded(true);
      drawFrame(71);
    };
  }, []);

  // 2. Preload frame sequence with createImageBitmap where supported
  useEffect(() => {
    let isCancelled = false;

    const loadFrames = async () => {
      try {
        const res = await fetch('/frames/manifest.json');
        if (res.ok) {
          manifestRef.current = (await res.json()) as ManifestData;
        }
      } catch {
        // Fallback to default manifest
      }

      const total = manifestRef.current.totalFrames;
      const loaded: (ImageBitmap | HTMLImageElement)[] = [];

      for (let i = 0; i < total; i++) {
        if (isCancelled) break;
        const pad = String(i).padStart(3, '0');
        const url = `/frames/frame_${pad}.webp`;

        try {
          if ('createImageBitmap' in window) {
            const resp = await fetch(url);
            const blob = await resp.blob();
            const bitmap = await createImageBitmap(blob);
            loaded[i] = bitmap;
          } else {
            const img = new Image();
            img.src = url;
            await new Promise((r) => {
              img.onload = r;
              img.onerror = r;
            });
            loaded[i] = img;
          }
        } catch {
          // Continue if single frame fails
        }
      }

      if (!isCancelled) {
        bitmapsRef.current = loaded;
      }
    };

    loadFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 3. Pause rendering when off-screen or tab hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting && !document.hidden;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  // 4. Cursor position tracking with critical-damped mapping
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTimeRef.current = Date.now();
      isIdleRef.current = false;

      // Cursor X normalized across viewport [0..1]
      const normX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      const total = manifestRef.current.totalFrames;

      /**
       * In the current 72-frame sequence:
       * - Frame 0 is looking leftmost
       * - Frame 71 is looking center / forward
       * When avatar_right.mp4 is added, 0 is leftmost, 48 center, 95 rightmost.
       */
      const mapped = normX * (total - 1);
      targetFrameRef.current = Math.max(0, Math.min(total - 1, mapped));
    };

    const handleMouseLeave = () => {
      isIdleRef.current = true;
      targetFrameRef.current = manifestRef.current.neutralFrameIndex;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 5. High-performance canvas drawing with wide-shot framing (No zoom, no tight crop)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const total = bitmapsRef.current.length || 72;
    const idx = Math.max(0, Math.min(total - 1, Math.round(frameIndex)));
    const frame = bitmapsRef.current[idx];

    // If bitmaps not ready, try fallback poster
    if (!frame) return;

    const cW = canvas.width;
    const cH = canvas.height;
    const fW = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
    const fH = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

    if (!fW || !fH) return;

    /**
     * WIDE-SHOT CINEMATIC FRAMING:
     * We want to show the full environment (park, trees, buildings, bench)
     * exactly as in landing-layout.png without aggressive zoom.
     * We scale with cover-fit and slight 1.02x to 1.03x so the bottom-right
     * sparkle watermark is cleanly out of bounds.
     */
    const scale = Math.max(cW / fW, cH / fH) * 1.025;
    const renderW = fW * scale;
    const renderH = fH * scale;

    // Center framing keeping the environment and avatar balanced
    const offsetX = (cW - renderW) * 0.5;
    const offsetY = (cH - renderH) * 0.45;

    ctx.drawImage(frame, offsetX, offsetY, renderW, renderH);
  }, []);

  // 6. rAF render loop with critical-damped easing
  useEffect(() => {
    let animId: number;

    const render = () => {
      if (isVisibleRef.current) {
        const now = Date.now();

        // Idle detection: smoothly return to center / neutral forward gaze
        if (!isIdleRef.current && now - lastMouseMoveTimeRef.current > 1800) {
          isIdleRef.current = true;
        }

        if (isIdleRef.current) {
          // Return smoothly to neutral forward frame
          const neutral = manifestRef.current.neutralFrameIndex;
          targetFrameRef.current = neutral;
        }

        // Critical-damped lerp easing (0.09 provides fluid glide without jitter or snap)
        const lerpFactor = 0.09;
        const diff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += diff * lerpFactor;

        drawFrame(currentFrameRef.current);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // 7. Responsive resize handling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-[#070B16]"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block object-cover transition-opacity duration-700 ${
          posterLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle ambient lighting vignette framing the scene */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070B16] via-transparent to-[#070B16]/20" />
      <div className="absolute bottom-0 right-0 w-44 h-28 pointer-events-none bg-gradient-to-tl from-[#070B16] to-transparent opacity-90" />
    </div>
  );
};
