import React from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#0A0A0A] text-[#F1E8E0] select-none pt-16 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-between">
        {/* Top Info Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-script text-3xl text-[#C9B17C]">rohit</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B17C]" />
            <span className="text-xs font-mono text-[#9A9A9A] tracking-wider uppercase">
              AI &amp; ML ENGINEER
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            {profileData.socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="text-[#9A9A9A] hover:text-[#C9B17C] transition-colors"
              >
                {s.name} ↗
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            className="flex items-center gap-2 text-xs font-mono text-[#9A9A9A] hover:text-[#C9B17C] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
              <ArrowUp size={12} weight="bold" />
            </div>
          </button>
        </div>

        {/* Display Wordmark */}
        <div className="py-12 md:py-16 select-none text-center">
          <h2 className="font-display text-[15vw] leading-[0.8] text-white/[0.04] tracking-tighter uppercase font-black">
            ROHIT SHARMA
          </h2>
        </div>

        {/* Bottom Credits & Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#9A9A9A] pt-6 border-t border-white/5">
          <div>
            © {new Date().getFullYear()} Rohit Sharma. All specifications preserved.
          </div>
          <div className="flex items-center gap-3">
            <span>NEAR-BLACK / CREAM / GOLD PALETTE</span>
            <span>•</span>
            <span>LENIS SMOOTH ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
