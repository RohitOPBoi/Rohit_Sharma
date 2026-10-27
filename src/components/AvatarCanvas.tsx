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

  // Cached frame images
  const framesRef = useRef<HTMLImageElement[]>([]);
  const manifestRef = useRef<ManifestData>({
    totalFrames: 72,
    width: 1280,
    height: 720,
    neutralFrameIndex: 71, // Frame 71 is center/neutral
    leftmostFrameIndex: 0,  // Frame 0 is leftmost turn
    rightmostFrameIndex: 71,
    hasRightClip: false,
    namingPattern: '/frames/frame_%03d.webp',
  });

  // Tracking state
  const targetFrameRef = useRef<number>(71);
  const currentFrameRef = useRef<number>(71);
  const isIdleRef = useRef<boolean>(true);
  const lastMouseMoveTimeRef = useRef<number>(Date.now());
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 1. Load manifest and preload frames
  useEffect(() => {
    let isCancelled = false;

    const loadAssets = async () => {
      try {
        const res = await fetch('/frames/manifest.json');
        if (res.ok) {
          const data = (await res.json()) as ManifestData;
          manifestRef.current = data;
          targetFrameRef.current = data.neutralFrameIndex;
          currentFrameRef.current = data.neutralFrameIndex;
        }
      } catch {
        // Fallback to 72 frames default
      }

      const total = manifestRef.current.totalFrames;
      const loadedImages: HTMLImageElement[] = [];
      let loadCounter = 0;

      for (let i = 0; i < total; i++) {
        const img = new Image();
        const pad = String(i).padStart(3, '0');
        img.src = `/frames/frame_${pad}.webp`;

        img.onload = () => {
          loadCounter++;
          if (loadCounter >= total && !isCancelled) {
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          loadCounter++;
          if (loadCounter >= total && !isCancelled) {
            setIsLoaded(true);
          }
        };

        loadedImages.push(img);
      }

      framesRef.current = loadedImages;
    };

    loadAssets();

    return () => {
      isCancelled = true;
    };
  }, []);

  // 2. Cursor and motion listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseMoveTimeRef.current = Date.now();
      isIdleRef.current = false;

      // Map cursor X across viewport width [0.0 ... 1.0]
      const normX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));

      /**
       * Frame Mapping Logic:
       * - When only the left-to-center clip exists (hasRightClip = false):
       *   NormX = 0.0 (far left) maps to leftmostFrameIndex (0).
       *   NormX = 1.0 (far right) maps to neutralFrameIndex (71, looking straight ahead).
       * - When avatar_right.mp4 is provided (hasRightClip = true):
       *   NormX = 0.0 -> leftmostFrameIndex (0)
       *   NormX = 0.5 -> neutralFrameIndex (48, center)
       *   NormX = 1.0 -> rightmostFrameIndex (95, full right)
       */
      const total = manifestRef.current.totalFrames;
      const mappedIndex = normX * (total - 1);
      targetFrameRef.current = Math.max(0, Math.min(total - 1, mappedIndex));
    };

    const handleMouseLeave = () => {
      // Ease gracefully back to neutral / forward-facing frame when mouse leaves window
      isIdleRef.current = true;
      targetFrameRef.current = manifestRef.current.neutralFrameIndex;
    };

    // Mobile / touch device tilt listener (deviceorientation)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        lastMouseMoveTimeRef.current = Date.now();
        isIdleRef.current = false;
        // Gamma is left-to-right tilt in degrees [-45 .. 45]
        const tiltNorm = Math.max(0, Math.min(1, (e.gamma + 30) / 60));
        const total = manifestRef.current.totalFrames;
        targetFrameRef.current = tiltNorm * (total - 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // 3. Render loop with lerp easing
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const total = framesRef.current.length;
      if (total === 0) return;

      const idx = Math.max(0, Math.min(total - 1, Math.round(frameIndex)));
      const img = framesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cWidth = canvas.width;
      const cHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      /**
       * Object-fit: cover with face anchoring:
       * 1. Scale slightly (1.05x) and shift slightly down-left
       *    to crop out the bottom-right sparkle watermark completely.
       * 2. Anchor around avatar's head and laptop in the sunny park.
       */
      const scale = Math.max(cWidth / imgWidth, cHeight / imgHeight) * 1.05;
      const renderW = imgWidth * scale;
      const renderH = imgHeight * scale;

      // Face in original 1280x720 frame is centered around X=53%, Y=44%
      const faceAnchorX = 0.53;
      const faceAnchorY = 0.44;

      const offsetX = cWidth * 0.5 - renderW * faceAnchorX;
      // Slight vertical offset keeping face and table comfortably in view
      const offsetY = cHeight * 0.45 - renderH * faceAnchorY;

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    },
    []
  );

  useEffect(() => {
    let animId: number;

    const render = () => {
      const now = Date.now();

      // Check if cursor has been idle for more than 2 seconds or on touch devices
      if (!isIdleRef.current && now - lastMouseMoveTimeRef.current > 2000) {
        isIdleRef.current = true;
      }

      // Idle gentle sway behavior: gently eases around the center/neutral position
      if (isIdleRef.current) {
        const time = now * 0.001;
        // Subtle organic breathing sway
        const sway = 0.5 + 0.35 * Math.sin(time * 0.8);
        const total = manifestRef.current.totalFrames;
        targetFrameRef.current = sway * (total - 1);
      }

      // Smooth motion with lerp (0.10 gives an ultra-responsive yet gliding feel)
      const lerpSpeed = 0.10;
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * lerpSpeed;

      drawFrame(currentFrameRef.current);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [drawFrame]);

  // 4. Responsive canvas resizing with Retina / High-DPI support
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
      data-cursor="avatar"
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-[#070B16]"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Subtle cinematic gradient vignette for text readability */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070B16] via-transparent to-[#070B16]/30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#070B16]/40 via-transparent to-[#070B16]/40" />

      {/* Watermark security crop mask (bottom-right subtle radial shadow) */}
      <div className="absolute bottom-0 right-0 w-48 h-32 pointer-events-none bg-gradient-to-tl from-[#070B16] to-transparent opacity-80" />
    </div>
  );
};
