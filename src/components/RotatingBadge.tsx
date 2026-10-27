import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

interface RotatingBadgeProps {
  text?: string;
  href?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  text = "• LET'S WORK TOGETHER • LET'S CONNECT • 2026 • ",
  href = '#contact',
}) => {
  return (
    <a
      href={href}
      data-cursor="interactive"
      className="group relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
      aria-label="Contact Rohit Sharma - Let's work together"
    >
      {/* SVG Circular Path with Rotating Text */}
      <svg
        className="w-full h-full animate-spin-slow group-hover:[animation-duration:8s] select-none pointer-events-none"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="textPathCircle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text className="text-[9.5px] font-mono tracking-[0.16em] uppercase fill-[#F5B84B] font-medium">
          <textPath href="#textPathCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Circle & Arrow */}
      <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#070B16]/90 border border-[#F5B84B]/40 flex items-center justify-center text-[#F5B84B] shadow-[0_0_15px_rgba(245,184,75,0.25)] transition-all duration-300 group-hover:bg-[#F5B84B] group-hover:text-[#070B16] group-hover:shadow-[0_0_25px_rgba(245,184,75,0.5)]">
        <ArrowUpRight
          size={20}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </a>
  );
};
