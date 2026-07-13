import { useState, useEffect } from 'react';
import { WhatIfResponse } from '../types';
import { DRIVER_MAP } from '../utils';
import { Volume2, VolumeX, RotateCcw, AlertTriangle, ShieldCheck, HelpCircle, Activity, Play, Signal } from 'lucide-react';

interface VerdictDisplayProps {
  verdict: WhatIfResponse;
  momentDriver: string;
  momentLap: number;
  chosenAction: string;
  onReset: () => void;
}

export default function VerdictDisplay({ verdict, momentDriver, momentLap, chosenAction, onReset }: VerdictDisplayProps) {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const driverInfo = DRIVER_MAP[momentDriver] || { number: '00', team: 'Constructor Team', teamColor: '#e10600' };

  const handleSpeech = () => {
    if (!window.speechSynthesis) {
      alert('Your browser does not support Speech Synthesis API.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `Strategy outcome for ${momentDriver} on Lap ${momentLap}: ${verdict.reasoning}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en-GB') || voice.lang.includes('en-US')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getVerdictTheme = (verdictStr: string) => {
    switch (verdictStr) {
      case 'better':
        return {
          label: 'OPTIMAL OUTCOME',
          bgColor: 'bg-[#00D25B]/5',
          borderColor: 'border-[#00D25B]/30',
          textColor: 'text-[#00D25B]',
          barColor: 'bg-[#00D25B]',
          icon: <ShieldCheck className="w-5 h-5 text-[#00D25B]" />
        };
      case 'worse':
        return {
          label: 'NEGATIVE OUTCOME',
          bgColor: 'bg-[#FF1801]/5',
          borderColor: 'border-[#FF1801]/30',
          textColor: 'text-[#FF1801]',
          barColor: 'bg-[#FF1801]',
          icon: <AlertTriangle className="w-5 h-5 text-[#FF1801]" />
        };
      case 'roughly equivalent':
      default:
        return {
          label: 'EQUIVALENT EFFICIENCY',
          bgColor: 'bg-[#FFB800]/5',
          borderColor: 'border-[#FFB800]/30',
          textColor: 'text-[#FFB800]',
          barColor: 'bg-[#FFB800]',
          icon: <HelpCircle className="w-5 h-5 text-[#FFB800]" />
        };
    }
  };

  const theme = getVerdictTheme(verdict.verdict);

  return (
    <div 
      className="relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 rounded-[20px] p-7 flex flex-col gap-6 shadow-lg shadow-black/30"
      style={{
        borderLeft: `4px solid ${driverInfo.teamColor}`
      }}
    >
      
      {/* Simulation Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-f1-red font-semibold tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-f1-red animate-pulse" />
                SIMULATION CONSOLE RESOLVED
              </span>
              <span className="text-[9px] text-zinc-500 uppercase font-semibold">
                COGNITIVE LAP {momentLap} ANALYSIS
              </span>
            </div>
            <h3 className="text-white font-black text-2xl md:text-3xl uppercase tracking-tight mt-1">
              WHAT-IF: {momentDriver} ➔ "{chosenAction}"
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2.5 px-4 py-2 rounded-[14px] border ${theme.bgColor} ${theme.borderColor} text-[10px] font-bold tracking-widest uppercase shadow-md`}>
            {theme.icon}
            <span className={theme.textColor}>{theme.label}</span>
          </div>
        </div>
      </div>

      {/* Bento Grid Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1: Track Exit Position Slider */}
        <div className="bg-black/30 border border-white/5 p-6 rounded-xl flex flex-col relative overflow-hidden">
          <span className="text-[10px] text-zinc-400 font-semibold tracking-wide block">
            Simulated Exit Position
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-black text-5xl md:text-6xl text-white tracking-tighter">
              P{verdict.predicted_track_position_on_exit}
            </span>
            <span className="text-xs text-zinc-500 font-medium">of 20 Cars</span>
          </div>

          {/* Visual Track Position Slider */}
          <div className="w-full mt-5 flex flex-col gap-1">
            <div className="w-full h-1.5 bg-zinc-950 rounded-full relative">
              <div 
                className="h-2.5 w-2.5 rounded-full absolute -top-[2px] transform -translate-x-1/2 animate-pulse shadow-[0_0_8px_#fff]"
                style={{ 
                  left: `${(verdict.predicted_track_position_on_exit / 20) * 100}%`,
                  backgroundColor: driverInfo.teamColor
                }}
              />
            </div>
            <div className="flex justify-between text-[8px] text-zinc-500 mt-1.5 uppercase font-bold">
              <span>P1 (LEADER)</span>
              <span>P20 (BACKMARKER)</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Estimated Interval Delta */}
        <div className="bg-black/30 border border-white/5 p-6 rounded-xl flex flex-col relative overflow-hidden">
          <span className="text-[10px] text-zinc-400 font-semibold tracking-wide block">
            Estimated Interval Gap
          </span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="font-black text-5xl md:text-6xl text-white tracking-tighter">
              +{verdict.estimated_gap_to_car_ahead_seconds.toFixed(2)}s
            </span>
            <span className="text-xs text-f1-red font-bold">GAP</span>
          </div>

          {/* Delta graphic bar */}
          <div className="w-full mt-5 flex flex-col gap-1">
            <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${Math.min(100, Math.max(15, (verdict.estimated_gap_to_car_ahead_seconds / 5) * 100))}%`,
                  backgroundColor: driverInfo.teamColor
                }}
              />
            </div>
            <div className="flex justify-between text-[8px] text-zinc-500 mt-1.5 uppercase font-bold">
              <span>0.0s (DRS WINDOW)</span>
              <span>5.0s+ (DRS LOST)</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Grounded Confidence Level */}
        <div className="bg-black/30 border border-white/5 p-6 rounded-xl flex flex-col relative overflow-hidden">
          <span className="text-[10px] text-zinc-400 font-semibold tracking-wide block">
            Grounded Confidence Range
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`font-black text-2xl uppercase tracking-tight ${
              verdict.confidence === 'high' ? 'text-[#00D25B]' : verdict.confidence === 'medium' ? 'text-[#FFB800]' : 'text-[#FF1801]'
            }`}>
              {verdict.confidence} RANGE
            </span>
          </div>

          {/* Custom Signal bars for confidence */}
          <div className="flex gap-1 items-end mt-5">
            {[1, 2, 3].map((bar) => {
              let active = false;
              if (verdict.confidence === 'high') active = true;
              else if (verdict.confidence === 'medium' && bar <= 2) active = true;
              else if (verdict.confidence === 'low' && bar <= 1) active = true;

              return (
                <div 
                  key={bar}
                  className={`w-6 rounded-sm transition-all duration-300 ${
                    active 
                      ? 'bg-white' 
                      : 'bg-zinc-800'
                  }`}
                  style={{ 
                    height: `${bar * 6}px`,
                    backgroundColor: active ? (verdict.confidence === 'high' ? '#00D25B' : verdict.confidence === 'medium' ? '#FFB800' : '#FF1801') : undefined
                  }}
                />
              );
            })}
            <span className="text-[9px] text-zinc-500 ml-2 uppercase font-bold leading-none">
              {verdict.confidence === 'high' ? '98% GROUNDED' : verdict.confidence === 'medium' ? '75% GROUNDED' : '40% GROUNDED'}
            </span>
          </div>
        </div>
      </div>

      {/* Narrative Analysis Card */}
      <div className="bg-black/30 border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-f1-red animate-pulse" />
            <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">
              PIT WALL STRATEGY DEBRIEF
            </span>
          </div>
          
          {/* Audio stream button */}
          <button
            onClick={handleSpeech}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer ${
              isSpeaking
                ? 'bg-[#FF1801]/10 border-[#FF1801] text-white shadow-[0_0_10px_rgba(255,24,1,0.2)]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-zinc-400'
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-f1-red animate-pulse" />
                <span>TERMINATE RADIO CHANNEL</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>OPEN VOICE TRANSMISSION</span>
              </>
            )}
          </button>
        </div>

        {/* Speech indicator line waves */}
        {isSpeaking && (
          <div className="flex items-center gap-1.5 my-1 py-1 px-2.5 rounded-lg bg-[#FF1801]/5 border border-[#FF1801]/10 w-fit">
            <span className="text-[9px] text-[#FF1801] mr-2 font-black uppercase tracking-widest">TRANSMITTING:</span>
            <div className="flex items-end gap-0.5 h-3.5">
              {[1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 2].map((h, i) => (
                <div 
                  key={i} 
                  className="w-[1.5px] bg-[#FF1801] rounded-full animate-pulse" 
                  style={{ 
                    height: `${h * 3}px`,
                    animationDuration: `${0.4 + (i % 3) * 0.2}s`
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        <div className="relative pl-4 border-l-2 border-[#FF1801] py-1">
          <p className="text-sm font-sans text-zinc-200 leading-relaxed italic font-medium">
            "{verdict.reasoning}"
          </p>
        </div>
      </div>

      {/* Simulation Reset footer */}
      <div className="border-t border-white/5 pt-4 flex justify-end">
        <button
          onClick={onReset}
          className="flex items-center gap-2 py-2.5 px-6 rounded-xl border border-white/10 bg-black/40 text-xs font-semibold text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:scale-[1.01] cursor-pointer shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>FLUSH SIMULATOR MATRIX</span>
        </button>
      </div>
    </div>
  );
}
