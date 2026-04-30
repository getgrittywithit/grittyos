'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from './status-badge';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  FileSpreadsheet,
  PenLine,
  Paperclip,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import type { Transaction, Category } from '@/types/crm';
import { formatCurrency } from '@/lib/demo-data';

interface TransactionWithCategory extends Transaction {
  category?: Category;
}

interface TransactionsTableProps {
  transactions: TransactionWithCategory[];
  onAddNew?: () => void;
  showJobLink?: boolean;
  showReconciled?: boolean;
}

const sourceIcons: Record<Transaction['source'], React.ReactNode> = {
  stripe: <CreditCard className="h-4 w-4" />,
  csv: <FileSpreadsheet className="h-4 w-4" />,
  manual: <PenLine className="h-4 w-4" />,
};

const sourceLabels: Record<Transaction['source'], string> = {
  stripe: 'Stripe',
  csv: 'Bank Import',
  manual: 'Manual',
};

export function TransactionsTable({
  transactions,
  onAddNew,
  showJobLink = true,
  showReconciled = true,
}: TransactionsTableProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'income' | 'expense'>('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;

  // Filter data based on search and type
  const filteredData = React.useMemo(() => {
    let filtered = transactions;

    if (typeFilter !== 'all') {
      filtered = filtered.filter((txn) => txn.type === typeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (txn) =>
          txn.description.toLowerCase().includes(query) ||
          txn.category?.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [transactions, searchQuery, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, typeFilter]);

  // Totals
  const totals = React.useMemo(() => {
    const income = filteredData
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredData
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, net: income - expenses };
  }, [filteredData]);

  return (
    <div className="space-y-4">
      {/* Header with search, filters, and add button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {/* Type filter buttons */}
          <div className="flex gap-1 rounded-lg border border-border p-1">
            <button
              onClick={() => setTypeFilter('all')}
              className={cn(
                'rounded-md px-3 py-1 text-sm font-medium transition-colors',
                typeFilter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter('income')}
              className={cn(
                'rounded-md px-3 py-1 text-sm font-medium transition-colors',
                typeFilter === 'income'
                  ? 'bg-emerald-600 text-white'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Income
            </button>
            <button
              onClick={() => setTypeFilter('expense')}
              className={cn(
                'rounded-md px-3 py-1 text-sm font-medium transition-colors',
                typeFilter === 'expense'
                  ? 'bg-red-600 text-white'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Expenses
            </button>
          </div>
        </div>
        {onAddNew && (
          <Button onClick={onAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-emerald-50 p-3 dark:bg-emerald-950/20">
          <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
            <ArrowDownLeft className="h-4 w-4" />
            Income
          </div>
          <p className="mt-1 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
            +{formatCurrency(totals.income)}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-red-50 p-3 dark:bg-red-950/20">
          <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400">
            <ArrowUpRight className="h-4 w-4" />
            Expenses
          </div>
          <p className="mt-1 text-xl font-semibold text-red-700 dark:text-red-400">
            -{formatCurrency(totals.expenses)}
          </p>
        </div>
        <div
          className={cn(
            'rounded-lg border border-border p-3',
            totals.net >= 0
              ? 'bg-emerald-50 dark:bg-emerald-950/20'
              : 'bg-red-50 dark:bg-red-950/20'
          )}
        >
          <div
            className={cn(
              'text-sm',
              totals.net >= 0
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-red-700 dark:text-red-400'
            )}
          >
            Net
          </div>
          <p
            className={cn(
              'mt-1 text-xl font-semibold',
              totals.net >= 0
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-red-700 dark:text-red-400'
            )}
          >
            {totals.net >= 0 ? '+' : ''}
            {formatCurrency(totals.net)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Source
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                {showReconciled && (
                  <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                    Reconciled
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={showReconciled ? 6 : 5} className="px-4 py-12 text-center">
                    <p className="text-muted-foreground">No transactions found.</p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      {new Date(txn.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                            txn.type === 'income'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          )}
                        >
                          {txn.type === 'income' ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{txn.description}</p>
                          {txn.job_id && showJobLink && (
                            <Link
                              href={`/dashboard/jobs/${txn.job_id}`}
                              className="text-xs text-primary hover:underline"
                            >
                              View Job
                            </Link>
                          )}
                        </div>
                        {txn.attachment_url && (
                          <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-sm">{txn.category?.name || 'Uncategorized'}</span>
                        {txn.category?.schedule_c_line && (
                          <span className="text-xs text-muted-foreground">
                            {txn.category.schedule_c_line}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        {sourceIcons[txn.source]}
                        <span className="text-sm">{sourceLabels[txn.source]}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <span
                        className={cn(
                          'font-medium',
                          txn.type === 'income'
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-red-700 dark:text-red-400'
                        )}
                      >
                        {txn.type === 'income' ? '+' : '-'}
                        {formatCurrency(txn.amount)}
                      </span>
                    </td>
                    {showReconciled && (
                      <td className="px-4 py-3 text-center">
                        {txn.reconciled ? (
                          <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-600" />
                        ) : (
                          <Circle className="mx-auto h-5 w-5 text-muted-foreground/40" />
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
              {filteredData.length} transactions
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
