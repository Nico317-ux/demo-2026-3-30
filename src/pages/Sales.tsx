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
  { id: 'summary' as const, label: 'Summary' },
  { id: 'seller' as const, label: 'By seller' },
  { id: 'region' as const, label: 'By region' },
  { id: 'line' as const, label: 'By line' },
  { id: 'customer' as const, label: 'By customer' },
];

export function Sales() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('summary');

  const latestMonth = salesByMonth[salesByMonth.length - 1]!;
  const attainment =
    latestMonth.target > 0 ? Math.round((latestMonth.totalUSD / latestMonth.target) * 1000) / 10 : 0;

  return (
    <PageWrapper
      title="Sales KPIs"
      description="Volume, revenue, target attainment, and breakdowns by seller, region, line, and customer."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total sales (Mar)" value={formatUSD(latestMonth.totalUSD)} />
        <KpiCard label="Units (Mar)" value={formatNumber(latestMonth.units)} />
        <KpiCard label="Target attainment" value={`${attainment}%`} delta={attainment - 100} />
        <KpiCard label="March target" value={formatUSD(latestMonth.target)} />
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition',
              tab === t.id
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'summary' && (
        <LineChartCard title="Monthly revenue trend" subtitle="USD by month">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesByMonth}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
              <Line type="monotone" dataKey="totalUSD" stroke="#0284c7" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </LineChartCard>
      )}

      {tab === 'seller' && (
        <BarChartCard title="Revenue by seller" subtitle="USD total">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesBySeller}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="seller" className="text-[10px]" angle={-25} textAnchor="end" height={70} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}

      {tab === 'region' && (
        <BarChartCard title="Revenue by region">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByRegion}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="region" />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#0d9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}

      {tab === 'line' && (
        <BarChartCard title="Revenue by product line">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByLine}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="line" className="text-[10px]" angle={-20} textAnchor="end" height={70} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}

      {tab === 'customer' && (
        <BarChartCard title="Top customers by revenue">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByCustomer}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
              <XAxis dataKey="customer" className="text-[10px]" angle={-25} textAnchor="end" height={80} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => formatUSD(Number(v))} />
              <Bar dataKey="totalUSD" fill="#9333ea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      )}
    </PageWrapper>
  );
}
