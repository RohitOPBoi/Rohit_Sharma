import React, { useState, useEffect } from 'react';
import { MenuOverlay } from './MenuOverlay';
import { List } from '@phosphor-icons/react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERTISE', href: '#expertise' },
    { name: 'RESEARCH', href: '#research' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-10 transition-all duration-300 pointer-events-none ${
          scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center justify-between pointer-events-auto transition-all duration-300 border ${
            scrolled
              ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/40'
              : 'bg-[#0A0A0A]/55 backdrop-blur-md border-white/10 shadow-lg'
          }`}
        >
          {/* Left: Script-style signature wordmark */}
          <a
            href="#hero"
            data-cursor="pointer"
            className="group flex items-center gap-2 select-none"
          >
            <span className="font-script text-3xl font-bold tracking-wide text-[#F1E8E0] transition-colors group-hover:text-[#C9B17C]">
              rohit
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B17C] shadow-[0_0_8px_#C9B17C]" />
          </a>

          {/* Center: Desktop Nav Links (Micro label: Inter/Mono uppercase with wide tracking) */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-cursor="pointer"
                className="text-[#9A9A9A] hover:text-[#F1E8E0] transition-colors link-draw py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Availability badge & Menu Curtain Trigger Button */}
          <div className="flex items-center gap-3.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono tracking-wider text-[#9A9A9A]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#F1E8E0]">AI & ML RESEARCH</span>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              data-cursor="pointer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#C9B17C] hover:text-[#0A0A0A] border border-white/10 text-xs font-mono font-medium tracking-wider text-[#F1E8E0] transition-all cursor-pointer shadow-sm"
              aria-label="Open Menu Curtain"
            >
              <List size={16} weight="bold" />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Curtain Drop Menu Overlay (Scene 5) */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
