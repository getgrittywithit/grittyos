'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Receipt, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/dashboard/data-table';
import { InvoiceStatusBadge } from '@/components/dashboard/status-badge';
import { NoInvoicesState } from '@/components/dashboard/empty-state';
import { demoInvoices, formatDate, formatCurrency, getCustomerById } from '@/lib/demo-data';
import type { Invoice } from '@/types/crm';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | Invoice['status'];

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
];

const columns = [
  {
    key: 'invoice_number',
    header: 'Invoice #',
    cell: (invoice: Invoice) => (
      <span className="font-medium">{invoice.invoice_number}</span>
    ),
  },
  {
    key: 'customer',
    header: 'Customer',
    cell: (invoice: Invoice) => {
      const customer = getCustomerById(invoice.customer_id);
      return customer ? (
        <span>
          {customer.first_name} {customer.last_name}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    cell: (invoice: Invoice) => <InvoiceStatusBadge status={invoice.status} />,
  },
  {
    key: 'total',
    header: 'Amount',
    cell: (invoice: Invoice) => (
      <div className="text-right">
        <span className="font-medium">{formatCurrency(invoice.total_amount)}</span>
        {invoice.paid_amount > 0 && invoice.paid_amount < invoice.total_amount && (
          <p className="text-xs text-muted-foreground">
            {formatCurrency(invoice.paid_amount)} paid
          </p>
        )}
      </div>
    ),
    className: 'text-right',
  },
  {
    key: 'due_date',
    header: 'Due Date',
    cell: (invoice: Invoice) => {
      const isOverdue =
        invoice.status !== 'paid' && new Date(invoice.due_date) < new Date();
      return (
        <span className={isOverdue ? 'text-red-600' : 'text-muted-foreground'}>
          {formatDate(invoice.due_date)}
        </span>
      );
    },
    className: 'hidden md:table-cell',
  },
  {
    key: 'issued',
    header: 'Issued',
    cell: (invoice: Invoice) => (
      <span className="text-muted-foreground">{formatDate(invoice.issue_date)}</span>
    ),
    className: 'hidden lg:table-cell',
  },
];

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const customer = getCustomerById(invoice.customer_id);
  const isOverdue =
    invoice.status !== 'paid' && new Date(invoice.due_date) < new Date();

  return (
    <Link href={`/dashboard/invoices/${invoice.id}`}>
      <Card className="transition-colors hover:border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{invoice.invoice_number}</span>
                <InvoiceStatusBadge status={invoice.status} />
              </div>
              {customer && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {customer.first_name} {customer.last_name}
                </p>
              )}
              <p
                className={cn(
                  'mt-2 text-xs',
                  isOverdue ? 'text-red-600' : 'text-muted-foreground'
                )}
              >
                {isOverdue && <AlertCircle className="mr-1 inline h-3 w-3" />}
                Due {formatDate(invoice.due_date)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatCurrency(invoice.total_amount)}</p>
              {invoice.paid_amount > 0 && invoice.paid_amount < invoice.total_amount && (
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(invoice.total_amount - invoice.paid_amount)} due
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function InvoicesPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');

  const handleRowClick = (invoice: Invoice) => {
    router.push(`/dashboard/invoices/${invoice.id}`);
  };

  // Filter and sort invoices
  const filteredInvoices = React.useMemo(() => {
    let invoices = [...demoInvoices];

    if (statusFilter !== 'all') {
      invoices = invoices.filter((inv) => inv.status === statusFilter);
    }

    // Sort by date (most recent first)
    return invoices.sort(
      (a, b) => new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime()
    );
  }, [statusFilter]);

  // Calculate summary stats
  const stats = React.useMemo(() => {
    const outstanding = demoInvoices
      .filter((inv) => ['sent', 'overdue'].includes(inv.status))
      .reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0);
    const overdue = demoInvoices.filter((inv) => inv.status === 'overdue').length;
    return { outstanding, overdue };
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Invoices</h1>
          <p className="text-muted-foreground">
            Create, send, and track invoices for your customers.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Receipt className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.outstanding)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue Invoices</p>
              <p className="text-2xl font-bold">{stats.overdue}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={statusFilter === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <DataTable
          data={filteredInvoices}
          columns={columns}
          keyExtractor={(invoice) => invoice.id}
          searchPlaceholder="Search invoices..."
          searchKeys={['invoice_number']}
          onRowClick={handleRowClick}
          emptyState={<NoInvoicesState />}
        />
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {filteredInvoices.length === 0 ? (
          <NoInvoicesState />
        ) : (
          filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        )}
      </div>
    </div>
  );
}
