import React from 'react';
import { profileData } from '../data/profile';
import { ArrowUp } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#070B16] text-[#F3EFE6] select-none pt-16 pb-12 border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Top Info Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="font-script text-4xl text-[#F3EFE6]">{profileData.firstName.toLowerCase()}</span>
            <span className="w-2 h-2 rounded-full bg-[#F5B84B]" />
            <span className="text-xs font-mono text-[#94A3B8]">
              {profileData.headlineRole}
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
                data-cursor="interactive"
                className="text-[#94A3B8] hover:text-[#6FA8FF] transition-colors"
              >
                {s.name} {s.isPlaceholder && <span className="opacity-40">[P]</span>} ↗
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            data-cursor="interactive"
            className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] hover:text-[#F5B84B] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

        {/* Giant Ultra-Condensed Heavy Display Wordmark */}
        <div className="py-12 md:py-20 select-none text-center">
          <h2 className="font-display text-[16vw] leading-[0.8] text-white/[0.05] hover:text-white/[0.12] transition-colors duration-700 tracking-tighter uppercase font-black">
            ROHIT SHARMA
          </h2>
        </div>

        {/* Bottom Credits & Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#94A3B8] pt-6 border-t border-white/[0.04]">
          <div>
            © {new Date().getFullYear()} Rohit Sharma. Designed with 60 FPS Lenis + GSAP engine.
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span>REACT 19</span>
            <span>•</span>
            <span>TAILWIND V4</span>
            <span>•</span>
            <span>DIFFUSION &amp; AGENTIC ARCHITECTURES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
