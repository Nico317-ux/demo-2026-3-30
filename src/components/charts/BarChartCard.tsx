import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export function BarChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-[#0A204E] bg-[#032C61] p-4 shadow-sm', className)}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#F1EEEE]">{title}</h3>
        {subtitle && <p className="text-xs text-[#F1EEEE]/60">{subtitle}</p>}
      </div>
      <div className="h-64 w-full min-w-0">{children}</div>
    </div>
  );
}
