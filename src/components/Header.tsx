import { useState, useEffect } from 'react';
import { Radio, ShieldAlert } from 'lucide-react';
import { F1Logo } from './TeamLogo';

export default function Header() {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* F1 Logo & glowing core */}
        <div className="flex items-center gap-3">
          <F1Logo className="h-5" />
          <div className="w-[1px] h-6 bg-white/10 hidden sm:block" />
          <div className="relative">
            <div className="w-3.5 h-3.5 bg-f1-red rounded-full animate-pulse shadow-[0_0_12px_#e10600]"></div>
            <div className="absolute -inset-1 bg-f1-red/30 rounded-full animate-ping"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans font-black text-xl tracking-widest text-white leading-none uppercase">
                CHAOS <span className="text-f1-red glow-red">ENGINE</span>
              </h1>
              <span className="text-[9px] bg-f1-red/10 border border-f1-red/30 text-f1-red px-1.5 py-0.5 rounded font-black tracking-widest uppercase">
                STRATEGY ROOM
              </span>
            </div>
            <p className="text-[9px] text-zinc-500 tracking-wider font-semibold mt-0.5">
              RACE CONTROL DECISION MATRIX // GROUNDED INTELLIGENCE
            </p>
          </div>
        </div>
      </div>


      <div className="flex items-center gap-6">
        {/* Real-time F1 Clock */}
        <div className="flex flex-col items-end">
          <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-black">
            RACE CONTROL TIME
          </span>
          <span className="text-xs font-bold text-zinc-300 tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-[12px] border border-white/5 mt-1 shadow-inner">
            {utcTime || '12:00:00 UTC'}
          </span>
        </div>
      </div>
    </header>
  );
}
