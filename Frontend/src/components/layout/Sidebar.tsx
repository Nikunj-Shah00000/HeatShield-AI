import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, CalendarClock, ClipboardList,
  Truck, Bell, BarChart3, Settings, ShieldCheck, X,
  Activity, History
} from 'lucide-react';

const nav = [
  { n: '01', label: 'Overview', to: '/', icon: LayoutDashboard },
  { n: '02', label: 'Heat Risk Map', to: '/map', icon: Map },
  { n: '03', label: 'Live Risk', to: '/live-risk', icon: Activity },
  { n: '04', label: 'History', to: '/history', icon: History },
  { n: '05', label: 'Forecast', to: '/forecast', icon: CalendarClock },
  { n: '06', label: 'Action Plan', to: '/action-plan', icon: ClipboardList },
  { n: '07', label: 'Resources', to: '/resources', icon: Truck },
  { n: '08', label: 'Alerts', to: '/alerts', icon: Bell },
  { n: '09', label: 'Reports', to: '/reports', icon: BarChart3 },
  { n: '10', label: 'Settings', to: '/settings', icon: Settings },
];

const quick = [
  { label: 'High-Risk Wards', to: '/map' },
  { label: 'Cooling Centres', to: '/resources' },
  { label: 'Hospitals', to: '/resources' },
  { label: 'Water Resources', to: '/resources' },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-20 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-white">Menu</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-5 h-5 text-slate-500" /></button>
        </div>

        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm tracking-wide">HEATSHIELD AI</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Municipal Heat Response</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Navigation</div>
          {nav.map(item => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition group ${isActive ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}`} />
                  <span className="flex-1">{item.label}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{item.n}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="px-2 pt-4 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Quick Access</div>
          {quick.map(q => (
            <NavLink key={q.label} to={q.to} onClick={onClose}
              className="block px-3 py-2 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition">
              {q.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">System Operational</span>
        </div>
      </aside>
    </>
  );
}
