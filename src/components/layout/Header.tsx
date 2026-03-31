import { Menu, Bell, Search, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDashboardStore } from "../../store/dashboardStore";
import { getRouteTitle } from "../../utils/navConfig";

export function Header() {
  const { pathname } = useLocation();
  const { toggleSidebar, sidebarOpen } = useDashboardStore();
  const pageTitle = getRouteTitle(pathname);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-[72px] header-light px-5 md:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-all lg:hidden"
          onClick={toggleSidebar}
          aria-expanded={sidebarOpen}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight">
            {pageTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted group-focus-within:text-brand-gold transition-colors" />
          <input
            type="text"
            placeholder="Buscar productos, clientes..."
            className="w-56 pl-10 pr-4 py-2.5 bg-surface-1 border border-surface-2 rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold/30 transition-all"
          />
        </div>

        {/* Period indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-1 border border-surface-2 text-sm text-text-secondary font-medium">
          <Calendar className="w-4 h-4 text-brand-gold" />
          Marzo 2026
        </div>
        
        {/* Notification */}
        <button className="relative p-2.5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-1 transition-all">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-red ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
