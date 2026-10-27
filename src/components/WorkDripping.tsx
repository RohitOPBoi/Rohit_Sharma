import React, { useEffect, useRef } from 'react';

interface Droplet {
  x: number;
  y: number;
  vy: number;
  radius: number;
  maxRadius: number;
  state: 'forming' | 'stretching' | 'falling' | 'splash';
  anchorY: number;
  splashRadius: number;
  splashOpacity: number;
}

export const WorkDripping: React.FC = () => {
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

    // Live droplet array (kept under 36 for 60fps)
    const droplets: Droplet[] = [];
    const maxDroplets = 32;

    // Anchor points for letters W, O, R, K
    const getLetterAnchors = () => {
      const centerY = height * 0.62;
      return [
        { x: width * 0.22, y: centerY },
        { x: width * 0.28, y: centerY },
        { x: width * 0.38, y: centerY },
        { x: width * 0.44, y: centerY },
        { x: width * 0.54, y: centerY },
        { x: width * 0.60, y: centerY },
        { x: width * 0.70, y: centerY },
        { x: width * 0.76, y: centerY },
      ];
    };

    let anchors = getLetterAnchors();

    const spawnDroplet = () => {
      if (droplets.length >= maxDroplets) return;
      const anchor = anchors[Math.floor(Math.random() * anchors.length)];
      const jitterX = (Math.random() - 0.5) * 24;

      droplets.push({
        x: anchor.x + jitterX,
        y: anchor.y,
        vy: 0.2 + Math.random() * 0.3,
        radius: 4 + Math.random() * 6,
        maxRadius: 10 + Math.random() * 8,
        state: 'forming',
        anchorY: anchor.y,
        splashRadius: 0,
        splashOpacity: 1,
      });
    };

    // Spawn interval
    const spawnTimer = setInterval(spawnDroplet, 220);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      anchors = getLetterAnchors();
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const gravity = 0.42;
    const floorY = height * 0.94;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Droplet amber accent
      ctx.fillStyle = '#F5B84B';

      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];

        if (d.state === 'forming') {
          d.radius += 0.12;
          d.y += 0.18;
          if (d.radius >= d.maxRadius * 0.8) {
            d.state = 'stretching';
          }
        } else if (d.state === 'stretching') {
          d.y += d.vy;
          d.vy += 0.15;
          // Surface tension stretches vertically
          if (d.y - d.anchorY > 22) {
            d.state = 'falling';
          }
        } else if (d.state === 'falling') {
          d.y += d.vy;
          d.vy += gravity;

          if (d.y >= floorY) {
            d.y = floorY;
            d.state = 'splash';
            d.splashRadius = d.radius;
          }
        } else if (d.state === 'splash') {
          d.splashRadius += 1.8;
          d.splashOpacity -= 0.08;
          if (d.splashOpacity <= 0) {
            droplets.splice(i, 1);
            continue;
          }
        }

        // Draw droplet
        if (d.state !== 'splash') {
          ctx.beginPath();
          if (d.state === 'stretching') {
            // Teardrop elongation
            const stretch = Math.min(2.5, 1 + d.vy * 0.1);
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.scale(1 / stretch, stretch);
            ctx.arc(0, 0, d.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Splash ripple
          ctx.save();
          ctx.strokeStyle = `rgba(245, 184, 75, ${d.splashOpacity})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(d.x, floorY, d.splashRadius, d.splashRadius * 0.35, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      clearInterval(spawnTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] md:h-[80vh] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* SVG Gooey Filter Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="dripping-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Giant Dripping WORK Text */}
      <div
        style={{ filter: 'url(#dripping-goo)' }}
        className="relative z-10 font-display text-[26vw] leading-none text-[#F5B84B] font-extrabold tracking-tighter text-center select-none"
      >
        WORK
      </div>

      {/* Physics Drops Canvas Layer */}
      <canvas
        ref={canvasRef}
        style={{ filter: 'url(#dripping-goo)' }}
        className="absolute inset-0 z-20 pointer-events-none"
      />

      {/* Monospace Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B84B] animate-ping" />
        <span>PANEL 01 / HORIZONTAL ARCHITECTURE DISPATCH</span>
      </div>
    </div>
  );
};
