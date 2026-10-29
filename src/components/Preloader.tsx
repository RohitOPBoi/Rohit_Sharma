import React, { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  totalFrames?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, totalFrames = 144 }) => {
  const [phase, setPhase] = useState<'counter' | 'hello' | 'pixel' | 'done'>('counter');
  const [progress, setProgress] = useState<number>(0);
  const [pixelStep, setPixelStep] = useState<number>(0);

  // 1. Non-linear S-curve counter with deliberate pause at 99% (as measured in PDF: 0->6->37->84->98->pause 99->100)
  useEffect(() => {
    // Preload frames in background
    for (let i = 0; i < Math.min(totalFrames, 36); i++) {
      const img = new Image();
      const pad = String(i).padStart(3, '0');
      img.src = `/frames/frame_${pad}.webp`;
    }

    const startTime = performance.now();
    const duration = 2800; // Snappy, elegant timing (respects user attention while matching curve)

    const updateCounter = (now: number) => {
      const elapsed = (now - startTime) / duration;

      if (elapsed < 0.2) {
        // Slow start 0% -> 6%
        setProgress(Math.floor((elapsed / 0.2) * 6));
      } else if (elapsed < 0.5) {
        // Fast middle 6% -> 65%
        const t = (elapsed - 0.2) / 0.3;
        setProgress(Math.floor(6 + t * 59));
      } else if (elapsed < 0.8) {
        // High progress 65% -> 98%
        const t = (elapsed - 0.5) / 0.3;
        setProgress(Math.floor(65 + t * 33));
      } else if (elapsed < 0.95) {
        // Deliberate hold at 99% (Scene 1 specification)
        setProgress(99);
      } else if (elapsed < 1.0) {
        // 100% completion
        setProgress(100);
      } else {
        setProgress(100);
        // Transition to Scene 2: Hello script
        setTimeout(() => setPhase('hello'), 300);
        return;
      }

      requestAnimationFrame(updateCounter);
    };

    const animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [totalFrames]);

  // 2. Scene 2 (Hello) -> Scene 3 (Stepped Pixel Reveal)
  useEffect(() => {
    if (phase === 'hello') {
      const timer = setTimeout(() => {
        setPhase('pixel');
      }, 1600); // 1.6s hello script reveal
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // 3. Scene 3: Stepped Pixel Disc Reveal (7 discrete steps as specified in PDF)
  useEffect(() => {
    if (phase === 'pixel') {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setPixelStep(step);
        if (step >= 7) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 150);
        }
      }, 95); // 7 steps * 95ms ≈ 0.65s stepped reveal

      return () => clearInterval(interval);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0A0A0A] text-[#DFD2AC] select-none flex items-center justify-center">
      {/* SCENE 1: Non-linear Counter + Orbiting Arc */}
      {phase === 'counter' && (
        <div className="relative flex flex-col items-center">
          {/* Top-center percentage counter in heavy condensed gold-light type */}
          <div className="h-24 overflow-hidden flex items-center justify-center">
            <span className="font-display text-6xl sm:text-7xl font-bold tracking-wider text-[#DFD2AC]">
              {progress}%
            </span>
          </div>

          {/* Thick bevelled gold-light arc orbiting inside thin hairline ring */}
          <div className="relative w-36 h-36 mt-4 flex items-center justify-center">
            {/* Thin hairline ring */}
            <div className="absolute inset-0 rounded-full border border-white/10" />

            {/* Orbiting thick gold-light arc */}
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#DFD2AC"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="70 200"
              />
            </svg>
          </div>

          {/* Minimal status hint */}
          <div className="mt-8 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B17C] animate-pulse" />
            <span>PORTFOLIO • 2026</span>
          </div>
        </div>
      )}

      {/* SCENE 2: Monoline Gold Script "hello" write-on */}
      {phase === 'hello' && (
        <div className="relative flex flex-col items-center justify-center transition-transform duration-500">
          <svg
            className="w-72 sm:w-80 h-32 text-[#DFD2AC]"
            viewBox="0 0 280 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Continuous handwriting path with animated strokeDashoffset */}
            <path
              d="M35,80 Q50,20 65,75 Q75,105 90,50 Q95,85 110,50 Q120,85 135,55 Q140,35 155,75 Q170,75 185,50 Q195,75 215,75 Q230,75 245,55"
              stroke="#DFD2AC"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 400,
                strokeDashoffset: 0,
                animation: 'drawScript 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            />
            <text
              x="140"
              y="85"
              fill="#DFD2AC"
              fontFamily="var(--font-script)"
              fontSize="64"
              textAnchor="middle"
              className="font-bold select-none tracking-wider opacity-95"
            >
              hello
            </text>
          </svg>
          <style>{`
            @keyframes drawScript {
              from { stroke-dashoffset: 400; opacity: 0; }
              to { stroke-dashoffset: 0; opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* SCENE 3: Stepped Pixel Disc Reveal (7 discrete steps) */}
      {phase === 'pixel' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Center 1px cream hairline */}
          <div
            className="h-[1px] bg-[#F1E8E0] transition-all duration-100"
            style={{ width: `${Math.min(100, pixelStep * 16)}%` }}
          />

          {/* Stepped pixel block grid covering the screen */}
          <div
            className="absolute inset-0 bg-[#F1E8E0] transition-opacity duration-150"
            style={{
              opacity: pixelStep >= 6 ? 1 : pixelStep * 0.16,
              clipPath: `circle(${pixelStep * 18}% at 50% 50%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};
