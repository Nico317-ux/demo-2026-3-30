import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function ComercialDashboard() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".page-header", { y: -20, opacity: 0, duration: 0.8 })
      .from(".bento-item", { y: 30, opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .from(".ai-glow", { scale: 0.5, opacity: 0, duration: 1.5, ease: "power2.out" }, "-=0.8");
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col gap-12">
      <div className="page-header flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface">Dominio Comercial</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Inteligencia de clientes y portafolio.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-full bg-[var(--color-surface-container-high)] text-on-surface font-headline font-semibold text-sm border border-[rgba(65,71,91,0.2)] flex items-center gap-2 hover:bg-[var(--color-surface-container-highest)] hover:border-[rgba(144,171,255,0.2)] transition-all duration-400">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Regiones
          </button>
          <button className="px-6 py-2.5 rounded-full bg-[var(--color-surface-container-high)] text-on-surface font-headline font-semibold text-sm border border-[rgba(65,71,91,0.2)] flex items-center gap-2 hover:bg-[var(--color-surface-container-highest)] hover:border-[rgba(144,171,255,0.2)] transition-all duration-400">
            <span className="material-symbols-outlined text-lg">segment</span>
            Segmentos
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* AI Suggestion - Featured Header */}
        <div className="col-span-12 bento-item">
          <div className="relative overflow-hidden glass-card p-10 flex flex-col md:flex-row items-start md:items-center gap-8 border-l-[6px] border-[var(--color-tertiary)] bg-[var(--color-surface-variant)] shadow-xl z-10 w-full group transition-all duration-500 hover:shadow-[0_0_30px_rgba(155,255,206,0.1)]">
            <div className="h-20 w-20 bg-[var(--color-tertiary)]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[var(--color-tertiary)]/20 group-hover:bg-[var(--color-tertiary)]/20 transition-all">
              <span className="material-symbols-outlined text-[var(--color-tertiary)] text-4xl">auto_awesome</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[var(--color-tertiary)] font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Insight Inteligencia AI</h4>
              <p className="text-2xl text-on-surface font-medium leading-relaxed font-headline">
                <span className="font-bold">IA Tip:</span> Ferremundial representa el <span className="text-[var(--color-tertiary)] border-b-2 border-[var(--color-tertiary)]/30 pb-0.5">34.89% de ventas</span>, considera un programa de lealtad o crédito premium para asegurar esta cuenta ancla.
              </p>
            </div>
            <button className="px-8 py-4 rounded-full bg-[var(--color-tertiary)] text-[var(--color-on-tertiary)] font-bold font-headline hover:scale-[1.05] active:scale-[0.98] transition-transform duration-400 shadow-[0_0_20px_rgba(155,255,206,0.3)] mt-4 md:mt-0 whitespace-nowrap">
                Aplicar Estrategia
            </button>
            <div className="ai-glow absolute -right-32 -top-32 w-96 h-96 bg-[var(--color-tertiary)]/10 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>
          </div>
        </div>

        {/* Key Accounts Widget */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8 bento-item">
          <div className="glass-card p-8 h-full flex flex-col gap-8">
            <div className="flex justify-between items-center bg-[var(--color-surface-container-high)] p-4 rounded-2xl">
              <h3 className="text-xl font-bold font-headline text-on-surface tracking-tight">Cuentas Clave</h3>
              <span className="text-xs font-bold text-[var(--color-primary)] px-3 py-1 bg-[var(--color-primary)]/10 rounded-full tracking-widest border border-[var(--color-primary)]/20">TOP 10</span>
            </div>
            
            <div className="space-y-4 custom-scrollbar overflow-y-auto pr-2 max-h-[500px]">
              {/* Client 1 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[rgba(144,171,255,0.1)] cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-colors duration-400">
                    <span className="material-symbols-outlined text-[var(--color-primary)] group-hover:text-[var(--color-on-primary)]">corporate_fare</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Ferremundial Proto 2020 C.A.</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Distribuidor Principal • LATAM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-on-surface font-headline">$3,923.64</p>
                  <p className="text-[11px] font-bold text-[var(--color-tertiary)] flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                  </p>
                </div>
              </div>

              {/* Client 2 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[rgba(144,171,255,0.1)] cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-500/10 rounded-xl flex items-center justify-center group-hover:bg-slate-500 transition-colors duration-400 text-slate-400 group-hover:text-white">
                    <span className="material-symbols-outlined">store</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Pinta Ofertas C.A.</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Retail Outlet • Caribbean</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-on-surface font-headline">$583.54</p>
                  <p className="text-[11px] font-bold text-on-surface-variant flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">horizontal_rule</span> Estable
                  </p>
                </div>
              </div>

              {/* Client 3 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[var(--color-secondary)]/20 cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:text-[var(--color-on-secondary)] transition-colors duration-400 text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined">construction</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Global Build Ltd.</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Contratista • Norteamérica</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-on-surface font-headline">$2,410.12</p>
                  <p className="text-[11px] font-bold text-[var(--color-secondary)] flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">trending_down</span> 4%
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-[rgba(65,71,91,0.2)]">
              <button className="w-full text-center text-xs font-bold font-headline tracking-[0.2em] text-[var(--color-primary)] hover:text-[var(--color-primary-dim)] transition-colors uppercase">
                VER TODOS LOS 142 CLIENTES
              </button>
            </div>
          </div>
        </div>

        {/* Customer Map/Region View */}
        <div className="col-span-12 lg:col-span-7 bento-item">
          <div className="glass-card h-full overflow-hidden flex flex-col relative group">
            
            <div className="p-8 pb-4 flex justify-between items-center absolute top-0 left-0 w-full z-10 bg-gradient-to-b from-[var(--color-surface-container-low)] to-transparent pointer-events-none">
              <div>
                <h3 className="text-xl font-bold font-headline text-on-surface">Geografía</h3>
                <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-widest font-bold">Densidad de Concentración</p>
              </div>
              <div className="bg-[var(--color-surface-container-highest)] px-4 py-3 rounded-full text-[10px] font-bold tracking-widest flex items-center gap-6 border border-[rgba(144,171,255,0.1)] pointer-events-auto uppercase">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-tertiary)] shadow-[0_0_8px_rgba(155,255,206,0.6)]"></span>
                  <span>Crecimiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_rgba(144,171,255,0.6)]"></span>
                  <span>Principal</span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[450px] relative bg-black/40 overflow-hidden flex items-center justify-center">
              {/* Dotted World Map SVG Graphic */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000 flex items-center justify-center">
                <svg className="w-[120%] h-[120%] object-cover text-blue-500/30" viewBox="0 0 1000 500" fill="currentColor">
                  {/* Generate a simple grid of dots for the map look */}
                  <pattern id="dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" className="fill-current"></circle>
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
                  <path d="M200,100 Q400,50 600,150 T900,200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="opacity-50" />
                  <path d="M100,300 Q300,450 500,350 T800,400" fill="none" stroke="var(--color-tertiary)" strokeWidth="1" strokeDasharray="3,3" className="opacity-50" />
                </svg>
              </div>
              
              <div className="absolute inset-0 p-12 pointer-events-none">
                {/* Hotspot 1 */}
                <div className="absolute top-[35%] left-[25%] pointer-events-auto cursor-pointer hover:scale-125 transition-transform duration-300 group/spot">
                   <div className="absolute -inset-10 bg-[var(--color-primary)]/20 rounded-full blur-[30px] opacity-0 group-hover/spot:opacity-100 transition-opacity"></div>
                   <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full shadow-[0_0_20px_rgba(144,171,255,1)] border-2 border-white relative z-10 animate-pulse"></div>
                </div>

                {/* Hotspot 2 */}
                <div className="absolute top-[65%] left-[70%] pointer-events-auto cursor-pointer hover:scale-125 transition-transform duration-300 group/spot">
                   <div className="absolute -inset-12 bg-[var(--color-tertiary)]/20 rounded-full blur-[40px] opacity-0 group-hover/spot:opacity-100 transition-opacity"></div>
                   <div className="w-5 h-5 bg-[var(--color-tertiary)] rounded-full shadow-[0_0_25px_rgba(155,255,206,1)] border-[2.5px] border-white relative z-10 animate-pulse-soft"></div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[var(--color-surface-container-low)] flex flex-col md:flex-row items-center justify-between border-t border-[rgba(65,71,91,0.2)] relative z-20">
              <div className="flex gap-16">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] font-bold mb-1">Región Principal</p>
                  <p className="text-2xl font-bold text-on-surface font-headline">Sudamérica</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-tertiary)] font-bold mb-1">Puntos Activos</p>
                  <p className="text-2xl font-bold text-on-surface font-headline">24 Ubicaciones</p>
                </div>
              </div>
              <div className="flex -space-x-3 mt-4 md:mt-0 hover:space-x-1 transition-all duration-400">
                 <div className="w-12 h-12 rounded-full border-2 border-[var(--color-surface-container-low)] bg-blue-900/50 flex items-center justify-center text-[var(--color-primary)] relative z-[3] hover:z-10 transition-transform"> <span className="material-symbols-outlined text-xl">person</span> </div>
                 <div className="w-12 h-12 rounded-full border-2 border-[var(--color-surface-container-low)] bg-emerald-900/50 flex items-center justify-center text-[var(--color-tertiary)] relative z-[2] hover:z-10 transition-transform"> <span className="material-symbols-outlined text-xl">person_4</span> </div>
                 <div className="w-12 h-12 rounded-full border-2 border-[var(--color-surface-container-low)] bg-[var(--color-surface-container-highest)] flex items-center justify-center text-[10px] font-bold text-on-surface relative z-[1] hover:z-10 transition-transform hover:bg-[var(--color-primary)] hover:text-white">+12</div>
              </div>
            </div>

          </div>
        </div>

        {/* Secondary Intelligence Row */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bento-item glass-card p-8 flex flex-col justify-center gap-4 hover:shadow-[0_0_20px_rgba(144,171,255,0.05)] transition-all cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 shadow-inner">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">leaderboard</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-1">ARPU Mensual</p>
              <h5 className="text-3xl font-extrabold text-on-surface font-headline">$1,240.00</h5>
            </div>
          </div>
          <div className="bento-item glass-card p-8 flex flex-col justify-center gap-4 hover:shadow-[0_0_20px_rgba(255,113,101,0.05)] transition-all cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-secondary)]/10 flex items-center justify-center border border-[var(--color-secondary)]/20 shadow-inner">
              <span className="material-symbols-outlined text-[var(--color-secondary)] text-3xl">group_remove</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-1">Riesgo de Abandono</p>
              <h5 className="text-3xl font-extrabold text-on-surface font-headline">1.2%</h5>
            </div>
          </div>
          <div className="bento-item glass-card p-8 flex flex-col justify-center gap-4 hover:shadow-[0_0_20px_rgba(155,255,206,0.05)] transition-all cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-tertiary)]/10 flex items-center justify-center border border-[var(--color-tertiary)]/20 shadow-inner">
              <span className="material-symbols-outlined text-[var(--color-tertiary)] text-3xl">insights</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-1">Costo de Adquisición</p>
              <h5 className="text-3xl font-extrabold text-on-surface font-headline">$42.50</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
