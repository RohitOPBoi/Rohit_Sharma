import React from 'react';
import { HairlineRule } from '../components/HairlineRule';
import { aboutData } from '../data/about';
import { profileData } from '../data/profile';
import { Sparkle, GraduationCap, MapPin, Target } from '@phosphor-icons/react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-20 md:py-32 bg-[#F3EFE6] text-[#070B16] select-none transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hairline Rule + Dot Detail */}
        <HairlineRule label="01 / ABOUT ME" theme="light" className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait Card with Avatar & Tech Badges */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#070B16]/10 bg-[#E8E3D8] group">
              <img
                src={aboutData.portraitPlaceholder}
                alt="Rohit Sharma - AI & Machine Learning Engineer"
                className="w-full h-auto aspect-[4/5] object-cover filter contrast-[1.03] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Floating Name Badge */}
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#070B16]/85 backdrop-blur-md border border-white/10 text-white font-mono text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2F5BFF] animate-pulse" />
                <span>ROHIT SHARMA</span>
              </div>

              {/* Floating Specialization Pill */}
              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#070B16]/85 backdrop-blur-md border border-white/10 text-[#F5B84B] font-mono text-xs flex items-center gap-2">
                <Sparkle size={14} weight="fill" />
                <span>DIFFUSION &amp; AGENTIC AI</span>
              </div>
            </div>

            {/* Quick Education / Degree Card */}
            <div className="p-5 rounded-xl bg-[#E8E3D8]/60 border border-[#070B16]/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#2F5BFF]/10 text-[#2F5BFF] flex items-center justify-center shrink-0">
                <GraduationCap size={22} weight="bold" />
              </div>
              <div>
                <span className="block text-[11px] font-mono text-[#5A6275] uppercase tracking-wider">
                  CURRENT DEGREE
                </span>
                <h4 className="font-sans font-semibold text-sm md:text-base text-[#070B16]">
                  B.Tech in Artificial Intelligence &amp; Machine Learning
                </h4>
                <p className="text-xs text-[#5A6275] mt-0.5">
                  Vivekananda Institute of Professional Studies (VIPS-TC) • 2024 — 2028
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Statement Title, Bio & Quick Facts Grid */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Monospace Eyebrow */}
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#2F5BFF] uppercase font-semibold">
              <span className="w-6 h-[1px] bg-[#2F5BFF]" />
              <span>{aboutData.eyebrow}</span>
            </div>

            {/* Oversized Heavy Display Statement Headline */}
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase text-[#070B16] font-extrabold">
              {aboutData.headline}
            </h2>

            {/* Bio Paragraphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base leading-relaxed text-[#5A6275] font-sans">
              <p>{aboutData.leadParagraph}</p>
              <p>{aboutData.secondaryParagraph}</p>
            </div>

            {/* Quick Facts Grid */}
            <div className="pt-8 border-t border-[#070B16]/10">
              <h3 className="text-xs font-mono tracking-widest text-[#5A6275] uppercase mb-6 flex items-center gap-2">
                <Target size={14} />
                <span>QUICK FACTS &amp; AVAILABILITY</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {aboutData.quickFacts.map((fact, idx) => (
                  <div key={idx} className="flex flex-col space-y-1">
                    <span className="text-[10px] font-mono text-[#5A6275] tracking-wider uppercase">
                      {fact.label}
                    </span>
                    <span className="font-mono text-xs md:text-sm font-bold text-[#070B16] uppercase">
                      {fact.value}
                    </span>
                    {fact.subValue && (
                      <span className="text-[11px] text-[#2F5BFF] font-medium font-sans">
                        {fact.subValue}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href={profileData.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#070B16] text-[#F3EFE6] hover:bg-[#2F5BFF] transition-all shadow-lg hover:shadow-[0_0_20px_rgba(47,91,255,0.4)]"
              >
                CONNECT ON LINKEDIN ↗
              </a>
              <a
                href="#contact"
                data-cursor="interactive"
                className="px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider border border-[#070B16]/30 text-[#070B16] hover:bg-[#070B16]/5 transition-colors"
              >
                MESSAGE ROHIT
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
