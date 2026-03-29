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
    <header className="sticky top-0 z-20 flex flex-col gap-3 border-b border-[#032C61] bg-[#0A204E]/95 px-4 py-3 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-[#032C61] p-2 text-[#F1EEEE]/70 hover:text-[#F1EEEE] lg:hidden"
          onClick={toggleSidebar}
          aria-expanded={sidebarOpen}
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#F1EEEE]/50">Vista actual</p>
          <h2 className="text-lg font-semibold text-[#F1EEEE]">{title}</h2>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="hidden items-center gap-1 text-[#F1EEEE]/50 sm:inline-flex">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          <span className="text-xs font-medium">Filtros</span>
        </span>
        <select
          className={cn(
            'rounded-lg border border-[#032C61] bg-[#032C61] px-2 py-1.5 text-sm text-[#F1EEEE]',
            'focus:border-[#DC3920] focus:outline-none focus:ring-1 focus:ring-[#DC3920]',
          )}
          value={filters.period}
          onChange={(e) => setFilter('period', e.target.value)}
        >
          {periods.map((p) => (
            <option key={p} value={p}>
              Período {p}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-[#032C61] bg-[#032C61] px-2 py-1.5 text-sm text-[#F1EEEE] focus:border-[#DC3920] focus:outline-none focus:ring-1 focus:ring-[#DC3920]"
          value={filters.region}
          onChange={(e) => setFilter('region', e.target.value)}
        >
          {regionOptions.map((r) => (
            <option key={r} value={r}>
              Región: {r}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-[#032C61] bg-[#032C61] px-2 py-1.5 text-sm text-[#F1EEEE] focus:border-[#DC3920] focus:outline-none focus:ring-1 focus:ring-[#DC3920]"
          value={filters.line}
          onChange={(e) => setFilter('line', e.target.value)}
        >
          {lineOptions.map((l) => (
            <option key={l} value={l}>
              Línea: {l}
            </option>
          ))}
        </select>
        <select
          className="rounded-lg border border-[#032C61] bg-[#032C61] px-2 py-1.5 text-sm text-[#F1EEEE] focus:border-[#DC3920] focus:outline-none focus:ring-1 focus:ring-[#DC3920]"
          value={filters.warehouse}
          onChange={(e) => setFilter('warehouse', e.target.value)}
        >
          {warehouseOptions.map((w) => (
            <option key={w} value={w}>
              Almacén: {w}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
