import React, { useState, useRef } from 'react';
import { HairlineRule } from '../components/HairlineRule';
import { expertiseData, ExpertiseRow } from '../data/expertise';
import { ArrowUpRight } from '@phosphor-icons/react';

export const ExpertiseSection: React.FC = () => {
  const [activeRow, setActiveRow] = useState<ExpertiseRow | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-24 md:py-36 bg-[#070B16] text-[#F3EFE6] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hairline Rule + Dot Detail */}
        <HairlineRule label="02 / EXPERTISE" theme="dark" className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading, Statement & Tech Stack Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#6FA8FF] uppercase font-semibold mb-4">
                <span className="w-6 h-[1px] bg-[#6FA8FF]" />
                <span>TECHNICAL CAPABILITIES</span>
              </div>

              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-tight text-[#F3EFE6] font-extrabold">
                MY <br />
                <span className="text-[#6FA8FF]">EXPERTISE</span>
              </h2>

              <p className="mt-6 text-sm md:text-base text-[#94A3B8] leading-relaxed font-sans max-w-md">
                Bridging mathematical foundation and deep learning research with scalable, practical production pipelines.
              </p>
            </div>

            {/* Core Tech Stack Summary Pills */}
            <div className="pt-8 border-t border-white/[0.08]">
              <span className="block text-[11px] font-mono tracking-widest text-[#94A3B8] uppercase mb-4">
                PRIMARY STACK &amp; TOOLS
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'PyTorch',
                  'Diffusion Models (DDPM)',
                  'U-Net',
                  'Multi-Agent Systems',
                  'RAG',
                  'LLMs',
                  'Docker',
                  'Linux',
                  'C++',
                  'Python',
                  'Computer Vision',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-[#F3EFE6] hover:border-[#6FA8FF] hover:text-[#6FA8FF] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Rows with Hover Highlight & Floating Tokens */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-white/[0.08]">
            {expertiseData.map((row) => (
              <div
                key={row.id}
                onMouseEnter={() => setActiveRow(row)}
                onMouseLeave={() => setActiveRow(null)}
                data-cursor="interactive"
                className="group relative py-8 transition-all duration-300 hover:px-4 cursor-pointer"
              >
                {/* Background Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2F5BFF]/10 via-[#6FA8FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Index */}
                    <span className="font-mono text-sm md:text-base text-[#6FA8FF] font-semibold mt-1">
                      {row.index}
                    </span>

                    {/* Content */}
                    <div>
                      <span className="block text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase mb-1">
                        {row.category}
                      </span>
                      <h3 className="font-display text-2xl md:text-4xl text-[#F3EFE6] tracking-wide transition-colors group-hover:text-[#6FA8FF]">
                        {row.title}
                      </h3>
                      <p className="mt-3 text-xs md:text-sm text-[#94A3B8] leading-relaxed font-sans max-w-xl">
                        {row.description}
                      </p>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {row.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#F3EFE6]/70 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-[#F5B84B] group-hover:bg-[#F5B84B] group-hover:text-[#070B16] group-hover:shadow-[0_0_15px_rgba(245,184,75,0.4)]">
                    <ArrowUpRight
                      size={18}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Tech-Logo / Token that follows the cursor on hover */}
      {activeRow && (
        <div
          style={{
            transform: `translate3d(${mousePos.x + 20}px, ${mousePos.y - 40}px, 0)`,
            transition: 'transform 0.08s ease-out',
          }}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden lg:flex items-center gap-2 p-2 rounded-xl bg-[#070B16]/95 backdrop-blur-md border border-[#6FA8FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
        >
          {activeRow.floatingTokens.map((t, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: t.bg, color: t.color }}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm"
            >
              <span>{t.symbol}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
