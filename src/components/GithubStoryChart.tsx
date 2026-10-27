import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { ArrowCounterClockwise, ArrowRight } from '@phosphor-icons/react';
import rawData from '../data/github-contributions.json';

interface DayData {
  date: string;
  count: number;
  weekday: number;
}

interface WeekData {
  days: DayData[];
}

interface ContributionsPayload {
  username: string;
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  lastUpdated: string;
  weeks: WeekData[];
}

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// GitHub Contribution Palette
const getTierColor = (count: number): string => {
  if (count === 0) return '#EBEDF0';
  if (count <= 3) return '#9BE9A8';
  if (count <= 7) return '#40C463';
  if (count <= 11) return '#30A14E';
  return '#216E39';
};

export const GithubStoryChart: React.FC = () => {
  const data = rawData as ContributionsPayload;
  const [viewMode, setViewMode] = useState<'weeks' | 'year'>('weeks');
  const [pourProgress, setPourProgress] = useState<number>(1);
  const [clockAngle, setClockAngle] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    weekIdx: number;
    dayIdx: number;
    x: number;
    y: number;
  } | null>(null);

  const animFrameRef = useRef<number | null>(null);

  // Compute 52 weeks summaries
  const weeks = useMemo(() => {
    return data.weeks.slice(-52);
  }, [data.weeks]);

  // Find peak week
  const peakWeekInfo = useMemo(() => {
    let max = 0;
    let maxIdx = 0;
    let startDate = '';

    weeks.forEach((w, idx) => {
      const sum = w.days.reduce((acc, d) => acc + d.count, 0);
      if (sum > max) {
        max = sum;
        maxIdx = idx;
        startDate = w.days[0]?.date || '';
      }
    });

    // Format date: e.g. "from 10 Feb 2026"
    let formattedDate = startDate;
    try {
      const d = new Date(startDate);
      formattedDate = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      // fallback
    }

    return { max, maxIdx, formattedDate };
  }, [weeks]);

  // Compute weekly totals for sparkline
  const weeklyTotals = useMemo(() => {
    return weeks.map((w) => w.days.reduce((acc, d) => acc + d.count, 0));
  }, [weeks]);

  const maxWeeklyTotal = Math.max(...weeklyTotals, 1);

  // Start Pour Animation
  const startPourAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(true);
    setPourProgress(0);

    const startTime = performance.now();
    const duration = 2200; // 2.2s pour duration

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      setPourProgress(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Start Clock Hand Sweep Animation
  const startClockAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(true);
    setClockAngle(0);

    const startTime = performance.now();
    const duration = 2400; // 2.4s 360 degree sweep

    const step = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      // smooth ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setClockAngle(eased * 360);

      if (p < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Trigger on mount or mode change
  useEffect(() => {
    if (viewMode === 'weeks') {
      startPourAnimation();
    } else {
      startClockAnimation();
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [viewMode, startPourAnimation, startClockAnimation]);

  const handleReplay = () => {
    if (viewMode === 'weeks') {
      startPourAnimation();
    } else {
      startClockAnimation();
    }
  };

  // Geometry constants for Week View
  const svgWidth = 860;
  const svgHeight = 270;
  const marginX = 24;
  const availableWidth = svgWidth - marginX * 2;
  const colStep = availableWidth / 52;
  const squareSize = 11.5;
  const squareRadius = 2.5;
  const gridRowStep = 15;
  const gridTopY = 150;
  const sparklineTopY = 35;
  const sparklineBottomY = 120;

  // Generate sparkline polyline points
  const sparklinePoints = useMemo(() => {
    return weeklyTotals.map((tot, idx) => {
      const x = marginX + idx * colStep + squareSize / 2;
      const normalized = tot / maxWeeklyTotal;
      const y = sparklineBottomY - normalized * (sparklineBottomY - sparklineTopY);
      return { x, y, tot };
    });
  }, [weeklyTotals, maxWeeklyTotal, colStep]);

  const sparklinePathD = useMemo(() => {
    if (sparklinePoints.length === 0) return '';
    return sparklinePoints.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [sparklinePoints]);

  // Current formatted date for Round the year mode
  const currentFormattedDate = useMemo(() => {
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const rest = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
    return `${dayName}, ${rest}`;
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[28px] bg-[#FAF9F5] border border-black/[0.08] p-6 sm:p-10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.45)] text-[#18181B] relative transition-all duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8 border-b border-black/[0.06] pb-5">
        <div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#111827] tracking-tight font-normal italic md:not-italic select-none">
            {viewMode === 'weeks' ? 'Week by week' : 'Round the year'}
          </h3>
        </div>

        <div className="sm:text-right max-w-md">
          <p className="font-sans text-xs text-[#52525B] leading-relaxed">
            {viewMode === 'weeks' ? (
              <>
                Each week’s total as one line, then every week pours down into its seven days.
                My biggest week was <span className="font-semibold text-[#18181B]">{peakWeekInfo.max} contributions</span>, {peakWeekInfo.formattedDate}.
              </>
            ) : (
              <>
                The same calendar wrapped into a ring: a ring per weekday, a spoke per week,
                clock hand that sweeps the whole year.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full overflow-hidden flex items-center justify-center min-h-[300px]">
        {viewMode === 'weeks' ? (
          /* ==============================================================
             MODE 1: WEEK BY WEEK (Sparkline + Pouring Cascade Grid)
             ============================================================== */
          <div className="w-full relative">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none overflow-visible"
            >
              {/* Top Sparkline Curve */}
              <path
                d={sparklinePathD}
                fill="none"
                stroke="#18181B"
                strokeWidth="1.25"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="opacity-90"
              />

              {/* Peak Indicator Callout */}
              {peakWeekInfo.maxIdx >= 0 && sparklinePoints[peakWeekInfo.maxIdx] && (
                <g
                  transform={`translate(${sparklinePoints[peakWeekInfo.maxIdx].x}, ${
                    sparklinePoints[peakWeekInfo.maxIdx].y
                  })`}
                  className="pointer-events-none"
                >
                  <circle r="3.5" fill="#18181B" />
                  <circle r="6" fill="none" stroke="#18181B" strokeWidth="1" opacity="0.3" />
                  <g transform="translate(0, -14)">
                    <rect
                      x="-42"
                      y="-12"
                      width="84"
                      height="16"
                      rx="8"
                      fill="#18181B"
                      opacity="0.9"
                    />
                    <text
                      textAnchor="middle"
                      y="-1"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="monospace"
                      fontWeight="600"
                      letterSpacing="0.05em"
                    >
                      BEST WEEK: {peakWeekInfo.max}
                    </text>
                  </g>
                </g>
              )}

              {/* 52 Columns × 7 Rows of Pouring Contribution Squares */}
              {weeks.map((week, wIdx) => {
                const colX = marginX + wIdx * colStep;
                const sparklinePt = sparklinePoints[wIdx];
                const sparkY = sparklinePt ? sparklinePt.y : sparklineBottomY;

                // Cascade timing for this week: wave flows from week 0 to 51
                // Weeks start dropping in sequence with a stagger
                const weekDelayFraction = (wIdx / 52) * 0.72;
                const localProgress = Math.max(0, Math.min(1, (pourProgress - weekDelayFraction) / 0.22));
                // Smooth easing curve
                const easeDrop = 1 - Math.pow(1 - localProgress, 3);

                const isWeekHovered = hoveredCell && hoveredCell.weekIdx === wIdx;

                return (
                  <g key={`week-${wIdx}`}>
                    {/* Hover column background highlight */}
                    {isWeekHovered && (
                      <rect
                        x={colX - 2}
                        y={sparklineTopY - 10}
                        width={squareSize + 4}
                        height={gridTopY + 7 * gridRowStep - sparklineTopY + 14}
                        rx="4"
                        fill="#000000"
                        opacity="0.04"
                        className="pointer-events-none"
                      />
                    )}

                    {week.days.map((day, dIdx) => {
                      const targetGridY = gridTopY + dIdx * gridRowStep;
                      // Intra-day micro-stagger
                      const dayDelay = dIdx * 0.015;
                      const dayLocalProgress = Math.max(0, Math.min(1, (localProgress - dayDelay) / (1 - dayDelay)));
                      const currentEase = 1 - Math.pow(1 - dayLocalProgress, 3);
                      
                      // Interp from sparkline down to grid slot
                      const currentY = sparkY + (targetGridY - sparkY) * currentEase;
                      const cellColor = getTierColor(day.count);

                      const isHovered =
                        hoveredCell &&
                        hoveredCell.weekIdx === wIdx &&
                        hoveredCell.dayIdx === dIdx;

                      return (
                        <rect
                          key={`day-${wIdx}-${dIdx}`}
                          x={colX}
                          y={currentY}
                          width={squareSize}
                          height={squareSize}
                          rx={squareRadius}
                          fill={cellColor}
                          stroke={isHovered ? '#18181B' : 'transparent'}
                          strokeWidth={isHovered ? 1.5 : 0}
                          className="transition-[stroke] duration-150 cursor-pointer"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredCell({
                              date: day.date,
                              count: day.count,
                              weekIdx: wIdx,
                              dayIdx: dIdx,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                            });
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>

          </div>
        ) : (
          /* ==============================================================
             MODE 2: ROUND THE YEAR (Polar Rings + Sweeping Clock Hand)
             ============================================================== */
          <div className="w-full relative py-4 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* SVG Polar Dial */}
            <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] flex-shrink-0">
              <svg viewBox="0 0 400 400" className="w-full h-full select-none overflow-visible">
                <defs>
                  {/* Radial sweep glow filter */}
                  <filter id="handGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Center point is (200, 200) */}
                <g transform="translate(200, 200)">
                  {/* 12 Month Radial Labels */}
                  {MONTH_NAMES.map((mName, mIdx) => {
                    const angleRad = (mIdx / 12) * 2 * Math.PI - Math.PI / 2;
                    const r = 172;
                    const x = r * Math.cos(angleRad);
                    const y = r * Math.sin(angleRad);
                    return (
                      <text
                        key={`month-${mName}`}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[10px] font-mono fill-[#71717A] tracking-wider select-none font-medium"
                      >
                        {mName}
                      </text>
                    );
                  })}

                  {/* 7 Concentric Guide Rings for Weekdays */}
                  {[0, 1, 2, 3, 4, 5, 6].map((ringIdx) => {
                    const r = 74 + ringIdx * 11.5;
                    return (
                      <circle
                        key={`ring-guide-${ringIdx}`}
                        r={r}
                        fill="none"
                        stroke="#E4E4E7"
                        strokeWidth="1"
                        strokeDasharray="2 4"
                        opacity="0.75"
                      />
                    );
                  })}

                  {/* Polar Grid: 52 Spokes × 7 Days */}
                  {weeks.map((week, wIdx) => {
                    // Angle for week w (0 is at top, sweeping clockwise)
                    const theta = (wIdx / 52) * 2 * Math.PI - Math.PI / 2;
                    const deg = (wIdx / 52) * 360;
                    // Check if current clock hand has swept past this week
                    const isPassed = clockAngle >= deg;
                    const isNearHand = Math.abs(clockAngle - deg) < 15;

                    return (
                      <g key={`polar-week-${wIdx}`}>
                        {week.days.map((day, dIdx) => {
                          const r = 74 + dIdx * 11.5;
                          const x = r * Math.cos(theta);
                          const y = r * Math.sin(theta);
                          const baseColor = getTierColor(day.count);

                          return (
                            <circle
                              key={`pdot-${wIdx}-${dIdx}`}
                              cx={x}
                              cy={y}
                              r={isNearHand && day.count > 0 ? 3.4 : 2.4}
                              fill={baseColor}
                              opacity={isPassed ? 1 : 0.25}
                              className="transition-all duration-300 cursor-pointer"
                              onMouseEnter={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setHoveredCell({
                                  date: day.date,
                                  count: day.count,
                                  weekIdx: wIdx,
                                  dayIdx: dIdx,
                                  x: rect.left + rect.width / 2,
                                  y: rect.top,
                                });
                              }}
                              onMouseLeave={() => setHoveredCell(null)}
                            />
                          );
                        })}
                      </g>
                    );
                  })}

                  {/* Sweeping Clock Hand Needle */}
                  <g transform={`rotate(${clockAngle})`}>
                    <line
                      x1="0"
                      y1="-55"
                      x2="0"
                      y2="-160"
                      stroke="#18181B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="-160" r="2.5" fill="#18181B" />
                  </g>

                  {/* Center Metric Display: STREAK (Matching f_110.jpg) */}
                  <g className="select-none pointer-events-none" transform="translate(0, 0)">
                    <text
                      textAnchor="middle"
                      y="6"
                      className="font-serif text-4xl sm:text-5xl fill-[#18181B] font-normal"
                    >
                      {data.longestStreak}d
                    </text>
                    <text
                      textAnchor="middle"
                      y="26"
                      className="font-mono text-[9px] fill-[#71717A] tracking-widest font-semibold uppercase"
                    >
                      STREAK
                    </text>
                  </g>
                </g>
              </svg>
            </div>

            {/* Right Metric Display: Active / Current Year Count (Matching f_110.jpg) */}
            <div className="flex flex-col items-center md:items-start select-none">
              <div className="font-serif text-6xl sm:text-7xl md:text-8xl text-[#18181B] leading-none tracking-tight font-normal">
                {data.totalContributions}
              </div>
              <div className="font-mono text-[11px] text-[#71717A] tracking-widest uppercase mt-2 font-medium">
                NOW: {currentFormattedDate}
              </div>
            </div>
          </div>
        )}

        {/* Universal Hover Tooltip */}
        {hoveredCell && (
          <div
            className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-[#18181B] text-white px-3 py-1.5 rounded-lg text-[11px] font-mono shadow-xl border border-white/10"
            style={{ left: hoveredCell.x, top: hoveredCell.y }}
          >
            <div className="font-semibold text-[#9BE9A8]">
              {hoveredCell.count} contribution{hoveredCell.count === 1 ? '' : 's'}
            </div>
            <div className="text-neutral-400 text-[10px]">
              {hoveredCell.date}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Controls */}
      <div className="mt-8 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
        {/* Mode Switcher Button */}
        <div>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'weeks' ? 'year' : 'weeks')}
            className="group flex items-center gap-1.5 text-xs font-mono text-[#52525B] hover:text-[#18181B] transition-colors py-1.5 px-3 rounded-full hover:bg-black/[0.04]"
          >
            <span>
              {viewMode === 'weeks' ? 'Or wrap into rings' : 'Or stretch week by week'}
            </span>
            <ArrowRight
              size={13}
              className="transform group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Replay Pill Button (Matching Recording's REPLAY button) */}
        <div>
          <button
            type="button"
            onClick={handleReplay}
            className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider text-[#18181B] bg-white border border-black/10 hover:border-black/25 hover:bg-neutral-50 px-3.5 py-1.5 rounded-full shadow-xs active:scale-95 transition-all"
          >
            <ArrowCounterClockwise
              size={13}
              className={isAnimating ? 'animate-spin' : ''}
            />
            <span>REPLAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
