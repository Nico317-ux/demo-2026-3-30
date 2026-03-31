import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function ProduccionDashboard() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".page-header", { y: -20, opacity: 0, duration: 0.8 })
      .from(".bento-item", { y: 30, opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .from(".table-row", { x: -20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.6");
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col gap-12">
      
      {/* Header Section */}
      <div className="page-header flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Control de Producción</h2>
          <p className="text-on-surface-variant mt-2 font-body text-lg">Mapeo de inventario y análisis financiero en tiempo real.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[var(--color-surface-container-low)] px-5 py-3 rounded-xl border border-[rgba(65,71,91,0.2)] shadow-inner">
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-1 font-bold">Estado del Sistema</span>
            <span className="flex items-center gap-2 text-[var(--color-tertiary)] font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-tertiary)] shadow-[0_0_8px_rgba(155,255,206,0.6)] animate-pulse"></span>
              Operativo
            </span>
          </div>
        </div>
      </div>

      {/* Top Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Inventory Value Card */}
        <div className="bento-item glass-card p-8 rounded-2xl col-span-1 md:col-span-2 flex flex-col justify-between min-h-[160px]">
          <div>
            <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">account_balance_wallet</span>
              Valor de Inventario
            </p>
            <h3 className="text-3xl font-extrabold font-headline mt-4 text-white drop-shadow-md">$9,605.78</h3>
          </div>
          <div className="flex items-center gap-2 text-[var(--color-tertiary)] text-xs mt-6 font-bold uppercase tracking-widest bg-[var(--color-tertiary)]/10 w-fit px-3 py-1.5 rounded-full border border-[var(--color-tertiary)]/20">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+2.4% desde último periodo</span>
          </div>
        </div>

        {/* Stock Levels */}
        <div className="bento-item glass-card p-8 rounded-2xl flex flex-col justify-center items-center text-center">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-4">SKUs Sanos</p>
          <div className="text-3xl font-extrabold text-[var(--color-tertiary)] font-headline drop-shadow-lg">02</div>
          <div className="w-16 h-1.5 bg-[var(--color-tertiary)]/20 rounded-full mt-6 overflow-hidden">
            <div className="w-full h-full bg-[var(--color-tertiary)] rounded-full shadow-[0_0_10px_rgba(155,255,206,0.8)]"></div>
          </div>
        </div>

        <div className="bento-item glass-card p-8 rounded-2xl flex flex-col justify-center items-center text-center border border-[var(--color-secondary)]/20 shadow-[inset_0_0_20px_rgba(255,113,101,0.05)]">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-4">SKUs Críticos</p>
          <div className="text-3xl font-extrabold text-[var(--color-secondary)] font-headline drop-shadow-lg">02</div>
          <div className="w-16 h-1.5 bg-[var(--color-secondary)]/20 rounded-full mt-6 overflow-hidden">
            <div className="w-1/2 h-full bg-[var(--color-secondary)] rounded-full shadow-[0_0_10px_rgba(255,113,101,0.8)]"></div>
          </div>
        </div>
      </div>

      {/* Main Inventory & AI Panel Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Inventory Monitor Table */}
        <div className="bento-item lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold font-headline flex items-center gap-3">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">inventory_2</span>
              Monitor de Inventario
            </h4>
            <button className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest hover:text-[var(--color-primary-dim)] transition-colors">Ver Todos los Activos</button>
          </div>

          <div className="glass-card overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--color-surface-container-high)]/60">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">SKU de Producto</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Descripción</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-center">Estado</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(65,71,91,0.2)]">
                <tr className="table-row hover:bg-[var(--color-surface-container-highest)]/40 transition-colors cursor-pointer group">
                  <td className="px-8 py-6 font-mono text-sm text-[var(--color-primary)] font-medium group-hover:text-white transition-colors">404400702006</td>
                  <td className="px-8 py-6 text-sm font-bold text-on-surface">Precision Industrial Rotor A1</td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border border-[var(--color-secondary)]/20">Crítico</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="material-symbols-outlined text-on-surface-variant hover:text-[var(--color-primary)] transition-colors">more_vert</button>
                  </td>
                </tr>
                <tr className="table-row hover:bg-[var(--color-surface-container-highest)]/40 transition-colors cursor-pointer group">
                  <td className="px-8 py-6 font-mono text-sm text-[var(--color-primary)] font-medium group-hover:text-white transition-colors">1804400101015</td>
                  <td className="px-8 py-6 text-sm font-bold text-on-surface">Fiberglass Compound 20kg</td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--color-tertiary)]/10 text-[var(--color-tertiary)] border border-[var(--color-tertiary)]/20">Sano</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="material-symbols-outlined text-on-surface-variant hover:text-[var(--color-primary)] transition-colors">more_vert</button>
                  </td>
                </tr>
                <tr className="table-row hover:bg-[var(--color-surface-container-highest)]/40 transition-colors cursor-pointer group">
                  <td className="px-8 py-6 font-mono text-sm text-[var(--color-primary)] font-medium group-hover:text-white transition-colors">220993004001</td>
                  <td className="px-8 py-6 text-sm font-bold text-on-surface">Thermal Sealant 500ml</td>
                  <td className="px-8 py-6 text-center">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">Atención</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="material-symbols-outlined text-on-surface-variant hover:text-[var(--color-primary)] transition-colors">more_vert</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="bento-item space-y-6">
          <h4 className="text-2xl font-bold font-headline flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-primary-container)] text-3xl">auto_awesome</span>
            Núcleo Neuronal
          </h4>

          <div className="glass-card h-[460px] flex flex-col shadow-[0_0_30px_rgba(144,171,255,0.05)] border border-[var(--color-primary-container)]/20 relative overflow-hidden">
             
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar relative z-10">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/30">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
                </div>
                <div className="bg-[var(--color-surface-container-highest)]/80 p-5 rounded-2xl rounded-tl-none text-sm leading-relaxed border border-[rgba(65,71,91,0.2)] font-medium">
                  <p className="text-[var(--color-primary-container)] font-bold mb-2 uppercase tracking-widest text-[10px]">Neural IA</p>
                  Hola, ¿en qué puedo ayudarte hoy? He analizado el stock y el SKU 404400702006 está en rotura de stock crítica.
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary-dim)]/10 p-5 rounded-2xl rounded-tr-none text-sm leading-relaxed border border-[var(--color-primary)]/30 max-w-[85%] font-medium">
                  ¿Cuál es el impacto financiero de esta rotura proyectada?
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/30">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-sm">smart_toy</span>
                </div>
                <div className="bg-[var(--color-surface-container-highest)]/80 p-5 rounded-2xl rounded-tl-none text-sm leading-relaxed border border-[rgba(65,71,91,0.2)] font-medium">
                  <p className="text-[var(--color-primary-container)] font-bold mb-2 uppercase tracking-widest text-[10px]">Neural IA</p>
                  El impacto mensual estimado es de <strong className="text-white">$12,400.00</strong> en ingresos perdidos. Recomiendo iniciar orden de backorder inmediatamente.
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-[rgba(65,71,91,0.2)] bg-[var(--color-surface-container-low)]/80 relative z-10">
              <div className="relative group transition-all duration-400">
                <input 
                  type="text" 
                  className="input-ghost w-full py-4 pl-6 pr-14 text-sm font-medium tracking-wide placeholder-[rgba(165,170,194,0.4)] group-focus-within:border-[var(--color-primary)]/50 transition-colors bg-black/20" 
                  placeholder="Iniciar secuencia de comandos..." 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(144,171,255,0.4)]">
                  <span className="material-symbols-outlined text-[var(--color-on-primary-container)] text-[18px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Insights & Operational KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        <div className="bento-item md:col-span-2 glass-card p-10 rounded-2xl">
          <h4 className="text-2xl font-bold font-headline mb-10 flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">monitoring</span>
            KPIs de Análisis Financiero
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            
            <div className="space-y-3">
              <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-bold">Eficiencia OpEx</p>
              <div className="text-3xl font-extrabold text-on-surface font-headline">94.2%</div>
              <div className="flex items-center gap-1.5 text-[var(--color-tertiary)] text-[11px] uppercase tracking-widest font-bold bg-[var(--color-tertiary)]/10 w-fit px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span> 0.8%
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-bold">Tasa de Quema (Inv)</p>
              <div className="text-3xl font-extrabold text-on-surface font-headline flex items-end">
                $1,240<span className="text-lg opacity-40 mb-1 ml-1">/d</span>
              </div>
              <div className="flex items-center gap-1.5 text-[var(--color-secondary)] text-[11px] uppercase tracking-widest font-bold bg-[var(--color-secondary)]/10 w-fit px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span> 12%
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-bold">Margen Proyectado</p>
              <div className="text-3xl font-extrabold text-on-surface font-headline">18.5%</div>
              <div className="flex items-center gap-1.5 text-[var(--color-tertiary)] text-[11px] uppercase tracking-widest font-bold bg-[var(--color-tertiary)]/10 w-fit px-2 py-1 rounded-md">
                <span className="material-symbols-outlined text-sm">keyboard_arrow_up</span> 2.1%
              </div>
            </div>

          </div>
        </div>

        <div className="bento-item glass-card overflow-hidden rounded-2xl relative group cursor-pointer h-[280px] flex items-center justify-center">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--color-primary)]"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
           </svg>
           <span className="material-symbols-outlined text-6xl text-[var(--color-primary)] opacity-20 relative z-0 group-hover:scale-110 transition-transform duration-1000">precision_manufacturing</span>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent p-8 flex flex-col justify-end pointer-events-none z-10">
            <h5 className="font-extrabold text-xl font-headline text-white drop-shadow-lg">Estado Línea 04</h5>
            <p className="text-[11px] text-on-surface font-bold uppercase tracking-widest mt-2 drop-shadow-md">Monitoreo Activo</p>
            <div className="mt-5 flex gap-3 items-center bg-[var(--color-surface-container)]/80 w-fit px-4 py-2 rounded-full backdrop-blur-md border border-[rgba(65,71,91,0.4)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-tertiary)] animate-pulse shadow-[0_0_10px_rgba(155,255,206,1)]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-tertiary)]">Transmisión en Vivo</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
