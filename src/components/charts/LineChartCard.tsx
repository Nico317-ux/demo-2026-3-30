import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export const CHART_COLORS = {
  primary:   '#DC3920',
  secondary: '#38BDF8',
  tertiary:  '#22C55E',
  warning:   '#F59E0B',
  grid:      '#1C3260',
  axis:      '#5A6A84',
  tooltip: {
    bg:     '#0D1E3D',
    border: '#1C3260',
    text:   '#F1EEEE',
  },
} as const;

export function LineChartCard({
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
    <div
      className={cn(
        "bg-[#0D1E3D] rounded-xl border border-[#1C3260] p-4 hover:border-[#DC3920]/30 transition-colors",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#F1EEEE]">{title}</h3>
        {subtitle && <p className="text-xs text-[#A8B4C8] mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-64 w-full min-w-0">{children}</div>
    </div>
  );
}
