import React, { useState, useEffect } from 'react';
import { profileData } from '../data/profile';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Contributions', href: '#contributions' },
    { name: 'Research', href: '#research' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-10 transition-all duration-300 pointer-events-none ${
        scrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-5'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-between pointer-events-auto transition-all duration-300 border ${
          scrolled
            ? 'bg-[#070B16]/90 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/40'
            : 'bg-[#070B16]/60 backdrop-blur-md border-white/10 shadow-lg shadow-black/20'
        }`}
      >
        {/* Left: Script-style signature logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2 select-none"
        >
          <span className="font-script text-3xl md:text-4xl font-bold tracking-wide text-[#F3EFE6] transition-colors group-hover:text-[#6FA8FF]">
            {profileData.firstName.toLowerCase()}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B84B] shadow-[0_0_8px_#F5B84B]" />
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#94A3B8] hover:text-[#F3EFE6] transition-colors link-draw py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Availability Indicator & Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#F3EFE6]">AVAILABLE FOR ROLES</span>
          </div>

          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider text-[#070B16] bg-[#F5B84B] hover:bg-[#ffc666] transition-all shadow-[0_0_15px_rgba(245,184,75,0.3)] hover:shadow-[0_0_20px_rgba(245,184,75,0.5)] cursor-pointer"
          >
            LET'S TALK
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 space-y-1.5 focus:outline-none cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#F3EFE6] transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#F3EFE6] transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#F3EFE6] transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto bg-[#070B16]/98 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 shadow-2xl pointer-events-auto transition-all">
          <nav className="flex flex-col space-y-4 text-sm font-mono tracking-wider uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#94A3B8] hover:text-[#6FA8FF] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR RESEARCH & ENG ROLES
              </span>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full text-xs font-mono font-medium text-[#070B16] bg-[#F5B84B]"
              >
                LET'S TALK
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
