import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { GeographicMap } from "../../components/map/GeographicMap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

gsap.registerPlugin(useGSAP);

const riskData = [
  { name: 'Bajo Riesgo', value: 85, color: '#00ffa3' },
  { name: 'Riesgo Medio', value: 12, color: '#4d80ff' },
  { name: 'Riesgo Alto', value: 3, color: '#ff7165' },
];

export function ComercialDashboard() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".page-header", { y: -20, opacity: 0, duration: 0.8 })
      .from(".bento-item", { y: 30, opacity: 0, scale: 0.95, duration: 0.8, stagger: 0.1 }, "-=0.4")
      .from(".ai-glow", { scale: 0.5, opacity: 0, duration: 1.5, ease: "power2.out" }, "-=0.8");
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col gap-8">
      <div className="page-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-headline tracking-tight text-on-surface text-glow">Dominio Comercial</h2>
          <p className="text-on-surface-variant mt-1 sm:mt-2 text-sm sm:text-base">Inteligencia de clientes y portafolio.</p>
        </div>
        <div className="flex gap-3 sm:gap-4 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-full bg-[var(--color-surface-container-high)] text-on-surface font-headline font-semibold text-xs sm:text-sm border border-[rgba(65,71,91,0.2)] flex items-center justify-center gap-2 hover:bg-[var(--color-surface-container-highest)] hover:border-[rgba(144,171,255,0.2)] transition-all duration-400">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Regiones
          </button>
          <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-full bg-[var(--color-surface-container-high)] text-on-surface font-headline font-semibold text-xs sm:text-sm border border-[rgba(65,71,91,0.2)] flex items-center justify-center gap-2 hover:bg-[var(--color-surface-container-highest)] hover:border-[rgba(144,171,255,0.2)] transition-all duration-400">
            <span className="material-symbols-outlined text-lg">segment</span>
            Segmentos
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* AI Suggestion - Featured Header */}
        <div className="col-span-12 bento-item">
          <div className="relative overflow-hidden glass-card p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border-l-[6px] border-[var(--color-tertiary)] shadow-xl z-10 w-full group transition-all duration-500 hover:shadow-[0_0_30px_rgba(155,255,206,0.1)] aurora-bg shine-overlay">
            <div className="h-20 w-20 bg-[var(--color-tertiary)]/10 rounded-2xl flex items-center justify-center shrink-0 border border-[var(--color-tertiary)]/20 group-hover:bg-[var(--color-tertiary)]/20 transition-all neon-glow-cyan">
              <span className="material-symbols-outlined text-[var(--color-tertiary)] text-4xl icon-glow">auto_awesome</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[var(--color-tertiary)] font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Insight Inteligencia AI</h4>
              <p className="text-xl text-on-surface font-medium leading-relaxed font-headline">
                <span className="font-bold">IA Tip:</span> <span className="text-white font-bold">Ferremundial</span> representa el <span className="text-[var(--color-tertiary)] border-b-2 border-[var(--color-tertiary)]/30 pb-0.5 font-bold">34.89% de ventas</span>, considera un programa de lealtad o crédito premium para asegurar esta cuenta ancla.
              </p>
            </div>
            <button className="px-8 py-4 rounded-full bg-[var(--color-tertiary)] text-[var(--color-on-tertiary)] font-bold font-headline hover:scale-[1.05] active:scale-[0.98] transition-transform duration-400 shadow-[0_0_20px_rgba(155,255,206,0.3)] mt-4 md:mt-0 whitespace-nowrap">
                Aplicar Estrategia
            </button>
            <div className="ai-glow absolute -right-32 -top-32 w-96 h-96 bg-[var(--color-tertiary)]/10 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>
          </div>
        </div>

        {/* Key Accounts Widget */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 bento-item">
          <div className="glass-card p-6 h-full flex flex-col gap-5 aurora-bg shine-overlay">
            <div className="flex justify-between items-center bg-[var(--color-surface-container-high)] p-4 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold font-headline text-on-surface tracking-tight text-glow">Cartera de Clientes Estratégicos</h3>
              <span className="text-xs font-bold text-[var(--color-primary)] px-3 py-1 bg-[var(--color-primary)]/10 rounded-full tracking-widest border border-[var(--color-primary)]/20">TOP 5</span>
            </div>
            
            <div className="space-y-4 custom-scrollbar overflow-y-auto pr-2 max-h-[500px]">
              {/* Client 1 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[rgba(144,171,255,0.1)] cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-colors duration-400">
                    <span className="material-symbols-outlined text-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] icon-glow">corporate_fare</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Ferremundial Proto 2020 C.A.</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Capital • Distribuidor Principal</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-on-surface font-headline">$5,197.10</p>
                  <p className="text-[11px] font-bold text-[var(--color-tertiary)] flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> 12.4%
                  </p>
                </div>
              </div>

              {/* Client 2 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[rgba(144,171,255,0.1)] cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-400 text-blue-400 group-hover:text-white">
                    <span className="material-symbols-outlined icon-glow">person</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Keller Ortega</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Capital • Cliente Especial</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-on-surface font-headline">$3,923.64</p>
                  <p className="text-[11px] font-bold text-[var(--color-tertiary)] flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">north_east</span> 8.2%
                  </p>
                </div>
              </div>

              {/* Client 3 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[rgba(144,171,255,0.1)] cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-500/10 rounded-xl flex items-center justify-center group-hover:bg-slate-500 transition-colors duration-400 text-slate-400 group-hover:text-white">
                    <span className="material-symbols-outlined icon-glow">person</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Carlos Martinez</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Oriente • Retailer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-on-surface font-headline">$2,583.54</p>
                  <p className="text-[11px] font-bold text-on-surface-variant flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">horizontal_rule</span> Estable
                  </p>
                </div>
              </div>

              {/* Client 4 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[rgba(144,171,255,0.1)] cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-500/10 rounded-xl flex items-center justify-center group-hover:bg-slate-500 transition-colors duration-400 text-slate-400 group-hover:text-white">
                    <span className="material-symbols-outlined icon-glow">person</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Elena Rodriguez</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Tachira • Contratista</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-on-surface font-headline">$1,842.10</p>
                  <p className="text-[11px] font-bold text-[var(--color-tertiary)] flex items-center justify-end gap-1 uppercase tracking-widest mt-1">
                    <span className="material-symbols-outlined text-sm">trending_up</span> 5.1%
                  </p>
                </div>
              </div>

              {/* Client 5 */}
              <div className="group flex items-center justify-between p-4 rounded-2xl hover:bg-[var(--color-surface-container-highest)]/80 transition-all duration-400 border border-transparent hover:border-[var(--color-secondary)]/20 cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[var(--color-secondary)]/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:text-[var(--color-on-secondary)] transition-colors duration-400 text-[var(--color-secondary)]">
                    <span className="material-symbols-outlined icon-glow">store</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-lg leading-tight font-headline">Pinta Ofertas C.A.</p>
                    <p className="text-xs text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Oriente • Retail Outlet</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-on-surface font-headline">$583.54</p>
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
          <div className="glass-card h-full p-4 aurora-bg shine-overlay">
            <GeographicMap />
          </div>
        </div>

        {/* Secondary Intelligence Row - Adjusted Widths */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="bento-item glass-card p-6 md:col-span-3 flex flex-col justify-center gap-3 hover:shadow-[0_0_20px_rgba(144,171,255,0.05)] transition-all cursor-default shine-overlay">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 shadow-inner neon-glow-primary">
              <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl icon-glow">leaderboard</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-1">ARPU Mensual</p>
              <h5 className="text-xl font-extrabold text-on-surface font-headline text-glow">$1,240.00</h5>
            </div>
          </div>
          
          {/* Pie Chart Card - Expanded to fill middle */}
          <div className="bento-item glass-card p-6 md:col-span-6 flex flex-row items-center justify-center gap-12 hover:shadow-[0_0_20px_rgba(155,255,206,0.05)] transition-all cursor-default shine-overlay">
            <div className="w-24 h-24 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0c1326', border: '1px solid #41475b', borderRadius: '8px', fontSize: '10px' }}
                    itemStyle={{ color: '#dfe4fe' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-1">Salud de Cartera</p>
              <h5 className="text-xl font-extrabold text-on-surface font-headline text-glow">85% Bajo Riesgo</h5>
              <p className="text-[10px] text-slate-500 mt-1">Basado en comportamiento de pago</p>
            </div>
          </div>

          <div className="bento-item glass-card p-6 md:col-span-3 flex flex-col justify-center gap-3 hover:shadow-[0_0_20px_rgba(155,255,206,0.05)] transition-all cursor-default shine-overlay">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-tertiary)]/10 flex items-center justify-center border border-[var(--color-tertiary)]/20 shadow-inner neon-glow-cyan">
              <span className="material-symbols-outlined text-[var(--color-tertiary)] text-3xl icon-glow">insights</span>
            </div>
            <div>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold mb-1">Costo de Adquisición</p>
              <h5 className="text-xl font-extrabold text-on-surface font-headline text-glow">$42.50</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
