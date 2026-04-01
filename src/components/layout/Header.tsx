import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const location = useLocation();

  // Determine base path for dynamic links
  const baseModule = location.pathname.split('/')[1] || 'comercial';
  const isAnalytics = location.pathname.includes('/analytics');
  const isStrategy = location.pathname.includes('/strategy');
  const isDashboard = !isAnalytics && !isStrategy;

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] h-20 z-40 bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent flex justify-between items-center px-4 md:px-10 pb-4">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-primary"
          onClick={onMenuToggle}
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <div className="relative group hidden sm:block">
          <span className="absolute inset-y-0 left-4 flex items-center text-on-surface-variant group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            className="input-ghost py-2 pl-12 pr-6 text-sm w-48 md:w-80 font-body"
            placeholder="Buscar en la plataforma..."
            type="text"
          />
        </div>

        <nav className="hidden lg:flex gap-8">
          <Link 
            to={`/${baseModule}`} 
            className={cn(
              "font-headline text-sm font-medium transition-all duration-400 pb-1",
              isDashboard ? "text-blue-400 border-b-2 border-blue-400 text-glow" : "text-slate-400 hover:text-blue-300"
            )}
          >
            Panel Principal
          </Link>
          <Link 
            to={`/${baseModule}/analytics`} 
            className={cn(
              "font-headline text-sm font-medium transition-all duration-400 pb-1",
              isAnalytics ? "text-blue-400 border-b-2 border-blue-400 text-glow" : "text-slate-400 hover:text-blue-300"
            )}
          >
            Analítica
          </Link>
          <Link 
            to={`/${baseModule}/strategy`} 
            className={cn(
              "font-headline text-sm font-medium transition-all duration-400 pb-1",
              isStrategy ? "text-blue-400 border-b-2 border-blue-400 text-glow" : "text-slate-400 hover:text-blue-300"
            )}
          >
            Estrategia
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="text-slate-400 hover:text-primary transition-colors duration-400 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,113,101,0.6)]"></span>
        </button>
        <button className="text-slate-400 hover:text-primary transition-colors duration-400">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/20 overflow-hidden relative cursor-pointer hover:border-primary transition-colors duration-400 bg-surface-container-high text-on-surface shadow-[0_0_15px_rgba(77,128,255,0.2)]">
          <span className="material-symbols-outlined text-xl">person</span>
        </div>
      </div>
    </header>
  );
}
