import React from 'react';
import { AvatarCanvas } from '../components/AvatarCanvas';
import { ElasticMesh } from '../components/ElasticMesh';
import { ArrowUpRight } from '@phosphor-icons/react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1. Cinematic Wide-Shot Background Canvas (Zero bezels, 100% full-bleed cover) */}
      <AvatarCanvas />

      {/* 2. Top-Left Headline Container: Status Pill + Interactive <ElasticMesh /> + Action Pills */}
      <div className="relative z-20 pt-24 sm:pt-28 md:pt-36 lg:pt-40 px-6 sm:px-10 md:px-16 pointer-events-none max-w-2xl">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070B16]/50 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-[#E2E8F0] shadow-sm mb-3 sm:mb-4 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ROHIT SHARMA • GENERATIVE AI</span>
        </div>

        {/* Interactive ElasticMesh 3D balloon header */}
        <div className="w-full max-w-lg md:max-w-xl h-24 sm:h-28 md:h-32 pointer-events-auto cursor-grab active:cursor-grabbing">
          <ElasticMesh
            text="AI & ML ENGINEER"
            fontFamily="Outfit, sans-serif"
            fontWeight={900}
            color="#6FA8FF"
            material="balloon"
            inflate={0.88}
            stiffness={0.45}
            wobble={0.65}
            theme="dark"
            grabRadius={80}
            stretch={0.4}
            press={0.45}
            shadow={0.55}
            intro={true}
          />
        </div>

        {/* Minimal Action Pills */}
        <div className="mt-5 sm:mt-6 flex items-center gap-3.5 pointer-events-auto">
          {/* Primary Pill */}
          <a
            href="#work"
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide bg-[#F3EFE6] text-[#070B16] hover:bg-[#6FA8FF] hover:text-white transition-all duration-300 shadow-xl shadow-black/25 flex items-center gap-2 group cursor-pointer"
          >
            <span>View Work</span>
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Secondary Pill */}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wide bg-[#070B16]/50 backdrop-blur-md border border-white/20 text-[#F3EFE6] hover:bg-white/15 hover:border-white/40 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* 3. Bottom Minimal Controls Bar */}
      <div className="relative z-20 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-10 md:px-16 flex items-end justify-between pointer-events-none">
        {/* Bottom Left Status */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#070B16]/50 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#94A3B8] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORTFOLIO • 2026</span>
        </div>

        {/* Bottom Right Scroll Indicator */}
        <a
          href="#about"
          className="pointer-events-auto px-4 py-1.5 rounded-full bg-[#070B16]/50 backdrop-blur-md border border-white/15 text-xs font-mono tracking-widest text-[#94A3B8] hover:text-[#F3EFE6] hover:border-white/30 transition-all uppercase flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
};
