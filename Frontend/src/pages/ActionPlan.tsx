import { actions } from '@/data/mockData';
import { ClipboardList, ChevronRight } from 'lucide-react';

const yellowActions = actions.filter(a => a.priority === 'Medium');
const orangeActions = actions.filter(a => a.priority === 'High');
const redActions = actions.filter(a => a.priority === 'Critical');

const priorityTasks = [
  { n: 1, task: 'Restrict outdoor construction in 5 priority wards', time: '12 PM – 4 PM', dept: 'Labour & Safety' },
  { n: 2, task: 'Activate 58 cooling centres across high-risk wards', time: 'Before 11 AM', dept: 'Public Health' },
  { n: 3, task: 'Deploy 12 water tanker routes to markets and hubs', time: '11 AM onwards', dept: 'Water Works' },
  { n: 4, task: 'Issue public advisory to 1.25 lakh citizens', time: 'Immediate', dept: 'Communications' },
  { n: 5, task: 'Monitor emergency departments at 5 hospitals', time: 'All day', dept: 'Health Services' },
];

function ActionCard({ a, accent }: { a: typeof actions[0]; accent: string }) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex items-start justify-between gap-2">
        <div className="font-semibold text-slate-900 dark:text-white text-sm">{a.title}</div>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${accent}`}>{a.priority}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        <div><span className="text-slate-400">Trigger:</span> <span className="text-slate-700 dark:text-slate-200">{a.trigger}</span></div>
        <div><span className="text-slate-400">Department:</span> <span className="text-slate-700 dark:text-slate-200">{a.department}</span></div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-slate-500 dark:text-slate-400">{a.detail}</span>
        <span className={`text-[11px] font-semibold ${a.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : a.status === 'Dispatched' ? 'text-blue-600 dark:text-blue-400' : a.status === 'Broadcasted' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500'}`}>{a.status}</span>
      </div>
    </div>
  );
}

export default function ActionPlan() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Action Plan</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">What the Municipal Corporation should do</p>
      </div>

      {/* Today's priority actions */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
        <div className="flex items-center gap-2 mb-4"><ClipboardList className="w-5 h-5" /><h2 className="font-bold">Today's Priority Actions</h2></div>
        <div className="space-y-2">
          {priorityTasks.map(t => (
            <div key={t.n} className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur border border-white/15">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold shrink-0">{t.n}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold">{t.task}</div>
                <div className="text-xs text-white/70">{t.dept} · {t.time}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60 shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Red actions */}
      <section>
        <div className="flex items-center gap-2 mb-3"><span className="w-3 h-3 rounded bg-red-500" /><h2 className="font-bold text-slate-900 dark:text-white">Red Actions</h2><span className="text-xs text-slate-400">Critical priority</span></div>
        <div className="grid sm:grid-cols-2 gap-3">{redActions.map(a => <ActionCard key={a.title} a={a} accent="bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300" />)}</div>
      </section>

      {/* Orange actions */}
      <section>
        <div className="flex items-center gap-2 mb-3"><span className="w-3 h-3 rounded bg-orange-500" /><h2 className="font-bold text-slate-900 dark:text-white">Orange Actions</h2><span className="text-xs text-slate-400">High priority</span></div>
        <div className="grid sm:grid-cols-2 gap-3">{orangeActions.map(a => <ActionCard key={a.title} a={a} accent="bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300" />)}</div>
      </section>

      {/* Yellow actions */}
      <section>
        <div className="flex items-center gap-2 mb-3"><span className="w-3 h-3 rounded bg-amber-500" /><h2 className="font-bold text-slate-900 dark:text-white">Yellow Actions</h2><span className="text-xs text-slate-400">Moderate priority</span></div>
        <div className="grid sm:grid-cols-2 gap-3">{yellowActions.map(a => <ActionCard key={a.title} a={a} accent="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" />)}</div>
      </section>
    </div>
  );
}
