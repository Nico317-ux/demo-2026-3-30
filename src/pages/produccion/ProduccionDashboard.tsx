import { Boxes, AlertCircle, RefreshCw, BarChart2, ShieldAlert, Package, Sparkles, Info } from 'lucide-react';
import { mockEstadisticasProductos } from '../../data/mockData';
import { cn } from '../../utils/cn';
import { AICard } from '../../components/shared/AICard';

export function ProduccionDashboard() {
  const stockSano = mockEstadisticasProductos.filter(p => p.status === 'Sano').length;
  const stockCritico = mockEstadisticasProductos.filter(p => p.status === 'Critico').length;
  const stockAtencion = mockEstadisticasProductos.filter(p => p.status === 'Atencion').length;
  const total = mockEstadisticasProductos.length;
  const agotados = mockEstadisticasProductos.filter(p => p.stock_actual === 0);

  return (
    <div className="space-y-6">
      {/* Status row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="card kpi-stripe kpi-stripe-emerald p-5 animate-fade-in-up group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-accent-emerald/10 group-hover:bg-accent-emerald/20 transition-colors"><Boxes className="w-5 h-5 text-accent-emerald" /></div>
            <span className="text-xs font-bold text-text-muted bg-surface-1 px-2 py-1 rounded-lg">{Math.round((stockSano / total) * 100)}%</span>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Stock Saludable</p>
          <p className="text-2xl font-display font-bold text-text-primary">{stockSano} <span className="text-sm text-text-muted font-normal">SKUs</span></p>
        </div>

        <div className="card kpi-stripe kpi-stripe-gold p-5 animate-fade-in-up delay-75 group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-accent-amber/10 group-hover:bg-accent-amber/20 transition-colors"><Package className="w-5 h-5 text-accent-amber" /></div>
            <span className="text-xs font-bold text-text-muted bg-surface-1 px-2 py-1 rounded-lg">{Math.round((stockAtencion / total) * 100)}%</span>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Requiere Atención</p>
          <p className="text-2xl font-display font-bold text-text-primary">{stockAtencion} <span className="text-sm text-text-muted font-normal">SKUs</span></p>
        </div>

        <div className="card kpi-stripe kpi-stripe-red p-5 animate-fade-in-up delay-150 group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-accent-red/10 relative group-hover:bg-accent-red/20 transition-colors">
              <AlertCircle className="w-5 h-5 text-accent-red" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-red rounded-full animate-pulse-soft" />
            </div>
            <span className="text-xs font-bold text-text-muted bg-surface-1 px-2 py-1 rounded-lg">{Math.round((stockCritico / total) * 100)}%</span>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Quiebre / Crítico</p>
          <p className="text-2xl font-display font-bold text-text-primary">{stockCritico} <span className="text-sm text-text-muted font-normal">SKUs</span></p>
        </div>

        <div className="card kpi-stripe kpi-stripe-violet p-5 animate-fade-in-up delay-225 group hover:scale-[1.02] transition-transform duration-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-accent-violet/10 group-hover:bg-accent-violet/20 transition-colors"><BarChart2 className="w-5 h-5 text-accent-violet" /></div>
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Cobertura Prom.</p>
          <p className="text-2xl font-display font-bold text-text-primary">14.5 <span className="text-sm text-text-muted font-normal">días</span></p>
          <div className="mt-3 h-2 bg-surface-1 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-accent-red via-accent-amber to-accent-emerald rounded-full w-[45%] transition-all duration-700" />
          </div>
        </div>
      </div>

      {/* AI insight about stock status */}
      <AICard
        title="Diagnóstico de Inventario"
        variant="warning"
        content={
          <p>
            De los <strong>{total} SKUs</strong> monitoreados: <span className="text-accent-emerald font-bold">{stockSano} sanos</span>, <span className="text-accent-amber font-bold">{stockAtencion} en atención</span> y <span className="text-accent-red font-bold">{stockCritico} críticos</span>. {agotados.length > 0 && (<>Hay <strong>{agotados.length} producto(s) con stock en 0</strong>: {agotados.map(a => a.sku).join(', ')}. Se está perdiendo venta activa por falta de reposición.</>)} La cobertura promedio de 14.5 días está por debajo del ideal de 21 días.
          </p>
        }
      />

      {/* SKU Table */}
      <div className="card overflow-hidden animate-fade-in-up delay-225" style={{ animationFillMode: 'backwards' }}>
        <div className="p-5 border-b border-surface-2/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="font-display font-bold text-text-primary flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-accent-violet" />
            Monitor de Inventario SKU
          </h3>
          <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
            <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} /> Actualizado: Hace 2 min
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-text-muted uppercase tracking-widest bg-surface-1/50 border-b border-surface-2/50">
                <th className="px-5 py-3.5">SKU / Descripción</th>
                <th className="px-5 py-3.5">Familia</th>
                <th className="px-5 py-3.5 text-right">Stock</th>
                <th className="px-5 py-3.5 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2/30">
              {mockEstadisticasProductos.map((prod, idx) => (
                <tr key={idx} className="hover:bg-surface-1/30 transition-colors group animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'backwards' }}>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-text-primary group-hover:text-brand-red transition-colors font-mono">{prod.sku}</p>
                    <p className="text-xs text-text-muted truncate max-w-[300px]" title={prod.descripcion}>{prod.descripcion}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-text-secondary bg-surface-1 px-2.5 py-1 rounded-lg border border-surface-2">{prod.familia}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={cn("text-sm font-bold tabular", prod.stock_actual === 0 ? "text-accent-red" : "text-text-primary")}>{prod.stock_actual}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-colors",
                      prod.status === 'Sano' && "text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20",
                      prod.status === 'Atencion' && "text-accent-amber bg-accent-amber/10 border-accent-amber/20",
                      prod.status === 'Critico' && "text-accent-red bg-accent-red/10 border-accent-red/20",
                    )}>
                      {prod.status === 'Critico' && <ShieldAlert className="w-3 h-3 mr-1" />}
                      {prod.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* AI note at bottom of table */}
        <div className="p-4 border-t border-surface-2/50 bg-surface-1/30 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-accent-violet mt-0.5 shrink-0" />
          <p className="text-xs text-text-secondary leading-relaxed">
            <strong>Lectura IA de la tabla:</strong> Los Impermeabilizantes (138 uds) y Rollos (94 uds) tienen stock alto pero <em>0 ventas</em> en el período — posible sobreinventario. La Pintura Esmalte tiene ventas pero 0 stock — priorizar reabastecimiento. La Pintura Caucho Pro-vinílica (1 ud) se agotará pronto sin reposición.
          </p>
        </div>
      </div>
    </div>
  );
}
