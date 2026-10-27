import React, { useEffect, useRef, useState } from 'react';

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktops)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element or avatar
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor="interactive"], input, textarea');
      const avatarHero = target.closest('[data-cursor="avatar"]');
      const projectPanel = target.closest('[data-cursor="project"]');

      if (avatarHero) {
        setIsHovered(true);
        setCursorText('LOOK ↔');
      } else if (projectPanel) {
        setIsHovered(true);
        setCursorText('EXPLORE');
      } else if (interactive) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationFrameId: number;
    const render = () => {
      // Eased trailing motion
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#6FA8FF] shadow-[0_0_10px_#2F5BFF] transition-transform duration-75"
      />

      {/* Outer fluid trailing ring with interactive state */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 -translate-x-1/2 -translate-y-1/2 ${
          cursorText
            ? 'w-20 h-20 -ml-10 -mt-10 bg-[#070B16]/85 border border-[#F5B84B]/60 shadow-[0_0_20px_rgba(245,184,75,0.25)]'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-[#2F5BFF]/20 border border-[#6FA8FF] shadow-[0_0_15px_rgba(47,91,255,0.4)] backdrop-blur-[2px]'
            : 'w-7 h-7 -ml-3.5 -mt-3.5 border border-white/40 bg-transparent'
        }`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono tracking-widest text-[#F5B84B] font-semibold select-none text-center"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
