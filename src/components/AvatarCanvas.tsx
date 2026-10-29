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

  // Cached frame sequence (HTMLImageElement or ImageBitmap)
  const bitmapsRef = useRef<(HTMLImageElement | ImageBitmap)[]>([]);
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

  // Helper to draw a frame onto the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const total = manifestRef.current.totalFrames;
    const idx = Math.max(0, Math.min(total - 1, Math.round(frameIndex)));

    // Progressive nearest-neighbor search:
    // If the exact frame is not yet downloaded, find the closest available loaded frame.
    // This allows the avatar to start tracking IMMEDIATELY even if only 5-10 frames have arrived!
    let frame = bitmapsRef.current[idx];
    if (!frame) {
      for (let offset = 1; offset < total; offset++) {
        if (idx - offset >= 0 && bitmapsRef.current[idx - offset]) {
          frame = bitmapsRef.current[idx - offset];
          break;
        }
        if (idx + offset < total && bitmapsRef.current[idx + offset]) {
          frame = bitmapsRef.current[idx + offset];
          break;
        }
      }
    }

    if (!frame) frame = bitmapsRef.current[manifestRef.current.neutralFrameIndex];
    if (!frame) return;

    const cW = canvas.width;
    const cH = canvas.height;
    const fW = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
    const fH = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

    if (!fW || !fH) return;

    // Zero-Bezel Cover Scaling (covers entire viewport seamlessly)
    const scale = Math.max(cW / fW, cH / fH);
    const renderW = fW * scale;
    const renderH = fH * scale;

    const offsetX = (cW - renderW) * 0.5;
    const offsetY = cH - renderH;

    ctx.drawImage(frame, offsetX, offsetY, renderW, renderH);
  }, []);

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
  }, [drawFrame]);

  // 2. Progressive 2-Tier Frame Loader:
  // - Tier 1: Immediately loads 12 anchor frames in parallel across the full range.
  //   Avatar becomes responsive to cursor movement within ~300ms!
  // - Tier 2: Progressively streams remaining frames in parallel batches directly into cache.
  useEffect(() => {
    let isCancelled = false;

    // Load an individual frame with robust fallback
    const loadSingleFrame = async (index: number): Promise<void> => {
      if (isCancelled || bitmapsRef.current[index]) return;
      const pad = String(index).padStart(3, '0');
      const url = `/frames/frame_${pad}.webp`;

      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (!isCancelled) {
            bitmapsRef.current[index] = img;
          }
          resolve();
        };
        img.onerror = () => {
          resolve(); // Resolve anyway to never stall the queue
        };
      });
    };

    const loadAllFramesProgressively = async () => {
      // Fetch manifest non-blockingly
      fetch('/frames/manifest.json')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && !isCancelled) {
            manifestRef.current = data;
          }
        })
        .catch(() => {});

      const total = 144;

      // Tier 1: Key anchor frames distributed evenly (instant cursor interactivity)
      const anchorFrames = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 143];
      await Promise.all(anchorFrames.map((idx) => loadSingleFrame(idx)));

      if (isCancelled) return;

      // Tier 2: Stream remaining intermediate frames in batches of 6 concurrently
      const remainingIndices: number[] = [];
      for (let i = 0; i < total; i++) {
        if (!bitmapsRef.current[i]) {
          remainingIndices.push(i);
        }
      }

      const batchSize = 6;
      for (let i = 0; i < remainingIndices.length; i += batchSize) {
        if (isCancelled) break;
        const chunk = remainingIndices.slice(i, i + batchSize);
        await Promise.all(chunk.map((idx) => loadSingleFrame(idx)));
      }
    };

    loadAllFramesProgressively();

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
      if (!Number.isFinite(e.clientX)) return;

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

  // 5. Fluid rAF render loop with critical-damped lerp easing
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

        // Lerp factor 0.12 gives responsive, buttery smooth motion with 144 frames
        const lerpFactor = 0.12;
        const diff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += diff * lerpFactor;

        drawFrame(currentFrameRef.current);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // 6. Responsive resize handling
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

      {/* Seamless bottom transition into the dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none bg-gradient-to-b from-transparent to-[#0A0A0A]" />
    </div>
  );
};
