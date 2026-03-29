import { cn } from '../../utils/cn';
import type { AlertSeverity } from '../../types';

const styles: Record<AlertSeverity, string> = {
  critical: 'bg-rose-100 text-rose-800 border-rose-200',
  high: 'bg-amber-100 text-amber-900 border-amber-200',
  medium: 'bg-sky-100 text-sky-900 border-sky-200',
  low: 'bg-slate-100 text-slate-700 border-slate-200',
};

const labels: Record<AlertSeverity, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function AlertBadge({ severity }: { severity: AlertSeverity }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        styles[severity],
      )}
    >
      {labels[severity]}
    </span>
  );
}
