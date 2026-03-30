import type { ColumnDef } from "@tanstack/react-table";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { DataTable } from "../../components/tables/DataTable";
import { KpiCard } from "../../components/shared/KpiCard";
import { HealthLightChip } from "../../components/shared/HealthLightChip";
import { productHealthScores } from "../../utils/aggregations";
import type { ProductHealthScore } from "../../types";

export function ProductHealthScorePage() {
  const rows = productHealthScores();
  const green = rows.filter((r) => r.healthLight === "green").length;
  const red = rows.filter((r) => r.healthLight === "red").length;

  const columns: ColumnDef<ProductHealthScore>[] = [
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "product", header: "Producto" },
    { accessorKey: "totalScore", header: "Puntaje" },
    {
      id: "health",
      header: "Salud",
      cell: ({ row }) => <HealthLightChip color={row.original.healthLight} />,
    },
    { accessorKey: "scoreSales", header: "Ventas" },
    { accessorKey: "scoreMargin", header: "Margen" },
    { accessorKey: "scoreBackorder", header: "Backorder" },
  ];

  return (
    <PageWrapper
      title="Puntaje de salud del producto"
      description="Puntaje 0–100 compuesto de ventas, margen, rotación, backorder y stock."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Verde" value={green} />
        <KpiCard label="Rojo" value={red} />
        <KpiCard label="Tamaño del portafolio" value={rows.length} />
        <KpiCard
          label="Puntaje promedio"
          value={
            rows.length
              ? Math.round(
                  rows.reduce((s, r) => s + r.totalScore, 0) / rows.length,
                )
              : 0
          }
        />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
