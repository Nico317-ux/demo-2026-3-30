import { NavLink, useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../../store/dashboardStore';
import { cn } from '../../utils/cn';
import { navComercial, navFinanzas, navProduccion, navInteligencia } from '../../utils/navConfig';
import type { NavItem } from '../../utils/navConfig';
import { LogOut, ChevronRight } from 'lucide-react';
import { LogoBrand } from '../shared/LogoBrand';

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="px-5 pt-5 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
      {text}
    </p>
  );
}

function Item({
  to, label, icon: Icon, onNavigate,
}: {
  to: string; label: string; icon: NavItem['icon']; onNavigate?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group flex items-center mx-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative',
          isActive
            ? 'bg-white/12 text-white shadow-sm'
            : 'text-white/50 hover:bg-white/6 hover:text-white/80',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon className={cn("w-[18px] h-[18px] mr-3 shrink-0 transition-colors", isActive ? "text-brand-gold" : "text-white/40 group-hover:text-white/60")} />
          <span className="truncate flex-1">{label}</span>
          {isActive && <ChevronRight className="w-4 h-4 text-white/30" />}
        </>
      )}
    </NavLink>
  );
}

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useDashboardStore();
  const navigate = useNavigate();
  const close = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col sidebar-gradient',
          'transition-transform duration-300 ease-out lg:static lg:translate-x-0',
          'shadow-2xl lg:shadow-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 h-[72px] px-5 border-b border-white/8">
          <LogoBrand size="sm" />
          <div>
            <p className="text-white/40 text-[10px] font-medium tracking-widest uppercase">Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
          <SectionLabel text="Comercial" />
          {navComercial.map((item) => (
            <Item key={item.to} to={item.to} label={item.label} icon={item.icon} onNavigate={close} />
          ))}

          <SectionLabel text="Operaciones" />
          {navProduccion.map((item) => (
            <Item key={item.to} to={item.to} label={item.label} icon={item.icon} onNavigate={close} />
          ))}

          <SectionLabel text="Finanzas" />
          {navFinanzas.map((item) => (
            <Item key={item.to} to={item.to} label={item.label} icon={item.icon} onNavigate={close} />
          ))}

          <SectionLabel text="Inteligencia" />
          {navInteligencia.map((item) => (
            <Item key={item.to} to={item.to} label={item.label} icon={item.icon} onNavigate={close} />
          ))}
        </nav>
        
        {/* User + Logout */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-gold to-brand-red flex items-center justify-center text-white font-bold text-xs shadow-lg">
              KO
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Keller Ortega</p>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Coordinador</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-white/40 hover:text-white/70 hover:bg-white/6 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
