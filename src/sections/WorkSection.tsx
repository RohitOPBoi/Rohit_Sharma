import React, { useState } from 'react';
import { ParticleWork } from '../components/ParticleWork';
import { ProjectPanel } from '../components/ProjectPanel';
import { HairlineRule } from '../components/HairlineRule';
import { projectsData } from '../data/projects';

export const WorkSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(projectsData[0].id);

  return (
    <section
      id="work"
      className="relative w-full py-20 md:py-32 bg-[#070B16] text-[#F3EFE6] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        {/* Hairline Rule */}
        <HairlineRule label="03 / SELECTED WORK" theme="dark" className="mb-8" />
      </div>

      {/* Giant "WORK" Word with Cursor-Reactive Gooey Metaball Particles */}
      <ParticleWork />

      {/* Full-Bleed Expandable Project Panels */}
      <div className="w-full mt-8 border-t border-white/[0.08]">
        {projectsData.map((project) => (
          <ProjectPanel
            key={project.id}
            project={project}
            isActive={activeProjectId === project.id}
            onHover={() => setActiveProjectId(project.id)}
            onLeave={() => {}}
          />
        ))}
      </div>

      {/* Bottom Note */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#94A3B8]">
        <span>MORE REPOSITORIES &amp; RESEARCH BENCHMARKS ON GITHUB</span>
        <a
          href="https://github.com/[PLACEHOLDER]"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="interactive"
          className="mt-2 sm:mt-0 text-[#F5B84B] hover:underline flex items-center gap-1.5"
        >
          <span>VIEW GITHUB REPOSITORIES</span>
          <span>↗</span>
        </a>
      </div>
    </section>
  );
};
