import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkDripping } from '../components/WorkDripping';
import { ProjectCardHand } from '../components/ProjectCardHand';
import { HairlineRule } from '../components/HairlineRule';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Check reduced motion or mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#070B16] text-[#F3EFE6] select-none overflow-hidden"
    >
      {/* Top Section Header & Thin Horizontal Progress Indicator */}
      <div className="relative z-30 w-full pt-16 px-6 md:px-12 bg-[#070B16]">
        <HairlineRule label="03 / PORTFOLIO WORKSTREAM" theme="dark" className="mb-4" />

        {/* Thin Horizontal Scroll Progress Bar */}
        <div className="w-full h-[2px] bg-white/[0.08] relative rounded-full overflow-hidden">
          <div
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            className="h-full bg-gradient-to-r from-[#2F5BFF] via-[#6FA8FF] to-[#F5B84B] transition-all duration-75"
          />
        </div>
      </div>

      {/* Pinned Horizontal Container (or vertical fallback on mobile) */}
      <div
        ref={trackRef}
        className={`${
          isMobile
            ? 'flex flex-col space-y-12 py-12'
            : 'flex flex-row items-center will-change-transform h-[calc(100vh-100px)]'
        }`}
      >
        {/* PANEL 1: Giant Dripping WORK Typography with Physics Solver */}
        <div className={`${isMobile ? 'w-full' : 'w-screen shrink-0'} flex items-center justify-center`}>
          <WorkDripping />
        </div>

        {/* PANEL 2: Fanned Playing Card Deck */}
        <div className={`${isMobile ? 'w-full' : 'w-screen shrink-0'} flex items-center justify-center`}>
          <ProjectCardHand />
        </div>
      </div>
    </section>
  );
};
