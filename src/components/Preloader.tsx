import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  totalFrames?: number;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, totalFrames = 72 }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload frame sequence
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, '0');
      img.src = `/frames/frame_${pad}.webp`;

      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / totalFrames) * 100);
        setProgress((prev) => Math.max(prev, pct));
      };

      img.onerror = () => {
        // Continue even if a frame fails
        loadedCount++;
        const pct = Math.floor((loadedCount / totalFrames) * 100);
        setProgress((prev) => Math.max(prev, pct));
      };

      images.push(img);
    }

    // Safety fallback: if frames load extremely quickly or cache hit, increment gracefully
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [totalFrames]);

  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 700);
        return () => clearTimeout(completeTimer);
      }, 400);

      return () => clearTimeout(exitTimer);
    }
  }, [progress, isExiting, onComplete]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B16] text-[#F3EFE6] transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Circular Progress Ring */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
            {/* Background Track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
              fill="transparent"
            />
            {/* Animated Progress Arc */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#F5B84B"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="transparent"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                transition: 'stroke-dashoffset 0.15s ease-out',
              }}
            />
          </svg>

          {/* Central Percentage & Script Hello */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold tracking-wider text-[#F3EFE6]">
              {progress}%
            </span>
          </div>
        </div>

        {/* Script "hello" with SVG draw-on animation */}
        <div className="mt-8 overflow-hidden">
          <svg
            className="w-48 h-20 text-[#6FA8FF]"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30,70 Q45,20 60,65 Q70,95 85,45 Q90,75 105,45 Q115,75 130,50 Q135,30 150,70 Q165,70 180,45 Q190,65 210,65"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="draw-hello"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: Math.max(0, 300 - (progress / 100) * 300),
                transition: 'stroke-dashoffset 0.2s linear',
              }}
            />
            {/* Script Text Overlay */}
            <text
              x="120"
              y="75"
              fill="#F3EFE6"
              fontFamily="var(--font-script)"
              fontSize="44"
              textAnchor="middle"
              className="font-bold opacity-90 select-none tracking-wide"
            >
              hello
            </text>
          </svg>
        </div>

        {/* Subtitle Status */}
        <div className="mt-4 flex items-center gap-2 text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F5BFF] animate-pulse" />
          <span>Synchronizing Avatar Neural Pipeline</span>
        </div>
      </div>
    </div>
  );
};
