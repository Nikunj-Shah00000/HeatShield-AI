import { ArrowRight, AlertTriangle, Droplets, Truck, Megaphone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskBadge } from '@/components/common/RiskBadge';
import { wards, forecast, actions, alerts } from '@/data/mockData';

const priority = [...wards].sort((a, b) => b.mortalityRisk - a.mortalityRisk).slice(0, 5);
const todayActions = actions.slice(0, 4);
const fiveDay = forecast.slice(0, 5);

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Top status banner */}
      <section className="rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-red-600 p-6 sm:p-8 text-white shadow-lg shadow-red-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="text-sm font-medium text-white/80 uppercase tracking-wider">Municipal Heat Situation</div>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-bold">HIGH HEAT RISK</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              <div><span className="text-2xl font-bold">42°C</span> <span className="text-white/70">current</span></div>
              <div><span className="text-2xl font-bold">5</span> <span className="text-white/70">wards need attention</span></div>
              <div><span className="text-2xl font-bold">12.6L</span> <span className="text-white/70">people at risk</span></div>
            </div>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-4 border border-white/20">
            <div className="text-xs text-white/70 uppercase tracking-wider">Peak danger</div>
            <div className="text-xl font-bold mt-1">12 PM – 4:30 PM</div>
            <div className="text-xs text-white/70 mt-1">Avoid outdoor exposure</div>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'City Temperature', value: '42°C', sub: 'Feels like 47.5°C', icon: '🌡', color: 'text-orange-500' },
          { label: 'Wards Needing Attention', value: '5', sub: 'of 18 wards', icon: '📍', color: 'text-red-500' },
          { label: 'People at Risk', value: '12.6 Lakh', sub: 'across priority wards', icon: '👥', color: 'text-purple-500' },
          { label: 'Active Alerts', value: '8', sub: '2 critical · 3 high', icon: '🔔', color: 'text-amber-500' },
        ].map(k => (
          <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-2xl">{k.icon}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{k.label}</div>
            <div className={`text-2xl font-bold mt-1 ${k.color}`}>{k.value}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </section>

      {/* Wards needing attention */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">Wards Needing Attention</h2>
          <Link to="/at-risk" className="text-sm text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">View all at-risk areas <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {priority.map(w => (
            <div key={w.wardId} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{w.wardId} · {w.wardName}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{w.reason}</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">{(w.population / 100000).toFixed(1)} lakh</div>
                <div className="text-[11px] text-slate-400">people</div>
              </div>
              <RiskBadge level={w.riskLevel} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's actions */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-white">Today's Actions</h2>
            <Link to="/action-plan" className="text-sm text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">View full action plan <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todayActions.map(a => (
              <div key={a.title} className="flex items-start gap-3 p-4">
                {a.priority === 'Critical' ? <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /> : a.title.includes('cooling') ? <Droplets className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" /> : a.title.includes('water') ? <Truck className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> : <Megaphone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{a.title}</div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${a.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300' : a.priority === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300'}`}>{a.priority}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.trigger}</div>
                  <div className={`text-[11px] mt-1 font-medium ${a.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : a.status === 'Dispatched' ? 'text-blue-600 dark:text-blue-400' : a.status === 'Broadcasted' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}`}>{a.status}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alert summary */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-white">Alert Summary</h2>
            <Link to="/alerts" className="text-sm text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">View all alerts <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-3 gap-3">
              {[{ l: 'Critical', v: 2, c: 'bg-red-500' }, { l: 'High', v: 3, c: 'bg-orange-500' }, { l: 'Moderate', v: 3, c: 'bg-amber-500' }].map(s => (
                <div key={s.l} className="text-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className={`w-2 h-2 rounded-full ${s.c} mx-auto mb-1`} />
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.v}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white">RED ALERT</span>
                <span className="text-sm font-semibold text-red-700 dark:text-red-300">Ward 16 · Chandni Chowk</span>
              </div>
              <div className="text-sm text-slate-700 dark:text-slate-300 mt-2">{alerts[0].reason}. Outdoor work restriction required.</div>
            </div>
          </div>
        </section>
      </div>

      {/* Next 5 days */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">Next 5 Days</h2>
          <Link to="/forecast" className="text-sm text-cyan-600 dark:text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">View full forecast <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-5">
          {fiveDay.map((d, i) => (
            <div key={d.day} className={`p-4 rounded-xl border ${i === 0 ? 'border-cyan-300 dark:border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-500/5' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="text-xs text-slate-500 dark:text-slate-400">{d.day}</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{d.temperature}°C</div>
              <div className="mt-2"><RiskBadge level={d.risk} /></div>
              <div className="text-[11px] text-slate-400 mt-2">{d.date}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
