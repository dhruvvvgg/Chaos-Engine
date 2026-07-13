import { useState } from 'react';
import { ChaosMoment } from '../types';
import { STRATEGY_OPTIONS } from '../data';
import { DRIVER_MAP } from '../utils';
import TeamLogo from './TeamLogo';
import { X, Play, Cpu, AlertCircle, Radio, Shield, Settings2 } from 'lucide-react';

interface WhatIfModalProps {
  moment: ChaosMoment;
  onClose: () => void;
  onRunSimulation: (selectedAction: string) => void;
  simulating: boolean;
}

export default function WhatIfModal({ moment, onClose, onRunSimulation, simulating }: WhatIfModalProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Get options depending on the event type
  const options = STRATEGY_OPTIONS[moment.type] || [];
  const driverInfo = DRIVER_MAP[moment.driver] || { number: '00', team: 'Constructor Team', teamColor: '#e10600' };

  const handleSimulate = () => {
    if (!selectedOption) return;
    onRunSimulation(selectedOption);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div 
        className="relative w-full max-w-lg overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 rounded-[20px] p-7 flex flex-col gap-6 shadow-[0_10px_50px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderTop: `4px solid ${driverInfo.teamColor}`
        }}
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-f1-red animate-pulse" />
                STRATEGY ROOM COGNITIVE INCEPT
              </span>
            </div>
            <h3 className="font-black text-2xl text-white tracking-tight uppercase">
              What-If Strategy Directive
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={simulating}
            className="p-1.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Driver context box with specific team color */}
        <div 
          className="bg-black/30 border border-white/5 rounded-xl p-5 flex items-center justify-between text-xs gap-4 relative overflow-hidden"
          style={{
            borderLeft: `4px solid ${driverInfo.teamColor}`
          }}
        >
          {/* Faint driver background number */}
          <div className="absolute right-2 -bottom-2 font-black text-5xl opacity-5 select-none" style={{ color: driverInfo.teamColor }}>
            #{driverInfo.number}
          </div>

          <div className="flex items-center gap-3 flex-1">
            <TeamLogo team={driverInfo.team} className="w-8 h-8 shrink-0 bg-black/40 p-1.5 rounded-lg border border-white/10" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-extrabold">DRIVER CONTEXT</span>
                <span className="px-1.5 py-0.2 bg-white/5 rounded text-[8px] border border-white/5 text-white uppercase font-extrabold">
                  LAP {moment.lap}
                </span>
              </div>
              <span className="text-white font-extrabold text-sm uppercase leading-none mt-0.5">
                {moment.driver} <span className="text-zinc-500 text-xs font-normal">#{driverInfo.number}</span>
              </span>
              <span className="text-[9px] text-zinc-500 uppercase font-semibold tracking-wide">{driverInfo.team}</span>
            </div>
          </div>

          <div className="text-right flex flex-col gap-1 shrink-0">
            <span className="text-[9px] text-zinc-500 font-extrabold uppercase">ANOMALY INDEX</span>
            <span className="text-white font-semibold text-xs tracking-tight bg-white/5 px-2.5 py-1 rounded border border-white/5 leading-tight line-clamp-1 uppercase">
              {moment.type.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Selectable Strategy Options */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] text-zinc-400 font-semibold tracking-wide flex items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-f1-red animate-spin" style={{ animationDuration: '4s' }} />
            Select Target Strategy Override:
          </span>
          <div className="flex flex-col gap-2.5">
            {options.map((option) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  disabled={simulating}
                  className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? 'bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.03)]'
                      : 'bg-black/30 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                  }`}
                  style={{
                    borderColor: isSelected ? driverInfo.teamColor : undefined
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-1.5 h-6 rounded-full" 
                      style={{ 
                        backgroundColor: isSelected ? driverInfo.teamColor : '#232328' 
                      }} 
                    />
                    <span className="text-xs font-bold tracking-wide uppercase">{option}</span>
                  </div>
                  
                  <div 
                    className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isSelected ? driverInfo.teamColor : 'var(--color-white)',
                      backgroundColor: isSelected ? driverInfo.teamColor : 'transparent'
                    }}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Execute button */}
        <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
          <button
            onClick={handleSimulate}
            disabled={!selectedOption || simulating}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-black text-xs tracking-widest text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed uppercase shadow-lg cursor-pointer"
            style={{
              backgroundColor: selectedOption ? driverInfo.teamColor : '#232328',
              boxShadow: selectedOption ? `0 4px 20px ${driverInfo.teamColor}33` : undefined
            }}
          >
            {simulating ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-white" />
                <span>DECRYPTING TELEMETRY STREAM...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white text-white" />
                <span>INITIATE VIRTUAL OVERRIDE</span>
              </>
            )}
          </button>
          
          <div className="flex items-center gap-1.5 justify-center text-[9px] text-zinc-500 font-semibold uppercase">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Interactive telemetry generated via Gemini 3.5 Flash predictive models</span>
          </div>
        </div>
      </div>
    </div>
  );
}
