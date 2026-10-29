import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { PinnedWorkSection } from './sections/PinnedWorkSection';
import { ProjectStackSection } from './sections/ProjectStackSection';
import { ResearchSection } from './sections/ResearchSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  // Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useEffect(() => {
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
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F1E8E0] selection:bg-[#C9B17C]/30 selection:text-[#F1E8E0]">
      {/* Global Trailing Blob Cursor with Difference Blending (PDF Global System 1) */}
      <CustomCursor />

      {/* Preloader: Scene 1 Counter -> Scene 2 Hello -> Scene 3 Stepped Pixel Disc */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} totalFrames={144} />
      )}

      {/* Navigation Bar with Script Wordmark & Menu Curtain (Scenes 4 & 5) */}
      <Navbar />

      {/* Main Page Flow (Scenes 4 -> 6 -> 7 -> 8 -> 9 -> 11) */}
      <main className="relative w-full">
        {/* Scene 4: Protected 3D Avatar Video Hero with 144 WebP frames & gaze scrubbing */}
        <HeroSection />

        {/* Scene 6: Inset Sheet About Section with Elastic String & Word Brighten */}
        <AboutSection />

        {/* Scenes 7 & 8: Horizontal Pinned Track: Expertise & Work Title with Dripping WORK */}
        <PinnedWorkSection />

        {/* Scene 9: Sticky Project Card Stack with Bright-to-Dim Settle */}
        <ProjectStackSection />

        {/* Peer-Reviewed Research & Hackathon Accolades */}
        <ResearchSection />

        {/* Scene 11: Contact Section with Ghost Word, Glow & Form */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
