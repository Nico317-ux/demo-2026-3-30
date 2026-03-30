import { cn } from '../../utils/cn';
import type { HealthLightColor } from '../../types';

const textClass: Record<HealthLightColor, string> = {
  green:  'text-[#22C55E]',
  yellow: 'text-[#F59E0B]',
  red:    'text-[#DC3920]',
};

const borderClass: Record<HealthLightColor, string> = {
  green:  'border-[#22C55E]/30',
  yellow: 'border-[#F59E0B]/30',
  red:    'border-[#DC3920]/30',
};

const bgClass: Record<HealthLightColor, string> = {
  green:  'bg-[#22C55E]/15',
  yellow: 'bg-[#F59E0B]/15',
  red:    'bg-[#DC3920]/15',
};

const labels: Record<HealthLightColor, string> = {
  green:  'Verde',
  yellow: 'Amarillo',
  red:    'Rojo',
};

export function HealthLightChip({ color, label }: { color: HealthLightColor; label?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
      bgClass[color],
      borderClass[color],
      textClass[color],
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full bg-current inline-block')} aria-hidden />
      {label ?? labels[color]}
    </span>
  );
}
