import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers3, X } from 'lucide-react';
import { wards, hospitals, coolingCentres, waterPoints } from '@/data/mockData';
import { riskColors, RiskBadge } from '@/components/common/RiskBadge';
import { blueIcon, cyanIcon, makePolygon, redIcon } from '@/components/map/mapIcons';
import type { Ward } from '@/types/dashboard';

function FlyTo({ ward }: { ward: Ward | null }) {
  const map = useMap();
  useEffect(() => {
    if (ward) map.flyTo(ward.center, 12, { duration: 0.8 });
  }, [map, ward]);
  return null;
}

export default function HeatRiskMap() {
  const [selected, setSelected] = useState<Ward | null>(null);
  const [layer, setLayer] = useState<'risk' | 'resources'>('risk');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Heat Risk Map</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Delhi · 18 wards · interactive GIS overlay</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setLayer('risk')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${layer === 'risk' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}><Layers3 className="inline w-3.5 h-3.5 mr-1" />Risk</button>
          <button onClick={() => setLayer('resources')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${layer === 'resources' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>Resources</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm h-[560px] relative z-0">
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

        <div className="lg:col-span-1">
          {!selected ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center">
              <Layers3 className="w-10 h-10 text-slate-300 dark:text-slate-700 mb-3" />
              <div className="font-semibold text-slate-700 dark:text-slate-200">Select a ward</div>
              <div className="text-sm text-slate-400 dark:text-slate-500 mt-1">Click any ward on the map to see its risk level. For full live details, open the Live Risk page.</div>
              <div className="mt-6 w-full space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded bg-emerald-500" /> Safe</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded bg-amber-500" /> Moderate</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded bg-orange-500" /> High</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded bg-red-500" /> Severe</div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="w-3 h-3 rounded bg-purple-500" /> Extreme</div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-start justify-between">
                  <div><div className="text-xs text-slate-400">{selected.wardId}</div><div className="text-lg font-bold text-slate-900 dark:text-white">{selected.wardName}</div></div>
                  <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4 text-slate-400" /></button>
                </div>
                <div className="mt-2 flex items-center gap-2"><RiskBadge level={selected.riskLevel} /><span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{selected.temperature}°C</span></div>
              </div>
              <div className="p-5 space-y-3 overflow-y-auto">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"><div className="text-xs text-slate-400">Feels like</div><div className="text-lg font-bold text-slate-900 dark:text-white">{selected.feelsLike}°C</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"><div className="text-xs text-slate-400">People affected</div><div className="text-lg font-bold text-slate-900 dark:text-white">{(selected.population / 100000).toFixed(2)} lakh</div></div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{selected.reason}</div>
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30">
                  <div className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">For full live risk details, visit the Live Risk page.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
