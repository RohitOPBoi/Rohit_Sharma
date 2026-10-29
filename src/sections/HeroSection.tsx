import React from 'react';
import { AvatarCanvas } from '../components/AvatarCanvas';
import { ElasticMesh } from '../components/ElasticMesh';
import { ArrowUpRight, ArrowDown } from '@phosphor-icons/react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1. PROTECTED Cinematic 3D Avatar Video Canvas (144-frame horizontal cursor-controlled scrubbing) */}
      <AvatarCanvas />

      {/* 2. Top-Left Headline Container: Status Pill + Interactive <ElasticMesh /> + Action Pills */}
      <div className="relative z-20 pt-24 sm:pt-28 md:pt-36 lg:pt-40 px-6 sm:px-10 md:px-16 pointer-events-none max-w-2xl">
        {/* Eyebrow Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-wider text-[#DFD2AC] shadow-sm mb-3 sm:mb-4 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ROHIT SHARMA • GENERATIVE AI &amp; MULTIMODAL SYSTEMS</span>
        </div>

        {/* Interactive ElasticMesh 3D balloon typography */}
        <div className="w-full max-w-lg md:max-w-xl h-24 sm:h-28 md:h-32 pointer-events-auto cursor-grab active:cursor-grabbing">
          <ElasticMesh
            text="AI & ML ENGINEER"
            fontFamily="Outfit, sans-serif"
            fontWeight={900}
            color="#C9B17C"
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
          <a
            href="#work"
            data-cursor="pointer"
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide bg-[#F2F0EC] text-[#0A0A0A] hover:bg-[#C9B17C] hover:text-[#0A0A0A] transition-all duration-300 shadow-xl shadow-black/25 flex items-center gap-2 group cursor-pointer"
          >
            <span>Explore Work</span>
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <a
            href="#contact"
            data-cursor="pointer"
            className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans font-medium tracking-wide bg-[#0A0A0A]/60 backdrop-blur-md border border-white/15 text-[#F1E8E0] hover:bg-white/10 hover:border-white/30 transition-all duration-300 shadow-lg cursor-pointer"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* 3. Bottom Bar: Status on Left, Rotating Circular Text Badge on Right (Scene 4 Spec) */}
      <div className="relative z-20 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-10 md:px-16 flex items-end justify-between pointer-events-none">
        {/* Bottom Left Status */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#9A9A9A] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>NEW DELHI / GURUGRAM • 2026</span>
        </div>

        {/* Bottom Center: Scroll to explore */}
        <a
          href="#about"
          data-cursor="pointer"
          className="pointer-events-auto hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0A0A]/60 backdrop-blur-md border border-white/10 text-xs font-mono tracking-widest text-[#9A9A9A] hover:text-[#DFD2AC] hover:border-white/30 transition-all uppercase shadow-sm"
        >
          <span>Scroll to explore</span>
          <span className="animate-bounce">↓</span>
        </a>

        {/* Bottom Right: Rotating Circular Text Badge (Scene 4 Specification) */}
        <div className="pointer-events-auto relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <svg
            className="w-full h-full animate-spin-slow origin-center"
            viewBox="0 0 100 100"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[9px] font-mono tracking-[0.2em] uppercase fill-[#C9B17C]">
              <textPath href="#circlePath" startOffset="0%">
                SCROLL TO EXPLORE • DISCOVER RESEARCH •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#0A0A0A]/80 border border-[#C9B17C]/40 flex items-center justify-center text-[#DFD2AC]">
            <ArrowDown size={14} weight="bold" />
          </div>
        </div>
      </div>
    </section>
  );
};
