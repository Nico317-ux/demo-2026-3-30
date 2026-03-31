import { TrendingUp, DollarSign, Droplets, Target, Medal, ArrowUpRight, Users, Sparkles, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { mockKpis, mockVendedores, mockVentasPorMarca, mockVentasPorRegion, mockTopClientes } from '../../data/mockData';
import { AICard } from '../../components/shared/AICard';
import { cn } from '../../utils/cn';

const DONUT_COLORS = ['#D4A843', '#E8372D', '#8B5CF6', '#3B82F6', '#10B981'];

export function ComercialDashboard() {
  const topVendedores = [...mockVendedores].sort((a, b) => b.ventas_usd - a.ventas_usd).slice(0, 5);
  const fmt = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);
  const fmtFull = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  // Calculations for AI insights
  const topVendedor = topVendedores[0];
  const topVendedorPct = ((topVendedor.ventas_usd / mockKpis.ventasTotales_USD) * 100).toFixed(1);
  const superAShare = ((mockVentasPorMarca[0].ventas_usd / mockKpis.ventasTotales_USD) * 100).toFixed(0);
  const capitalShare = ((mockVentasPorRegion[0].ventas_usd / mockKpis.ventasTotales_USD) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Ingresos Totales', value: fmtFull(mockKpis.ventasTotales_USD), delta: `+${mockKpis.crecimientoMes_Porcentaje}%`, deltaPositive: true, icon: DollarSign, stripe: 'kpi-stripe-gold', delay: '' },
          { label: 'Volumen Despachado', value: `${mockKpis.volumenTotal_Galones} Gal`, icon: Droplets, stripe: 'kpi-stripe-blue', delay: 'delay-75' },
          { label: 'Clientes Activos', value: '5', sub: '2 en recompra', icon: Users, stripe: 'kpi-stripe-emerald', delay: 'delay-150' },
          { label: 'Meta Trimestral', value: '78%', sub: '$35,000 objetivo', icon: Target, stripe: 'kpi-stripe-violet', delay: 'delay-225', hasProgress: true },
        ].map((kpi, i) => (
          <div key={i} className={cn("card kpi-stripe p-5 animate-fade-in-up group hover:scale-[1.02] transition-transform duration-300", kpi.stripe, kpi.delay)} style={{ animationFillMode: 'backwards' }}>
            <div className="flex items-start justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-surface-1 group-hover:bg-surface-2 transition-colors">
                <kpi.icon className="w-5 h-5 text-text-secondary" />
              </div>
              {kpi.delta && (
                <span className={cn("flex items-center text-xs font-bold px-2 py-1 rounded-lg", kpi.deltaPositive ? "bg-accent-emerald/10 text-accent-emerald" : "bg-accent-red/10 text-accent-red")}>
                  <TrendingUp className="w-3 h-3 mr-1" /> {kpi.delta}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className="text-2xl font-display font-bold text-text-primary tabular">{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-text-muted mt-1">{kpi.sub}</p>}
            {kpi.hasProgress && (
              <div className="mt-3 h-2 w-full bg-surface-1 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-accent-violet to-accent-blue rounded-full w-[78%] transition-all animate-gradient" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI insight about KPIs */}
      <AICard
        title="Resumen Ejecutivo IA"
        variant="info"
        content={
          <p>
            Los ingresos de <strong>{fmtFull(mockKpis.ventasTotales_USD)}</strong> representan un crecimiento del <span className="text-accent-emerald font-bold">+{mockKpis.crecimientoMes_Porcentaje}%</span> respecto al mes anterior. Con <strong>802.5 galones</strong> despachados y un cumplimiento del 78% de la meta trimestral, se proyecta alcanzar el 100% si se mantiene el ritmo actual durante las próximas 3 semanas.
          </p>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6 animate-fade-in-up delay-150" style={{ animationFillMode: 'backwards' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-bold text-text-primary flex items-center gap-2">
                <Medal className="w-5 h-5 text-brand-gold" />
                Ranking de Vendedores
              </h3>
              <span className="text-xs font-medium text-text-muted bg-surface-1 px-3 py-1.5 rounded-lg">Marzo 2026</span>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVendedores} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="nombre" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 500 }} width={110} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e5e5', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: '13px' }}
                    formatter={(value) => [`${fmtFull(Number(value))}`, 'Ventas']}
                  />
                  <Bar dataKey="ventas_usd" radius={[0, 8, 8, 0]} barSize={20} animationDuration={1200} animationEasing="ease-out">
                    {topVendedores.map((_e, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#D4A843' : index === 1 ? '#E8372D' : '#E5E7EB'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI insight about the chart */}
          <AICard
            title="Análisis del Ranking"
            variant="warning"
            content={
              <p>
                <strong>{topVendedor.nombre}</strong> lidera con <span className="text-brand-gold font-bold">{fmtFull(topVendedor.ventas_usd)}</span> ({topVendedorPct}% del total). Esta concentración genera riesgo — si este vendedor se ausenta, el 40% de los ingresos se detiene. Recomendación: <strong>redistribuir cuentas clave</strong> entre los vendedores con 0 ventas (Jean Brazon, Mariannis Gandara, Jhonatan Lopez) para diversificar.
              </p>
            }
          />
        </div>

        {/* Ventas por Marca - Donut */}
        <div className="space-y-4">
          <div className="card p-6 animate-fade-in-up delay-225" style={{ animationFillMode: 'backwards' }}>
            <h3 className="text-lg font-display font-bold text-text-primary mb-4">Ventas por Marca</h3>
            <div className="flex justify-center h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e5e5e5', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(value) => fmtFull(Number(value))}
                  />
                  <Pie data={mockVentasPorMarca} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="ventas_usd" stroke="none" animationDuration={1400} animationEasing="ease-out">
                    {mockVentasPorMarca.map((_e, i) => <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5 mt-4">
              {mockVentasPorMarca.map((m, i) => (
                <div key={m.marca} className="flex items-center justify-between group hover:bg-surface-1 rounded-lg px-2 py-1 -mx-2 transition-colors cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full group-hover:scale-125 transition-transform" style={{ backgroundColor: DONUT_COLORS[i] }} />
                    <span className="text-sm text-text-secondary font-medium truncate max-w-[140px]">{m.marca}</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary tabular">{fmt(m.ventas_usd)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI insight about brands chart */}
          <div className="card p-4 border-accent-violet/20 bg-accent-violet/3 animate-fade-in-up delay-300" style={{ animationFillMode: 'backwards' }}>
            <div className="flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-accent-violet mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-text-primary mb-1">Interpretación IA <span className="text-[9px] px-1 py-0.5 bg-accent-violet/10 text-accent-violet rounded ml-1">IA</span></p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>SUPER A</strong> domina con el {superAShare}% de las ventas. PINTAMAS solo aporta 4.4%. Oportunidad: lanzar combo cross‑brand para elevar participación de marcas secundarias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Region + Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribución Regional */}
        <div className="card p-5 animate-fade-in-up delay-300" style={{ animationFillMode: 'backwards' }}>
          <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">Distribución Regional</h4>
          <div className="space-y-3">
            {mockVentasPorRegion.map((r) => {
              const pct = Math.max(3, Math.round((Math.abs(r.ventas_usd) / mockKpis.ventasTotales_USD) * 100));
              return (
                <div key={r.region} className="space-y-1.5 group">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-primary group-hover:text-brand-red transition-colors">{r.region}</span>
                    <span className="font-bold text-text-primary tabular">{fmt(Math.abs(r.ventas_usd))}</span>
                  </div>
                  <div className="h-2 bg-surface-1 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-gold to-brand-red rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Mini AI note */}
          <div className="mt-4 pt-3 border-t border-surface-2/50 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-accent-violet mt-0.5 shrink-0" />
            <p className="text-[11px] text-text-muted leading-relaxed">
              La región <strong>Capital</strong> concentra el {capitalShare}% de las ventas. Oriente y Táchira representan oportunidades de expansión geográfica.
            </p>
          </div>
        </div>

        {/* Quick Clients Preview */}
        <div className="lg:col-span-2 card p-6 animate-fade-in-up delay-300" style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-display font-bold text-text-primary flex items-center gap-2">
              <Users className="w-5 h-5 text-accent-blue" />
              Clientes Principales
            </h3>
            <a href="/comercial/clientes" className="text-xs font-bold text-brand-gold hover:text-brand-red transition-colors uppercase tracking-wider flex items-center gap-1 group">
              Ver todos <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-surface-2">
                  <th className="pb-3 pr-4">Cliente</th>
                  <th className="pb-3 pr-4">Región</th>
                  <th className="pb-3 pr-4 text-right">Facturación</th>
                  <th className="pb-3 text-right">Participación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-2/50">
                {mockTopClientes.slice(0, 4).map((c, i) => (
                  <tr key={i} className="group hover:bg-surface-1/50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <p className="text-sm font-semibold text-text-primary group-hover:text-brand-red transition-colors">{c.cliente}</p>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="text-xs font-medium text-text-muted bg-surface-1 px-2.5 py-1 rounded-lg">{c.region}</span>
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <span className="text-sm font-bold text-text-primary tabular">{fmtFull(c.compras_usd)}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={cn("text-sm font-bold tabular", c.participacion_pct > 0 ? "text-accent-emerald" : "text-accent-red")}>
                        {c.participacion_pct > 0 ? '+' : ''}{c.participacion_pct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* AI insight right in the table */}
          <div className="mt-4 pt-3 border-t border-surface-2/50 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-violet mt-0.5 shrink-0" />
            <p className="text-[11px] text-text-muted leading-relaxed">
              <strong>Ferremundial Proto</strong> aporta el 34.89% de la facturación. 2 clientes registran devoluciones (valores negativos). Se recomienda contacto inmediato para entender causas y evitar pérdida.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
