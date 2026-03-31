import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mockKpis, mockEstadisticasProductos } from "../../data/mockData";

gsap.registerPlugin(useGSAP);

export function FinanzasDashboard() {
  const container = useRef<HTMLDivElement>(null);
  
  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  const topSku = mockEstadisticasProductos.reduce((p, c) => (p.ventas_usd > c.ventas_usd) ? p : c);
  const totalInventory = mockKpis.valorInventarioPareto_USD + mockKpis.valorInventarioFueraPareto_USD;
  const paretoPercent = Math.round((mockKpis.valorInventarioPareto_USD / totalInventory) * 100);
  const fueraParetoPct = 100 - paretoPercent;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".page-header", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(".bento-item", { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .fromTo(".progress-bar", { width: 0 }, { width: (_, target) => target.dataset.width, duration: 1.5, ease: "power4.out" }, "-=0.4");
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col gap-12">
      {/* Page Header */}
      <div className="page-header flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">Inteligencia Financiera</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Asignación de capital y análisis de riesgo.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-primary)] font-headline font-semibold text-sm border border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(144,171,255,0.1)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-all duration-400">
            Exportar Auditoría
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* KPI Cards */}
        <div className="bento-item glass-card p-8 group relative overflow-hidden border-t-2 border-[var(--color-tertiary)] hover:border-[var(--color-tertiary)] hover:shadow-[0_0_30px_rgba(155,255,206,0.1)] transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-tertiary)]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-tertiary)]/10 flex items-center justify-center text-[var(--color-tertiary)] border border-[var(--color-tertiary)]/20">
              <span className="material-symbols-outlined text-[28px]">payments</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 px-3 py-1.5 rounded-full border border-[var(--color-tertiary)]/20 flex items-center gap-1">
              Top 80%
            </span>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Inventario Pareto (A)</p>
          <p className="text-3xl font-display font-extrabold text-white font-headline tracking-tighter">{fmt(mockKpis.valorInventarioPareto_USD)}</p>
          
          <div className="mt-6 h-1.5 bg-[var(--color-surface-container)] rounded-full overflow-hidden">
            <div className="progress-bar h-full bg-[var(--color-tertiary)] rounded-full shadow-[0_0_10px_rgba(155,255,206,0.8)]" data-width={`${paretoPercent}%`} />
          </div>
          <p className="text-[11px] text-on-surface-variant mt-2 font-medium uppercase tracking-widest">{paretoPercent}% del valor total rotativo</p>
        </div>

        <div className="bento-item glass-card p-8 group relative overflow-hidden border-t-2 border-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(144,171,255,0.1)] transition-all">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-primary)]/20">
              <span className="material-symbols-outlined text-[28px]">account_balance_wallet</span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Inventario Lento (B/C)</p>
          <p className="text-3xl font-display font-extrabold text-white font-headline tracking-tighter">{fmt(mockKpis.valorInventarioFueraPareto_USD)}</p>
          
          <div className="mt-6 h-1.5 bg-[var(--color-surface-container)] rounded-full overflow-hidden">
            <div className="progress-bar h-full bg-[var(--color-primary)] rounded-full shadow-[0_0_10px_rgba(144,171,255,0.8)]" data-width={`${fueraParetoPct}%`} />
          </div>
          <p className="text-[11px] text-[var(--color-primary)] mt-2 font-bold uppercase tracking-widest">Capital inmovilizado</p>
        </div>

        <div className="bento-item glass-card p-8 group relative overflow-hidden border-t-2 border-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:shadow-[0_0_30px_rgba(255,113,101,0.1)] transition-all">
           <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-2xl pointer-events-none"></div>
           
           <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] border border-[var(--color-secondary)]/20">
              <span className="material-symbols-outlined text-[28px]">timeline</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 px-3 py-1.5 rounded-full border border-[var(--color-tertiary)]/20 flex items-center gap-1">
              +24.5% Anual
            </span>
          </div>
           <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Margen Promedio</p>
           <p className="text-3xl font-display font-extrabold text-white font-headline tracking-tighter">24.5%</p>
           <p className="text-[11px] text-on-surface-variant mt-6 uppercase tracking-widest font-bold">Sobre línea SUPER A Central</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Star Product Card */}
        <div className="bento-item lg:col-span-2 glass-card p-10 flex flex-col justify-between border-l-[6px] border-l-[var(--color-primary)]">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(65,71,91,0.2)]">
            <h3 className="font-headline font-bold text-2xl text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-[var(--color-primary)]">star</span>
              Producto Estrella del Período
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-12 flex-1 items-stretch">
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-fit">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-tertiary)] uppercase bg-[var(--color-tertiary)]/10 border border-[var(--color-tertiary)]/30 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(155,255,206,0.1)]">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> MÁS VENDIDO
                </span>
              </div>
              <h4 className="text-2xl font-extrabold text-white mt-5 leading-snug font-headline">{topSku.descripcion}</h4>
              <p className="text-sm text-[var(--color-primary-container)] mt-2 font-mono tracking-widest uppercase">SKU: {topSku.sku}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-[var(--color-surface-container)]/80 p-5 rounded-2xl border border-[rgba(65,71,91,0.2)]">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Ingresos Totales</p>
                  <p className="text-xl font-headline font-extrabold text-[var(--color-tertiary)]">{fmt(topSku.ventas_usd)}</p>
                </div>
                <div className="bg-[var(--color-surface-container)]/80 p-5 rounded-2xl border border-[rgba(65,71,91,0.2)]">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-1.5">Margen Generado</p>
                  <p className="text-xl font-headline font-extrabold text-[var(--color-primary)]">24.5%</p>
                </div>
              </div>
              
              <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl bg-[var(--color-secondary)]/5 border border-[var(--color-secondary)]/20">
                <span className="material-symbols-outlined text-[var(--color-secondary)] text-xl shrink-0 mt-0.5 animate-pulse">warning</span>
                <p className="text-[12px] text-on-surface leading-relaxed font-medium">
                  Este SKU genera el <strong>4.4%</strong> de los ingresos con margen superior al promedio. <strong>Alerta:</strong> su stock actual es <span className="text-[var(--color-secondary)] font-bold">0 unidades</span> — alto riesgo de pérdida recurrente.
                </p>
              </div>
            </div>

            <div className="w-full md:w-64 bg-[var(--color-surface-container)] rounded-3xl border border-[var(--color-primary)]/10 flex items-center justify-center relative overflow-hidden group hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_30px_rgba(144,171,255,0.1)] transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent group-hover:opacity-100 opacity-50 transition-opacity" />
              <div className="text-center z-10 relative flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-[var(--color-primary)] drop-shadow-[0_0_15px_rgba(144,171,255,0.6)] mb-4">diamond</span>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">Rentabilidad</p>
                <p className="text-2xl font-headline font-bold text-white mt-1">Alta</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-tertiary)] mt-3 bg-[var(--color-tertiary)]/10 px-3 py-1 rounded-full border border-[var(--color-tertiary)]/20">▲ Top 10%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Flow Column */}
        <div className="bento-item space-y-6">
          <div className="glass-card p-6 border-l-[4px] border-[var(--color-secondary)] group overflow-hidden relative transition-all hover:shadow-[0_0_20px_rgba(255,113,101,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/5 blur-xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[var(--color-secondary)]/10 shrink-0 border border-[var(--color-secondary)]/20 shadow-inner">
                <span className="material-symbols-outlined text-[var(--color-secondary)]">error</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-bold font-headline text-white mb-1.5 tracking-wide">Capital Estancado</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>{fmt(mockKpis.valorInventarioFueraPareto_USD)}</strong> en inventario lento. IA sugiere promoción en "Rollos de Tela" para inyectar liquidez.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-l-[4px] border-[var(--color-tertiary)] group overflow-hidden relative transition-all hover:shadow-[0_0_20px_rgba(155,255,206,0.15)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-tertiary)]/5 blur-xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[var(--color-tertiary)]/10 shrink-0 border border-[var(--color-tertiary)]/20 shadow-inner">
                <span className="material-symbols-outlined text-[var(--color-tertiary)]">auto_awesome</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-bold font-headline text-[var(--color-tertiary)] mb-1.5 tracking-wide flex items-center gap-2">
                  Flujo de Caja Predictivo
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-3">La línea <strong>Pinturas Esmalte</strong> soporta ajuste +2.5% según IA.</p>
                <p className="text-[10px] uppercase font-bold text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 w-fit px-2.5 py-1 rounded-md border border-[var(--color-tertiary)]/20 tracking-wider">
                  + $1,200/mes Proyectado
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 border border-[rgba(65,71,91,0.2)]">
            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4">
              <span>Deuda Pendiente</span>
              <span className="text-right">Recuperación Ext.</span>
            </div>
            <div className="flex justify-between items-end border-b border-[rgba(65,71,91,0.3)] pb-5">
              <span className="text-[var(--color-secondary)] flex flex-col justify-end text-2xl font-headline font-extrabold tracking-tighter">
                <span className="text-[10px] opacity-70 mb-1 flex items-center tracking-widest"><span className="material-symbols-outlined text-[14px]">arrow_downward</span> RIESGO</span>
                $4,520
              </span>
              <span className="text-[var(--color-tertiary)] flex flex-col justify-end text-right text-2xl font-headline font-extrabold tracking-tighter">
                <span className="text-[10px] opacity-70 mb-1 flex items-center justify-end tracking-widest">INGRESOS <span className="material-symbols-outlined text-[14px]">arrow_upward</span></span>
                $1,800
              </span>
            </div>
            
            <div className="mt-5 flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-lg shrink-0">info</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Balance neto: <strong className="text-white">-$2,720</strong>. Cartera morosa requiere atención en los próximos 15 días según scoring crediticio.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
