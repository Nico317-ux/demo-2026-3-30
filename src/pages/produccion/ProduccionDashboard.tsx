import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

gsap.registerPlugin(useGSAP);

const stockTrends = [
  { name: 'Lun', stock: 450 },
  { name: 'Mar', stock: 520 },
  { name: 'Mie', stock: 480 },
  { name: 'Jue', stock: 610 },
  { name: 'Vie', stock: 590 },
  { name: 'Sab', stock: 680 },
  { name: 'Dom', stock: 650 },
];

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
      <div className="page-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface text-glow">Control de Producción</h2>
          <p className="text-on-surface-variant mt-2 font-body text-base">Mapeo de inventario y análisis financiero en tiempo real.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="bg-[var(--color-surface-container-low)] px-5 py-3 rounded-xl border border-[rgba(65,71,91,0.2)] shadow-inner aurora-bg shine-overlay flex-1 sm:flex-none">
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant block mb-1 font-bold">Estado del Sistema</span>
            <span className="flex items-center gap-2 text-[var(--color-tertiary)] font-bold text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-tertiary)] shadow-[0_0_8px_rgba(155,255,206,0.6)] animate-pulse"></span>
              Operativo
            </span>
          </div>
        </div>
      </div>

      {/* Top Metrics Bento Grid - Balanced Widths */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Inventory Value Card - Narrower width */}
        <div className="bento-item glass-card p-6 rounded-2xl md:col-span-3 flex flex-col justify-between min-h-[160px] aurora-bg shine-overlay">
          <div>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-lg icon-glow">account_balance_wallet</span>
              Valor Inventario
            </p>
            <h3 className="text-2xl font-extrabold font-headline mt-4 text-white drop-shadow-md text-glow">$9.6k</h3>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">70% Optimizado</p>
        </div>

        {/* Stock Levels */}
        <div className="bento-item glass-card p-6 rounded-2xl md:col-span-3 flex flex-col justify-center items-center text-center aurora-bg shine-overlay">
          <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-4">SKUs Sanos</p>
          <div className="text-3xl font-extrabold text-[var(--color-tertiary)] font-headline drop-shadow-lg text-glow">142</div>
          <div className="w-16 h-1.5 bg-[var(--color-tertiary)]/20 rounded-full mt-6 overflow-hidden">
            <div className="w-full h-full bg-[var(--color-tertiary)] rounded-full shadow-[0_0_10px_rgba(155,255,206,0.8)]"></div>
          </div>
        </div>

        <div className="bento-item glass-card p-6 rounded-2xl md:col-span-3 flex flex-col justify-center items-center text-center border border-[var(--color-secondary)]/20 shadow-[inset_0_0_20px_rgba(255,113,101,0.05)] aurora-bg shine-overlay">
          <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-4">SKUs Críticos</p>
          <div className="text-3xl font-extrabold text-[var(--color-secondary)] font-headline drop-shadow-lg text-glow-red">12</div>
          <div className="w-16 h-1.5 bg-[var(--color-secondary)]/20 rounded-full mt-6 overflow-hidden">
            <div className="w-1/2 h-full bg-[var(--color-secondary)] rounded-full shadow-[0_0_10px_rgba(255,113,101,0.8)]"></div>
          </div>
        </div>

        <div className="bento-item glass-card p-6 rounded-2xl md:col-span-3 flex flex-col justify-between aurora-bg shine-overlay">
          <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Eficiencia</p>
          <h3 className="text-2xl font-extrabold font-headline text-[var(--color-tertiary)] text-glow">+2.4%</h3>
          <p className="text-[10px] text-slate-500">vs mes anterior</p>
        </div>
      </div>

      {/* Main Inventory & Charts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Trend Chart */}
        <div className="bento-item lg:col-span-2 glass-card p-8 aurora-bg shine-overlay">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold font-headline flex items-center gap-3">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl icon-glow">show_chart</span>
              Tendencia de Stock (Galones)
            </h4>
            <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/30">Live Telemetry</span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#a5aac2" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#a5aac2" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c1326', border: '1px solid #41475b', borderRadius: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="stock" 
                  stroke="#4d80ff" 
                  strokeWidth={3} 
                  dot={{ fill: '#4d80ff', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="bento-item space-y-6">
          <h4 className="text-2xl font-bold font-headline flex items-center gap-3">
            <span className="material-symbols-outlined text-[var(--color-primary-container)] text-3xl icon-glow">auto_awesome</span>
            Núcleo Neuronal
          </h4>

          <div className="glass-card h-[400px] flex flex-col shadow-[0_0_30px_rgba(144,171,255,0.05)] border border-[var(--color-primary-container)]/20 relative overflow-hidden aurora-bg shine-overlay">
            <div className="flex-1 p-5 space-y-5 overflow-y-auto custom-scrollbar relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--color-primary)]/30 neon-glow-primary">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-sm icon-glow">smart_toy</span>
                </div>
                <div className="bg-[var(--color-surface-container-highest)]/80 p-5 rounded-2xl rounded-tl-none text-sm leading-relaxed border border-[rgba(65,71,91,0.2)] font-medium">
                  Optimización de stock completada. Sugiero rebalancear el <strong>Nodo Oriente</strong> para mitigar riesgos.
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[rgba(65,71,91,0.2)] bg-[var(--color-surface-container-low)]/80 relative z-10">
              <div className="relative group transition-all duration-400">
                <input 
                  type="text" 
                  className="input-ghost w-full py-4 pl-6 pr-14 text-sm font-medium tracking-wide placeholder-[rgba(165,170,194,0.4)] transition-colors bg-black/20" 
                  placeholder="Consultar IA..." 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(144,171,255,0.4)]">
                  <span className="material-symbols-outlined text-[var(--color-on-primary-container)] text-[18px]">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
