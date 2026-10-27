import React from 'react';
import { AvatarCanvas } from '../components/AvatarCanvas';
import { RotatingBadge } from '../components/RotatingBadge';
import { profileData } from '../data/profile';
import { ArrowDown } from '@phosphor-icons/react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden select-none bg-[#070B16]"
    >
      {/* 1. Background Video Frame Canvas (Avatar with Cursor Head Tracking) */}
      <AvatarCanvas />

      {/* 2. Top Navigation Bar Spacer */}
      <div className="relative z-20 w-full pt-24 px-6 md:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[#94A3B8]">
          <span className="tracking-widest uppercase text-[#F3EFE6]/70">
            [00] PORTFOLIO V0.1
          </span>
          <span className="hidden md:inline-block tracking-widest text-[#F5B84B]">
            ● SYSTEM ACTIVE • 60 FPS CANVAS ENGINE
          </span>
        </div>
      </div>

      {/* 3. Center Giant Ultra-Condensed Hero Typography Layered Around Avatar */}
      <div className="relative z-10 w-full px-4 md:px-8 my-auto pointer-events-none flex flex-col items-center justify-center text-center">
        {/* Giant Top Wordmark */}
        <h1 className="font-display text-[15vw] md:text-[17vw] leading-[0.82] tracking-tighter text-[#F3EFE6] font-extrabold uppercase mix-blend-difference drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          ROHIT
        </h1>

        {/* Giant Bottom Wordmark */}
        <h2 className="font-display text-[15vw] md:text-[17vw] leading-[0.82] tracking-tighter text-[#6FA8FF] font-extrabold uppercase mix-blend-screen opacity-90 drop-shadow-[0_10px_30px_rgba(47,91,255,0.4)]">
          SHARMA
        </h2>

        {/* Subtitle / Role Bar */}
        <div className="mt-4 md:mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-6 text-xs md:text-sm font-mono tracking-widest uppercase text-[#F3EFE6] px-4 py-1.5 rounded-full bg-[#070B16]/60 backdrop-blur-md border border-white/10 shadow-xl">
          <span>AI &amp; ML ENGINEER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B84B]" />
          <span>DIFFUSION MODELS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F5BFF]" />
          <span>MULTI-AGENT SYSTEMS</span>
        </div>
      </div>

      {/* 4. Bottom Hero Controls Bar */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-8">
        <div className="max-w-7xl mx-auto flex items-end justify-between">
          {/* Bottom Left: Copyright & Location */}
          <div className="flex flex-col space-y-1 text-xs font-mono text-[#94A3B8]">
            <span className="text-[#F3EFE6]/80 font-medium">©2026 ROHIT SHARMA</span>
            <span>AI RESEARCH &amp; SYSTEMS ARCHITECTURE</span>
            <span className="text-[#6FA8FF] text-[11px]">BASED IN {profileData.city}, {profileData.country}</span>
          </div>

          {/* Bottom Center: Animated "Scroll to explore" */}
          <div className="hidden sm:flex flex-col items-center space-y-2 pointer-events-auto">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#94A3B8] uppercase">
              SCROLL TO EXPLORE
            </span>
            <a
              href="#about"
              data-cursor="interactive"
              className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5 text-[#F5B84B] hover:border-[#F5B84B] transition-colors"
              aria-label="Scroll to About Section"
            >
              <ArrowDown size={14} className="animate-bounce" />
            </a>
          </div>

          {/* Bottom Right: Circular Rotating Badge */}
          <div className="pointer-events-auto">
            <RotatingBadge />
          </div>
        </div>
      </div>
    </section>
  );
};
