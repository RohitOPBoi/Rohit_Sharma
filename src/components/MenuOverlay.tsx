import React from 'react';
import { X } from '@phosphor-icons/react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  const links = [
    { name: 'WORK', href: '#work', number: '01' },
    { name: 'ABOUT', href: '#about', number: '02' },
    { name: 'EXPERTISE', href: '#expertise', number: '03' },
    { name: 'RESEARCH', href: '#research', number: '04' },
    { name: 'CONTACT', href: '#contact', number: '05' },
  ];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#0C0C0C] text-[#F1E8E0] select-none flex flex-col justify-between p-8 md:p-16 transition-all duration-350 ease-out animate-curtain-down"
    >
      {/* Top Bar: Wordmark left, Close button right */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-script text-3xl font-bold tracking-wide text-[#F1E8E0]">
            rohit
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9B17C]" />
        </div>

        <button
          onClick={onClose}
          data-cursor="pointer"
          className="p-3 rounded-full border border-white/10 hover:border-[#C9B17C] text-[#F1E8E0] hover:text-[#C9B17C] transition-colors cursor-pointer"
          aria-label="Close Menu"
        >
          <X size={22} weight="bold" />
        </button>
      </div>

      {/* Center: 5 Stacked Bold Links */}
      <nav className="flex flex-col items-center justify-center space-y-4 md:space-y-6 my-auto">
        {links.map((link, idx) => (
          <a
            key={link.name}
            href={link.href}
            onClick={onClose}
            data-cursor="pointer"
            className="group flex items-baseline gap-4 text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-wider text-white/90 hover:text-[#C9B17C] transition-colors py-1"
            style={{
              animation: `fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.07}s both`,
            }}
          >
            <span className="text-xs md:text-sm font-mono text-[#9A9A9A] tracking-widest group-hover:text-[#C9B17C] transition-colors">
              {link.number}
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-2">
              {link.name}
            </span>
          </a>
        ))}
      </nav>

      {/* Bottom Bar: Status & Socials */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#9A9A9A] tracking-widest uppercase max-w-7xl mx-auto w-full border-t border-white/10 pt-6 gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>ROHIT SHARMA • PORTFOLIO 2026</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/rohitsharma-764866340"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F1E8E0] transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:rohitvani07@gmail.com"
            className="hover:text-[#F1E8E0] transition-colors"
          >
            EMAIL
          </a>
        </div>
      </div>

      <style>{`
        @keyframes curtainDown {
          from { clip-path: inset(0 0 100% 0); opacity: 0.8; }
          to { clip-path: inset(0 0 0 0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-curtain-down {
          animation: curtainDown 0.35s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
      `}</style>
    </div>
  );
};

