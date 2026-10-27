import React, { useEffect, useRef } from 'react';

interface HairlineRuleProps {
  label?: string;
  theme?: 'dark' | 'light';
  className?: string;
}

export const HairlineRule: React.FC<HairlineRuleProps> = ({
  label,
  theme = 'dark',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (lineRef.current) {
              lineRef.current.style.width = '100%';
            }
            if (dotRef.current) {
              dotRef.current.style.left = '100%';
              dotRef.current.style.opacity = '1';
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-4 flex items-center justify-between overflow-hidden select-none ${className}`}
    >
      {/* Optional Leading Monospace Label */}
      {label && (
        <span
          className={`mr-4 text-[11px] font-mono tracking-widest uppercase shrink-0 ${
            isLight ? 'text-[#5A6275]' : 'text-[#94A3B8]'
          }`}
        >
          {label}
        </span>
      )}

      {/* Hairline Track & Animated Sliding Dot */}
      <div className="relative flex-1 h-[1px]">
        {/* Static Background Track */}
        <div
          className={`absolute inset-0 w-full h-[1px] ${
            isLight ? 'bg-[#070B16]/10' : 'bg-white/[0.08]'
          }`}
        />

        {/* Animated Expanding Hairline Line */}
        <div
          ref={lineRef}
          style={{ width: '0%', transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
          className={`absolute top-0 left-0 h-[1px] ${
            isLight
              ? 'bg-gradient-to-r from-[#2F5BFF] to-[#070B16]/40'
              : 'bg-gradient-to-r from-[#2F5BFF] via-[#6FA8FF] to-[#F5B84B]'
          }`}
        />

        {/* Animated Sliding Dot on the Tip of the Line */}
        <div
          ref={dotRef}
          style={{
            left: '0%',
            opacity: 0,
            transition:
              'left 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
          }}
          className={`absolute top-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full ${
            isLight
              ? 'bg-[#2F5BFF] shadow-[0_0_8px_rgba(47,91,255,0.6)]'
              : 'bg-[#F5B84B] shadow-[0_0_10px_#F5B84B]'
          }`}
        />
      </div>
    </div>
  );
};
