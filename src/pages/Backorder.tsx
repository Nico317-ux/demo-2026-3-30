import { useMemo } from "react";
import { ClipboardList, Clock, Package } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChartCard } from "../components/charts/BarChartCard";
import { LineChartCard } from "../components/charts/LineChartCard";
import { PageWrapper } from "../components/layout/PageWrapper";
import { DataTable } from "../components/tables/DataTable";
import { KpiCard } from "../components/shared/KpiCard";
import { backorderMock } from "../data/backorder.mock";
import {
  backorderAgingBuckets,
  weeklyBackorderTrendSimulated,
} from "../utils/aggregations";
import { formatNumber } from "../utils/predictiveModel";
import type { BackorderItem } from "../types";

export function Backorder() {
  const kpis = useMemo(() => {
    const totalUnits = backorderMock.reduce((s, b) => s + b.pendingUnits, 0);
    const agingAvg =
      backorderMock.length === 0
        ? 0
        : Math.round(
            backorderMock.reduce((s, b) => s + b.daysPending, 0) /
              backorderMock.length,
          );
    return { totalUnits, agingAvg };
  }, []);

  const top10 = useMemo(() => {
    const map = new Map<string, number>();
    for (const b of backorderMock) {
      map.set(b.product, (map.get(b.product) ?? 0) + b.pendingUnits);
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([product, units]) => ({ product: product.slice(0, 28), units }));
  }, []);

  const agingData = backorderAgingBuckets();
  const weeklyTrend = weeklyBackorderTrendSimulated();

  const columns: ColumnDef<BackorderItem>[] = [
    { accessorKey: "orderId", header: "Pedido" },
    { accessorKey: "customer", header: "Cliente" },
    { accessorKey: "product", header: "Producto" },
    { accessorKey: "pendingUnits", header: "Pendiente" },
    { accessorKey: "daysPending", header: "Días" },
    { accessorKey: "priority", header: "Prioridad" },
  ];

  return (
    <PageWrapper
      title="Backorder"
      description="Líneas de pedido abiertas con antigüedad, volumen por producto y tendencia semanal simulada."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          label="Total unidades en backorder"
          value={formatNumber(kpis.totalUnits)}
          icon={Package}
        />
        <KpiCard
          label="Antigüedad promedio"
          value={`${kpis.agingAvg} días`}
          icon={Clock}
        />
        <KpiCard
          label="Líneas activas"
          value={backorderMock.length}
          icon={ClipboardList}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard
          title="Top 10 productos por unidades pendientes"
          subtitle="Mayor impacto en backorder"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={top10}
              layout="vertical"
              margin={{ left: 8, right: 8 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis
                type="number"
                tick={{ fill: "#F1EEEE", opacity: 0.7, fontSize: 10 }}
              />
              <YAxis
                dataKey="product"
                type="category"
                width={120}
                tick={{ fill: "#F1EEEE", opacity: 0.7, fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A204E",
                  border: "1px solid #032C61",
                  color: "#F1EEEE",
                }}
                formatter={(v) => formatNumber(Number(v))}
              />
              <Bar dataKey="units" fill="#DC3920" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>

        <BarChartCard
          title="Distribución por antigüedad"
          subtitle="Segmentación por rango de días"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={agingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
              <XAxis
                dataKey="label"
                tick={{ fill: "#F1EEEE", opacity: 0.7, fontSize: 12 }}
              />
              <YAxis tick={{ fill: "#F1EEEE", opacity: 0.7, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A204E",
                  border: "1px solid #032C61",
                  color: "#F1EEEE",
                }}
              />
              <Bar dataKey="count" fill="#F1EEEE" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </BarChartCard>
      </div>

      <LineChartCard
        title="Tendencia semanal (simulada)"
        subtitle="Unidades en backorder — demo"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#032C61" />
            <XAxis dataKey="week" tick={{ fill: "#F1EEEE", opacity: 0.7 }} />
            <YAxis tick={{ fill: "#F1EEEE", opacity: 0.7 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A204E",
                border: "1px solid #032C61",
                color: "#F1EEEE",
              }}
              formatter={(v) => formatNumber(Number(v))}
            />
            <Bar dataKey="units" fill="#DC3920" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </LineChartCard>

      <div>
        <h3 className="mb-2 border-l-4 border-[#DC3920] pl-3 text-sm font-semibold text-[#F1EEEE]">
          Detalle de pedidos
        </h3>
        <DataTable data={backorderMock} columns={columns} />
      </div>
    </PageWrapper>
  );
}
