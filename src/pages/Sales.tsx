import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PageWrapper } from '../components/layout/PageWrapper';
import { LineChartCard } from '../components/charts/LineChartCard';
import { BarChartCard } from '../components/charts/BarChartCard';
import { KpiCard } from '../components/shared/KpiCard';
import {
  salesByCustomer,
  salesByLine,
  salesByMonth,
  salesByRegion,
  salesBySeller,
} from '../data/sales.mock';
import { formatNumber, formatUSD } from '../utils/predictiveModel';
import { cn } from '../utils/cn';

const tabs = [
  { id: 'summary' as const,  label: 'Resumen' },
  { id: 'seller' as const,   label: 'Por vendedor' },
  { id: 'region' as const,   label: 'Por región' },
  { id: 'line' as const,     label: 'Por línea' },
  { id: 'customer' as const, label: 'Por cliente' },
];

export function Sales() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('summary');

  const latestMonth = salesByMonth[salesByMonth.length - 1]!;
  const attainment =
    latestMonth.target > 0 ? Math.round((latestMonth.totalUSD / latestMonth.target) * 1000) / 10 : 0;

  const tt = { contentStyle: { backgroundColor: '#0A204E', border: '1px solid #032C61', color: '#F1EEEE' } };
  const ax = { tick: { fill: '#F1EEEE', opacity: 0.7 } };

  return (
    <PageWrapper
      title="KPIs de ventas"
      description="Volumen, ingresos, cumplimiento de meta y desglose por vendedor, región, línea y cliente."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Ventas totales (Mar)"    value={formatUSD(latestMonth.totalUSD)} />
        <KpiCard label="Unidades (Mar)"           value={formatNumber(latestMonth.units)} />
        <KpiCard label="Cumplimiento de meta"     value={`${attainment}%`} delta={attainment - 100} />
        <KpiCard label="Meta de marzo"            value={formatUSD(latestMonth.target)} />
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[#032C61] pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition',
              tab === t.id
                ? 'bg-[#DC3920] text-[#F1EEEE]'
                : 'bg-[#032C61] text-[#F1EEEE]/70 ring-1 ring-[#032C61] hover:bg-[#0A204E]',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'summary' && (
        <LineChartCard title="Tendencia de ingresos mensual" subtitle="USD por mes">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis dataKey="month" {...ax} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} {...ax} />
              <Tooltip {...tt} formatter={(v) => formatUSD(Number(v))} />
              <Line type="monotone" dataKey="totalUSD" stroke="#DC3920" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </LineChartCard>
      )}

      {tab === 'seller' && (
        <BarChartCard title="Ingresos por vendedor" subtitle="USD total">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesBySeller}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis dataKey="seller" tick={{ fill: '#F1EEEE', opacity: 0.7, fontSize: 10 }} angle={-25} textAnchor="end" height={70} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} {...ax} />
              <Tooltip {...tt} formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#DC3920" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}

      {tab === 'region' && (
        <BarChartCard title="Ingresos por región">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis dataKey="region" {...ax} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} {...ax} />
              <Tooltip {...tt} formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#DC3920" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}

      {tab === 'line' && (
        <BarChartCard title="Ingresos por línea de producto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis dataKey="line" tick={{ fill: '#F1EEEE', opacity: 0.7, fontSize: 10 }} angle={-20} textAnchor="end" height={70} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} {...ax} />
              <Tooltip {...tt} formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#DC3920" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}

      {tab === 'customer' && (
        <BarChartCard title="Top clientes por ingresos">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByCustomer}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis dataKey="customer" tick={{ fill: '#F1EEEE', opacity: 0.7, fontSize: 10 }} angle={-25} textAnchor="end" height={80} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} {...ax} />
              <Tooltip {...tt} formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#DC3920" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}
    </PageWrapper>
  );
}
