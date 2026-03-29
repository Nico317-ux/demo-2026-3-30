import type { ColumnDef } from '@tanstack/react-table';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { DataTable } from '../../components/tables/DataTable';
import { KpiCard } from '../../components/shared/KpiCard';
import { purchasePlanningSuggestions } from '../../utils/aggregations';
import { formatUSD } from '../../utils/predictiveModel';

type Row = ReturnType<typeof purchasePlanningSuggestions>[number];

export function PurchasePlanning() {
  const rows = purchasePlanningSuggestions();
  const highPri = rows.filter((r) => r.priority === 'high').length;

  const columns: ColumnDef<Row>[] = [
    { accessorKey: 'code', header: 'Code' },
    { accessorKey: 'description', header: 'Material' },
    { accessorKey: 'coverageDays', header: 'Cov. days' },
    { accessorKey: 'priority', header: 'Priority' },
    { accessorKey: 'suggestedPurchaseQty', header: 'Suggested qty' },
    {
      accessorKey: 'costImpactUSD',
      header: 'Cost USD',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
  ];

  return (
    <PageWrapper
      title="Purchase planning"
      description="Suggested replenishment from coverage and consumption (demo, not real POs)."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="High priority" value={highPri} />
        <KpiCard label="Materials evaluated" value={rows.length} />
        <KpiCard
          label="Aggregate suggested spend"
          value={formatUSD(rows.reduce((s, r) => s + r.costImpactUSD, 0))}
        />
      </div>
      <DataTable data={rows} columns={columns} />
    </PageWrapper>
  );
}
