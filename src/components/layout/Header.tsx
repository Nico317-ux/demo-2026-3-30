import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-18rem)] h-20 z-40 bg-slate-900/30 backdrop-blur-2xl flex justify-between items-center px-10 shadow-sm shadow-blue-500/5">
      <div className="flex items-center gap-8">
        <div className="relative group">
          <span className="absolute inset-y-0 left-4 flex items-center text-on-surface-variant group-focus-within:text-primary transition-colors">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input 
            className="input-ghost py-2 pl-12 pr-6 text-sm w-80 font-body" 
            placeholder="Buscar en la plataforma..." 
            type="text" 
          />
        </div>

        <nav className="hidden md:flex gap-8">
          <Link to={location.pathname} className="text-blue-400 border-b-2 border-blue-400 pb-1 font-headline text-sm font-medium">
            Panel Principal
          </Link>
          <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-400 font-headline text-sm font-medium">Analítica</a>
          <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-400 font-headline text-sm font-medium">Estrategia</a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-primary transition-colors duration-400 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-secondary"></span>
        </button>
        <button className="text-slate-400 hover:text-primary transition-colors duration-400">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="h-10 w-10 flex items-center justify-center rounded-full border border-primary/20 overflow-hidden relative cursor-pointer hover:border-primary transition-colors duration-400 bg-surface-container-high text-on-surface">
          <span className="material-symbols-outlined text-xl">person</span>
        </div>
      </div>
    </header>
  );
}
