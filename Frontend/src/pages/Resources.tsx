import { resources } from '@/data/mockData';
import { Droplets, Truck, Building2, Stethoscope, Ambulance, CloudRain, MapPin } from 'lucide-react';

const icons: Record<string, typeof Droplets> = {
  'Cooling centres': Droplets, 'Water tankers': Truck, 'Water booths': CloudRain,
  'Hospitals': Stethoscope, 'Ambulances': Ambulance, 'Misting vans': CloudRain,
};

const statusColor: Record<string, string> = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Ready: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  Full: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Offline: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
};

export default function Resources() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Resources</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">What municipal resources are available</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map(r => {
          const Icon = icons[r.type] || Building2;
          return (
            <div key={r.type} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center"><Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /></div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusColor[r.status]}`}>{r.status}</span>
              </div>
              <div className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{r.type}</div>
              <div className="flex items-end gap-4 mt-2">
                <div><div className="text-2xl font-bold text-slate-900 dark:text-white">{r.total}</div><div className="text-[11px] text-slate-400">Total</div></div>
                <div><div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{r.active}</div><div className="text-[11px] text-slate-400">Active</div></div>
                <div><div className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">{r.available}</div><div className="text-[11px] text-slate-400">Available</div></div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex justify-between"><span>Capacity</span><span className="font-medium text-slate-700 dark:text-slate-200">{r.capacity}</span></div>
                <div className="flex justify-between"><span>Utilization</span><span className="font-medium text-slate-700 dark:text-slate-200">{r.utilization}%</span></div>
                <div className="flex justify-between items-center"><span>Location</span><span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</span></div>
              </div>
              {/* Utilization bar */}
              <div className="mt-3 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" style={{ width: `${r.utilization}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Resource map placeholder */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
        <h2 className="font-bold text-slate-900 dark:text-white mb-3">Resource Map</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: 'Cooling Centres', v: '58 active', c: 'text-cyan-500' },
            { label: 'Hospitals', v: '12 ready', c: 'text-red-500' },
            { label: 'Water Tankers', v: '12 dispatched', c: 'text-blue-500' },
          ].map(m => (
            <div key={m.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
              <MapPin className={`w-5 h-5 ${m.c}`} />
              <div><div className="text-sm font-semibold text-slate-900 dark:text-white">{m.v}</div><div className="text-xs text-slate-400">{m.label}</div></div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-400 text-center">Detailed GIS resource mapping available on the Heat Risk Map page under the Resources layer.</div>
      </section>
    </div>
  );
}
