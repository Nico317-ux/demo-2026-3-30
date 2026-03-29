import { cn } from '../../utils/cn';
import type { HealthLightColor } from '../../types';

const colorClass: Record<HealthLightColor, string> = {
  green: 'bg-emerald-500',
  yellow: 'bg-amber-400',
  red: 'bg-rose-500',
};

const labels: Record<HealthLightColor, string> = {
  green: 'Green',
  yellow: 'Yellow',
  red: 'Red',
};

export function HealthLightChip({ color, label }: { color: HealthLightColor; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-800">
      <span className={cn('h-2.5 w-2.5 rounded-full', colorClass[color])} aria-hidden />
      {label ?? labels[color]}
    </span>
  );
}
