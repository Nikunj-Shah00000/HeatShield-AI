import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { heatTrend } from '@/data/mockData';
import { BarChart3, TrendingUp, Activity, Users } from 'lucide-react';

const yearData = [
  { month: 'Jun', days: 4, anomaly: 1.2, exposure: 4.5, hosp: 120 },
  { month: 'Jul', days: 2, anomaly: 0.8, exposure: 2.1, hosp: 80 },
  { month: 'Aug', days: 1, anomaly: 0.3, exposure: 1.0, hosp: 40 },
  { month: 'Sep', days: 0, anomaly: -0.2, exposure: 0.4, hosp: 20 },
  { month: 'Oct', days: 0, anomaly: -0.5, exposure: 0.2, hosp: 10 },
  { month: 'Nov', days: 0, anomaly: -0.8, exposure: 0.1, hosp: 5 },
  { month: 'Dec', days: 0, anomaly: 0.2, exposure: 1.2, hosp: 8 },
  { month: 'Jan', days: 0, anomaly: -0.4, exposure: 0.8, hosp: 6 },
  { month: 'Feb', days: 1, anomaly: 0.7, exposure: 1.8, hosp: 25 },
  { month: 'Mar', days: 3, anomaly: 1.4, exposure: 3.9, hosp: 60 },
  { month: 'Apr', days: 7, anomaly: 2.1, exposure: 7.6, hosp: 140 },
  { month: 'May', days: 12, anomaly: 3.8, exposure: 12.6, hosp: 320 },
];

const threeYearData = [
  { year: '2023', heatwaveDays: 18, extremeDays: 4 },
  { year: '2024', heatwaveDays: 24, extremeDays: 7 },
  { year: '2025', heatwaveDays: 28, extremeDays: 9 },
];

export default function Reports() {
  const [range, setRange] = useState<'6m' | '1y' | '3y'>('6m');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Reports</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">How heat risk has changed over time</p>
        </div>
        <div className="flex gap-2">
          {[{ k: '6m', l: '6 Months' }, { k: '1y', l: '1 Year' }, { k: '3y', l: '3 Years' }].map(r => (
            <button key={r.k} onClick={() => setRange(r.k as typeof range)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${range === r.k ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>{r.l}</button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: 'Heatwave Days', v: range === '6m' ? '23' : range === '1y' ? '28' : '70', s: 'this period', icon: Activity, c: 'text-orange-500' },
          { l: 'Extreme Heat Days', v: range === '6m' ? '7' : range === '1y' ? '9' : '20', s: 'above 45°C', icon: TrendingUp, c: 'text-red-500' },
          { l: 'Temp Anomaly', v: '+3.8°C', s: 'vs 10-yr avg', icon: BarChart3, c: 'text-amber-500' },
          { l: 'Population Exposure', v: '12.6L', s: 'peak exposure', icon: Users, c: 'text-purple-500' },
        ].map(s => (
          <div key={s.l} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <s.icon className={`w-5 h-5 ${s.c}`} />
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{s.l}</div>
            <div className={`text-2xl font-bold mt-1 ${s.c}`}>{s.v}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.s}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Heatwave Days</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={range === '6m' ? heatTrend : yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="days" fill="#f97316" radius={[4, 4, 0, 0]} name="Heatwave days" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Temperature Anomaly</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={range === '6m' ? heatTrend : yearData}>
                <defs><linearGradient id="anomGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="anomaly" stroke="#ef4444" fill="url(#anomGrad)" name="Anomaly (°C)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Population Exposure</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={range === '6m' ? heatTrend : yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="exposure" stroke="#a855f7" strokeWidth={2} name="Lakh exposed" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Hospitalization Trend</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              {range === '3y' ? (
                <BarChart data={threeYearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="heatwaveDays" fill="#f97316" radius={[4, 4, 0, 0]} name="Heatwave days" />
                  <Bar dataKey="extremeDays" fill="#ef4444" radius={[4, 4, 0, 0]} name="Extreme days" />
                </BarChart>
              ) : (
                <BarChart data={range === '6m' ? heatTrend : yearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Bar dataKey="hosp" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Hospitalizations" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
