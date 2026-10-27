import React from 'react';
import { AvatarCanvas } from '../components/AvatarCanvas';
import { ArrowUpRight } from '@phosphor-icons/react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden select-none bg-[#070B16]"
    >
      {/* 1. Cinematic Wide-Shot Background Canvas */}
      <AvatarCanvas />

      {/* 2. Top-Left Headline & Action Pills (matching landing-layout.png) */}
      <div className="relative z-20 pt-28 md:pt-36 px-6 md:px-14 pointer-events-none max-w-2xl">
        {/* Title */}
        <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F3EFE6] leading-[1.08] tracking-tight drop-shadow-md">
          AI &amp; Machine Learning Engineer &amp; <br />
          <span className="text-[#6FA8FF]">Diffusion Models &amp; Systems</span>
        </h1>

        {/* Action Pills */}
        <div className="mt-6 flex items-center gap-3 pointer-events-auto">
          {/* Primary Pill (Light fill, dark text) */}
          <a
            href="#work"
            className="px-6 py-2.5 rounded-full text-xs md:text-sm font-sans font-semibold tracking-wide bg-[#F3EFE6] text-[#070B16] hover:bg-[#F5B84B] transition-colors duration-300 shadow-lg flex items-center gap-1.5 group"
          >
            <span>View Work</span>
            <ArrowUpRight
              size={15}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Secondary Pill (Translucent dark, light text) */}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-xs md:text-sm font-sans font-medium tracking-wide bg-[#070B16]/60 backdrop-blur-md border border-white/20 text-[#F3EFE6] hover:bg-white/10 hover:border-white/40 transition-colors duration-300 shadow-md"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* 3. Bottom-Right Lowercase Geometric Headline (matching landing-layout.png) */}
      <div className="relative z-20 pb-10 md:pb-14 px-6 md:px-14 flex items-end justify-between pointer-events-none">
        {/* Bottom Left Minimal Status */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>BASED IN GURUGRAM &amp; NEW DELHI, IN</span>
        </div>

        {/* Bottom Right Tagline */}
        <div className="text-right ml-auto">
          <p className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#F3EFE6] leading-tight tracking-tight drop-shadow-md">
            bridging deep learning research <br />
            <span className="text-[#6FA8FF]">with practical deployment</span>
          </p>
        </div>
      </div>
    </section>
  );
};
