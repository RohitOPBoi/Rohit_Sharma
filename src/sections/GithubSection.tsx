import React from 'react';
import { HairlineRule } from '../components/HairlineRule';
import { GithubStoryChart } from '../components/GithubStoryChart';
import contributionsData from '../data/github-contributions.json';
import { GitCommit, Fire, GitFork, ArrowUpRight } from '@phosphor-icons/react';

export const GithubSection: React.FC = () => {
  return (
    <section
      id="contributions"
      className="relative w-full py-24 md:py-36 bg-[#070B16] text-[#F3EFE6] select-none border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Hairline Rule */}
        <HairlineRule label="04 / SOURCE TELEMETRY & CHRONOLOGICAL CADENCE" theme="dark" className="mb-14" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#6FA8FF] uppercase font-semibold block mb-3">
              52-WEEK COMMIT CADENCE
            </span>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-none text-[#F3EFE6] uppercase tracking-tight font-extrabold">
              AUTONOMOUS <br />
              <span className="text-[#6FA8FF]">CONTRIBUTION MATRIX</span>
            </h2>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <GitCommit size={18} className="text-[#6FA8FF]" />
              <div>
                <span className="block text-[10px] text-[#94A3B8] uppercase">YEARLY TOTAL</span>
                <span className="text-sm font-bold text-[#F3EFE6]">
                  {contributionsData.totalContributions} COMMITS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <Fire size={18} className="text-[#F5B84B]" />
              <div>
                <span className="block text-[10px] text-[#94A3B8] uppercase">LONGEST STREAK</span>
                <span className="text-sm font-bold text-[#F5B84B]">
                  {contributionsData.longestStreak} DAYS
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <GitFork size={18} className="text-[#10B981]" />
              <div>
                <span className="block text-[10px] text-[#94A3B8] uppercase">PRIMARY PIPELINE</span>
                <span className="text-sm font-bold text-[#10B981]">
                  PYTORCH / PYTHON
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Chart Canvas Stage (Matching Recording 2026-10-27 170600.mp4) */}
        <GithubStoryChart />

        {/* Section Footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#94A3B8] gap-4">
          <span>GRAPHQL DATA COMPILED FROM GITHUB TELEMETRY</span>
          <a
            href="https://github.com/rohitvani07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6FA8FF] hover:text-[#F5B84B] transition-colors flex items-center gap-1.5"
          >
            <span>INSPECT REPOSITORIES ON GITHUB</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
