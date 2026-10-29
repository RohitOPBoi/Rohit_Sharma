import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown } from '@phosphor-icons/react';
import { projectsData, ProjectItem } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const ProjectStackSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Scene 9: Stacking cards where each card arrives bright (cream) and settles to --card-overlay (#2F2F2C)
      // while previous card scales down to 0.94 and dims
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const face = card.querySelector('.card-face') as HTMLElement;
        const content = card.querySelector('.card-content') as HTMLElement;

        // 1. Bright-to-dim settle animation on arrival
        gsap.fromTo(
          face,
          { backgroundColor: '#F1E8E0' },
          {
            backgroundColor: '#2F2F2C',
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0.4 },
            {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // 2. When the next card rises, the current card scales down 6% (to 0.94) and cross-fades
        if (index < cardsRef.current.length - 1) {
          const nextCard = cardsRef.current[index + 1];
          if (nextCard) {
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.7,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 65%',
                end: 'top 20%',
                scrub: true,
              },
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] text-[#F1E8E0] py-24 md:py-32 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="mb-16 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-[#C9B17C] uppercase">
            <span>05 — ARCHITECTURAL CASE STUDIES</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase hidden sm:inline-block">
            4 PRODUCTION BENCHMARKS
          </span>
        </div>

        {/* Cards Stack Container */}
        <div className="relative flex flex-col space-y-16 md:space-y-24">
          {projectsData.map((project: ProjectItem, index: number) => (
            <div
              key={project.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              data-cursor="card"
              style={{
                top: `${80 + index * 24}px`,
              }}
              className="sticky w-full max-w-5xl mx-auto rounded-[8px] overflow-hidden shadow-2xl transition-transform duration-300 group cursor-pointer"
            >
              {/* Card Face with Bright-to-Dim Settle Animation (Scene 9 Spec) */}
              <div className="card-face relative w-full bg-[#2F2F2C] border border-white/15 p-8 sm:p-12 md:p-16 transition-colors duration-700">
                {/* Subtle top warm radial glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9B17C]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="card-content relative z-10 flex flex-col justify-between min-h-[380px] sm:min-h-[420px]">
                  {/* Top Row: Eyebrow + External Link Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold tracking-wider text-[#C9B17C]">
                        {project.number}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9B17C]" />
                      <span className="text-[11px] font-mono tracking-[0.2em] text-[#9A9A9A] uppercase">
                        {project.eyebrow}
                      </span>
                    </div>

                    <a
                      href={project.repoUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#F1E8E0] hover:text-[#C9B17C] hover:bg-white/10 transition-colors"
                      title="Open Repository"
                    >
                      <ArrowUpRight size={18} weight="bold" />
                    </a>
                  </div>

                  {/* Middle Area: Sentence-Case Title & Description */}
                  <div className="my-8 space-y-4 max-w-2xl">
                    <h3 className="font-sans font-medium text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1]">
                      {project.title}
                    </h3>
                    <p className="text-[#CCCCCC] font-sans text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Row: Tech Pills on Left & Rotating Circular Text Badge on Right (Scene 9 Spec) */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
                    {/* Tech Pills and Metrics */}
                    <div className="space-y-4">
                      {/* Metric Stat Row */}
                      <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="flex items-baseline gap-2">
                            <span className="text-[#9A9A9A] text-[10px] tracking-wider uppercase">
                              {m.label}:
                            </span>
                            <span className="text-[#DFD2AC] font-semibold">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Pill Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.06] text-[#DFD2AC] border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Circular Rotating Text Badge with Arrow (Scene 9 Spec: Speeds up on hover) */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center self-end sm:self-auto">
                      <svg
                        className="w-full h-full animate-spin-slow group-hover:[animation-duration:4s] origin-center transition-all duration-300 group-hover:scale-105"
                        viewBox="0 0 100 100"
                      >
                        <path
                          id={`badge-path-${project.id}`}
                          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                          fill="none"
                        />
                        <text className="text-[8px] font-mono tracking-[0.22em] uppercase fill-[#C9B17C]">
                          <textPath
                            href={`#badge-path-${project.id}`}
                            startOffset="0%"
                          >
                            {project.badgeText}
                          </textPath>
                        </text>
                      </svg>
                      <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#111111] border border-[#C9B17C]/50 flex items-center justify-center text-[#DFD2AC] shadow-md group-hover:bg-[#C9B17C] group-hover:text-[#0A0A0A] transition-colors">
                        <ArrowUpRight size={14} weight="bold" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
