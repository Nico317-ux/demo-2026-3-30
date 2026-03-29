import type { ColumnDef } from '@tanstack/react-table';
import { PageWrapper } from '../components/layout/PageWrapper';
import { DataTable } from '../components/tables/DataTable';
import { KpiCard } from '../components/shared/KpiCard';
import { quotesMock } from '../data/quotes.mock';
import { formatUSD } from '../utils/predictiveModel';
import type { Quote } from '../types';

export function Quotes() {
  const pending = quotesMock.filter((c) => c.status === 'pending').length;
  const totalAmount = quotesMock.reduce((s, c) => s + c.totalAmount, 0);

  const columns: ColumnDef<Quote>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'customer', header: 'Customer' },
    { accessorKey: 'seller', header: 'Seller' },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: ({ getValue }) => formatUSD(Number(getValue())),
    },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'probability', header: 'Prob. %' },
  ];

  return (
    <PageWrapper
      title="Quotes"
      description="Mock commercial pipeline — complements the sales view."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Quotes" value={quotesMock.length} />
        <KpiCard label="Pending" value={pending} />
        <KpiCard label="Total amount" value={formatUSD(totalAmount)} />
      </div>
      <DataTable data={quotesMock} columns={columns} />
    </PageWrapper>
  );
}
