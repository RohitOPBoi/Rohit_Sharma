import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Terminal, Sparkle } from '@phosphor-icons/react';
import { ElasticString } from '../components/ElasticString';
import { aboutData } from '../data/about';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const headlineWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const contentStaggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sheet = sheetRef.current;
    if (!section || !sheet) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Inset Sheet Rise & Expand (Scene 6 Spec: Starts inset 3% with rounded corners and shadow, expands to full-bleed)
      gsap.fromTo(
        sheet,
        {
          width: '94%',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.85)',
        },
        {
          width: '100%',
          borderRadius: '0px 0px 0 0',
          boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      // 2. Headline Word-by-Word Brighten Reveal (Scroll-scrubbed from dim #3A3A3A to full color)
      headlineWordsRef.current.forEach((wordEl) => {
        if (!wordEl) return;
        const isGold = wordEl.getAttribute('data-gold') === 'true';
        const targetColor = isGold ? '#C9B17C' : '#F1E8E0';

        gsap.fromTo(
          wordEl,
          { color: '#3A3A3A', opacity: 0.35 },
          {
            color: targetColor,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: wordEl,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      });

      // 3. Staggered fade up of editorial paragraphs and 3x2 stats grid
      if (contentStaggerRef.current) {
        gsap.fromTo(
          contentStaggerRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentStaggerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-transparent z-20 overflow-hidden flex flex-col items-center select-none"
    >
      {/* Inset Sheet that widens to full-bleed on scroll */}
      <div
        ref={sheetRef}
        className="w-[94%] bg-[#0A0A0A] text-[#F1E8E0] transition-[width,border-radius] duration-300 mx-auto px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-28 md:pt-28 md:pb-36 border-t border-white/10"
      >
        {/* Section Eyebrow + Interactive Elastic String */}
        <div className="w-full max-w-6xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#C9B17C] uppercase font-semibold">
              {aboutData.eyebrow}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase hidden sm:inline-block">
              FOUNDATIONS &amp; RESEARCH
            </span>
          </div>

          {/* Scene 6 Elastic Gold String with pointer-following harmonic spring */}
          <div className="w-full mt-4">
            <ElasticString className="w-full" />
          </div>
        </div>

        {/* Main Content Layout: Far Left Icon Dock + Wide Content Area */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Far Left Thin Icon Dock (Code, Terminal, Sparkle) at 40% opacity until hovered (Scene 6 Spec) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center gap-6 pt-3">
            <div className="flex flex-col items-center gap-5 p-2 rounded-full bg-[#111111]/80 border border-white/10 text-[#C9B17C] shadow-lg">
              <div
                title="Engineering Systems"
                className="p-2.5 rounded-full opacity-40 hover:opacity-100 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <Code size={18} weight="bold" />
              </div>
              <div
                title="Terminal & CLI Pipelines"
                className="p-2.5 rounded-full opacity-40 hover:opacity-100 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <Terminal size={18} weight="bold" />
              </div>
              <div
                title="Generative Intelligence"
                className="p-2.5 rounded-full opacity-40 hover:opacity-100 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <Sparkle size={18} weight="bold" />
              </div>
            </div>
            <div className="w-[1px] h-24 bg-gradient-to-b from-[#C9B17C]/40 to-transparent" />
          </div>

          {/* Wide Content Area */}
          <div className="lg:col-span-11 flex flex-col space-y-12">
            {/* Two-Line Headline with Scroll-Scrubbed Brightness Reveal */}
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight uppercase">
              {aboutData.headlineWords.map((word, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    headlineWordsRef.current[idx] = el;
                  }}
                  data-gold={word.isGold ? 'true' : 'false'}
                  className="inline-block mr-2.5 sm:mr-3 transition-colors duration-150"
                  style={{ color: '#3A3A3A', opacity: 0.35 }}
                >
                  {word.text}
                </span>
              ))}
            </h2>

            {/* Editorial Paragraphs and Stats Stagger Container */}
            <div ref={contentStaggerRef} className="space-y-14">
              {/* Two Short Editorial Paragraphs in Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-[#9A9A9A] font-sans text-sm sm:text-base leading-relaxed">
                <p className="border-l border-white/10 pl-5">
                  {aboutData.paragraphs[0]}
                </p>
                <p className="border-l border-white/10 pl-5">
                  {aboutData.paragraphs[1]}
                </p>
              </div>

              {/* 3x2 Grid of Small Stats: Tiny uppercase gold label over tiny uppercase value */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6 sm:gap-x-10 pt-8 border-t border-white/10">
                {aboutData.stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col space-y-1.5">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#C9B17C] uppercase font-semibold">
                      {stat.label}
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-bold tracking-wider text-[#F1E8E0] uppercase">
                      {stat.value}
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
