import React from 'react';
import { publicationsData, achievementsData } from '../data/research';
import { FileText, Trophy, ArrowUpRight } from '@phosphor-icons/react';

export const ResearchSection: React.FC = () => {
  return (
    <section
      id="research"
      className="relative w-full py-24 md:py-32 bg-[#0A0A0A] text-[#F1E8E0] select-none border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Header */}
        <div className="mb-14 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#C9B17C] uppercase font-semibold">
            06 — EMPIRICAL BENCHMARKS &amp; HONORS
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase hidden sm:inline-block">
            PEER-REVIEWED VALIDATION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Highlight Box */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h2 className="font-sans font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[#F1E8E0] leading-[1.0]">
                PUBLICATIONS <br />
                <span className="text-[#C9B17C]">&amp; HONORS</span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-[#9A9A9A] leading-relaxed font-sans max-w-md">
                Formal contributions to generative medical imaging, mathematical validation, and competitive hackathon systems.
              </p>
            </div>

            {/* Metrics highlight badge */}
            <div className="p-6 rounded-xl bg-[#111111] border border-[#C9B17C]/30 shadow-xl">
              <span className="text-[10px] font-mono tracking-widest text-[#C9B17C] uppercase font-semibold block">
                DIFFUSION BENCHMARK HIGHLIGHT
              </span>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-sans text-3xl sm:text-4xl text-[#F1E8E0] font-bold">14.20</span>
                  <span className="block text-[10px] font-mono text-[#9A9A9A] mt-1">FID SCORE (OCT)</span>
                </div>
                <div>
                  <span className="font-sans text-3xl sm:text-4xl text-[#C9B17C] font-bold">0.88</span>
                  <span className="block text-[10px] font-mono text-[#9A9A9A] mt-1">SSIM INDEX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Paper Card & Honors List */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            {/* Accepted Conference Papers */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9A9A9A] uppercase mb-4">
                <FileText size={16} className="text-[#C9B17C]" weight="bold" />
                <span>ACCEPTED CONFERENCE PAPERS</span>
              </div>

              {publicationsData.map((pub) => (
                <div
                  key={pub.id}
                  className="p-6 sm:p-8 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9B17C]/50 transition-all duration-300 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#C9B17C] mb-2">
                    <span>{pub.conference}</span>
                    <span className="text-[#9A9A9A]">{pub.year}</span>
                  </div>

                  <h3 className="font-sans font-bold text-lg sm:text-xl text-[#F1E8E0] leading-snug">
                    {pub.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#9A9A9A] leading-relaxed font-sans">
                    {pub.abstract}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs font-mono font-medium text-[#C9B17C]">
                      {pub.metrics}
                    </span>

                    <div className="flex items-center gap-3">
                      <a
                        href={pub.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="pointer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#F1E8E0] hover:text-[#C9B17C] transition-colors"
                      >
                        <span>PAPER (PDF)</span>
                        <ArrowUpRight size={14} weight="bold" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Honors & Hackathon Accolades */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9A9A9A] uppercase mb-4">
                <Trophy size={16} className="text-[#C9B17C]" weight="bold" />
                <span>SELECT HONORS &amp; AWARDS</span>
              </div>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {achievementsData.map((ach, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-sans font-bold text-[#F1E8E0]">
                        {ach.title}
                      </h4>
                      <p className="text-xs font-sans text-[#9A9A9A]">
                        {ach.issuer} • {ach.year}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#C9B17C] font-semibold shrink-0">
                      {ach.badge}
                    </span>
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
