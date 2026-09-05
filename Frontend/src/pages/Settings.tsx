import { useTheme } from '@/components/common/ThemeProvider';
import { Sun, Moon, Bell, Map, RefreshCw, Info } from 'lucide-react';
import { useState } from 'react';

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`relative w-11 h-6 rounded-full transition ${on ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

export default function Settings() {
  const { theme, toggle } = useTheme();
  const [notif, setNotif] = useState({ critical: true, high: true, moderate: false, daily: true });
  const [mapPrefs, setMapPrefs] = useState({ autoZoom: true, showResources: false, treeCanopy: true });

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">How should the system behave</p>
      </div>

      {/* Appearance */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><Sun className="w-4 h-4 text-amber-500" /><h2 className="font-bold text-slate-900 dark:text-white">Appearance</h2></div>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => theme !== 'light' && toggle()} className={`p-4 rounded-xl border-2 transition flex items-center gap-3 ${theme === 'light' ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-500/5' : 'border-slate-200 dark:border-slate-800'}`}>
            <Sun className="w-5 h-5 text-amber-500" />
            <div className="text-left"><div className="text-sm font-semibold text-slate-900 dark:text-white">Light Mode</div><div className="text-xs text-slate-400">Bright, daytime use</div></div>
          </button>
          <button onClick={() => theme !== 'dark' && toggle()} className={`p-4 rounded-xl border-2 transition flex items-center gap-3 ${theme === 'dark' ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-500/5' : 'border-slate-200 dark:border-slate-800'}`}>
            <Moon className="w-5 h-5 text-indigo-400" />
            <div className="text-left"><div className="text-sm font-semibold text-slate-900 dark:text-white">Dark Mode</div><div className="text-xs text-slate-400">Low-light operations</div></div>
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><Bell className="w-4 h-4 text-cyan-500" /><h2 className="font-bold text-slate-900 dark:text-white">Notifications</h2></div>
        <div className="space-y-3">
          {[
            { k: 'critical' as const, l: 'Critical alerts', d: 'Immediate notification for extreme heat' },
            { k: 'high' as const, l: 'High-risk warnings', d: 'Wards entering severe risk' },
            { k: 'moderate' as const, l: 'Moderate updates', d: 'Routine risk-level changes' },
            { k: 'daily' as const, l: 'Daily summary', d: 'Morning briefing at 8 AM' },
          ].map(n => (
            <div key={n.k} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div><div className="text-sm font-semibold text-slate-900 dark:text-white">{n.l}</div><div className="text-xs text-slate-400">{n.d}</div></div>
              <Toggle on={notif[n.k]} onClick={() => setNotif(s => ({ ...s, [n.k]: !s[n.k] }))} />
            </div>
          ))}
        </div>
      </section>

      {/* Map preferences */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><Map className="w-4 h-4 text-blue-500" /><h2 className="font-bold text-slate-900 dark:text-white">Map Preferences</h2></div>
        <div className="space-y-3">
          {[
            { k: 'autoZoom' as const, l: 'Auto-zoom to selected ward', d: 'Smoothly focus map on selection' },
            { k: 'showResources' as const, l: 'Show resources by default', d: 'Display hospitals and cooling centres' },
            { k: 'treeCanopy' as const, l: 'Tree canopy overlay', d: 'Highlight green-cover areas' },
          ].map(m => (
            <div key={m.k} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div><div className="text-sm font-semibold text-slate-900 dark:text-white">{m.l}</div><div className="text-xs text-slate-400">{m.d}</div></div>
              <Toggle on={mapPrefs[m.k]} onClick={() => setMapPrefs(s => ({ ...s, [m.k]: !s[m.k] }))} />
            </div>
          ))}
        </div>
      </section>

      {/* Data refresh */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><RefreshCw className="w-4 h-4 text-emerald-500" /><h2 className="font-bold text-slate-900 dark:text-white">Data Refresh</h2></div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div><div className="text-sm font-semibold text-slate-900 dark:text-white">Auto-refresh interval</div><div className="text-xs text-slate-400">Last updated: 11:25 AM</div></div>
          <select className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200">
            <option>Every 5 minutes</option>
            <option>Every 15 minutes</option>
            <option>Every 30 minutes</option>
            <option>Manual only</option>
          </select>
        </div>
      </section>

      {/* System info */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><Info className="w-4 h-4 text-slate-400" /><h2 className="font-bold text-slate-900 dark:text-white">System Information</h2></div>
        <div className="space-y-2 text-sm">
          {[
            { l: 'Version', v: 'HeatShield AI v1.0.0' },
            { l: 'Coverage', v: '18 wards · Delhi Municipal Region' },
            { l: 'Data source', v: 'Mock data (prototype)' },
            { l: 'Status', v: 'Operational' },
          ].map(i => (
            <div key={i.l} className="flex justify-between p-2 rounded-lg"><span className="text-slate-400">{i.l}</span><span className="font-medium text-slate-700 dark:text-slate-200">{i.v}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}
