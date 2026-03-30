import type { ColumnDef } from "@tanstack/react-table";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { DataTable } from "../../components/tables/DataTable";
import { KpiCard } from "../../components/shared/KpiCard";
import { purchasePlanningSuggestions } from "../../utils/aggregations";
import { formatUSD } from "../../utils/predictiveModel";

type Row = ReturnType<typeof purchasePlanningSuggestions>[number];

export function PurchasePlanning() {
  const rows = purchasePlanningSuggestions();
  const highPri = rows.filter((r) => r.priority === "high").length;

  const columns: ColumnDef<Row>[] = [
    { accessorKey: "code", header: "Código" },
    { accessorKey: "description", header: "Material" },
    { accessorKey: "coverageDays", header: "Días cobertura" },
    { accessorKey: "priority", header: "Prioridad" },
    { accessorKey: "suggestedPurchaseQty", header: "Cantidad sugerida" },
    {
      accessorKey: "costImpactUSD",
      header: "Costo USD",
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
  ];

  return (
    <PageWrapper
      title="Plan de compras"
      description="Sugerencias de reabastecimiento según cobertura y consumo (demo, no POs reales)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Alta prioridad" value={highPri} />
        <KpiCard label="Materiales evaluados" value={rows.length} />
        <KpiCard
          label="Gasto sugerido agregado"
          value={formatUSD(rows.reduce((s, r) => s + r.costImpactUSD, 0))}
        />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
