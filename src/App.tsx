import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Marquee } from './components/Marquee';

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExpertiseSection } from './sections/ExpertiseSection';
import { WorkSection } from './sections/WorkSection';
import { ResearchSection } from './sections/ResearchSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070B16] text-[#F3EFE6]">
      {/* 1. Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} totalFrames={72} />
      )}

      {/* 2. Fluid Custom Cursor */}
      <Cursor />

      {/* 3. Navigation Bar */}
      <Navbar />

      {/* 4. Page Sections */}
      <main className="relative w-full">
        <HeroSection />

        {/* Transition Marquee 1 */}
        <Marquee theme="dark" />

        <AboutSection />

        {/* Transition Marquee 2 */}
        <Marquee
          theme="dark"
          reverse={true}
          items={[
            'PYTORCH PIPELINES',
            'ADVERSARIAL NEURAL NETWORKS',
            'TIME-CONDITIONED U-NET',
            'PROBABILISTIC DIFFUSION',
            'AUTONOMOUS AGENT GRAPHS',
            'DOCKER REPRODUCIBILITY',
          ]}
        />

        <ExpertiseSection />

        <WorkSection />

        <ResearchSection />

        <ContactSection />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
};

export default App;
