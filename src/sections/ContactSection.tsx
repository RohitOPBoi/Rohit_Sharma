import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Envelope, LinkedinLogo, GithubLogo, ArrowUpRight, CheckCircle } from '@phosphor-icons/react';
import { profileData } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ghostWordRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Ghost Word "CONTACT" and gold radial glow fade-in (Scene 11 Spec: opacity 0 to 0.12, 1.2s)
      if (ghostWordRef.current) {
        gsap.fromTo(
          ghostWordRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 0.1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Headline 3-line sequential light-up (0.25s apart, #3A3A3A to full color)
      headlineLinesRef.current.forEach((lineEl, idx) => {
        if (!lineEl) return;
        const targetColor = idx === 1 ? '#C9B17C' : '#F1E8E0';

        gsap.fromTo(
          lineEl,
          { color: '#3A3A3A', opacity: 0.3 },
          {
            color: targetColor,
            opacity: 1,
            duration: 0.6,
            delay: idx * 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 3. Staggered fade up of contact rows and form fields (80ms stagger)
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll('.stagger-item'),
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0A0A0A] text-[#F1E8E0] py-28 md:py-36 px-6 sm:px-12 md:px-16 lg:px-24 select-none overflow-hidden"
    >
      {/* Warm Gold Radial Glow along the Top Edge (Scene 11 Spec) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 bg-[#C9B17C]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Giant Faint Ghost Word "CONTACT" (Scene 11 Spec: only contact has ghost word) */}
      <div
        ref={ghostWordRef}
        className="absolute top-12 left-1/2 -translate-x-1/2 font-display text-[19vw] leading-none text-white tracking-tighter pointer-events-none select-none z-0 opacity-10 whitespace-nowrap"
      >
        CONTACT
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Eyebrow Header */}
        <div className="mb-14 flex items-center justify-between border-b border-white/10 pb-4">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#C9B17C] uppercase font-semibold">
            06 — INITIATE CONTACT
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase hidden sm:inline-block">
            DIRECT INQUIRY CHANNEL
          </span>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: 3-Line Headline & 3 Contact Rows */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <div>
              {/* 3-Line Headline (Scene 11: "Let's create something meaningful.", center line gold) */}
              <h2 className="font-sans font-medium text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
                <span
                  ref={(el) => {
                    headlineLinesRef.current[0] = el;
                  }}
                  className="block"
                >
                  Let's create
                </span>
                <span
                  ref={(el) => {
                    headlineLinesRef.current[1] = el;
                  }}
                  className="block text-[#C9B17C]"
                >
                  something
                </span>
                <span
                  ref={(el) => {
                    headlineLinesRef.current[2] = el;
                  }}
                  className="block"
                >
                  meaningful.
                </span>
              </h2>

              {/* One-Line Invitation */}
              <p className="mt-6 text-sm sm:text-base text-[#9A9A9A] font-sans leading-relaxed max-w-md">
                Available for high-impact Generative AI research, diffusion model engineering, and autonomous multi-agent production pipelines.
              </p>
            </div>

            {/* 3 Contact Rows (Email, LinkedIn, GitHub): 2px lift and border brighten on hover */}
            <div className="flex flex-col space-y-3.5 pt-2">
              {/* 1. Email */}
              <a
                href={`mailto:${profileData.email}`}
                data-cursor="pointer"
                className="stagger-item group flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9B17C]/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-[#C9B17C] flex items-center justify-center">
                    <Envelope size={20} weight="bold" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-[#9A9A9A] uppercase">
                      DIRECT EMAIL
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#F1E8E0] font-medium group-hover:text-[#C9B17C] transition-colors">
                      {profileData.email}
                    </span>
                  </div>
                </div>
                <div className="text-[#9A9A9A] group-hover:text-[#C9B17C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight size={16} weight="bold" />
                </div>
              </a>

              {/* 2. LinkedIn */}
              <a
                href={profileData.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="stagger-item group flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9B17C]/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-[#C9B17C] flex items-center justify-center">
                    <LinkedinLogo size={20} weight="bold" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-[#9A9A9A] uppercase">
                      PROFESSIONAL NETWORK
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#F1E8E0] font-medium group-hover:text-[#C9B17C] transition-colors">
                      {profileData.socials[0].label}
                    </span>
                  </div>
                </div>
                <div className="text-[#9A9A9A] group-hover:text-[#C9B17C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight size={16} weight="bold" />
                </div>
              </a>

              {/* 3. GitHub */}
              <a
                href={profileData.socials[1].url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="stagger-item group flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-white/10 hover:border-[#C9B17C]/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-[#C9B17C] flex items-center justify-center">
                    <GithubLogo size={20} weight="bold" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-[#9A9A9A] uppercase">
                      CODE &amp; REPOSITORIES
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#F1E8E0] font-medium group-hover:text-[#C9B17C] transition-colors">
                      {profileData.socials[1].label}
                    </span>
                  </div>
                </div>
                <div className="text-[#9A9A9A] group-hover:text-[#C9B17C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight size={16} weight="bold" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form Card in --ink-card (#111111) with Paper-White Submit Button */}
          <div className="lg:col-span-6 stagger-item">
            <div className="p-8 sm:p-10 rounded-[10px] bg-[#111111] border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle size={48} className="mx-auto text-[#C9B17C]" weight="fill" />
                  <h3 className="font-sans font-bold text-xl text-[#F1E8E0]">
                    Message Transmitted
                  </h3>
                  <p className="text-sm font-sans text-[#9A9A9A] max-w-xs mx-auto">
                    Your inquiry has been received. I will reply promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Dr. Jordan Hayes"
                      className="w-full px-4 py-3 rounded-md bg-[#0A0A0A] border border-white/10 text-sm font-sans text-[#F1E8E0] placeholder-[#555] focus:outline-none focus:border-[#C9B17C] transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. j.hayes@deepmind.com"
                      className="w-full px-4 py-3 rounded-md bg-[#0A0A0A] border border-white/10 text-sm font-sans text-[#F1E8E0] placeholder-[#555] focus:outline-none focus:border-[#C9B17C] transition-colors"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-[#9A9A9A] uppercase">
                      COMMUNICATION SPECIFICATION
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline research requirements, project parameters, or engineering scope..."
                      className="w-full px-4 py-3 rounded-md bg-[#0A0A0A] border border-white/10 text-sm font-sans text-[#F1E8E0] placeholder-[#555] focus:outline-none focus:border-[#C9B17C] transition-colors resize-none"
                    />
                  </div>

                  {/* Full-width Paper-White Button (--paper #F2F0EC with ink text #0A0A0A) */}
                  <button
                    type="submit"
                    disabled={loading}
                    data-cursor="pointer"
                    className="w-full py-3.5 px-6 rounded-md bg-[#F2F0EC] hover:bg-[#C9B17C] text-[#0A0A0A] font-sans font-semibold text-xs tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    <span>{loading ? 'Transmitting...' : 'Send Message'}</span>
                    <ArrowUpRight size={14} weight="bold" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
