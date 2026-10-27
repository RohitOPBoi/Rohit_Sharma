import React, { useState } from 'react';
import { ProjectItem } from '../data/projects';
import { ArrowUpRight, GithubLogo, Globe } from '@phosphor-icons/react';

interface ProjectPanelProps {
  project: ProjectItem;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({
  project,
  isActive,
  onHover,
  onLeave,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      data-cursor="project"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group relative w-full border-b border-white/[0.08] transition-all duration-500 overflow-hidden cursor-pointer ${
        isActive || isExpanded
          ? 'bg-[#0D1424]/90 py-8 md:py-12'
          : 'bg-transparent py-6 md:py-8 hover:bg-[#0D1424]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Row Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-baseline gap-4 md:gap-8">
            {/* Project Index */}
            <span className="font-mono text-sm md:text-base text-[#6FA8FF] font-semibold tracking-wider">
              {project.index}
            </span>

            {/* Title */}
            <div>
              <span className="block text-xs font-mono tracking-widest text-[#94A3B8] uppercase mb-1">
                {project.eyebrow}
              </span>
              <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-[#F3EFE6] tracking-wide transition-colors group-hover:text-[#6FA8FF]">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Right Tags & Arrow */}
          <div className="flex items-center gap-4 md:gap-8 self-end md:self-center">
            <span className="text-xs font-mono text-[#94A3B8] hidden sm:inline-block">
              {project.year}
            </span>

            {/* Circular View Project Badge */}
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isActive || isExpanded
                  ? 'border-[#F5B84B] bg-[#F5B84B] text-[#070B16] scale-110 shadow-[0_0_20px_rgba(245,184,75,0.4)]'
                  : 'border-white/20 text-[#F3EFE6] group-hover:border-[#6FA8FF] group-hover:text-[#6FA8FF]'
              }`}
            >
              <ArrowUpRight
                size={22}
                weight="bold"
                className={`transition-transform duration-300 ${
                  isActive || isExpanded ? 'translate-x-0.5 -translate-y-0.5' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Expandable Preview Area */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-700 ease-out overflow-hidden ${
            isActive || isExpanded
              ? 'max-h-[850px] opacity-100 mt-8 pt-8 border-t border-white/[0.06]'
              : 'max-h-0 opacity-0 mt-0 pt-0'
          }`}
        >
          {/* Left: Description, Metrics & Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed mb-6 font-sans">
                {project.fullDescription}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/[0.08]">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-wider text-[#94A3B8] uppercase">
                      {m.label}
                    </span>
                    <span className="font-mono text-xs md:text-sm font-semibold text-[#F3EFE6] mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#6FA8FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="interactive"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider bg-[#2F5BFF] hover:bg-[#436CFF] text-white transition-all shadow-[0_0_15px_rgba(47,91,255,0.4)]"
              >
                <Globe size={16} />
                <span>DEMO / REPORT</span>
              </a>

              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                data-cursor="interactive"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono tracking-wider bg-white/[0.05] hover:bg-white/[0.1] text-[#F3EFE6] border border-white/10 transition-colors"
              >
                <GithubLogo size={16} />
                <span>REPOSITORY</span>
              </a>
            </div>
          </div>

          {/* Right: Graphic / Visual Architecture Preview */}
          <div className="lg:col-span-7 rounded-xl overflow-hidden border border-white/10 bg-[#070B16] relative shadow-2xl group/img">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover/img:scale-105"
              loading="lazy"
            />
            {/* Visual Glass Tag */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#070B16]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#F5B84B]">
              RESEARCH ARCHITECTURE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
