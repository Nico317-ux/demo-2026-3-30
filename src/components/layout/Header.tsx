import { Menu, SlidersHorizontal } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '../../utils/cn';
import { linesList, regionsList } from '../../data/sales.mock';

const periods = ['2026-01', '2026-02', '2026-03'];

export function Header({ title }: { title: string }) {
  const { filters, setFilter, toggleSidebar, sidebarOpen } = useDashboardStore();

  const regionOptions = ['All', ...regionsList];
  const lineOptions = ['All', ...linesList];
  const warehouseOptions = ['All', 'A', 'B'];

  return (
    <header className="sticky top-0 z-20 flex flex-col gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 text-slate-700 lg:hidden"
          onClick={toggleSidebar}
          aria-expanded={sidebarOpen}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Current view</p>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="hidden items-center gap-1 text-slate-500 sm:inline-flex">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          <span className="text-xs font-medium">Filters</span>
        </span>
        <select
          className={cn(
            'rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800',
            'focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
          )}
          value={filters.period}
          onChange={(e) => setFilter('period', e.target.value)}
        >
          {periods.map((p) => (
            <option key={p} value={p}>
              Period {p}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800"
          value={filters.region}
          onChange={(e) => setFilter('region', e.target.value)}
        >
          {regionOptions.map((r) => (
            <option key={r} value={r}>
              Region: {r}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800"
          value={filters.line}
          onChange={(e) => setFilter('line', e.target.value)}
        >
          {lineOptions.map((l) => (
            <option key={l} value={l}>
              Line: {l}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800"
          value={filters.warehouse}
          onChange={(e) => setFilter('warehouse', e.target.value)}
        >
          {warehouseOptions.map((w) => (
            <option key={w} value={w}>
              Warehouse: {w}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
