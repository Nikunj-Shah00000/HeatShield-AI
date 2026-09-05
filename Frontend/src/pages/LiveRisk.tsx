import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Activity, AlertTriangle, Droplets, Heart, ShieldAlert, Stethoscope,
  Thermometer, Truck, Users, Wind, X,
} from 'lucide-react';
import { wards, hospitals, coolingCentres, waterPoints } from '@/data/mockData';
import { RiskBadge, riskColors } from '@/components/common/RiskBadge';
import { blueIcon, cyanIcon, makePolygon, redIcon } from '@/components/map/mapIcons';
import type { Ward } from '@/types/dashboard';

function FlyTo({ ward }: { ward: Ward | null }) {
  const map = useMap();
  useEffect(() => {
    if (ward) map.flyTo(ward.center, 12, { duration: 0.8 });
  }, [map, ward]);
  return null;
}

function Metric({ icon: Icon, label, value, color = 'text-slate-900 dark:text-white' }: { icon?: typeof Activity; label: string; value: string; color?: string }) {
  return <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">{Icon && <Icon className={`w-3.5 h-3.5 ${color} mb-1`} />}<div className="text-[10px] text-slate-400">{label}</div><div className={`text-sm font-bold ${color}`}>{value}</div></div>;
}

function Population({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50"><Icon className="w-3.5 h-3.5 text-purple-500 shrink-0" /><div className="min-w-0"><div className="text-[10px] text-slate-400 truncate">{label}</div><div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{value}</div></div></div>;
}

export default function LiveRisk() {
  const [selected, setSelected] = useState<Ward | null>(wards.find(w => w.wardId === 'W-16') ?? wards[0]);
  const [layer, setLayer] = useState<'risk' | 'resources'>('risk');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Live Risk</h1>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> LIVE</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Real-time ward risk details and thermal stress indicators</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setLayer('risk')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${layer === 'risk' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>Risk</button>
          <button onClick={() => setLayer('resources')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${layer === 'resources' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>Resources</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 items-stretch">
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-[600px] relative z-0">
          <MapContainer center={[28.65, 77.21]} zoom={11} className="h-full w-full" scrollWheelZoom={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap &copy; CARTO" />
            {wards.map(w => (
              <Polygon key={w.wardId} positions={makePolygon(w.center)} pathOptions={{ color: selected?.wardId === w.wardId ? '#0ea5e9' : riskColors[w.riskLevel].hex, weight: selected?.wardId === w.wardId ? 3 : 1, fillColor: riskColors[w.riskLevel].hex, fillOpacity: selected?.wardId === w.wardId ? 0.46 : 0.25 }} eventHandlers={{ click: () => setSelected(w) }}>
                <Popup><div className="text-sm"><div className="font-bold">{w.wardId} · {w.wardName}</div><div>{w.feelsLike}°C feels like · {w.riskLevel}</div></div></Popup>
              </Polygon>
            ))}
            {layer === 'resources' && <>
              {hospitals.map(h => <Marker key={h.name} position={h.pos} icon={redIcon}><Popup><div className="text-sm font-semibold">Hospital · {h.name}</div></Popup></Marker>)}
              {coolingCentres.map(c => <Marker key={c.name} position={c.pos} icon={cyanIcon}><Popup><div className="text-sm font-semibold">Cooling Centre · {c.name}</div></Popup></Marker>)}
              {waterPoints.map(w => <Marker key={w.name} position={w.pos} icon={blueIcon}><Popup><div className="text-sm font-semibold">Water · {w.name}</div></Popup></Marker>)}
            </>}
            <FlyTo ward={selected} />
          </MapContainer>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[600px] flex flex-col">
          {selected ? <>
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
              <div className="flex items-start justify-between">
                <div><div className="text-[11px] text-slate-400">LIVE RISK · WARD DETAILS</div><div className="text-base font-bold text-slate-900 dark:text-white mt-1">{selected.wardId} · {selected.wardName}</div></div>
                <div className="flex items-center gap-2"><span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Updated 11:25 AM</span><button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700"><X className="w-4 h-4 text-slate-400" /></button></div>
              </div>
              <div className="mt-3 flex items-center gap-2"><RiskBadge level={selected.riskLevel} /><span className="text-lg font-bold text-slate-900 dark:text-white">{selected.feelsLike}°C <span className="text-xs font-normal text-slate-400">feels like</span></span></div>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                <Metric icon={Thermometer} label="Ambient dry-bulb" value={`${selected.temperature}°C`} color="text-orange-500" />
                <Metric icon={Droplets} label="Relative humidity" value={`${selected.humidity}%`} color="text-cyan-500" />
                <Metric icon={Wind} label="Wind speed" value={`${selected.windSpeed} km/h`} color="text-blue-500" />
                <Metric icon={Activity} label="Solar radiation" value={`${selected.solarRadiation} W/m²`} color="text-amber-500" />
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Human thermal stress index</div>
                <div className="grid grid-cols-2 gap-2"><Metric label="WBGT" value={`${selected.wbgt}°C`} color="text-red-500" /><Metric label="UTCI" value={`${selected.utci}°C`} color="text-orange-500" /></div>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Impact indices</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Stethoscope className="w-3.5 h-3.5" />Hospitalization risk</span><span className="font-semibold text-slate-900 dark:text-white">{selected.hospitalizationRisk}%</span></div>
                  <div className="flex justify-between"><span className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><ShieldAlert className="w-3.5 h-3.5" />Mortality risk</span><span className="font-semibold text-red-600 dark:text-red-400">{selected.mortalityRisk}%</span></div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Vulnerable population</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Population icon={Users} label="Total population" value={selected.population.toLocaleString('en-IN')} />
                  <Population icon={Heart} label="Elderly" value={selected.elderlyPopulation.toLocaleString('en-IN')} />
                  <Population icon={Users} label="Children" value={selected.childrenPopulation.toLocaleString('en-IN')} />
                  <Population icon={Truck} label="Outdoor workers" value={selected.outdoorWorkerPopulation.toLocaleString('en-IN')} />
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
                <div className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-300"><AlertTriangle className="w-4 h-4" /> Immediate attention required</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{selected.reason}. Peak danger is 12 PM – 4 PM.</div>
              </div>
            </div>
          </> : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <Activity className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
              <div className="font-semibold text-slate-700 dark:text-slate-200">Select a ward</div>
              <div className="text-sm text-slate-400 dark:text-slate-500 mt-1">Click any ward on the map to see its full live risk profile.</div>
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...wards].sort((a, b) => b.mortalityRisk - a.mortalityRisk).slice(0, 5).map((w, i) => (
          <button key={w.wardId} onClick={() => setSelected(w)} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-left hover:border-cyan-400 dark:hover:border-cyan-500/50 transition">
            <div className="flex items-center justify-between"><span className="text-xs font-bold text-slate-400">#{i + 1}</span><RiskBadge level={w.riskLevel} /></div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white mt-2">{w.wardName}</div>
            <div className="text-xs text-slate-400 mt-0.5">{w.wardId} · {w.feelsLike}°C</div>
          </button>
        ))}
      </div>
    </div>
  );
}
