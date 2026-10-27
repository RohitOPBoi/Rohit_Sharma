import React, { useState, useEffect, useCallback } from 'react';
import { projectsData, ProjectItem } from '../data/projects';
import { ArrowUpRight, X, ArrowLeft, ArrowRight, Globe, GithubLogo } from '@phosphor-icons/react';

export const ProjectCardHand: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Keyboard navigation: Left/Right arrows cycle, Enter opens, Escape closes
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === 'Escape') {
          setSelectedProject(null);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setHoveredIdx((prev) => (prev === null ? 0 : Math.min(projectsData.length - 1, prev + 1)));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setHoveredIdx((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (hoveredIdx !== null) {
          setSelectedProject(projectsData[hoveredIdx]);
        }
      }
    },
    [hoveredIdx, selectedProject]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const numCards = projectsData.length;

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center select-none px-4 py-12">
      {/* Eyebrow and instruction header */}
      <div className="text-center mb-8 md:mb-12">
        <span className="text-xs font-mono tracking-widest text-[#6FA8FF] uppercase font-semibold">
          PANEL 02 / SELECT A CARD TO INSPECT ARCHITECTURE
        </span>
        <h3 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F3EFE6] uppercase tracking-tight mt-1">
          PROJECTS AS A HAND OF CARDS
        </h3>
        <p className="text-xs font-mono text-[#94A3B8] mt-2">
          HOVER TO SPREAD • CLICK TO EXPAND • ARROW KEYS TO NAVIGATE
        </p>
      </div>

      {/* The Fanned Card Hand Container */}
      <div className="relative w-full max-w-4xl h-[440px] md:h-[500px] flex items-center justify-center">
        {projectsData.map((project, idx) => {
          // Arc geometry calculation
          const centerOffset = idx - (numCards - 1) / 2; // e.g. -1.5, -0.5, 0.5, 1.5
          const isHovered = hoveredIdx === idx;
          const isNeighborLeft = hoveredIdx !== null && idx < hoveredIdx;
          const isNeighborRight = hoveredIdx !== null && idx > hoveredIdx;

          // Compute transform state
          let rotateDeg = centerOffset * 7;
          let transX = centerOffset * 135;
          let transY = Math.abs(centerOffset) * 16;
          let zIndex = 10 + idx;

          if (isHovered) {
            rotateDeg = 0;
            transY -= 65;
            zIndex = 30;
          } else if (isNeighborLeft) {
            transX -= 45;
            rotateDeg -= 4;
          } else if (isNeighborRight) {
            transX += 45;
            rotateDeg += 4;
          }

          return (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                transform: `translate3d(${transX}px, ${transY}px, 0) rotate(${rotateDeg}deg) scale(${
                  isHovered ? 1.05 : 1
                })`,
                zIndex,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
              }}
              className="absolute w-[240px] sm:w-[270px] md:w-[300px] h-[350px] sm:h-[390px] md:h-[430px] rounded-2xl p-6 bg-[#0D1424] border border-white/10 hover:border-[#F5B84B] shadow-[0_20px_45px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col justify-between overflow-hidden group origin-bottom"
              role="button"
              tabIndex={0}
              aria-label={`Open project ${project.title}`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#6FA8FF] mb-3">
                  <span className="font-bold">{project.index}</span>
                  <span className="text-[#F5B84B] text-[11px]">{project.year}</span>
                </div>

                <span className="block text-[10px] font-mono tracking-wider text-[#94A3B8] uppercase">
                  {project.eyebrow}
                </span>

                <h4 className="font-display text-2xl sm:text-3xl text-[#F3EFE6] tracking-wide mt-1 leading-tight group-hover:text-[#6FA8FF] transition-colors">
                  {project.title}
                </h4>

                <p className="mt-3 text-xs text-[#94A3B8] font-sans leading-relaxed line-clamp-3">
                  {project.shortSummary}
                </p>
              </div>

              {/* Graphic Thumbnail & Tech Pills */}
              <div>
                <div className="w-full h-24 rounded-lg overflow-hidden bg-[#070B16] border border-white/5 mb-4 relative">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono tracking-wider text-[#F5B84B] font-semibold">
                    CLICK TO EXPAND
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#F5B84B] group-hover:text-[#070B16] text-[#F3EFE6] flex items-center justify-center transition-colors">
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Modal View (Rising from card hand) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#070B16]/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 bg-[#0D1424] border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] animate-in zoom-in-95 duration-400"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#F3EFE6] transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X size={20} weight="bold" />
            </button>

            {/* Header */}
            <div className="pr-12">
              <div className="flex items-center gap-3 text-xs font-mono text-[#6FA8FF] mb-2">
                <span className="font-bold">{selectedProject.index}</span>
                <span>•</span>
                <span className="uppercase">{selectedProject.eyebrow}</span>
                <span>•</span>
                <span className="text-[#F5B84B]">{selectedProject.year}</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-[#F3EFE6] tracking-wide leading-none">
                {selectedProject.title}
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 pt-8 border-t border-white/10">
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <h5 className="text-xs font-mono tracking-widest text-[#F5B84B] uppercase mb-2">
                    TECHNICAL BRIEF &amp; ARCHITECTURE
                  </h5>
                  <p className="text-sm sm:text-base text-[#F3EFE6]/90 font-sans leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>

                  {/* Quantitative Metrics */}
                  <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    {selectedProject.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-[10px] font-mono tracking-wider text-[#94A3B8] uppercase">
                          {m.label}
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#6FA8FF] mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded text-xs font-mono bg-white/[0.04] text-[#F3EFE6] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Action Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#2F5BFF] hover:bg-[#4570ff] text-white transition-colors shadow-lg flex items-center gap-2"
                  >
                    <Globe size={16} />
                    <span>VERIFIED REPORT</span>
                  </a>

                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-xs font-mono tracking-wider bg-white/5 hover:bg-white/10 text-[#F3EFE6] border border-white/10 transition-colors flex items-center gap-2"
                  >
                    <GithubLogo size={16} />
                    <span>SOURCE CODE</span>
                  </a>
                </div>
              </div>

              {/* Right Architecture Diagram */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#070B16] border border-white/10 p-2 shadow-2xl">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
