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

    const droplets: Droplet[] = [];
    const maxDroplets = 24;

    const getLetterAnchors = () => {
      const centerY = height * 0.62;
      return [
        { x: width * 0.23, y: centerY },
        { x: width * 0.31, y: centerY },
        { x: width * 0.42, y: centerY },
        { x: width * 0.48, y: centerY },
        { x: width * 0.58, y: centerY },
        { x: width * 0.65, y: centerY },
        { x: width * 0.74, y: centerY },
        { x: width * 0.81, y: centerY },
      ];
    };

    let anchors = getLetterAnchors();

    const spawnDroplet = () => {
      if (droplets.length >= maxDroplets) return;
      const anchor = anchors[Math.floor(Math.random() * anchors.length)];
      const jitterX = (Math.random() - 0.5) * 20;

      droplets.push({
        x: anchor.x + jitterX,
        y: anchor.y,
        vy: 0.2 + Math.random() * 0.3,
        radius: 4 + Math.random() * 5,
        maxRadius: 9 + Math.random() * 6,
        state: 'forming',
        anchorY: anchor.y,
        splashRadius: 0,
        splashOpacity: 1,
      });
    };

    const spawnTimer = setInterval(spawnDroplet, 260);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      anchors = getLetterAnchors();
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const gravity = 0.38;
    const floorY = height * 0.92;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gold token #C9B17C
      ctx.fillStyle = '#C9B17C';

      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];

        if (d.state === 'forming') {
          d.radius += 0.1;
          d.y += 0.15;
          if (d.radius >= d.maxRadius * 0.8) {
            d.state = 'stretching';
          }
        } else if (d.state === 'stretching') {
          d.y += d.vy;
          d.vy += 0.12;
          if (d.y - d.anchorY > 20) {
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
          d.splashRadius += 1.6;
          d.splashOpacity -= 0.08;
          if (d.splashOpacity <= 0) {
            droplets.splice(i, 1);
            continue;
          }
        }

        if (d.state !== 'splash') {
          ctx.beginPath();
          if (d.state === 'stretching') {
            const stretch = Math.min(2.2, 1 + d.vy * 0.1);
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
          ctx.save();
          ctx.strokeStyle = `rgba(201, 177, 124, ${d.splashOpacity})`;
          ctx.lineWidth = 1.5;
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
      className="relative w-full h-[55vh] sm:h-[65vh] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* SVG Gooey Filter Definition (Scene 8 Spec) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
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

      {/* Giant Gold WORK Text with dripping filter */}
      <div
        style={{ filter: 'url(#dripping-goo)' }}
        className="relative z-10 font-display text-[25vw] md:text-[23vw] leading-none text-[#C9B17C] font-extrabold tracking-tight text-center select-none"
      >
        WORK
      </div>

      {/* Physics Drops Canvas Layer */}
      <canvas
        ref={canvasRef}
        style={{ filter: 'url(#dripping-goo)' }}
        className="absolute inset-0 z-20 pointer-events-none"
      />
    </div>
  );
};
