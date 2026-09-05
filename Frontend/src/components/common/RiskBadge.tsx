import type { RiskLevel } from '@/types/dashboard';

export const riskColors: Record<RiskLevel, { bg: string; text: string; border: string; fill: string; hex: string }> = {
  Safe:     { bg: 'bg-emerald-100 dark:bg-emerald-500/15', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-500/40', fill: '#10b981', hex: '#10b981' },
  Moderate: { bg: 'bg-amber-100 dark:bg-amber-500/15',     text: 'text-amber-700 dark:text-amber-300',     border: 'border-amber-300 dark:border-amber-500/40',     fill: '#f59e0b', hex: '#f59e0b' },
  High:     { bg: 'bg-orange-100 dark:bg-orange-500/15',   text: 'text-orange-700 dark:text-orange-300',   border: 'border-orange-300 dark:border-orange-500/40',   fill: '#f97316', hex: '#f97316' },
  Severe:   { bg: 'bg-red-100 dark:bg-red-500/15',         text: 'text-red-700 dark:text-red-300',         border: 'border-red-300 dark:border-red-500/40',         fill: '#ef4444', hex: '#ef4444' },
  Extreme:  { bg: 'bg-purple-100 dark:bg-purple-500/15',   text: 'text-purple-700 dark:text-purple-300',   border: 'border-purple-300 dark:border-purple-500/40',   fill: '#a855f7', hex: '#a855f7' },
};

export function RiskBadge({ level, className = '' }: { level: RiskLevel; className?: string }) {
  const c = riskColors[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border} ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.fill }} />
      {level}
    </span>
  );
}
