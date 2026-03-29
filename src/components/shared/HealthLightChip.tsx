import { cn } from '../../utils/cn';
import type { HealthLightColor } from '../../types';

const dotClass: Record<HealthLightColor, string> = {
  green:  'bg-emerald-400',
  yellow: 'bg-amber-400',
  red:    'bg-[#DC3920]',
};

const textClass: Record<HealthLightColor, string> = {
  green:  'text-emerald-400',
  yellow: 'text-amber-400',
  red:    'text-[#DC3920]',
};

const labels: Record<HealthLightColor, string> = {
  green:  'Verde',
  yellow: 'Amarillo',
  red:    'Rojo',
};

export function HealthLightChip({ color, label }: { color: HealthLightColor; label?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-2 rounded-full bg-[#0A204E] px-2 py-1 text-xs font-medium',
      textClass[color],
    )}>
      <span className={cn('h-2.5 w-2.5 rounded-full', dotClass[color])} aria-hidden />
      {label ?? labels[color]}
    </span>
  );
}
