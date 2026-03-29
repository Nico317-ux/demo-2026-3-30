import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '../../utils/cn';
import { navCrossModules, navExtra, navHome, navCoreModules } from '../../utils/navConfig';

function NavSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <nav className="space-y-0.5">{children}</nav>
    </div>
  );
}

function Item({
  to,
  label,
  icon: Icon,
  onNavigate,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-sky-600 text-white shadow-sm'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white',
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useDashboardStore();

  const close = () => setSidebarOpen(false);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-100',
          'transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 font-bold text-white">
            BI
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">Operations dashboard</p>
            <p className="text-[10px] uppercase tracking-wide text-slate-500">Demo · USD · B2B</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          <NavSection title="General">
            <Item to={navHome.to} label={navHome.label} icon={navHome.icon} onNavigate={close} />
          </NavSection>
          <NavSection title="Core modules">
            {navCoreModules.map((item) => (
              <Item
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                onNavigate={close}
              />
            ))}
          </NavSection>
          <NavSection title="Cross analysis">
            {navCrossModules.map((item) => (
              <Item
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                onNavigate={close}
              />
            ))}
          </NavSection>
          <NavSection title="More">
            {navExtra.map((item) => (
              <Item
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                onNavigate={close}
              />
            ))}
          </NavSection>
        </div>

        <div className="border-t border-slate-800 p-3 text-[10px] text-slate-500">
          <p className="flex items-center gap-1 text-amber-400/90">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
            Mock data · Mar 2026
          </p>
        </div>
      </aside>
    </>
  );
}
