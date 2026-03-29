import { cn } from '../../utils/cn';
import type { AlertSeverity } from '../../types';

const styles: Record<AlertSeverity, string> = {
  critical: 'bg-[#DC3920]/20 text-[#DC3920] border-[#DC3920]/40',
  high:     'bg-amber-500/20 text-amber-300 border-amber-500/40',
  medium:   'bg-sky-500/20 text-sky-300 border-sky-500/40',
  low:      'bg-[#F1EEEE]/10 text-[#F1EEEE]/60 border-[#F1EEEE]/20',
};

const labels: Record<AlertSeverity, string> = {
  critical: 'Crítica',
  high:     'Alta',
  medium:   'Media',
  low:      'Baja',
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
