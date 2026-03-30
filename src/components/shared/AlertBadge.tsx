import { cn } from '../../utils/cn';
import type { AlertSeverity } from '../../types';

const styles: Record<AlertSeverity, string> = {
  critical: 'bg-[#DC3920]/15 text-[#DC3920] border-[#DC3920]/30',
  high:     'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
  medium:   'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
  low:      'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30',
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
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles[severity],
      )}
    >
      {labels[severity]}
    </span>
  );
}
