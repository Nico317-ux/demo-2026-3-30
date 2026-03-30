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
import { BarChartCard } from "../../components/charts/BarChartCard";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { DataTable } from "../../components/tables/DataTable";
import { KpiCard } from "../../components/shared/KpiCard";
import { stockCoverageByProduct } from "../../utils/aggregations";

type Row = ReturnType<typeof stockCoverageByProduct>[number];

export function CoverageRisk() {
  const rows = stockCoverageByProduct();
  const lowCov = rows.filter((r) => r.band === "low").length;
  const excess = rows.filter((r) => r.band === "excess").length;

  const chart = [...rows]
    .sort((a, b) => a.coverageDays - b.coverageDays)
    .slice(0, 12)
    .map((r) => ({ product: r.product.slice(0, 18), days: r.coverageDays }));

  const columns: ColumnDef<Row>[] = [
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "product", header: "Producto" },
    { accessorKey: "stock", header: "Stock" },
    { accessorKey: "salesMonthUnits", header: "Ventas/mes" },
    { accessorKey: "coverageDays", header: "Días cobertura" },
    { accessorKey: "band", header: "Banda" },
  ];

  return (
    <PageWrapper
      title="Cobertura y riesgo de stockout"
      description="Días de cobertura según velocidad de ventas reciente — bandas de inventario bajo vs excesivo."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Productos &lt;7 días cobertura" value={lowCov} />
        <KpiCard label="Productos &gt;90 días cobertura" value={excess} />
        <KpiCard label="SKUs evaluados" value={rows.length} />
      </div>

      <BarChartCard
        title="Menor cobertura (días)"
        subtitle="Top 12 riesgo de stockout"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
            <XAxis dataKey="product" className="text-[10px]" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="days" fill="#e11d48" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </BarChartCard>

      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
