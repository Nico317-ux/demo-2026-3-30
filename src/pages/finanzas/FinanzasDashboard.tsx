import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mockKpis, mockEstadisticasProductos } from "../../data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

gsap.registerPlugin(useGSAP);

const paretoData = [
  { name: 'Pareto A', value: mockKpis.valorInventarioPareto_USD, color: '#00ffa3' },
  { name: 'Fuera Pareto', value: mockKpis.valorInventarioFueraPareto_USD, color: '#ff7165' },
];

export function FinanzasDashboard() {
  const container = useRef<HTMLDivElement>(null);
  
  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
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
    <div ref={container} className="w-full flex flex-col gap-8">
      {/* Page Header */}
      <div className="page-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface text-glow">Inteligencia Financiera</h2>
          <p className="text-on-surface-variant mt-2 text-base">Asignación de capital y análisis de riesgo.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[var(--color-surface-container-high)] text-[var(--color-primary)] font-headline font-semibold text-sm border border-[var(--color-primary)]/20 shadow-[0_0_15px_rgba(144,171,255,0.1)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] transition-all duration-400">
            Exportar Auditoría
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* KPI Cards - Balanced to be narrower */}
        <div className="bento-item glass-card p-6 group relative overflow-hidden border-t-2 border-[var(--color-tertiary)] aurora-bg shine-overlay">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-tertiary)]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-tertiary)]/10 flex items-center justify-center text-[var(--color-tertiary)] border border-[var(--color-tertiary)]/20 neon-glow-cyan">
              <span className="material-symbols-outlined text-[28px] icon-glow">payments</span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Inventario Pareto (A)</p>
          <p className="text-2xl font-display font-extrabold text-white font-headline tracking-tighter text-glow">{fmt(mockKpis.valorInventarioPareto_USD)}</p>
          <p className="text-[10px] text-tertiary mt-2 font-bold uppercase tracking-widest">{paretoPercent}% del total</p>
        </div>

        <div className="bento-item glass-card p-6 group relative overflow-hidden border-t-2 border-[var(--color-primary)] aurora-bg shine-overlay">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] border border-[var(--color-primary)]/20 neon-glow-primary">
              <span className="material-symbols-outlined text-[28px] icon-glow">account_balance_wallet</span>
            </div>
          </div>
          <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Inventario Lento (B/C)</p>
          <p className="text-2xl font-display font-extrabold text-white font-headline tracking-tighter text-glow">{fmt(mockKpis.valorInventarioFueraPareto_USD)}</p>
          <p className="text-[10px] text-primary mt-2 font-bold uppercase tracking-widest">Inmovilizado</p>
        </div>

        <div className="bento-item glass-card p-6 group relative overflow-hidden border-t-2 border-[var(--color-secondary)] aurora-bg shine-overlay">
           <div className="absolute -right-8 -top-8 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-2xl pointer-events-none"></div>
           
           <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] border border-[var(--color-secondary)]/20 shadow-[0_0_15px_rgba(255,113,101,0.3)]">
              <span className="material-symbols-outlined text-[28px] text-glow-red">timeline</span>
            </div>
          </div>
           <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2">Margen Promedio</p>
           <p className="text-2xl font-display font-extrabold text-white font-headline tracking-tighter text-glow">24.5%</p>
           <p className="text-[10px] text-secondary mt-2 font-bold uppercase tracking-widest">Global</p>
        </div>

        {/* Extra slot to balance or fill later */}
        <div className="bento-item glass-card p-6 flex flex-col justify-center aurora-bg shine-overlay border border-white/5">
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Riesgo Financiero</p>
           <h4 className="text-xl font-bold text-on-surface">Bajo</h4>
           <div className="w-full h-1 bg-white/5 rounded-full mt-3">
              <div className="w-1/4 h-full bg-tertiary rounded-full"></div>
           </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pareto Visualization Chart */}
        <div className="bento-item lg:col-span-2 glass-card p-8 aurora-bg shine-overlay">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-headline font-bold text-xl text-white flex items-center gap-3">
              <span className="material-symbols-outlined text-[var(--color-primary)] icon-glow">analytics</span>
              Distribución de Valor Pareto
            </h3>
            <span className="text-[10px] font-black text-primary bg-primary/20 px-3 py-1.5 rounded-lg border border-primary/30 uppercase tracking-widest">Live Audit</span>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paretoData} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#a5aac2" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#a5aac2" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(v) => `$${v/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c1326', border: '1px solid #41475b', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  formatter={(value: number) => [fmt(value), 'Valor']}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={80}>
                  {paretoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Flow Column */}
        <div className="bento-item space-y-6">
          <div className="glass-card p-5 border-l-[4px] border-[var(--color-secondary)] group overflow-hidden relative transition-all hover:shadow-[0_0_20px_rgba(255,113,101,0.15)] aurora-bg shine-overlay">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/5 blur-xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[var(--color-secondary)]/10 shrink-0 border border-[var(--color-secondary)]/20 shadow-inner">
                <span className="material-symbols-outlined text-[var(--color-secondary)] text-glow-red">error</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-bold font-headline text-white mb-1.5 tracking-wide">Capital Estancado</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>{fmt(mockKpis.valorInventarioFueraPareto_USD)}</strong> en inventario lento. IA sugiere liquidación estratégica.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 border-l-[4px] border-[var(--color-tertiary)] group overflow-hidden relative transition-all hover:shadow-[0_0_20px_rgba(155,255,206,0.15)] aurora-bg shine-overlay">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-tertiary)]/5 blur-xl pointer-events-none"></div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[var(--color-tertiary)]/10 shrink-0 border border-[var(--color-tertiary)]/20 shadow-inner">
                <span className="material-symbols-outlined text-[var(--color-tertiary)] icon-glow">auto_awesome</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-sm font-bold font-headline text-[var(--color-tertiary)] mb-1.5 tracking-wide flex items-center gap-2">
                  Flujo de Caja Predictivo
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Incremento proyectado según reajuste de precios IA.</p>
                <p className="text-[10px] uppercase font-bold text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 w-fit px-2.5 py-1 rounded-md border border-[var(--color-tertiary)]/20 tracking-wider neon-glow-cyan">
                  + $1.2k/mes Proyectado
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border border-[rgba(65,71,91,0.2)] aurora-bg shine-overlay">
            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4">
              <span>Deuda Pendiente</span>
              <span className="text-right">Recuperación</span>
            </div>
            <div className="flex justify-between items-end border-b border-[rgba(65,71,91,0.3)] pb-5">
              <span className="text-[var(--color-secondary)] flex flex-col justify-end text-xl font-headline font-extrabold tracking-tighter">
                <span className="text-[10px] opacity-70 mb-1 flex items-center tracking-widest"><span className="material-symbols-outlined text-[14px]">arrow_downward</span> RIESGO</span>
                $4.5k
              </span>
              <span className="text-[var(--color-tertiary)] flex flex-col justify-end text-right text-xl font-headline font-extrabold tracking-tighter">
                <span className="text-[10px] opacity-70 mb-1 flex items-center justify-end tracking-widest">INGRESOS <span className="material-symbols-outlined text-[14px]">arrow_upward</span></span>
                $1.8k
              </span>
            </div>
            
            <div className="mt-5 flex items-start gap-3">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-lg shrink-0 icon-glow">info</span>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Balance neto: <strong className="text-white">-$2.7k</strong>. Cartera morosa requiere atención inmediata.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
