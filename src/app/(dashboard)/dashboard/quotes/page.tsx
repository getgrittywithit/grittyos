'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/dashboard/data-table';
import { QuoteStatusBadge } from '@/components/dashboard/status-badge';
import { NoQuotesState } from '@/components/dashboard/empty-state';
import { demoQuotes, formatDate, formatCurrency, getCustomerById } from '@/lib/demo-data';
import type { Quote } from '@/types/crm';

const columns = [
  {
    key: 'quote_number',
    header: 'Quote #',
    cell: (quote: Quote) => (
      <span className="font-medium">{quote.quote_number}</span>
    ),
  },
  {
    key: 'title',
    header: 'Title',
    cell: (quote: Quote) => {
      const customer = getCustomerById(quote.customer_id);
      return (
        <div>
          <p className="font-medium">{quote.title}</p>
          {customer && (
            <p className="text-sm text-muted-foreground">
              {customer.first_name} {customer.last_name}
            </p>
          )}
        </div>
      );
    },
  },
  {
    key: 'status',
    header: 'Status',
    cell: (quote: Quote) => <QuoteStatusBadge status={quote.status} />,
  },
  {
    key: 'total',
    header: 'Amount',
    cell: (quote: Quote) => (
      <span className="font-medium">{formatCurrency(quote.total_amount)}</span>
    ),
    className: 'text-right',
  },
  {
    key: 'expiration',
    header: 'Expires',
    cell: (quote: Quote) => (
      <span className="text-muted-foreground">
        {quote.expiration_date ? formatDate(quote.expiration_date) : '—'}
      </span>
    ),
    className: 'hidden lg:table-cell',
  },
  {
    key: 'created',
    header: 'Created',
    cell: (quote: Quote) => (
      <span className="text-muted-foreground">{formatDate(quote.created_at)}</span>
    ),
    className: 'hidden md:table-cell',
  },
];

function QuoteCard({ quote }: { quote: Quote }) {
  const customer = getCustomerById(quote.customer_id);

  return (
    <Link href={`/dashboard/quotes/${quote.id}`}>
      <Card className="transition-colors hover:border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {quote.quote_number}
                </span>
                <QuoteStatusBadge status={quote.status} />
              </div>
              <h3 className="mt-1 font-medium">{quote.title}</h3>
              {customer && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {customer.first_name} {customer.last_name}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">{formatCurrency(quote.total_amount)}</p>
              {quote.expiration_date && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Expires {formatDate(quote.expiration_date)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function QuotesPage() {
  const router = useRouter();

  const handleRowClick = (quote: Quote) => {
    router.push(`/dashboard/quotes/${quote.id}`);
  };

  // Sort quotes by date (most recent first)
  const sortedQuotes = [...demoQuotes].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Quotes</h1>
          <p className="text-muted-foreground">
            Create and manage quotes for your customers.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/quotes/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Quote
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <DataTable
          data={sortedQuotes}
          columns={columns}
          keyExtractor={(quote) => quote.id}
          searchPlaceholder="Search quotes..."
          searchKeys={['quote_number', 'title']}
          onRowClick={handleRowClick}
          emptyState={<NoQuotesState />}
        />
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {sortedQuotes.length === 0 ? (
          <NoQuotesState />
        ) : (
          sortedQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        )}
      </div>
    </div>
  );
}
