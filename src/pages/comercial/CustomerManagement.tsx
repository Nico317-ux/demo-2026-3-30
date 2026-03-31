import { Search, Filter, Building2, MapPin, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { mockTopClientes } from '../../data/mockData';
import { cn } from '../../utils/cn';
import { AICard } from '../../components/shared/AICard';

export function CustomerManagement() {
  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  const statusStyle: Record<string, string> = {
    'Activo': 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20',
    'Re-compra': 'text-accent-amber bg-accent-amber/10 border-accent-amber/20',
    'Inactivo': 'text-text-muted bg-surface-1 border-surface-2',
    'En Riesgo': 'text-accent-red bg-accent-red/10 border-accent-red/20',
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="card p-4 flex flex-col sm:flex-row items-center gap-3 animate-fade-in-up">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-brand-gold transition-colors" />
          <input
            type="text"
            placeholder="Buscar por Razón Social, Región..."
            className="w-full bg-surface-1 border border-surface-2 rounded-xl pl-11 pr-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-1 border border-surface-2 text-sm font-medium text-text-secondary hover:bg-surface-2 transition-all shrink-0">
          <Filter className="w-4 h-4" /> Filtros
        </button>
      </div>

      {/* AI Insight */}
      <AICard
        title="Estrategia de Clientes"
        variant="info"
        content={
          <p>
            <strong>Ferremundial Proto 2020</strong> concentra el 34.89% de la facturación. Sugerimos diversificar con campañas de reactivación para <strong>Pinlacas Guatire</strong> y <strong>Constructora Maca 78</strong>, actualmente inactivos. La región Oriente tiene potencial inexplorado.
          </p>
        }
      />

      {/* Client Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {mockTopClientes.map((c, idx) => (
          <div key={idx} className="card card-lift p-5 group cursor-pointer animate-fade-in-up" style={{ animationDelay: `${idx * 75}ms`, animationFillMode: 'backwards' }}>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-surface-1 border border-surface-2 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/20 transition-all">
                <Building2 className="w-5 h-5 text-text-muted group-hover:text-brand-gold transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-text-primary truncate group-hover:text-brand-red transition-colors">
                    {c.cliente}
                  </h3>
                  <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border whitespace-nowrap", statusStyle[c.status] || statusStyle['Inactivo'])}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {c.region}</span>
                  <span>Últ: {new Date(c.lastPurchase).toLocaleDateString('es-VE', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-surface-2/50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-0.5">Facturación</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-display font-bold text-text-primary tabular">{fmt(c.compras_usd)}</span>
                  <span className={cn("flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md", c.participacion_pct > 0 ? "bg-accent-emerald/10 text-accent-emerald" : "bg-accent-red/10 text-accent-red")}>
                    {c.participacion_pct > 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {c.participacion_pct}%
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-surface-1 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white text-text-muted transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
