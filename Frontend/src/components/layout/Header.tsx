import { Sun, Moon, MapPin, Thermometer, Calendar, Clock, Activity, ChevronDown } from 'lucide-react';
import { useTheme } from '@/components/common/ThemeProvider';

export default function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
          <Activity className="w-5 h-5" />
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">HeatShield AI</span>
            <span className="hidden sm:inline text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">Municipal Corporation</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Heatwave Emergency Response Operations</div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4 text-sm">
        <div className="hidden md:flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          <span className="font-medium">Delhi</span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Thermometer className="w-4 h-4 text-orange-500" />
          <span className="font-semibold">42°C</span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>22 May 2025</span>
        </div>
        <div className="hidden xl:flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <Clock className="w-4 h-4 text-slate-400" />
          <span>11:25 AM</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">Operational</span>
        </div>
        <button onClick={toggle} className="ml-1 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition" aria-label="Toggle theme">
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
