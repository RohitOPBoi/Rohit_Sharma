import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
}

export const ParticleWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const particles: Particle[] = [];
    const numParticles = 42;

    // Distribute particles along the bottom contours of "WORK"
    for (let i = 0; i < numParticles; i++) {
      const spreadX = (width * 0.15) + Math.random() * (width * 0.7);
      const spreadY = (height * 0.5) + (Math.random() - 0.2) * (height * 0.35);
      const radius = 6 + Math.random() * 14;

      particles.push({
        x: spreadX,
        y: spreadY,
        originX: spreadX,
        originY: spreadY,
        vx: 0,
        vy: 0,
        radius,
        maxRadius: radius * 1.5,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Sunlit amber tone
      ctx.fillStyle = '#F5B84B';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Idle floating motion
        const floatY = Math.sin(time + i * 0.6) * 4;
        const floatX = Math.cos(time * 0.8 + i) * 3;

        // Interaction with mouse cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist && isHovering) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 3.5;
          p.vy -= Math.sin(angle) * force * 3.5;
        }

        // Spring force returning to origin
        const homeDx = (p.originX + floatX) - p.x;
        const homeDy = (p.originY + floatY) - p.y;
        p.vx += homeDx * 0.04;
        p.vy += homeDy * 0.04;

        // Friction damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Render circular droplet
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-48 md:h-72 flex items-center justify-center overflow-hidden select-none"
    >
      {/* SVG Filter for Gooey / Metaball effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="metaball-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Giant Background WORK typography */}
      <h2
        style={{ filter: 'url(#metaball-goo)' }}
        className="relative z-10 font-display text-[22vw] leading-none text-[#F5B84B] font-extrabold tracking-tighter text-center select-none"
      >
        WORK
      </h2>

      {/* Interactive Canvas Metaballs */}
      <canvas
        ref={canvasRef}
        style={{ filter: 'url(#metaball-goo)' }}
        className="absolute inset-0 z-20 pointer-events-auto"
      />

      {/* Monospace Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B84B] animate-ping" />
        <span>HOVER METABALLS • SCROLL FOR SELECTED RESEARCH</span>
      </div>
    </div>
  );
};
