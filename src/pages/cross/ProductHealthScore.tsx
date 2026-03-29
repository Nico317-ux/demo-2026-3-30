import type { ColumnDef } from '@tanstack/react-table';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { DataTable } from '../../components/tables/DataTable';
import { KpiCard } from '../../components/shared/KpiCard';
import { HealthLightChip } from '../../components/shared/HealthLightChip';
import { productHealthScores } from '../../utils/aggregations';
import type { ProductHealthScore } from '../../types';

export function ProductHealthScorePage() {
  const rows = productHealthScores();
  const green = rows.filter((r) => r.healthLight === 'green').length;
  const red = rows.filter((r) => r.healthLight === 'red').length;

  const columns: ColumnDef<ProductHealthScore>[] = [
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'product', header: 'Product' },
    { accessorKey: 'totalScore', header: 'Score' },
    {
      id: 'health',
      header: 'Health',
      cell: ({ row }) => <HealthLightChip color={row.original.healthLight} />,
    },
    { accessorKey: 'scoreSales', header: 'Sales' },
    { accessorKey: 'scoreMargin', header: 'Margin' },
    { accessorKey: 'scoreBackorder', header: 'Backorder' },
  ];

  return (
    <PageWrapper
      title="Product health score"
      description="0–100 composite from sales, margin, rotation proxy, backorder, and stock (demo weights)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Green" value={green} />
        <KpiCard label="Red" value={red} />
        <KpiCard label="Portfolio size" value={rows.length} />
        <KpiCard
          label="Average score"
          value={
            rows.length ? Math.round(rows.reduce((s, r) => s + r.totalScore, 0) / rows.length) : 0
          }
        />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
