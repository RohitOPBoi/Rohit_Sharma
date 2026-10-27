import React from 'react';
import { HairlineRule } from '../components/HairlineRule';
import { aboutData } from '../data/about';
import { ArrowUpRight } from '@phosphor-icons/react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 bg-[#F3EFE6] text-[#070B16] select-none transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hairline Rule + Dot Detail */}
        <HairlineRule label="01 / BACKGROUND &amp; DIRECTIVES" theme="light" className="mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#2F5BFF] uppercase font-semibold block mb-3">
                {aboutData.eyebrow}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.92] uppercase tracking-tight text-[#070B16] font-extrabold">
                {aboutData.headline}
              </h2>
            </div>

            <div className="space-y-5 text-sm md:text-base leading-relaxed text-[#5A6275] font-sans">
              {aboutData.summary.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#research"
                className="px-6 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#070B16] text-[#F3EFE6] hover:bg-[#2F5BFF] transition-colors duration-300 shadow-md flex items-center gap-1.5"
              >
                <span>READ PUBLICATION DATA</span>
                <ArrowUpRight size={14} weight="bold" />
              </a>

              <a
                href="#contact"
                className="px-6 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider border border-[#070B16]/20 text-[#070B16] hover:bg-[#070B16]/5 transition-colors"
              >
                DISCUSS A ROLE
              </a>
            </div>
          </div>

          {/* Right Column: Structured Fact Ledger */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-[#070B16]/10 border-y border-[#070B16]/10">
            {aboutData.facts.map((fact, idx) => (
              <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div className="sm:w-1/3 shrink-0">
                  <span className="text-[11px] font-mono tracking-widest text-[#2F5BFF] uppercase font-medium">
                    {fact.label}
                  </span>
                </div>
                <div className="sm:w-2/3">
                  <h3 className="font-sans font-bold text-sm md:text-base text-[#070B16]">
                    {fact.value}
                  </h3>
                  <p className="text-xs text-[#5A6275] mt-1 font-sans leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
