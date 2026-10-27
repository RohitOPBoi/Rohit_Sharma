import React from 'react';
import { HairlineRule } from '../components/HairlineRule';
import { publicationsData, achievementsData } from '../data/research';
import { FileText, Trophy, Certificate, ArrowUpRight } from '@phosphor-icons/react';

export const ResearchSection: React.FC = () => {
  return (
    <section
      id="research"
      className="relative w-full py-24 md:py-36 bg-[#070B16] text-[#F3EFE6] select-none border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hairline Rule */}
        <HairlineRule label="04 / RESEARCH &amp; HONORS" theme="dark" className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#F5B84B] uppercase font-semibold mb-4">
                <span className="w-6 h-[1px] bg-[#F5B84B]" />
                <span>EMPIRICAL BENCHMARKS</span>
              </div>

              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-tight text-[#F3EFE6] font-extrabold">
                PUBLICATIONS <br />
                <span className="text-[#F5B84B]">&amp; HONORS</span>
              </h2>

              <p className="mt-6 text-sm md:text-base text-[#94A3B8] leading-relaxed font-sans max-w-md">
                Formal contributions to generative medical imaging, mathematical validation, and competitive hackathon systems.
              </p>
            </div>

            {/* Metrics highlight badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2F5BFF]/15 to-transparent border border-[#2F5BFF]/30">
              <span className="text-[11px] font-mono tracking-widest text-[#6FA8FF] uppercase">
                DIFFUSION BENCHMARK HIGHLIGHT
              </span>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-display text-4xl text-[#F3EFE6] font-bold">13.20</span>
                  <span className="block text-[11px] font-mono text-[#94A3B8]">FID SCORE (OCT)</span>
                </div>
                <div>
                  <span className="font-display text-4xl text-[#F5B84B] font-bold">0.86</span>
                  <span className="block text-[11px] font-mono text-[#94A3B8]">SSIM INDEX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Paper Card & Honors List */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Peer-Reviewed Publication Card */}
            <div>
              <span className="block text-xs font-mono tracking-widest text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
                <FileText size={16} className="text-[#6FA8FF]" />
                <span>ACCEPTED CONFERENCE PAPERS</span>
              </span>

              {publicationsData.map((pub) => (
                <div
                  key={pub.id}
                  className="p-6 md:p-8 rounded-2xl bg-[#0D1424] border border-white/10 hover:border-[#6FA8FF]/50 transition-all duration-300 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#6FA8FF] mb-3">
                    <span>{pub.conference}</span>
                    <span className="text-[#F5B84B]">{pub.year}</span>
                  </div>

                  <h3 className="font-sans font-bold text-lg md:text-xl text-[#F3EFE6] leading-snug">
                    {pub.title}
                  </h3>

                  <p className="mt-3 text-xs md:text-sm text-[#94A3B8] leading-relaxed font-sans">
                    {pub.abstract}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono font-medium text-[#F5B84B]">
                      {pub.metrics}
                    </span>

                    <div className="flex items-center gap-3">
                      <a
                        href={pub.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="interactive"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F3EFE6] hover:text-[#6FA8FF] transition-colors"
                      >
                        <span>PAPER (PDF)</span>
                        <ArrowUpRight size={14} />
                      </a>
                      <span className="text-white/20">•</span>
                      <a
                        href={pub.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="interactive"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F3EFE6] hover:text-[#6FA8FF] transition-colors"
                      >
                        <span>CODE</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hackathon & Certification Honors */}
            <div>
              <span className="block text-xs font-mono tracking-widest text-[#94A3B8] uppercase mb-4 flex items-center gap-2">
                <Trophy size={16} className="text-[#F5B84B]" />
                <span>COMPETITIVE ACHIEVEMENTS &amp; CREDENTIALS</span>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievementsData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#F5B84B] mb-2">
                        <span>{item.badge}</span>
                        <span className="text-[#94A3B8]">{item.year}</span>
                      </div>
                      <h4 className="font-sans font-bold text-sm md:text-base text-[#F3EFE6]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#6FA8FF] font-mono mt-0.5">{item.issuer}</p>
                      <p className="mt-3 text-xs text-[#94A3B8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
