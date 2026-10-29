import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ManifestData {
  totalFrames: number;
  width: number;
  height: number;
  fps: number;
  leftmostFrameIndex: number;
  neutralFrameIndex: number;
  rightmostFrameIndex: number;
  leftmostTimestamp: number;
  neutralTimestamp: number;
  rightmostTimestamp: number;
  namingPattern: string;
}

export const AvatarCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cached frame sequence (ImageBitmap for hardware GPU decoding or HTMLImageElement fallback)
  const bitmapsRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const manifestRef = useRef<ManifestData>({
    totalFrames: 144,
    width: 1920,
    height: 1080,
    fps: 24,
    leftmostFrameIndex: 0,
    neutralFrameIndex: 60,
    rightmostFrameIndex: 143,
    leftmostTimestamp: 0.0,
    neutralTimestamp: 2.5,
    rightmostTimestamp: 5.958,
    namingPattern: '/frames/frame_%03d.webp',
  });

  const targetFrameRef = useRef<number>(60);
  const currentFrameRef = useRef<number>(60);
  const isIdleRef = useRef<boolean>(true);
  const lastInteractionTimeRef = useRef<number>(Date.now());
  const isVisibleRef = useRef<boolean>(true);
  const isReducedMotionRef = useRef<boolean>(false);
  const [posterLoaded, setPosterLoaded] = useState<boolean>(false);

  // 1. Instant poster frame load (neutral center frame_060.webp)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const poster = new Image();
    poster.src = '/frames/frame_060.webp';
    poster.onload = () => {
      bitmapsRef.current[60] = poster;
      setPosterLoaded(true);
      drawFrame(60);
    };
  }, []);

  // 2. Preload full frame sequence with createImageBitmap for seamless GPU caching
  useEffect(() => {
    let isCancelled = false;

    const loadFrames = async () => {
      try {
        const res = await fetch('/frames/manifest.json');
        if (res.ok) {
          manifestRef.current = (await res.json()) as ManifestData;
          targetFrameRef.current = manifestRef.current.neutralFrameIndex;
          currentFrameRef.current = manifestRef.current.neutralFrameIndex;
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
            await new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
            loaded[i] = img;
          }
        } catch {
          // Continue if a single frame drops
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

  // 4. Cursor position tracking with 3-zone head mapping:
  // Pointer Left  -> Frame 0   (character looks Left)
  // Pointer Center-> Frame 60  (character looks Center/Forward)
  // Pointer Right -> Frame 143 (character looks Right)
  const mapPointerToFrame = useCallback((normX: number) => {
    const manifest = manifestRef.current;
    const { leftmostFrameIndex, neutralFrameIndex, rightmostFrameIndex } = manifest;

    if (normX <= 0.5) {
      const t = normX / 0.5;
      return leftmostFrameIndex + t * (neutralFrameIndex - leftmostFrameIndex);
    } else {
      const t = (normX - 0.5) / 0.5;
      return neutralFrameIndex + t * (rightmostFrameIndex - neutralFrameIndex);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isReducedMotionRef.current) return;
      lastInteractionTimeRef.current = Date.now();
      isIdleRef.current = false;

      const normX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetFrameRef.current = mapPointerToFrame(normX);
    };

    const handleMouseLeave = () => {
      isIdleRef.current = true;
      targetFrameRef.current = manifestRef.current.neutralFrameIndex;
    };

    // Touch support (drag horizontally without hijacking vertical scroll)
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalTracking = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isHorizontalTracking = false;
        lastInteractionTimeRef.current = Date.now();
        isIdleRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);

        if (dx > dy && dx > 8) {
          isHorizontalTracking = true;
        }

        if (isHorizontalTracking) {
          const normX = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth));
          targetFrameRef.current = mapPointerToFrame(normX);
          lastInteractionTimeRef.current = Date.now();
        }
      }
    };

    const handleTouchEnd = () => {
      isIdleRef.current = true;
      targetFrameRef.current = manifestRef.current.neutralFrameIndex;
    };

    // Keyboard accessibility: Left / Right arrows gently pan head direction
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        isIdleRef.current = false;
        lastInteractionTimeRef.current = Date.now();
        targetFrameRef.current = Math.max(
          manifestRef.current.leftmostFrameIndex,
          targetFrameRef.current - 8
        );
      } else if (e.key === 'ArrowRight') {
        isIdleRef.current = false;
        lastInteractionTimeRef.current = Date.now();
        targetFrameRef.current = Math.min(
          manifestRef.current.rightmostFrameIndex,
          targetFrameRef.current + 8
        );
      } else if (e.key === ' ' || e.key === 'Enter') {
        isIdleRef.current = true;
        targetFrameRef.current = manifestRef.current.neutralFrameIndex;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mapPointerToFrame]);

  // 5. TRUE FULL-BLEED ZERO-BEZEL RENDERING
  // Ensures the bright, high-resolution avatar park background covers 100% of the canvas
  // edge-to-edge across any viewport (ultrawide, 16:9, laptop, portrait) with zero black bezels.
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const total = bitmapsRef.current.length || manifestRef.current.totalFrames;
    const idx = Math.max(0, Math.min(total - 1, Math.round(frameIndex)));
    const frame = bitmapsRef.current[idx] || bitmapsRef.current[manifestRef.current.neutralFrameIndex];

    if (!frame) return;

    const cW = canvas.width;
    const cH = canvas.height;
    const fW = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
    const fH = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

    if (!fW || !fH) return;

    // Zero-Bezel Cover Scaling:
    // Math.max guarantees renderW >= cW and renderH >= cH.
    // Every pixel of the screen is covered by the video frame, eliminating all borders or letterboxing.
    const scale = Math.max(cW / fW, cH / fH);
    const renderW = fW * scale;
    const renderH = fH * scale;

    // Horizontally center the subject
    const offsetX = (cW - renderW) * 0.5;

    // Vertically anchor desk to bottom edge so the wooden table sits naturally on the ground,
    // and the expansive green trees and sky stretch upwards to give wide breathing room.
    const offsetY = cH - renderH;

    ctx.drawImage(frame, offsetX, offsetY, renderW, renderH);
  }, []);

  // 6. Fluid rAF render loop with critical-damped lerp easing
  useEffect(() => {
    let animId: number;

    const render = () => {
      if (isVisibleRef.current) {
        const now = Date.now();

        // Idle detection: gently return to neutral forward gaze after 2s of inactivity
        if (!isIdleRef.current && now - lastInteractionTimeRef.current > 2000) {
          isIdleRef.current = true;
        }

        if (isIdleRef.current) {
          targetFrameRef.current = manifestRef.current.neutralFrameIndex;
        }

        // Lerp factor 0.10 gives responsive, buttery smooth motion with 144 frames
        const lerpFactor = 0.10;
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
      role="region"
      aria-label="Interactive character avatar responding to horizontal cursor movements"
      tabIndex={0}
      className="absolute inset-0 w-full h-full overflow-hidden select-none focus:outline-none"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-300 ${
          posterLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Seamless bottom transition into the dark marquee section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-transparent to-[#070B16]" />
    </div>
  );
};
