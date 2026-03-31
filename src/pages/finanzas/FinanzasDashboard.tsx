import { DollarSign, Wallet, TrendingUp, AlertTriangle, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon, Sparkles, Info } from 'lucide-react';
import { mockKpis, mockEstadisticasProductos } from '../../data/mockData';
import { AICard } from '../../components/shared/AICard';
import { cn } from '../../utils/cn';

export function FinanzasDashboard() {
  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
  const topSku = mockEstadisticasProductos.reduce((p, c) => (p.ventas_usd > c.ventas_usd) ? p : c);
  const totalInventory = mockKpis.valorInventarioPareto_USD + mockKpis.valorInventarioFueraPareto_USD;
  const paretoPercent = Math.round((mockKpis.valorInventarioPareto_USD / totalInventory) * 100);
  const fueraParetoPct = 100 - paretoPercent;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card kpi-stripe kpi-stripe-gold p-5 animate-fade-in-up group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-surface-1 group-hover:bg-surface-2 transition-colors"><DollarSign className="w-5 h-5 text-brand-gold" /></div>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Inventario Pareto (A)</p>
          <p className="text-2xl font-display font-bold text-text-primary tabular">{fmt(mockKpis.valorInventarioPareto_USD)}</p>
          <div className="mt-3 h-2 bg-surface-1 rounded-full overflow-hidden">
            <div className="h-full bg-brand-gold rounded-full transition-all duration-700" style={{ width: `${paretoPercent}%` }} />
          </div>
          <p className="text-xs text-text-muted mt-1.5">{paretoPercent}% del valor total</p>
        </div>

        <div className="card kpi-stripe kpi-stripe-blue p-5 animate-fade-in-up delay-75 group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-surface-1 group-hover:bg-surface-2 transition-colors"><Wallet className="w-5 h-5 text-accent-blue" /></div>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Inventario Lento (B/C)</p>
          <p className="text-2xl font-display font-bold text-text-primary tabular">{fmt(mockKpis.valorInventarioFueraPareto_USD)}</p>
          <div className="mt-3 h-2 bg-surface-1 rounded-full overflow-hidden">
            <div className="h-full bg-accent-blue rounded-full transition-all duration-700" style={{ width: `${fueraParetoPct}%` }} />
          </div>
          <p className="text-xs text-text-muted mt-1.5">Capital retenido en rotación lenta</p>
        </div>

        <div className="card kpi-stripe kpi-stripe-emerald p-5 animate-fade-in-up delay-150 group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-surface-1 group-hover:bg-surface-2 transition-colors"><PieChartIcon className="w-5 h-5 text-accent-emerald" /></div>
            <span className="text-xs font-bold text-accent-emerald bg-accent-emerald/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> 24.5%
            </span>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Margen Promedio</p>
          <p className="text-2xl font-display font-bold text-text-primary">24.5%</p>
          <p className="text-xs text-text-muted mt-1.5">Sobre línea SUPER A (principal)</p>
        </div>
      </div>

      {/* AI Insight about inventory numbers */}
      <AICard
        title="Análisis de Inventario IA"
        variant="info"
        content={
          <p>
            El inventario total valorizado es <strong>{fmt(totalInventory)}</strong>. El {paretoPercent}% está en productos Pareto (alta rotación) y el {fueraParetoPct}% en inventario lento. La ratio saludable es 85/15 — actualmente estás en {paretoPercent}/{fueraParetoPct}, lo que significa que hay <span className="text-accent-amber font-bold">{fmt(mockKpis.valorInventarioFueraPareto_USD)}</span> de capital que podrían liberarse con promociones focalizadas.
          </p>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Star */}
        <div className="lg:col-span-2 card p-6 animate-fade-in-up delay-150" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-2/50">
            <h3 className="font-display font-bold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-gold" />
              Producto Estrella del Período
            </h3>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <span className="text-[10px] font-bold tracking-widest text-accent-emerald uppercase bg-accent-emerald/10 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> TOP SELLER
              </span>
              <h4 className="text-lg font-bold text-text-primary mt-3 leading-snug">{topSku.descripcion}</h4>
              <p className="text-sm text-text-muted mt-1 font-mono">SKU: {topSku.sku}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="card p-4 group hover:scale-[1.03] transition-transform duration-200">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Ingresos</p>
                  <p className="text-xl font-display font-bold text-accent-emerald tabular">{fmt(topSku.ventas_usd)}</p>
                </div>
                <div className="card p-4 group hover:scale-[1.03] transition-transform duration-200">
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-1">Margen</p>
                  <p className="text-xl font-display font-bold text-brand-gold tabular flex items-center"><ArrowUpRight className="w-4 h-4 mr-1" /> 24.5%</p>
                </div>
              </div>
              {/* Mini AI note on the product */}
              <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-accent-violet/5 border border-accent-violet/10">
                <Sparkles className="w-3.5 h-3.5 text-accent-violet mt-0.5 shrink-0" />
                <p className="text-[11px] text-text-secondary leading-relaxed">
                  Este SKU genera el <strong>4.4%</strong> de los ingresos con un margen superior al promedio. <strong>Alerta:</strong> su stock actual es <span className="text-accent-red font-bold">0 unidades</span> — hay riesgo de pérdida de ventas recurrentes.
                </p>
              </div>
            </div>
            <div className="w-full md:w-48 h-48 bg-surface-1 rounded-2xl border border-surface-2 flex items-center justify-center relative overflow-hidden group hover:border-brand-gold/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-brand-red/5 group-hover:from-brand-gold/10 group-hover:to-brand-red/10 transition-all" />
              <div className="text-center z-10">
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Rentabilidad</p>
                <p className="text-3xl font-display font-bold text-text-primary mt-1">Alta</p>
                <p className="text-xs text-accent-emerald font-semibold mt-1">▲ Top 10%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Column */}
        <div className="space-y-4">
          <div className="card kpi-stripe kpi-stripe-red p-5 animate-fade-in-up delay-225" style={{ animationFillMode: 'backwards' }}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-accent-red/10 shrink-0"><AlertTriangle className="w-5 h-5 text-accent-red" /></div>
              <div>
                <h4 className="text-sm font-bold text-text-primary mb-1">Capital Estancado</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  <strong>{fmt(mockKpis.valorInventarioFueraPareto_USD)}</strong> en inventario lento. Sugiero promoción de los Rollos de Tela para liberar capital.
                </p>
              </div>
            </div>
          </div>

          <AICard
            title="Flujo de Caja"
            variant="success"
            content={
              <div className="space-y-2">
                <p>La línea <strong>Pinturas Esmalte</strong> soporta un ajuste de +2.5% en precio según tendencia de mercado Capital.</p>
                <p className="text-xs font-bold text-accent-emerald flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Incremento proyectado: +$1,200/mes
                </p>
              </div>
            }
          />

          <div className="card p-5 animate-fade-in-up delay-300" style={{ animationFillMode: 'backwards' }}>
            <div className="flex justify-between items-center text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
              <span>Deuda</span><span>Recuperación</span>
            </div>
            <div className="flex justify-between text-xl font-display font-bold">
              <span className="text-accent-red flex items-center"><ArrowDownRight className="w-5 h-5 mr-1 text-accent-red/50" /> $4,520</span>
              <span className="text-accent-emerald flex items-center"><ArrowUpRight className="w-5 h-5 mr-1 text-accent-emerald/50" /> $1,800</span>
            </div>
            {/* AI note on balance */}
            <div className="mt-3 pt-3 border-t border-surface-2/50 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-accent-violet mt-0.5 shrink-0" />
              <p className="text-[11px] text-text-muted leading-relaxed">
                Balance neto negativo: <strong>-$2,720</strong>. La cartera morosa requiere atención prioritaria en los próximos 15 días.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
