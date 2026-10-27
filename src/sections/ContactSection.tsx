import React, { useState } from 'react';
import { HairlineRule } from '../components/HairlineRule';
import { profileData } from '../data/profile';
import { Envelope, LinkedinLogo, MapPin, PaperPlaneTilt, CheckCircle, GithubLogo } from '@phosphor-icons/react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
      className="relative w-full py-24 md:py-36 bg-[#070B16] text-[#F3EFE6] select-none border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hairline Rule */}
        <HairlineRule label="05 / GET IN TOUCH" theme="dark" className="mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Headline & Info Cards */}
          <div className="lg:col-span-6 flex flex-col space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#F5B84B] uppercase font-semibold mb-4">
                <span className="w-6 h-[1px] bg-[#F5B84B]" />
                <span>START A CONVERSATION</span>
              </div>

              {/* Big Headline */}
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase text-[#F3EFE6] font-extrabold">
                LET'S CREATE <br />
                <span className="text-[#F5B84B]">SOMETHING</span> <br />
                <span className="text-[#6FA8FF]">MEANINGFUL.</span>
              </h2>

              <p className="mt-6 text-sm md:text-base text-[#94A3B8] leading-relaxed font-sans max-w-lg">
                Have a research project in mind, an engineering role, or want to discuss generative diffusion architectures? I would love to hear from you.
              </p>
            </div>

            {/* Left Contact Info Cards */}
            <div className="flex flex-col space-y-4 pt-4">
              {/* Email Card */}
              <a
                href={`mailto:${profileData.email}`}
                data-cursor="interactive"
                className="group flex items-center justify-between p-5 rounded-2xl bg-[#0D1424] border border-white/10 hover:border-[#6FA8FF] transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2F5BFF]/10 text-[#6FA8FF] flex items-center justify-center shrink-0">
                    <Envelope size={22} weight="bold" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-[#94A3B8] uppercase">
                      EMAIL DIRECTLY
                    </span>
                    <span className="font-mono text-sm md:text-base text-[#F3EFE6] font-medium group-hover:text-[#6FA8FF] transition-colors">
                      {profileData.email}
                    </span>
                  </div>
                </div>
                <span className="text-[#94A3B8] group-hover:text-[#6FA8FF] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              {/* LinkedIn Card */}
              <a
                href={profileData.socials[0].url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="interactive"
                className="group flex items-center justify-between p-5 rounded-2xl bg-[#0D1424] border border-white/10 hover:border-[#2F5BFF] transition-all duration-300 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2F5BFF]/10 text-[#2F5BFF] flex items-center justify-center shrink-0">
                    <LinkedinLogo size={22} weight="bold" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-[#94A3B8] uppercase">
                      LINKEDIN PROFILE
                    </span>
                    <span className="font-mono text-sm md:text-base text-[#F3EFE6] font-medium group-hover:text-[#2F5BFF] transition-colors">
                      {profileData.socials[0].label}
                    </span>
                  </div>
                </div>
                <span className="text-[#94A3B8] group-hover:text-[#2F5BFF] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              {/* Location Card */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0D1424]/60 border border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] text-[#F5B84B] flex items-center justify-center shrink-0">
                    <MapPin size={22} weight="bold" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider text-[#94A3B8] uppercase">
                      LOCATION
                    </span>
                    <span className="font-mono text-sm md:text-base text-[#F3EFE6] font-medium">
                      {profileData.location}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  IST (UTC+5:30)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Card */}
          <div className="lg:col-span-6 rounded-3xl p-8 md:p-10 bg-[#0D1424]/90 backdrop-blur-xl border border-white/10 shadow-2xl">
            <h3 className="font-display text-2xl md:text-3xl text-[#F3EFE6] uppercase tracking-wide mb-2">
              SEND A TRANSMISSION
            </h3>
            <p className="text-xs text-[#94A3B8] font-mono mb-8">
              FILL IN DETAILS BELOW • DIRECT DISPATCH TO INBOX
            </p>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle size={54} weight="fill" className="text-emerald-400 animate-bounce" />
                <h4 className="font-display text-3xl text-[#F3EFE6]">MESSAGE RECEIVED</h4>
                <p className="text-sm text-[#94A3B8] font-sans max-w-sm">
                  Thank you! Your message has been routed to Rohit Sharma's inbox. Expect a response shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-mono tracking-wider uppercase text-[#94A3B8] mb-2"
                  >
                    YOUR NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#F3EFE6] placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#6FA8FF] focus:ring-1 focus:ring-[#6FA8FF] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-mono tracking-wider uppercase text-[#94A3B8] mb-2"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#F3EFE6] placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#6FA8FF] focus:ring-1 focus:ring-[#6FA8FF] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-mono tracking-wider uppercase text-[#94A3B8] mb-2"
                  >
                    MESSAGE / PROJECT INQUIRY
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your research goals or engineering requirements..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#F3EFE6] placeholder-white/30 text-sm font-sans focus:outline-none focus:border-[#6FA8FF] focus:ring-1 focus:ring-[#6FA8FF] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  data-cursor="interactive"
                  className="w-full py-4 rounded-xl text-xs font-mono font-bold tracking-widest uppercase bg-[#F3EFE6] text-[#070B16] hover:bg-[#F5B84B] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>DISPATCHING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <PaperPlaneTilt
                        size={16}
                        weight="bold"
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
