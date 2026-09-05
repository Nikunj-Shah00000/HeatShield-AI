import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { forecast } from '@/data/mockData';
import { RiskBadge } from '@/components/common/RiskBadge';
import { CalendarClock, TrendingUp, AlertTriangle } from 'lucide-react';

const threeDay = forecast.slice(0, 3);
const fiveDay = forecast.slice(0, 5);
const tenDay = forecast;

export default function Forecast() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Forecast</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">What will happen next across Delhi</p>
      </div>

      {/* 3-day immediate */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4 text-orange-500" /><h2 className="font-bold text-slate-900 dark:text-white">3-Day Immediate Forecast</h2></div>
        <div className="grid sm:grid-cols-3 gap-3">
          {threeDay.map(d => (
            <div key={d.day} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between"><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{d.day}</span><RiskBadge level={d.risk} /></div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{d.temperature}°C</div>
              <div className="text-xs text-slate-400">Feels like {d.feelsLike}°C</div>
              <div className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div>WBGT: {d.wbgt}°C</div>
                <div>UTCI: {d.utci}°C</div>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400"><CalendarClock className="w-3 h-3" /> {d.peak}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5-day tactical chart */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4 text-cyan-500" /><h2 className="font-bold text-slate-900 dark:text-white">5-Day Tactical Forecast</h2></div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fiveDay}>
              <defs><linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.4} /><stop offset="95%" stopColor="#f97316" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Area type="monotone" dataKey="temperature" stroke="#f97316" fill="url(#tempGrad)" name="Temperature" />
              <Area type="monotone" dataKey="feelsLike" stroke="#ef4444" fill="transparent" name="Feels like" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid sm:grid-cols-5 gap-2 mt-4">
          {fiveDay.map(d => (
            <div key={d.day} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div className="text-xs text-slate-400">{d.day}</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{d.temperature}°C</div>
              <div className="mt-1"><RiskBadge level={d.risk} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* 10-day extended */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4"><CalendarClock className="w-4 h-4 text-blue-500" /><h2 className="font-bold text-slate-900 dark:text-white">10-Day Extended Trend</h2></div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tenDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Temperature" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="wbgt" stroke="#0ea5e9" strokeWidth={2} name="WBGT" dot={false} />
              <Line type="monotone" dataKey="utci" stroke="#ef4444" strokeWidth={2} name="Feels like" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tenDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="temperature" fill="#f97316" radius={[4, 4, 0, 0]} name="Temperature" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
