import React, { useRef, useEffect } from 'react';

interface ElasticStringProps {
  className?: string;
}

export const ElasticString: React.FC<ElasticStringProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const stateRef = useRef({
    width: 800,
    height: 40,
    cx: 400,
    cy: 20,
    targetY: 20,
    vy: 0,
    isHovering: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      stateRef.current.width = rect.width;
      stateRef.current.height = 40;
      stateRef.current.cx = rect.width / 2;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top - 20 &&
        e.clientY <= rect.bottom + 20
      ) {
        stateRef.current.isHovering = true;
        stateRef.current.cx = e.clientX - rect.left;
        // Bends toward pointer
        const relY = e.clientY - rect.top;
        stateRef.current.targetY = Math.max(0, Math.min(40, relY));
      } else if (stateRef.current.isHovering) {
        stateRef.current.isHovering = false;
        stateRef.current.targetY = 20; // Rest position
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId: number;
    const k = 0.12; // Spring constant
    const damping = 0.82; // Damping

    const loop = () => {
      const s = stateRef.current;

      if (s.isHovering) {
        s.cy += (s.targetY - s.cy) * 0.3;
      } else {
        // Damped harmonic oscillation back to center y = 20
        const force = -k * (s.cy - 20);
        s.vy = (s.vy + force) * damping;
        s.cy += s.vy;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute(
          'd',
          `M 0 20 Q ${s.cx} ${s.cy} ${s.width} 20`
        );
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-10 select-none ${className}`}>
      <svg className="w-full h-full overflow-visible">
        <path
          ref={pathRef}
          d="M 0 20 Q 400 20 800 20"
          stroke="#C9B17C"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

