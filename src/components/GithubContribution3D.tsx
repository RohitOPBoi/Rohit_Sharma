import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import contributionsData from '../data/github-contributions.json';

interface DayData {
  date: string;
  count: number;
  weekday: number;
  weekIndex: number;
}

export const GithubContribution3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    date: string;
    count: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    date: '',
    count: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Flatten 52 weeks x 7 days into 364 items
    const allDays: DayData[] = [];
    contributionsData.weeks.forEach((w, wIdx) => {
      w.days.forEach((d) => {
        allDays.push({
          date: d.date,
          count: d.count,
          weekday: d.weekday,
          weekIndex: wIdx,
        });
      });
    });

    const totalDays = Math.min(allDays.length, 364);

    // 2. Scene, Camera, Renderer
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b16, 0.012);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    const baseRadius = 45;
    let angleAzimuth = 0.85;
    let anglePolar = 1.05;

    const updateCameraPos = () => {
      camera.position.x = baseRadius * Math.sin(anglePolar) * Math.sin(angleAzimuth);
      camera.position.y = baseRadius * Math.cos(anglePolar);
      camera.position.z = baseRadius * Math.sin(anglePolar) * Math.cos(angleAzimuth);
      camera.lookAt(0, 0, 0);
    };
    updateCameraPos();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x6fa8ff, 1.8);
    dirLight.position.set(30, 45, 20);
    scene.add(dirLight);

    const amberLight = new THREE.PointLight(0xf5b84b, 1.2, 50);
    amberLight.position.set(-15, 20, -15);
    scene.add(amberLight);

    // 4. InstancedMesh Geometry & Palette Mapping
    const boxGeo = new THREE.BoxGeometry(0.72, 1, 0.72);
    // Shift geometry origin so scaling Y grows upward from the floor
    boxGeo.translate(0, 0.5, 0);

    const material = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.15,
    });

    const instancedMesh = new THREE.InstancedMesh(boxGeo, material, totalDays);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(instancedMesh);

    // Colors mapping: navy -> hoodie blue -> amber peak
    const colorZero = new THREE.Color('#0D152A');
    const colorLow = new THREE.Color('#1B356D');
    const colorMed = new THREE.Color('#2F5BFF');
    const colorHigh = new THREE.Color('#6FA8FF');
    const colorPeak = new THREE.Color('#F5B84B');

    const dummy = new THREE.Object3D();
    const targetHeights: number[] = [];
    const currentHeights = new Float32Array(totalDays);
    const delays = new Float32Array(totalDays);

    for (let i = 0; i < totalDays; i++) {
      const d = allDays[i];
      const posX = (d.weekIndex - 25.5) * 0.95;
      const posZ = (d.weekday - 3) * 0.95;

      const targetH = d.count === 0 ? 0.35 : Math.min(8.5, 0.7 + d.count * 0.85);
      targetHeights.push(targetH);

      // Staggered entrance wave delay
      delays[i] = (d.weekIndex * 0.02 + d.weekday * 0.05);

      // Pick color
      let c = colorZero;
      if (d.count > 10) c = colorPeak;
      else if (d.count >= 6) c = colorHigh;
      else if (d.count >= 3) c = colorMed;
      else if (d.count >= 1) c = colorLow;

      instancedMesh.setColorAt(i, c);

      dummy.position.set(posX, 0, posZ);
      dummy.scale.set(1, 0.01, 1);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
    instancedMesh.instanceMatrix.needsUpdate = true;

    // 5. Entrance Animation & Idle Camera Drift
    let animId: number;
    let startTime = performance.now();
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // Staggered wave expansion
      let needsMatrixUpdate = false;
      for (let i = 0; i < totalDays; i++) {
        if (elapsed > delays[i]) {
          const progress = Math.min(1, (elapsed - delays[i]) * 2.2);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentH = targetHeights[i] * eased;

          if (Math.abs(currentHeights[i] - currentH) > 0.01) {
            currentHeights[i] = currentH;
            const d = allDays[i];
            dummy.position.set((d.weekIndex - 25.5) * 0.95, 0, (d.weekday - 3) * 0.95);
            dummy.scale.set(1, currentH, 1);
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(i, dummy.matrix);
            needsMatrixUpdate = true;
          }
        }
      }

      if (needsMatrixUpdate) {
        instancedMesh.instanceMatrix.needsUpdate = true;
      }

      // Gentle idle drift when not dragging
      if (!isDragging) {
        angleAzimuth += 0.0008;
        updateCameraPos();
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 6. Interactive Raycasting Tooltip & Drag to Orbit (No scroll hijack)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        angleAzimuth -= dx * 0.006;
        anglePolar = Math.max(0.65, Math.min(1.35, anglePolar - dy * 0.006));
        updateCameraPos();
      }

      mouse.x = (clientX / width) * 2 - 1;
      mouse.y = -(clientY / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(instancedMesh);

      if (hits.length > 0 && hits[0].instanceId !== undefined) {
        const id = hits[0].instanceId;
        const day = allDays[id];
        if (day) {
          setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY - 40,
            date: day.date,
            count: day.count,
          });
          return;
        }
      }

      setTooltip((prev) => (prev.visible ? { ...prev, visible: false } : prev));
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handlePointerLeave = () => {
      isDragging = false;
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('mouseleave', handlePointerLeave);

    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      boxGeo.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] rounded-3xl bg-[#0D1424]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltip.x + 12}px`,
            top: `${tooltip.y - 12}px`,
            pointerEvents: 'none',
            zIndex: 100,
          }}
          className="px-3 py-1.5 rounded-lg bg-[#070B16]/95 border border-[#6FA8FF]/40 shadow-xl backdrop-blur-md"
        >
          <span className="block text-[10px] font-mono tracking-wider text-[#94A3B8]">
            {tooltip.date}
          </span>
          <span className="font-mono text-xs font-bold text-[#F5B84B]">
            {tooltip.count} {tooltip.count === 1 ? 'commit' : 'commits'}
          </span>
        </div>
      )}

      {/* 3D Stage Legend & Orbit Hint Overlay */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-[#94A3B8] text-[11px]">DENSITY:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#0D152A] border border-white/10" />
            <span className="text-[10px] text-[#94A3B8]">0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#1B356D]" />
            <span className="text-[10px] text-[#94A3B8]">1-3</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#2F5BFF]" />
            <span className="text-[10px] text-[#94A3B8]">4-7</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#6FA8FF]" />
            <span className="text-[10px] text-[#94A3B8]">8-10</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#F5B84B]" />
            <span className="text-[10px] text-[#F5B84B]">11+</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6FA8FF] animate-pulse" />
          <span>DRAG TO ORBIT • HOVER BARS FOR COMMITS</span>
        </div>
      </div>
    </div>
  );
};
