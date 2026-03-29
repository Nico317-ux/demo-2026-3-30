import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '../../utils/cn';
import { navCrossModules, navExtra, navHome, navCoreModules } from '../../utils/navConfig';

function NavSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#F1EEEE]/40">
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
            ? 'bg-[#DC3920]/20 text-[#DC3920] border-l-2 border-[#DC3920]'
            : 'text-[#F1EEEE]/70 hover:bg-[#032C61] hover:text-[#F1EEEE]',
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
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[#032C61] bg-[#0A204E] text-[#F1EEEE]',
          'transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo SUPER A */}
        <div className="flex items-center justify-center border-b border-[#032C61] px-4 py-4">
          <img
            src="/1724819364 (1) (1).svg"
            alt="Super A"
            className="h-10 w-auto object-contain"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          <NavSection title="General">
            <Item to={navHome.to} label={navHome.label} icon={navHome.icon} onNavigate={close} />
          </NavSection>
          <NavSection title="Módulos individuales">
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
          <NavSection title="Análisis cruzados">
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
          <NavSection title="Más">
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

        <div className="border-t border-[#032C61] p-3 text-[10px] text-[#F1EEEE]/40">
          <p className="flex items-center gap-1 text-amber-400/80">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
            Datos demo · Mar 2026
          </p>
        </div>
      </aside>
    </>
  );
}
