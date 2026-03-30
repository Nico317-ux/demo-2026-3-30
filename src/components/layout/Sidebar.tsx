import { NavLink } from 'react-router-dom';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '../../utils/cn';
import { navCrossModules, navExtra, navHome, navCoreModules } from '../../utils/navConfig';
import type { NavItem } from '../../utils/navConfig';

function Divider() {
  return <hr className="border-t border-[#1C3260] my-2 mx-1" />;
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="px-3 pt-1 pb-1 text-[10px] font-medium uppercase tracking-widest text-[#5A6A84]">
      {text}
    </p>
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
  icon: NavItem['icon'];
  onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center rounded-lg mx-1 px-3 py-2 text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-[#DC3920]/15 text-[#F1EEEE] border-l-2 border-[#DC3920]'
            : 'text-[#A8B4C8] hover:bg-[#122347] hover:text-[#F1EEEE]',
        )
      }
    >
      <Icon className="w-4 h-4 mr-3 shrink-0" aria-hidden />
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
          'fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[#0A204E]/60 bg-[#0A204E]',
          'transition-transform duration-200 lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center px-4">
          <img
            src="/1724819364 (1) (1).svg"
            alt="Super A"
            className="h-10 w-auto object-contain"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <Item to={navHome.to} label={navHome.label} icon={navHome.icon} onNavigate={close} />

          <Divider />
          <SectionLabel text="Módulos" />
          {navCoreModules.map((item) => (
            <Item
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              onNavigate={close}
            />
          ))}

          <Divider />
          <SectionLabel text="Análisis" />
          {navCrossModules.map((item) => (
            <Item
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              onNavigate={close}
            />
          ))}

          <Divider />
          {navExtra.map((item) => (
            <Item
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              onNavigate={close}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
