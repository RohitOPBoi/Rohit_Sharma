import React from 'react';

interface MarqueeProps {
  items?: string[];
  reverse?: boolean;
  theme?: 'dark' | 'light';
  speed?: string;
  className?: string;
}

const defaultItems = [
  'DIFFUSION MODELS',
  'DENOISING PROBABILISTIC PIPELINES',
  'HIERARCHICAL MULTI-AGENT SYSTEMS',
  'ADVERSARIAL FRAUD DEFENSE',
  'TIME-CONDITIONED U-NET',
  'MEDICAL OCT SYNTHESIS',
  'SSIM & FID EVALUATION',
  'GROUNDED RAG KNOWLEDGE GRAPHS',
];

export const Marquee: React.FC<MarqueeProps> = ({
  items = defaultItems,
  reverse = false,
  theme = 'dark',
  className = '',
}) => {
  const isLight = theme === 'light';

  // Duplicate items for seamless continuous looping
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden py-4 md:py-6 border-y select-none ${
        isLight
          ? 'bg-[#E8E3D8]/50 border-[#070B16]/10 text-[#070B16]'
          : 'bg-[#070B16]/90 border-white/[0.06] text-[#F3EFE6]'
      } ${className}`}
    >
      <div
        className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}
        style={{ willChange: 'transform' }}
      >
        {repeated.map((item, idx) => (
          <div key={idx} className="flex items-center shrink-0 mx-6">
            <span
              className={`font-display text-2xl md:text-4xl tracking-wider uppercase font-bold transition-colors ${
                isLight
                  ? 'hover:text-[#2F5BFF]'
                  : 'text-white/80 hover:text-[#6FA8FF]'
              }`}
            >
              {item}
            </span>
            <span className="ml-8 w-2 h-2 rounded-full bg-[#F5B84B] shadow-[0_0_8px_#F5B84B] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
