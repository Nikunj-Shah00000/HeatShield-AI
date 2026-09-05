import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { History, TrendingUp, CalendarDays, Flame, Users, Activity } from 'lucide-react';
import { wardHistory, historicalMonthly, wardHistoryByRisk } from '@/data/mockData';

type Range = '6m' | '1y' | '3y';

const threeYearData = [
  { year: '2023', heatwave: 18, extreme: 4, avgTemp: 40.2 },
  { year: '2024', heatwave: 24, extreme: 7, avgTemp: 41.8 },
  { year: '2025', heatwave: 28, extreme: 9, avgTemp: 42.6 },
];

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

export default function HistoryPage() {
  const [range, setRange] = useState<Range>('6m');

  const chartData = range === '6m' ? wardHistory : yearData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">History</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">How heat risk has changed over time</p>
        </div>
        <div className="flex gap-2">
          {([['6m', '6 Months'], ['1y', '1 Year'], ['3y', '3 Years']] as const).map(([k, l]) => (
            <button key={k} onClick={() => setRange(k)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${range === k ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>{l}</button>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: 'Heatwave Days', v: range === '6m' ? '23' : range === '1y' ? '28' : '70', s: 'this period', icon: Flame, c: 'text-orange-500' },
          { l: 'Extreme Heat Days', v: range === '6m' ? '7' : range === '1y' ? '9' : '20', s: 'above 45°C', icon: TrendingUp, c: 'text-red-500' },
          { l: 'Peak Exposure', v: '12.6L', s: 'people at risk', icon: Users, c: 'text-purple-500' },
          { l: 'Avg WBGT', v: range === '6m' ? '30.4°C' : range === '1y' ? '28.9°C' : '29.7°C', s: 'thermal stress', icon: Activity, c: 'text-cyan-500' },
        ].map(s => (
          <div key={s.l} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <s.icon className={`w-5 h-5 ${s.c}`} />
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">{s.l}</div>
            <div className={`text-2xl font-bold mt-1 ${s.c}`}>{s.v}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.s}</div>
          </div>
        ))}
      </div>

      {/* Main charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4"><History className="w-4 h-4 text-cyan-500" /><h2 className="font-bold text-slate-900 dark:text-white">Temperature &amp; Feels-Like Trend</h2></div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Ambient °C" />
                <Line type="monotone" dataKey="feelsLike" stroke="#ef4444" strokeWidth={2} name="Feels like °C" />
                <Line type="monotone" dataKey="wbgt" stroke="#0ea5e9" strokeWidth={2} name="WBGT °C" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4"><CalendarDays className="w-4 h-4 text-orange-500" /><h2 className="font-bold text-slate-900 dark:text-white">Heatwave Days</h2></div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              {range === '3y' ? (
                <BarChart data={threeYearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                  <Bar dataKey="heatwave" fill="#f97316" radius={[4, 4, 0, 0]} name="Heatwave days" />
                  <Bar dataKey="extreme" fill="#ef4444" radius={[4, 4, 0, 0]} name="Extreme days" />
                </BarChart>
              ) : (
                <BarChart data={range === '6m' ? historicalMonthly : yearData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                  <Bar dataKey="days" fill="#f97316" radius={[4, 4, 0, 0]} name="Heatwave days" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4"><Users className="w-4 h-4 text-purple-500" /><h2 className="font-bold text-slate-900 dark:text-white">Population Exposure</h2></div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="exposureGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} /><stop offset="95%" stopColor="#a855f7" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Area type="monotone" dataKey="exposure" stroke="#a855f7" fill="url(#exposureGrad)" name="Lakh exposed" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-blue-500" /><h2 className="font-bold text-slate-900 dark:text-white">Ward Risk Comparison</h2></div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wardHistoryByRisk} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis type="category" dataKey="wardName" tick={{ fontSize: 10 }} stroke="#94a3b8" width={80} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 11 }} />
                <Bar dataKey="may" fill="#ef4444" radius={[0, 4, 4, 0]} name="May exposure (L)" />
                <Bar dataKey="apr" fill="#f97316" radius={[0, 4, 4, 0]} name="Apr exposure (L)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Key events timeline */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Key Historical Events</h2>
        <div className="space-y-3">
          {[
            { date: '26 May 2025', event: 'Extreme heatwave peak — 49°C recorded in Chandni Chowk', severity: 'Extreme', color: 'text-purple-600 dark:text-purple-400' },
            { date: '15 Apr 2025', event: 'First severe heat alert issued for 4 wards', severity: 'Severe', color: 'text-red-600 dark:text-red-400' },
            { date: '03 Mar 2025', event: 'Early-season heat spike, 3 wards above threshold', severity: 'High', color: 'text-orange-600 dark:text-orange-400' },
            { date: '12 May 2024', event: 'Previous year extreme event — 46°C, 8 hospitalizations', severity: 'Severe', color: 'text-red-600 dark:text-red-400' },
            { date: '20 May 2023', event: 'Historic heatwave — 43°C sustained over 5 days', severity: 'Severe', color: 'text-red-600 dark:text-red-400' },
          ].map((e, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-slate-400">{e.date}</span>
                  <span className={`text-[10px] font-bold ${e.color}`}>{e.severity}</span>
                </div>
                <div className="text-sm text-slate-700 dark:text-slate-200 mt-0.5">{e.event}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
