import React, { useState, useEffect } from 'react';
import { Race } from '../types';
import { TRACK_DETAILS, RACE_TELEMETRY } from '../utils';
import TeamLogo from './TeamLogo';
import { 
  Gauge, AlertTriangle, RefreshCw, Wind, Droplets, Thermometer, Compass, 
  ShieldAlert, Zap, Layers, Activity, Radio, Flag, Award, ChevronRight 
} from 'lucide-react';

interface LeaderboardDriver {
  position: number;
  driver: string;
  team: string;
  gap: string;
  tyre: 'S' | 'M' | 'H';
}

interface CustomRaceStats {
  laps: string;
  length: string;
  pole: string;
  winner: string;
  fastestLap: string;
  fastestLapTime: string;
  fastestLapDriver: string;
  fastestLapTeam: string;
  driverOfTheDay: string;
  driverOfTheDayTeam: string;
  driverOfTheDayDesc: string;
  leaderboard: LeaderboardDriver[];
}

const CUSTOM_RACE_STATS: Record<string, CustomRaceStats> = {
  'qatar-2023': {
    laps: '57',
    length: '5.419 km',
    pole: 'Max Verstappen (1:23.778)',
    winner: 'Max Verstappen (Red Bull Racing)',
    fastestLap: 'Max Verstappen, on his way to a "Grand Chelem"',
    fastestLapTime: '1:24.319',
    fastestLapDriver: 'VERSTAPPEN',
    fastestLapTeam: 'Red Bull Racing',
    driverOfTheDay: 'OSCAR PIASTRI',
    driverOfTheDayTeam: 'McLaren',
    driverOfTheDayDesc: 'Drove from P6 to P2 on a grueling, physically punishing track layout.',
    leaderboard: [
      { position: 1, driver: 'VER', team: 'Red Bull Racing', gap: 'Leader', tyre: 'M' },
      { position: 2, driver: 'PIA', team: 'McLaren', gap: '+4.833s', tyre: 'M' },
      { position: 3, driver: 'HAM', team: 'Mercedes-AMG PETRONAS', gap: '+26.245s', tyre: 'S' },
      { position: 4, driver: 'RUS', team: 'Mercedes-AMG PETRONAS', gap: '+34.112s', tyre: 'S' },
      { position: 5, driver: 'SAI', team: 'Scuderia Ferrari', gap: '+41.002s', tyre: 'M' }
    ]
  },
  'singapore-2023': {
    laps: '62',
    length: '4.928 km',
    pole: 'Carlos Sainz (1:30.984)',
    winner: "Carlos Sainz (Ferrari), ending Red Bull's 15-race win streak",
    fastestLap: 'Lewis Hamilton (1:35.867, lap 47)',
    fastestLapTime: '1:35.867',
    fastestLapDriver: 'HAMILTON',
    fastestLapTeam: 'Mercedes-AMG PETRONAS',
    driverOfTheDay: 'CARLOS SAINZ',
    driverOfTheDayTeam: 'Scuderia Ferrari',
    driverOfTheDayDesc: 'Executed a flawless "DRS train" tactical masterclass to defend the lead.',
    leaderboard: [
      { position: 1, driver: 'SAI', team: 'Scuderia Ferrari', gap: 'Leader', tyre: 'H' },
      { position: 2, driver: 'NOR', team: 'McLaren', gap: '+0.812s', tyre: 'M' },
      { position: 3, driver: 'HAM', team: 'Mercedes-AMG PETRONAS', gap: '+1.269s', tyre: 'S' },
      { position: 4, driver: 'LEC', team: 'Scuderia Ferrari', gap: '+21.177s', tyre: 'M' },
      { position: 5, driver: 'VER', team: 'Red Bull Racing', gap: '+21.441s', tyre: 'M' }
    ]
  },
  'british-2024': {
    laps: '52',
    length: '5.891 km',
    pole: 'George Russell (1:25.819)',
    winner: 'Lewis Hamilton (his 9th British GP win, ending a 945-day win drought)',
    fastestLap: 'Carlos Sainz (1:28.293, lap 52)',
    fastestLapTime: '1:28.293',
    fastestLapDriver: 'SAINZ',
    fastestLapTeam: 'Scuderia Ferrari',
    driverOfTheDay: 'LEWIS HAMILTON',
    driverOfTheDayTeam: 'Mercedes-AMG PETRONAS',
    driverOfTheDayDesc: 'Won his home race in mixed weather conditions to break an emotional drought.',
    leaderboard: [
      { position: 1, driver: 'HAM', team: 'Mercedes-AMG PETRONAS', gap: 'Leader', tyre: 'S' },
      { position: 2, driver: 'VER', team: 'Red Bull Racing', gap: '+1.465s', tyre: 'H' },
      { position: 3, driver: 'NOR', team: 'McLaren', gap: '+7.547s', tyre: 'M' },
      { position: 4, driver: 'PIA', team: 'McLaren', gap: '+12.410s', tyre: 'M' },
      { position: 5, driver: 'SAI', team: 'Scuderia Ferrari', gap: '+47.318s', tyre: 'H' }
    ]
  },
  'hungarian-2024': {
    laps: '70',
    length: '4.381 km',
    pole: 'Lando Norris (McLaren front-row lockout)',
    winner: 'Oscar Piastri (his maiden F1 win, via a controversial team-order swap with Norris)',
    fastestLap: 'George Russell (1:20.305, lap 35)',
    fastestLapTime: '1:20.305',
    fastestLapDriver: 'RUSSELL',
    fastestLapTeam: 'Mercedes-AMG PETRONAS',
    driverOfTheDay: 'OSCAR PIASTRI',
    driverOfTheDayTeam: 'McLaren',
    driverOfTheDayDesc: 'Clinched his maiden Formula 1 victory after a high-tension McLaren team swap.',
    leaderboard: [
      { position: 1, driver: 'PIA', team: 'McLaren', gap: 'Leader', tyre: 'H' },
      { position: 2, driver: 'NOR', team: 'McLaren', gap: '+2.141s', tyre: 'H' },
      { position: 3, driver: 'HAM', team: 'Mercedes-AMG PETRONAS', gap: '+14.885s', tyre: 'M' },
      { position: 4, driver: 'LEC', team: 'Scuderia Ferrari', gap: '+19.686s', tyre: 'M' },
      { position: 5, driver: 'VER', team: 'Red Bull Racing', gap: '+21.349s', tyre: 'H' }
    ]
  }
};

interface ChaosScoreCardProps {
  race: Race;
}

export default function ChaosScoreCard({ race }: ChaosScoreCardProps) {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchExplanation() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/chaos-explanation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: race.id,
            name: race.name,
            circuit: race.circuit,
            chaosScore: race.chaosScore,
            context: race.context,
            moments: race.moments
          })
        });

        if (!res.ok) {
          throw new Error('Failed to generate chaos telemetry summary.');
        }

        const data = await res.json();
        if (active) {
          setExplanation(data.explanation || 'No telemetry explanation generated.');
        }
      } catch (err: any) {
        console.error('Error fetching explanation:', err);
        if (active) {
          setError(err.message || 'Failed to fetch AI telemetry analysis.');
          setExplanation(`This race experienced high strategy variance with a Chaos Score of ${race.chaosScore}%, highlighted by crucial events on Lap ${race.moments[0]?.lap} for ${race.moments[0]?.driver}.`);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchExplanation();

    return () => {
      active = false;
    };
  }, [race]);

  const details = TRACK_DETAILS[race.id];
  const stats = CUSTOM_RACE_STATS[race.id] || CUSTOM_RACE_STATS['qatar-2023'];
  const telemetryPoints = RACE_TELEMETRY[race.id] || [];

  // Steering wheel shift lights config (15 segments)
  const numLEDs = 15;
  const activeLEDs = Math.round((race.chaosScore / 100) * numLEDs);

  // Dynamic stability active color linked to the stability outlook
  const activeColor = race.chaosScore >= 90 
    ? '#FF1801' 
    : race.chaosScore >= 80 
      ? '#FFB800' 
      : '#00D25B';

  // SVG Telemetry Graph Geometry
  const svgWidth = 500;
  const svgHeight = 140;
  const paddingX = 40;
  const paddingY = 20;

  const points = telemetryPoints.map((pt) => {
    const x = paddingX + (pt.lap / (details?.laps || 70)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (pt.score / 100) * (svgHeight - paddingY * 2);
    return { ...pt, x, y };
  });

  const pointsPath = points.map(p => `${p.x},${p.y}`).join(' L ');
  const areaPath = points.length > 0 
    ? `M ${points[0].x},${svgHeight - paddingY} L ${pointsPath} L ${points[points.length - 1].x},${svgHeight - paddingY} Z`
    : '';

  // Determine dynamic track status based on chaos score
  const getDynamicTrackStatus = () => {
    if (race.chaosScore >= 90) {
      return {
        type: 'RED',
        bannerClass: 'bg-[#FF1801] text-white',
        text: 'RED FLAG',
        sub: 'Session Suspended',
        icon: <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20"><AlertTriangle className="w-4 h-4 text-white animate-pulse" /></div>
      };
    } else if (race.chaosScore >= 80) {
      return {
        type: 'YELLOW',
        bannerClass: 'bg-[#FFB800] text-black',
        text: 'SAFETY CAR',
        sub: `Lap Incident - Caution`,
        icon: (
          <svg viewBox="0 0 100 35" className="w-14 h-6 text-black fill-current animate-pulse">
            <path d="M5,25 L12,25 C14,21 18,21 20,25 L65,25 C67,21 71,21 73,25 L90,25 C92,23 95,20 95,15 C95,12 90,10 82,10 C78,10 75,12 70,8 L45,8 L35,14 L12,14 C8,14 5,18 5,25 Z M16,21 C18,21 20,23 20,25 C20,27 18,29 16,29 C14,29 12,27 12,25 C12,23 14,21 16,21 Z M69,21 C71,21 73,23 73,25 C73,27 71,29 69,29 C67,29 65,27 65,25 C65,23 67,21 69,21 Z" />
          </svg>
        )
      };
    } else {
      return {
        type: 'GREEN',
        bannerClass: 'bg-[#00D25B] text-black',
        text: 'GREEN FLAG',
        sub: 'Track Clear',
        icon: <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center"><Flag className="w-4 h-4 text-black fill-current" /></div>
      };
    }
  };

  const statusWidget = getDynamicTrackStatus();

  // Get color code for tire compounds
  const getTyreColor = (tyre: 'S' | 'M' | 'H') => {
    switch (tyre) {
      case 'S': return 'border-[#FF1801] text-[#FF1801]';
      case 'M': return 'border-[#FFB800] text-[#FFB800]';
      case 'H': return 'border-white text-white';
    }
  };

  // Team border color helper for Spotlight driver
  const getTeamColor = (team: string) => {
    const norm = team.toLowerCase();
    if (norm.includes('red bull')) return '#3671C6';
    if (norm.includes('ferrari')) return '#E80020';
    if (norm.includes('mercedes')) return '#27F4D2';
    if (norm.includes('mclaren')) return '#FF8000';
    return '#E10600';
  };

  const getDriverTeamBadge = (driverName: string) => {
    const norm = driverName.toLowerCase();
    if (norm.includes('verstappen') || norm.includes('ver')) {
      return { abbrev: 'RBR', color: '#3671C6', bg: '#3671C620', border: '#3671C650' };
    }
    if (norm.includes('russell') || norm.includes('rus') || norm.includes('hamilton') || norm.includes('ham')) {
      return { abbrev: 'MER', color: '#27F4D2', bg: '#27F4D220', border: '#27F4D250' };
    }
    if (norm.includes('sainz') || norm.includes('sai') || norm.includes('leclerc') || norm.includes('lec')) {
      return { abbrev: 'FER', color: '#E80020', bg: '#E8002020', border: '#E8002050' };
    }
    if (norm.includes('norris') || norm.includes('nor') || norm.includes('piastri') || norm.includes('pia')) {
      return { abbrev: 'MCL', color: '#FF8000', bg: '#FF800020', border: '#FF800050' };
    }
    return { abbrev: 'F1', color: '#ffffff', bg: '#ffffff20', border: '#ffffff50' };
  };

  const renderDriverBadge = (driverName: string, cardTheme: 'neutral' | 'purple' | 'amber' | 'red' | 'green') => {
    const badge = getDriverTeamBadge(driverName);
    
    const style = {
      color: badge.color,
      backgroundColor: `${badge.color}15`,
      borderColor: `${badge.color}35`
    };

    return (
      <span 
        className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ml-2 select-none shrink-0"
        style={style}
      >
        <TeamLogo team={badge.abbrev} className="w-3.5 h-3.5 mr-1" />
        {badge.abbrev}
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* =========================================================================
          ROW 1: REDESIGNED COMPACT WIDGET-CARD GRID (Neutral & Status Cards)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* CARD 1: Session Summary (Neutral/Informational Card) */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-[20px] flex flex-col justify-between overflow-hidden shadow-lg shadow-black/30 min-h-[160px] h-full">
          {/* Header Bar */}
          <div className="bg-black/20 px-5 py-3 border-b border-white/5 flex items-center gap-2">
            <Gauge className="w-4 h-4 text-zinc-400" />
            <span className="text-[10px] text-zinc-400 font-semibold tracking-wide uppercase">
              Session Summary
            </span>
          </div>
          {/* Card Body */}
          <div className="p-6 md:p-7 flex-1 flex flex-col justify-center">
            <h3 className="font-black text-2xl text-white tracking-tight leading-none uppercase">
              {race.chaosScore}% Chaos Score
            </h3>
            <p className="text-[11px] font-semibold mt-2 uppercase tracking-wide" style={{ color: activeColor }}>
              Outlook: {race.chaosScore >= 90 ? '■ CRITICAL ENTROPY' : race.chaosScore >= 80 ? '▲ HIGH VOLATILITY' : '● SECURE MATRIX'}
            </p>
          </div>
        </div>

        {/* CARD 2: Fastest Lap (Standout-Stat Purple Status Card) */}
        <div className="bg-[#7B1FA2]/10 border border-[#7B1FA2]/35 text-white rounded-[20px] backdrop-blur-md shadow-lg shadow-black/30 min-h-[160px] h-full flex flex-col justify-between p-6 md:p-7">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-widest">
              Fastest Lap
            </span>
            <span className="text-[10px] text-purple-200 font-semibold uppercase">
              {stats.fastestLapTime}
            </span>
          </div>
          <div className="mt-3">
            <h3 className="font-black text-2xl text-white tracking-tight uppercase leading-none flex items-center flex-wrap gap-y-1">
              {stats.fastestLapDriver}
              {renderDriverBadge(stats.fastestLapDriver, 'purple')}
            </h3>
            <p className="text-xs text-purple-200/80 font-sans mt-2 font-medium leading-relaxed">
              Clocked {stats.fastestLapTime} with {stats.fastestLapTeam} ({stats.fastestLap.includes('lap ') ? `Lap ${stats.fastestLap.split('lap ')[1]?.split(' ')[0]?.replace(',', '')}` : 'Event Record'}).
            </p>
          </div>
        </div>

        {/* CARDS 3+: Historical Chaos Events (Status Cards) */}
        {race.moments.map((moment, index) => {
          let cardBg = '';
          let cardBorder = '';
          let textClass = 'text-white';
          let badgeTheme: 'neutral' | 'purple' | 'amber' | 'red' | 'green' = 'neutral';
          let labelPrefix = '';

          if (moment.type === 'position_swing') {
            cardBg = 'bg-amber-500/10';
            cardBorder = 'border-amber-500/25';
            badgeTheme = 'amber';
            labelPrefix = 'Caution Alert';
          } else if (moment.type === 'pit_outlier') {
            cardBg = 'bg-red-500/10';
            cardBorder = 'border-red-500/25';
            badgeTheme = 'red';
            labelPrefix = 'Pit Anomaly';
          } else if (moment.type === 'pace_spike') {
            cardBg = 'bg-emerald-500/10';
            cardBorder = 'border-emerald-500/25';
            badgeTheme = 'green';
            labelPrefix = 'Track Clear';
          }

          return (
            <div 
              key={`${moment.driver}-${moment.lap}-${index}`}
              className={`${cardBg} ${textClass} rounded-[20px] border ${cardBorder} backdrop-blur-md shadow-lg shadow-black/30 min-h-[160px] h-full flex flex-col justify-between p-6 md:p-7`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-widest opacity-80">
                  {labelPrefix} // LAP {moment.lap}
                </span>
                <span className="text-[10px] font-semibold opacity-80 uppercase text-zinc-400">
                  {moment.type.replace('_', ' ')}
                </span>
              </div>
              <div className="mt-3">
                <h3 className="font-black text-2xl tracking-tight uppercase leading-none flex items-center flex-wrap gap-y-1">
                  {moment.driver}
                  {renderDriverBadge(moment.driver, badgeTheme)}
                </h3>
                <p className="text-xs font-sans mt-2 font-medium leading-relaxed opacity-90 text-zinc-300">
                  {moment.description} (Magnitude: {moment.magnitude.toFixed(1)})
                </p>
              </div>
            </div>
          );
        })}

      </div>

      {/* =========================================================================
          ROW 2: CIRCUIT METADATA & TELEMETRY LCD GRAPH PANEL
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* WIDGET D: Circuit Overview Metadata (4 columns) */}
        <div className="lg:col-span-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-[20px] p-6 flex flex-col relative overflow-hidden group shadow-lg shadow-black/30">
          <div className="absolute top-0 left-0 right-0 h-[3px] signature-gradient" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-zinc-400 font-semibold tracking-wide flex items-center gap-1 uppercase">
              <Compass className="w-3 h-3 text-f1-red animate-spin" style={{ animationDuration: '12s' }} />
              Circuit Diagrams
            </span>
            <span className="text-[9px] bg-white/5 border border-white/10 text-zinc-300 px-2 py-0.5 rounded-full font-bold uppercase">
              {details?.country || 'GLOBAL'}
            </span>
          </div>

          <h3 className="font-black text-2xl text-white tracking-tight leading-none mb-1 uppercase">
            {details?.country || 'GRAND PRIX'}
          </h3>
          <p className="text-[11px] text-zinc-400 truncate max-w-[280px]">
            {race.circuit}
          </p>

          {/* Glowing Animated SVG Circuit Map */}
          {details?.svgPath && (
            <div className="relative w-full h-28 my-3 bg-black/25 border border-white/5 rounded-xl flex items-center justify-center p-3 overflow-hidden group/circuit">
              {/* Technical background grids */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
              
              <svg className="w-full h-full max-h-20 drop-shadow-[0_0_8px_rgba(225,6,0,0.25)]" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Underlay glow path */}
                <path
                  d={details.svgPath}
                  fill="none"
                  stroke="#e10600"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-25 blur-[2px] transition-all duration-700 group-hover/circuit:stroke-[#00D25B]"
                />
                {/* Foreground glowing path */}
                <path
                  d={details.svgPath}
                  fill="none"
                  stroke="#e10600"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-700 group-hover/circuit:stroke-[#00D25B]"
                />
                
                {/* Animating Telemetry Dot flying around the track */}
                <circle r="2.5" fill="#ffffff" className="shadow-[0_0_8px_#fff]">
                  <animateMotion
                    dur="12s"
                    repeatCount="indefinite"
                    path={details.svgPath}
                  />
                </circle>
              </svg>

              <span className="absolute bottom-1 right-2 text-[8px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                GP LAYOUT COGNITION
              </span>
            </div>
          )}

          {/* Real Statistics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 mb-4 text-xs">
            <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Laps</span>
              <span className="text-white font-black text-sm mt-0.5">{stats.laps} Laps</span>
            </div>
            <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Circuit Length</span>
              <span className="text-white font-black text-sm mt-0.5">{stats.length}</span>
            </div>
            <div className="col-span-2 bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Pole Time</span>
              <span className="text-white font-bold text-sm mt-0.5 leading-snug">{stats.pole}</span>
            </div>
            <div className="col-span-2 bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col">
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Fastest Event Lap</span>
              <span className="text-white font-bold text-sm mt-0.5 leading-snug">{stats.fastestLap}</span>
            </div>
          </div>

          {/* Winner Callout Card */}
          <div className="mt-auto bg-black/30 border border-f1-red/30 p-4 rounded-xl flex flex-col text-xs shadow-inner">
            <span className="text-[9px] text-f1-red font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              Winner / Context Note
            </span>
            <span className="text-white font-bold mt-1 text-[11px] leading-relaxed">
              {stats.winner}
            </span>
          </div>
        </div>

        {/* WIDGET E: Steering Wheel Cockpit LCD Panel (8 columns) */}
        <div className="lg:col-span-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-[20px] p-6 flex flex-col relative overflow-hidden shadow-lg shadow-black/30">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-f1-red" />
          
          {/* Authentic F1 Shift LED Matrix (Shift Lights) */}
          <div className="w-full flex justify-center gap-1.5 mb-5 bg-black/30 py-2.5 px-4 rounded-xl border border-white/5">
            {Array.from({ length: numLEDs }).map((_, i) => {
              const isLit = i < activeLEDs;
              // Index 0-11: SECURE MATRIX (Green)
              // Index 12: HIGH VOLATILITY (Yellow)
              // Index 13-14: CRITICAL ENTROPY (Red)
              let ledColorClass = 'bg-zinc-800 shadow-none';
              if (isLit) {
                if (i < 12) {
                  ledColorClass = 'bg-[#00D25B] shadow-[0_0_10px_#00D25B]';
                } else if (i < 13) {
                  ledColorClass = 'bg-[#FFB800] shadow-[0_0_10px_#FFB800]';
                } else {
                  ledColorClass = 'bg-[#FF1801] shadow-[0_0_12px_#FF1801] animate-pulse';
                }
              }
              return (
                <div 
                  key={i} 
                  className={`w-3.5 h-1.5 rounded-sm transition-all duration-350 ease-out ${ledColorClass}`}
                  style={{
                    transitionDelay: isLit ? `${i * 35}ms` : '0ms'
                  }}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1">
            {/* Left part: Digital Dashboard Score Readout */}
            <div className="md:col-span-5 bg-black/30 border border-white/5 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-1 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-f1-red animate-ping" />
                <span className="text-[8px] text-f1-red font-bold">TELEMETRY LINK</span>
              </div>
              
              <div>
                <span className="text-[10px] text-zinc-400 font-semibold tracking-wide block">
                  Session Chaos Entropy
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-black text-6xl text-white tracking-tighter leading-none">
                    {race.chaosScore}
                  </span>
                  <span className="text-sm font-bold text-f1-red">%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1.5">
                <span className="text-[9px] text-zinc-500 font-semibold">STABILITY OUTLOOK</span>
                <span className={`text-xs font-bold tracking-wider uppercase ${
                  race.chaosScore >= 90 ? 'text-[#FF1801]' : race.chaosScore >= 80 ? 'text-[#FFB800]' : 'text-[#00D25B]'
                }`}>
                  {race.chaosScore >= 90 ? '■ CRITICAL ENTROPY' : race.chaosScore >= 80 ? '▲ HIGH VOLATILITY' : '● SECURE MATRIX'}
                </span>
              </div>
            </div>

            {/* Right part: Real-time SVG Telemetry Graph */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-zinc-300 font-semibold tracking-wide flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-f1-red" />
                  Real-time Telemetry Stream
                </span>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  Micro-fluctuations comparing lap index versus chaos index (%)
                </p>
              </div>

              {/* Dynamic SVG Plot */}
              <div className="relative h-24 my-2 select-none">
                <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={activeColor} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={activeColor} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#1f1f23" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1={paddingX} y1={(svgHeight) / 2} x2={svgWidth - paddingX} y2={(svgHeight) / 2} stroke="#1f1f23" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#2d2d30" strokeWidth="1" />

                  {/* Shaded Area Under Path */}
                  <path d={areaPath} fill="url(#areaGlow)" />

                  {/* High Volatility Threshold Warning */}
                  <line x1={paddingX} y1={paddingY + 15} x2={svgWidth - paddingX} y2={paddingY + 15} stroke={activeColor} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" />
                  <text x={paddingX + 5} y={paddingY + 11} fill={activeColor} fontSize="8" fillOpacity="0.7">
                    CRITICAL WARNING LIMIT (85%)
                  </text>

                  {/* Glowing line plot */}
                  <path
                    d={`M ${pointsPath}`}
                    fill="none"
                    stroke={activeColor}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points as glowing circles */}
                  {points.map((pt, index) => {
                    const isMoment = race.moments.some(m => m.lap === pt.lap);
                    return (
                      <g 
                        key={index} 
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isMoment ? 4.5 : 3}
                          fill={isMoment ? '#ffffff' : activeColor}
                          stroke={isMoment ? activeColor : '#0a0a0c'}
                          strokeWidth={1.5}
                        />
                        {isMoment && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={8}
                            fill="none"
                            stroke={activeColor}
                            strokeWidth="1"
                            className="animate-ping"
                            style={{ animationDuration: '3s' }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Micro tooltip inside the graph */}
                {hoveredPoint ? (
                  <div className="absolute top-0 right-0 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-f1-red/60 text-[9px] text-white z-10">
                    LAP {hoveredPoint.lap}: {hoveredPoint.score}% CHAOS
                  </div>
                ) : (
                  <div className="absolute bottom-1 right-2 text-[8px] text-zinc-500 font-semibold">
                    LAP 1 ➔ LAP {details?.laps || 70}
                  </div>
                )}
              </div>

              {/* Atmospheric Weather Dashboard Row */}
              <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-white/5 text-[9px] font-semibold text-zinc-400">
                <div className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>AIR: {details?.airTemp || '30°C'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-f1-red" />
                  <span>TRACK: {details?.trackTemp || '40°C'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>HUMIDITY: {details?.humidity || '50%'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{details?.wind || '10 KM/H'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 3: AI STRATEGY COMMENTARY HUB
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* WIDGET G: AI Commentary Stream Card (12 columns) */}
        <div className="lg:col-span-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-[20px] p-6 shadow-lg shadow-black/30 relative overflow-hidden flex flex-col">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-f1-red" />
          
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#FF1801] animate-pulse" />
              <span className="font-semibold text-xs tracking-wide text-zinc-400">
                Race Control Commentary Link
              </span>
            </div>

            {loading && (
              <div className="flex items-center gap-1.5 text-[9px] text-f1-red font-bold">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>UPDATING STATISTICAL DECODER...</span>
              </div>
            )}
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl p-5 flex-1 flex items-center min-h-[140px]">
            {loading ? (
              <div className="flex flex-col gap-2 w-full items-center justify-center py-4">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FF1801] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2.5 h-2.5 bg-[#FF1801] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2.5 h-2.5 bg-[#FF1801] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mt-2">
                  Analyzing AI Pitwall Decoded Telemetry...
                </span>
              </div>
            ) : error ? (
              <div className="flex flex-col gap-2.5 w-full text-xs">
                <div className="flex items-center gap-2 text-[#FFB800] bg-[#FFB800]/5 p-2.5 rounded border border-[#FFB800]/25 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>[COMM_LINK_ERROR] Backup strategy commentary link online.</span>
                </div>
                <p className="text-zinc-300 italic pl-3 border-l-2 border-[#FF1801] leading-relaxed">
                  "{explanation}"
                </p>
              </div>
            ) : (
              <div className="flex gap-3.5 items-start">
                <div className="bg-[#FF1801]/10 p-2.5 rounded-lg border border-[#FF1801]/20 text-[#FF1801] shrink-0 mt-0.5">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <p className="text-sm font-sans text-zinc-100 leading-relaxed italic relative font-medium">
                  "{explanation}"
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
