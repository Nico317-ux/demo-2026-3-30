import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";
import { LogoBrand } from "../shared/LogoBrand";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleExport = () => {
    alert("Iniciando exportación de reporte...");
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "mobile-sidebar h-screen w-72 fixed left-0 top-0 border-r border-slate-800/20 shadow-2xl shadow-blue-900/10 z-[100] flex flex-col py-8 pl-6 transition-transform duration-300",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="mb-12 pr-6">
          <LogoBrand size="md" />
        </div>

        <nav className="flex-1 space-y-2">
          <NavLink
            to="/comercial"
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 py-3 px-4 transition-all duration-300 font-headline text-sm tracking-wide rounded-l-full",
                isActive
                  ? "text-blue-400 dark:text-blue-300 bg-blue-500/10 font-semibold"
                  : "text-slate-400 dark:text-slate-500 hover:bg-slate-800/50 hover:text-blue-200",
              )
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              payments
            </span>
            Comercial
          </NavLink>
          <NavLink
            to="/finanzas"
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 py-3 px-4 transition-all duration-300 font-headline text-sm tracking-wide rounded-l-full",
                isActive
                  ? "text-blue-400 dark:text-blue-300 bg-blue-500/10 font-semibold"
                  : "text-slate-400 dark:text-slate-500 hover:bg-slate-800/50 hover:text-blue-200",
              )
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              account_balance
            </span>
            Finanzas
          </NavLink>
          <NavLink
            to="/produccion"
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 py-3 px-4 transition-all duration-300 font-headline text-sm tracking-wide rounded-l-full",
                isActive
                  ? "text-blue-400 dark:text-blue-300 bg-blue-500/10 font-semibold"
                  : "text-slate-400 dark:text-slate-500 hover:bg-slate-800/50 hover:text-blue-200",
              )
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              factory
            </span>
            Producción
          </NavLink>
          <NavLink
            to="/ia-assistant"
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-4 py-3 px-4 transition-all duration-300 font-headline text-sm tracking-wide rounded-l-full",
                isActive
                  ? "text-blue-400 dark:text-blue-300 bg-blue-500/10 font-semibold"
                  : "text-slate-400 dark:text-slate-500 hover:bg-slate-800/50 hover:text-blue-200",
              )
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              smart_toy
            </span>
            AI Assistant
          </NavLink>
        </nav>

        <div className="mt-auto pr-6 space-y-4">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all font-headline"
            onClick={() => navigate("/login")}
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            CERRAR SESIÓN
          </button>
          <button
            onClick={handleExport}
            className="w-full py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dim)] rounded-full text-[var(--color-on-primary-container)] font-bold text-sm tracking-tight flex items-center justify-center gap-2 shadow-lg shadow-[rgba(144,171,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-400 ease-out font-headline relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></span>
            <span className="material-symbols-outlined text-sm relative z-10">
              upload_file
            </span>
            <span className="relative z-10">Exportar Reporte</span>
          </button>
        </div>
      </aside>
    </>
  );
}
