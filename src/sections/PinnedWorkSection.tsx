import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';
import { WorkDripping } from '../components/WorkDripping';
import { expertiseData } from '../data/expertise';

gsap.registerPlugin(ScrollTrigger);

export const PinnedWorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const workPanelRef = useRef<HTMLDivElement | null>(null);

  // Active tech ticker index (advances every 1s as per Scene 8 spec)
  const tickerItems = [
    'DIFFUSION',
    'PYTORCH',
    'MULTI-AGENT',
    'CUDA',
    'FASTMCP',
    'TRANSFORMERS',
    'DOCKER',
  ];
  const [activeTicker, setActiveTicker] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTicker((prev) => (prev + 1) % tickerItems.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [tickerItems.length]);

  // Sine-wave floating icons animation
  const [sineOffset, setSineOffset] = useState<number>(0);
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();
    const loop = (now: number) => {
      setSineOffset((now - startTime) / 1000);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP Horizontal Pin & Push
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const workPanel = workPanelRef.current;
    if (!container || !track) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Horizontal push: translates track left by 100vw
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Move track left: Expertise out to left, Work in from right
      tl.to(track, {
        x: '-100vw',
        ease: 'power2.inOut',
      });

      // Gold WORK title brightness: dim 30% -> 100% full gold as it nears center (Scene 8 spec)
      if (workPanel) {
        tl.fromTo(
          workPanel,
          { opacity: 0.3 },
          { opacity: 1, ease: 'power1.out' },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full h-screen bg-[#0A0A0A] text-[#F1E8E0] overflow-hidden select-none"
    >
      {/* 200vw Horizontal Track containing Panel 1 (Expertise) and Panel 2 (Work Title) */}
      <div
        ref={trackRef}
        className="flex flex-row w-[200vw] h-full will-change-transform"
      >
        {/* ========================================================= */}
        {/* PANEL 1: SCENE 7 — EXPERTISE                             */}
        {/* ========================================================= */}
        <div className="w-[100vw] h-full flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-12 relative shrink-0">
          {/* Floating tech logos on sine wave paths with slight tilt (Scene 7 Spec) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
            {expertiseData.floatingIcons.map((icon, idx) => {
              const yDrift = Math.sin(sineOffset * icon.speed + idx) * 16;
              const xDrift = Math.cos(sineOffset * icon.speed * 0.8 + idx) * 12;
              const tilt = Math.sin(sineOffset * icon.speed * 0.7 + idx) * 8;

              return (
                <div
                  key={icon.name}
                  style={{
                    left: `${icon.x}%`,
                    top: `${icon.y}%`,
                    transform: `translate3d(${xDrift}px, ${yDrift}px, 0) rotate(${tilt}deg)`,
                    transition: 'transform 0.1s linear',
                  }}
                  className="absolute z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10 shadow-lg text-xs font-mono font-medium"
                >
                  <span className="text-sm">{icon.symbol}</span>
                  <span style={{ color: icon.color }}>{icon.name}</span>
                </div>
              );
            })}
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-20">
            {/* Left Column: Eyebrow, Two-line title in clip mask, intro, tech chips */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#C9B17C] uppercase font-semibold block mb-2">
                  {expertiseData.eyebrow}
                </span>

                {/* Two-Line Title: "MY" in grey and "EXPERTISE" in white rising out of clip mask */}
                <div className="overflow-hidden">
                  <h2 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.95]">
                    <span className="block text-[#9A9A9A]">
                      {expertiseData.headingTop}
                    </span>
                    <span className="block text-[#F1E8E0]">
                      {expertiseData.headingBottom}
                    </span>
                  </h2>
                </div>
              </div>

              {/* Short Intro with Gold-Highlighted Phrase */}
              <div className="space-y-3 font-sans text-sm sm:text-base leading-relaxed text-[#9A9A9A] max-w-md">
                <p>
                  <strong className="text-[#C9B17C] font-semibold">
                    {expertiseData.introHighlight}.
                  </strong>{' '}
                  {expertiseData.introBody}
                </p>
              </div>

              {/* Row of Tiny Outlined Tech Chips (Scene 7 Spec) */}
              <div className="pt-2">
                <span className="block text-[10px] font-mono tracking-[0.2em] text-[#9A9A9A] uppercase mb-3">
                  PRIMARY COMPUTE &amp; REASONING STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {expertiseData.techChips.map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-[#111111] border border-white/15 text-[#DFD2AC] hover:border-[#C9B17C] transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: 4 Service Rows separated by hairlines with gold left rule on hover */}
            <div className="lg:col-span-7 flex flex-col divide-y divide-white/10 border-y border-white/10">
              {expertiseData.rows.map((row) => (
                <div
                  key={row.index}
                  className="group relative py-5 sm:py-6 px-4 transition-all duration-300 hover:bg-white/[0.03] cursor-pointer"
                >
                  {/* Gold Left Border Highlight on Hover (Scene 7 Spec) */}
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9B17C] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-200" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Row Index */}
                      <span className="font-mono text-xs sm:text-sm text-[#C9B17C] font-semibold mt-0.5">
                        {row.index}
                      </span>

                      {/* Content */}
                      <div className="space-y-1.5">
                        <h3 className="font-sans font-bold text-lg sm:text-xl text-[#F1E8E0] tracking-wide group-hover:text-[#C9B17C] transition-colors">
                          {row.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9A9A9A] font-sans leading-relaxed max-w-xl">
                          {row.description}
                        </p>

                        {/* 3 Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {row.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-[#9A9A9A] border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* External Link Arrow */}
                    <div className="text-[#9A9A9A] group-hover:text-[#C9B17C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight size={18} weight="bold" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PANEL 2: SCENE 8 — WORK TITLE                             */}
        {/* ========================================================= */}
        <div
          id="work"
          ref={workPanelRef}
          className="w-[100vw] h-full flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-24 py-12 relative shrink-0 bg-[#0A0A0A]"
        >
          {/* Top Line: "SCROLL TO EXPLORE MY" with hairline and dot under it */}
          <div className="w-full max-w-6xl mx-auto pt-4">
            <div className="flex items-center justify-between text-xs font-mono tracking-[0.25em] text-[#9A9A9A] uppercase mb-2">
              <span>04 — PORTFOLIO SELECTIONS</span>
              <span className="text-[#C9B17C]">SCROLL TO EXPLORE MY</span>
            </div>
            <div className="w-full h-[1px] bg-white/10 relative">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C9B17C]" />
            </div>

            {/* Tech Ticker: 7 Items with one name lit gold, advancing 1s */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4 overflow-x-auto text-[11px] sm:text-xs font-mono tracking-widest text-[#9A9A9A] uppercase">
              {tickerItems.map((item, idx) => (
                <span
                  key={item}
                  className={`transition-colors duration-300 ${
                    idx === activeTicker
                      ? 'text-[#C9B17C] font-bold border-b border-[#C9B17C]'
                      : 'text-white/40'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Center: Giant Gold "WORK" with Gooey Droplets (Scene 8 Spec) */}
          <div className="w-full flex items-center justify-center my-auto">
            <WorkDripping />
          </div>

          {/* Bottom: Marquee Strip with data-cursor="difference" & Small Gold "MY WORK" Label */}
          <div className="w-full max-w-6xl mx-auto pb-4 space-y-4">
            {/* Continuous Marquee Strip */}
            <div
              data-cursor="difference"
              className="w-full overflow-hidden py-3 bg-[#111111]/80 rounded-full border border-white/10 backdrop-blur-md cursor-pointer"
            >
              <div className="flex items-center whitespace-nowrap animate-marquee">
                <span className="text-xs sm:text-sm font-mono tracking-widest text-white uppercase px-6">
                  GENERATIVE AI • MULTI-AGENT ORCHESTRATION • DIFFUSION SYNTHESIS • ADVERSARIAL DEFENSE • HIGH-THROUGHPUT CUDA •
                </span>
                <span className="text-xs sm:text-sm font-mono tracking-widest text-white uppercase px-6">
                  GENERATIVE AI • MULTI-AGENT ORCHESTRATION • DIFFUSION SYNTHESIS • ADVERSARIAL DEFENSE • HIGH-THROUGHPUT CUDA •
                </span>
              </div>
            </div>

            {/* Small Gold "MY WORK" Label */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-[#C9B17C] uppercase">
              <span>MY WORK</span>
              <span className="animate-pulse">SCROLL DOWN FOR DETAILED CASE STUDIES ↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

