import { Race } from '../types';
import { TRACK_DETAILS } from '../utils';
import { Calendar, Compass } from 'lucide-react';

interface RaceSelectorProps {
  races: Race[];
  selectedRace: Race;
  onSelectRace: (race: Race) => void;
}

export default function RaceSelector({ races, selectedRace, onSelectRace }: RaceSelectorProps) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-f1-red animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-semibold text-xs tracking-wide text-zinc-400">
            Active Strategy Consoles
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[9px] text-zinc-500 font-semibold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-[10px] border border-white/5">
          <span className="w-2 h-2 rounded-full bg-[#00D25B] animate-pulse" />
          <span>{races.length} CIRCUITS AVAILABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {races.map((race) => {
          const isActive = race.id === selectedRace.id;
          const details = TRACK_DETAILS[race.id];
          const countryName = details ? details.country : 'GRAND PRIX';
          const dateStr = details ? details.dateStr : '2024 RACE';

          return (
            <button
              key={race.id}
              onClick={() => onSelectRace(race)}
              className={`group relative flex flex-col text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                   ? 'bg-black/60 backdrop-blur-md border-white/35 text-white shadow-lg shadow-black/40 scale-[1.01]'
                  : 'bg-black/30 backdrop-blur-md border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-black/50 shadow-sm shadow-black/20'
              }`}
            >
              {/* Active selection accent line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 ${
                isActive ? 'bg-[#FF1801] shadow-[0_0_8px_#FF1801]' : 'bg-transparent'
              }`} />

              {/* Subtle background decoration */}
              <div className={`absolute -right-4 -bottom-6 font-black text-6xl tracking-tighter uppercase transition-all duration-500 opacity-[0.03] group-hover:opacity-[0.06] ${
                isActive ? 'text-white' : 'text-zinc-500'
              }`}>
                {countryName.substring(0, 3)}
              </div>

              <div className="flex items-center justify-between gap-1 w-full mb-1.5">
                <span className={`font-semibold text-[9px] uppercase tracking-widest ${
                  isActive ? 'text-[#FF1801] font-bold' : 'text-zinc-500'
                }`}>
                  {countryName}
                </span>
                <div className="flex items-center gap-1 text-[9px] font-semibold opacity-60">
                  <Calendar className="w-2.5 h-2.5" />
                  <span>{dateStr.split(' ')[0]} {dateStr.split(' ')[1]}</span>
                </div>
              </div>

              <h4 className="font-black text-base tracking-tight truncate max-w-[90%] uppercase text-white">
                {race.name.replace(' Grand Prix', ' GP')}
              </h4>

              <span className={`text-[10px] mt-2.5 truncate block ${
                isActive ? 'text-zinc-300 font-bold' : 'text-zinc-500'
              }`}>
                {race.circuit.split(' Circuit')[0].split(' International')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
