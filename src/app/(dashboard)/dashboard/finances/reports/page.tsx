'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  FileBarChart,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/demo-data';
import {
  calculateProfitLoss,
  calculateCashFlow,
  demoCategories,
} from '@/lib/demo-data-financial';
import type { ProfitLossReport, CashFlowReport, CategoryTotal } from '@/types/crm';

function CategoryRow({ category, isExpense }: { category: CategoryTotal; isExpense?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium',
            isExpense
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
          )}
        >
          {category.transaction_count}
        </div>
        <div>
          <span className="font-medium">{category.category_name}</span>
          {category.schedule_c_line && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({category.schedule_c_line})
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        <span className={cn('font-medium', isExpense ? 'text-red-700' : 'text-emerald-700')}>
          {isExpense ? '-' : '+'}
          {formatCurrency(category.total)}
        </span>
        <span className="ml-2 text-xs text-muted-foreground">{category.percent_of_total}%</span>
      </div>
    </div>
  );
}

function MonthBar({
  month,
  inflow,
  outflow,
  maxValue,
}: {
  month: string;
  inflow: number;
  outflow: number;
  maxValue: number;
}) {
  const inflowPercent = maxValue > 0 ? (inflow / maxValue) * 100 : 0;
  const outflowPercent = maxValue > 0 ? (outflow / maxValue) * 100 : 0;
  const net = inflow - outflow;

  const monthLabel = new Date(month + '-01').toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });

  return (
    <div className="flex items-center gap-3">
      <span className="w-16 text-sm font-medium">{monthLabel}</span>
      <div className="flex-1 space-y-1">
        <div className="flex h-4 items-center gap-1">
          <div
            className="h-full rounded bg-emerald-500"
            style={{ width: `${inflowPercent}%` }}
          />
          <span className="text-xs text-emerald-700">+{formatCurrency(inflow)}</span>
        </div>
        <div className="flex h-4 items-center gap-1">
          <div
            className="h-full rounded bg-red-500"
            style={{ width: `${outflowPercent}%` }}
          />
          <span className="text-xs text-red-700">-{formatCurrency(outflow)}</span>
        </div>
      </div>
      <div
        className={cn(
          'w-24 text-right text-sm font-medium',
          net >= 0 ? 'text-emerald-700' : 'text-red-700'
        )}
      >
        {net >= 0 ? '+' : ''}
        {formatCurrency(net)}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = React.useState<'month' | 'quarter' | 'year'>('month');

  // Calculate date ranges
  const now = new Date();
  const getDateRange = () => {
    if (reportPeriod === 'month') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = now;
      return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        label: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      };
    }
    if (reportPeriod === 'quarter') {
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      const end = now;
      return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        label: `Q${quarter + 1} ${now.getFullYear()}`,
      };
    }
    const start = new Date(now.getFullYear(), 0, 1);
    return {
      start: start.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0],
      label: `${now.getFullYear()} YTD`,
    };
  };

  const dateRange = getDateRange();
  const profitLoss = calculateProfitLoss(dateRange.start, dateRange.end);
  const cashFlow = calculateCashFlow(6);

  const maxCashFlowValue = Math.max(
    ...cashFlow.months.map((m) => Math.max(m.inflow, m.outflow))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/finances">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground">
              Profit & Loss, Cash Flow, and more
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-4">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <div className="flex gap-1 rounded-lg border border-border p-1">
          <button
            onClick={() => setReportPeriod('month')}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              reportPeriod === 'month'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Month
          </button>
          <button
            onClick={() => setReportPeriod('quarter')}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              reportPeriod === 'quarter'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Quarter
          </button>
          <button
            onClick={() => setReportPeriod('year')}
            className={cn(
              'rounded-md px-4 py-1.5 text-sm font-medium transition-colors',
              reportPeriod === 'year'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Year
          </button>
        </div>
        <span className="text-sm text-muted-foreground">{dateRange.label}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profit & Loss Statement */}
        <div className="rounded-xl border border-border bg-background">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <FileBarChart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">Profit & Loss</h2>
                <p className="text-sm text-muted-foreground">{dateRange.label}</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* Income Section */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                <h3 className="font-medium text-emerald-700">Income</h3>
              </div>
              <div className="divide-y divide-border rounded-lg border border-border bg-muted/30 px-4">
                {profitLoss.income_by_category.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No income this period
                  </p>
                ) : (
                  profitLoss.income_by_category.map((cat) => (
                    <CategoryRow key={cat.category_id} category={cat} />
                  ))
                )}
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <span className="font-medium">Total Income</span>
                <span className="font-bold text-emerald-700">
                  +{formatCurrency(profitLoss.total_income)}
                </span>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-red-600" />
                <h3 className="font-medium text-red-700">Expenses</h3>
              </div>
              <div className="divide-y divide-border rounded-lg border border-border bg-muted/30 px-4">
                {profitLoss.expenses_by_category.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No expenses this period
                  </p>
                ) : (
                  profitLoss.expenses_by_category.map((cat) => (
                    <CategoryRow key={cat.category_id} category={cat} isExpense />
                  ))
                )}
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3">
                <span className="font-medium">Total Expenses</span>
                <span className="font-bold text-red-700">
                  -{formatCurrency(profitLoss.total_expenses)}
                </span>
              </div>
            </div>

            {/* Net Income */}
            <div
              className={cn(
                'rounded-lg p-4',
                profitLoss.net_income >= 0
                  ? 'bg-emerald-50 dark:bg-emerald-950/30'
                  : 'bg-red-50 dark:bg-red-950/30'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {profitLoss.net_income >= 0 ? (
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-semibold">Net Income</span>
                </div>
                <span
                  className={cn(
                    'text-2xl font-bold',
                    profitLoss.net_income >= 0 ? 'text-emerald-700' : 'text-red-700'
                  )}
                >
                  {profitLoss.net_income >= 0 ? '+' : ''}
                  {formatCurrency(profitLoss.net_income)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cash Flow */}
        <div className="rounded-xl border border-border bg-background">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">Cash Flow</h2>
                <p className="text-sm text-muted-foreground">Last 6 months</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {/* Summary */}
            <div className="mb-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/20">
                <p className="text-xs font-medium text-emerald-700">Total In</p>
                <p className="text-lg font-bold text-emerald-700">
                  +{formatCurrency(cashFlow.total_inflow)}
                </p>
              </div>
              <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950/20">
                <p className="text-xs font-medium text-red-700">Total Out</p>
                <p className="text-lg font-bold text-red-700">
                  -{formatCurrency(cashFlow.total_outflow)}
                </p>
              </div>
              <div
                className={cn(
                  'rounded-lg p-3',
                  cashFlow.net_flow >= 0
                    ? 'bg-emerald-50 dark:bg-emerald-950/20'
                    : 'bg-red-50 dark:bg-red-950/20'
                )}
              >
                <p
                  className={cn(
                    'text-xs font-medium',
                    cashFlow.net_flow >= 0 ? 'text-emerald-700' : 'text-red-700'
                  )}
                >
                  Net Flow
                </p>
                <p
                  className={cn(
                    'text-lg font-bold',
                    cashFlow.net_flow >= 0 ? 'text-emerald-700' : 'text-red-700'
                  )}
                >
                  {cashFlow.net_flow >= 0 ? '+' : ''}
                  {formatCurrency(cashFlow.net_flow)}
                </p>
              </div>
            </div>

            {/* Monthly Bars */}
            <div className="space-y-4">
              {cashFlow.months.map((month) => (
                <MonthBar
                  key={month.month}
                  month={month.month}
                  inflow={month.inflow}
                  outflow={month.outflow}
                  maxValue={maxCashFlowValue}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule C Preview */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/20">
        <div className="flex items-start gap-3">
          <FileBarChart className="mt-0.5 h-5 w-5 text-amber-700" />
          <div>
            <h3 className="font-semibold text-amber-800">Schedule C Export</h3>
            <p className="mt-1 text-sm text-amber-700">
              At year-end, export your categorized income and expenses organized by IRS Schedule C
              line items to share with your accountant. Categories are already mapped to the
              appropriate lines.
            </p>
            <Button variant="outline" size="sm" className="mt-3" disabled>
              Export Schedule C (Available at Year End)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
