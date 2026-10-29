import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const [cursorState, setCursorState] = useState<'normal' | 'pointer' | 'difference' | 'hidden'>('normal');
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on touch screens or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || isReduced) {
      setIsEnabled(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const diffEl = target.closest('[data-cursor="difference"]');
      const cardEl = target.closest('[data-cursor="card"]');
      const interactiveEl = target.closest('a, button, input, textarea, [role="button"], [data-cursor="pointer"]');

      if (diffEl) {
        setCursorState('difference');
      } else if (cardEl) {
        setCursorState('hidden');
      } else if (interactiveEl) {
        setCursorState('pointer');
      } else {
        setCursorState('normal');
      }
    };

    const handleMouseLeave = () => {
      setCursorState('hidden');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    const lerpFactor = 0.22;

    const render = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerpFactor;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerpFactor;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorDotRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-[width,height,background-color,border-color,opacity] duration-200 ease-out flex items-center justify-center ${
        cursorState === 'hidden'
          ? 'opacity-0'
          : cursorState === 'difference'
          ? 'w-16 h-16 bg-white mix-blend-difference opacity-100'
          : cursorState === 'pointer'
          ? 'w-8 h-8 bg-[#C9B17C]/25 border border-[#C9B17C] opacity-90'
          : 'w-3.5 h-3.5 bg-[#C9B17C] border border-[#0A0A0A]/40 opacity-80'
      }`}
      style={{ willChange: 'transform' }}
    >
      {cursorState === 'normal' && (
        <span className="w-1 h-1 rounded-full bg-[#0A0A0A]" />
      )}
    </div>
  );
};

