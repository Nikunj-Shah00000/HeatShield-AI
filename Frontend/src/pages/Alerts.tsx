import { useState } from 'react';
import { alerts } from '@/data/mockData';
import { Send, MessageSquare, Smartphone, Tv, Megaphone, CheckCircle, XCircle } from 'lucide-react';

const sevColor: Record<string, string> = {
  Critical: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300 border-red-300 dark:border-red-500/40',
  High: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300 border-orange-300 dark:border-orange-500/40',
  Moderate: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border-amber-300 dark:border-amber-500/40',
  Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40',
};

const channels = [
  { icon: MessageSquare, label: 'SMS', on: true },
  { icon: Smartphone, label: 'WhatsApp', on: true },
  { icon: Tv, label: 'LED Boards', on: true },
  { icon: Megaphone, label: 'Public Announcement', on: false },
];

const delivery = [
  { label: 'Dispatched', v: 125000, pct: 100, c: 'bg-blue-500' },
  { label: 'Delivered', v: 118400, pct: 95, c: 'bg-cyan-500' },
  { label: 'Viewed', v: 89200, pct: 71, c: 'bg-emerald-500' },
  { label: 'Failed', v: 6600, pct: 5, c: 'bg-red-500' },
];

export default function Alerts() {
  const [filter, setFilter] = useState<string>('All');
  const filters = ['All', 'Critical', 'High', 'Moderate', 'Resolved'];
  const filtered = filter === 'All' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Alerts</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">What warnings are active and who has received them</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${filter === f ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>{f}</button>
        ))}
      </div>

      {/* Alert list */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((a, i) => (
            <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${sevColor[a.severity]}`}>{a.severity}</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">{a.ward}</span>
                    <span className="text-xs text-slate-400">{a.time}</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{a.reason}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>People affected: <span className="font-semibold text-slate-700 dark:text-slate-200">{a.affected}</span></span>
                    <span>Action: <span className="font-semibold text-slate-700 dark:text-slate-200">{a.action}</span></span>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold ${a.status === 'Dispatched' ? 'text-blue-600 dark:text-blue-400' : a.status === 'Delivered' ? 'text-cyan-600 dark:text-cyan-400' : a.status === 'Viewed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Send alert */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4"><Send className="w-4 h-4 text-cyan-500" /><h2 className="font-bold text-slate-900 dark:text-white">Send Alert</h2></div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Channels</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {channels.map(ch => (
                  <div key={ch.label} className={`flex items-center gap-2 p-3 rounded-xl border ${ch.on ? 'border-cyan-300 dark:border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-500/5' : 'border-slate-200 dark:border-slate-800'}`}>
                    <ch.icon className={`w-4 h-4 ${ch.on ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{ch.label}</span>
                    {ch.on ? <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto" /> : <XCircle className="w-4 h-4 text-slate-300 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
              <textarea defaultValue="Extreme heat alert: Avoid outdoor work between 12 PM and 4 PM. Stay hydrated. Visit nearest cooling centre." className="mt-2 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-200 resize-none" rows={3} />
            </div>
            <button className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold transition">Dispatch Alert</button>
          </div>
        </section>

        {/* Delivery status */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Delivery Status</h2>
          <div className="space-y-4">
            {delivery.map(d => (
              <div key={d.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-300">{d.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{d.v.toLocaleString('en-IN')}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${d.c}`} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
            Last broadcast: 11:12 AM · 1.25 lakh citizens across 5 priority wards
          </div>
        </section>
      </div>
    </div>
  );
}
