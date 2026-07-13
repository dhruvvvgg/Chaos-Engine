import { ChaosMoment } from '../types';
import { DRIVER_MAP } from '../utils';
import TeamLogo from './TeamLogo';
import { Sliders, Flame, ArrowUpDown, CircleDot, Radio, ArrowUpRight } from 'lucide-react';

interface MomentsListProps {
  moments: ChaosMoment[];
  onSelectMoment: (moment: ChaosMoment) => void;
}

export default function MomentsList({ moments, onSelectMoment }: MomentsListProps) {
  
  const getMomentBadge = (type: string) => {
    switch (type) {
      case 'pit_outlier':
        return {
          label: 'PIT ANOMALY',
          color: 'text-[#FFB800] border-[#FFB800]/20 bg-[#FFB800]/10',
          icon: <CircleDot className="w-3.5 h-3.5 text-[#FFB800]" />,
          tyreColor: 'border-[#FFB800] text-[#FFB800]',
          tyreLabel: 'M'
        };
      case 'pace_spike':
        return {
          label: 'PACE SPIKE',
          color: 'text-[#FF1801] border-[#FF1801]/20 bg-[#FF1801]/10',
          icon: <Flame className="w-3.5 h-3.5 text-[#FF1801]" />,
          tyreColor: 'border-[#FF1801] text-[#FF1801]',
          tyreLabel: 'S'
        };
      case 'position_swing':
        return {
          label: 'TRACK GAIN',
          color: 'text-cyan-400 border-cyan-400/20 bg-cyan-400/10',
          icon: <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />,
          tyreColor: 'border-white text-white',
          tyreLabel: 'H'
        };
      default:
        return {
          label: 'DETECTED EVENT',
          color: 'text-zinc-400 border-white/10 bg-white/5',
          icon: <Sliders className="w-3.5 h-3.5 text-zinc-400" />,
          tyreColor: 'border-white/10 text-zinc-400',
          tyreLabel: '?'
        };
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* List Header */}
      <div className="flex items-center justify-between px-1 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-f1-red animate-pulse" />
          <span className="font-semibold text-xs tracking-wide text-zinc-400">
            Cognitive Strategy Alerts ({moments.length})
          </span>
        </div>
        <span className="hidden sm:inline text-[9px] font-semibold text-zinc-500 uppercase tracking-widest bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-[10px] border border-white/5">
          ⚡ Click card to trigger pit wall strategy simulation
        </span>
      </div>

      {/* Grid of Anomalies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {moments.map((moment, index) => {
          const badge = getMomentBadge(moment.type);
          const driverInfo = DRIVER_MAP[moment.driver] || { number: '00', team: 'Constructor Team', teamColor: '#e10600' };

          return (
            <div
              key={`${moment.driver}-${moment.lap}-${index}`}
              onClick={() => onSelectMoment(moment)}
              className="group relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-[20px] p-6 cursor-pointer hover:border-white/20 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg shadow-black/30 hover:shadow-[0_10px_30px_rgba(225,6,0,0.06)]"
              style={{
                borderLeft: `4px solid ${driverInfo.teamColor}`
              }}
            >
              {/* Top Row: Lap & Category Badge */}
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-white bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                    LAP {moment.lap}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                    {driverInfo.team.split(' ')[0]}
                  </span>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-semibold tracking-widest uppercase ${badge.color}`}>
                  {badge.icon}
                  <span>{badge.label}</span>
                </div>
              </div>

              {/* Middle Row: Driver Details & Tyre Icon */}
              <div className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <TeamLogo team={driverInfo.team} className="w-4 h-4 shrink-0" />
                      <span 
                        className="font-extrabold text-xs" 
                        style={{ color: driverInfo.teamColor }}
                      >
                        #{driverInfo.number}
                      </span>
                      <h3 className="font-black text-xl text-white group-hover:text-f1-red transition-colors uppercase tracking-tight">
                        {moment.driver}
                      </h3>
                    </div>
                    <p className="text-[9px] text-zinc-500 uppercase font-bold mt-0.5">
                      {driverInfo.team}
                    </p>
                  </div>
                </div>

                {/* Styled Tyre Compound Icon */}
                <div className={`w-8 h-8 rounded-full border-[3px] ${badge.tyreColor} flex items-center justify-center font-extrabold text-xs shrink-0 bg-black/40 shadow-inner`}>
                  {badge.tyreLabel}
                </div>
              </div>

              {/* Event Description */}
              <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2 bg-black/20 p-3 rounded-xl border border-white/5">
                {moment.description}
              </p>

              {/* Bottom Row: Magnitude Indicator */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-widest">
                  MAGNITUDE SCALE
                </span>
                <div className="flex items-center gap-2">
                  {/* Segmented signal bar */}
                  <div className="flex gap-0.5 h-2.5 items-end">
                    {[1, 2, 3, 4, 5].map((bar) => {
                      const active = (moment.magnitude / 2) >= bar;
                      return (
                        <div
                          key={bar}
                          className={`w-1 rounded-sm transition-all duration-300 ${
                            active
                              ? 'h-2.5'
                              : 'h-1 bg-zinc-800'
                          }`}
                          style={{
                            backgroundColor: active ? driverInfo.teamColor : undefined
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="font-extrabold text-white text-[11px] bg-black/40 px-2 py-0.5 rounded-md border border-white/5">
                    {moment.magnitude.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Floating trigger graphic on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
