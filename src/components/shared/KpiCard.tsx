import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
  className?: string;
}

export function KpiCard({ label, value, delta, deltaLabel, icon: Icon, className }: KpiCardProps) {
  const positive = delta !== undefined && delta >= 0;
  return (
    <div
      className={cn(
        'rounded-xl border border-[#0A204E] bg-[#032C61] p-4 shadow-sm',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-[#F1EEEE]/60">{label}</p>
        {Icon && (
          <span className="rounded-lg bg-[#0A204E] p-2 text-[#DC3920]">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-[#F1EEEE]">{value}</p>
      {delta !== undefined && (
        <p
          className={cn(
            'mt-1 text-xs font-medium',
            positive ? 'text-emerald-400' : 'text-[#DC3920]',
          )}
        >
          {positive ? '+' : ''}
          {delta.toFixed(1)}% {deltaLabel ?? 'vs período ant.'}
        </p>
      )}
    </div>
  );
}
