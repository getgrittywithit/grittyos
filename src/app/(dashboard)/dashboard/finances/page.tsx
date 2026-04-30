'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import {
  FinanceDisclaimerModal,
  FinanceDisclaimerBanner,
} from '@/components/dashboard/finance-disclaimer-modal';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowRight,
  Receipt,
  PieChart,
  FileBarChart,
  CreditCard,
  CheckCircle,
  Clock,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/demo-data';
import {
  getFinancialStats,
  getTransactionsWithRelations,
  demoReconciliationPeriods,
} from '@/lib/demo-data-financial';

function FinanceStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  variant = 'default',
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: number;
  trendLabel?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}) {
  const variantStyles = {
    default: 'bg-background border-border',
    success: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800',
    warning: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800',
    danger: 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800',
  };

  const iconStyles = {
    default: 'bg-primary/10 text-primary',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className={cn('rounded-xl border p-5', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn('rounded-lg p-2.5', iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          {trend >= 0 ? (
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-600" />
          )}
          <span className={trend >= 0 ? 'text-emerald-600' : 'text-red-600'}>
            {trend >= 0 ? '+' : ''}
            {trend}%
          </span>
          {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/50"
    >
      <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export default function FinancesPage() {
  const stats = getFinancialStats();
  const recentTransactions = getTransactionsWithRelations().slice(0, 10);
  const openPeriod = demoReconciliationPeriods.find((p) => p.status === 'open');

  return (
    <FinanceDisclaimerModal>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Finances</h1>
          <p className="mt-1 text-muted-foreground">
            Track income, expenses, and job profitability
          </p>
        </div>

        {/* Disclaimer Banner */}
        <FinanceDisclaimerBanner />

      {/* Key Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FinanceStatCard
          title="Income This Month"
          value={formatCurrency(stats.income_this_month)}
          icon={TrendingUp}
          trend={stats.income_change_percent}
          trendLabel="vs last month"
          variant="success"
        />
        <FinanceStatCard
          title="Expenses This Month"
          value={formatCurrency(stats.expenses_this_month)}
          icon={TrendingDown}
          variant="default"
        />
        <FinanceStatCard
          title="Accounts Receivable"
          value={formatCurrency(stats.accounts_receivable)}
          subtitle={
            stats.overdue_amount > 0 ? `${formatCurrency(stats.overdue_amount)} overdue` : undefined
          }
          icon={Receipt}
          variant={stats.overdue_amount > 0 ? 'warning' : 'default'}
        />
        <FinanceStatCard
          title="Avg. Job Profit Margin"
          value={`${stats.avg_job_profit_margin}%`}
          icon={PieChart}
          variant={stats.avg_job_profit_margin >= 30 ? 'success' : 'default'}
        />
      </div>

      {/* Net Income Card */}
      <div
        className={cn(
          'rounded-xl border p-6',
          stats.net_this_month >= 0
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20'
            : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Net Income This Month</p>
            <p
              className={cn(
                'mt-1 text-3xl font-bold',
                stats.net_this_month >= 0 ? 'text-emerald-700' : 'text-red-700'
              )}
            >
              {stats.net_this_month >= 0 ? '+' : ''}
              {formatCurrency(stats.net_this_month)}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/finances/reports">
              <Button variant="outline">
                <FileBarChart className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </Link>
            <Link href="/dashboard/finances/profitability">
              <Button>
                <Briefcase className="mr-2 h-4 w-4" />
                Job Profitability
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="space-y-3">
            <QuickActionCard
              title="Add Transaction"
              description="Record income or expense"
              icon={DollarSign}
              href="/dashboard/finances/transactions"
            />
            <QuickActionCard
              title="Job Profitability"
              description="See profit per job"
              icon={PieChart}
              href="/dashboard/finances/profitability"
            />
            <QuickActionCard
              title="Import CSV"
              description="Import bank statement"
              icon={CreditCard}
              href="/dashboard/finances/transactions"
            />
            <QuickActionCard
              title="P&L Report"
              description="Profit & Loss statement"
              icon={FileBarChart}
              href="/dashboard/finances/reports"
            />
          </div>

          {/* Reconciliation Status */}
          <div className="mt-6 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-3">
              {stats.unreconciled_count === 0 ? (
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                  <CheckCircle className="h-5 w-5" />
                </div>
              ) : (
                <div className="rounded-full bg-amber-100 p-2 text-amber-700">
                  <Clock className="h-5 w-5" />
                </div>
              )}
              <div>
                <p className="font-medium">Reconciliation Status</p>
                <p className="text-sm text-muted-foreground">
                  {stats.unreconciled_count === 0
                    ? 'All transactions reconciled'
                    : `${stats.unreconciled_count} unreconciled transactions`}
                </p>
              </div>
            </div>
            {stats.last_reconciled_date && (
              <p className="mt-3 text-xs text-muted-foreground">
                Last reconciled:{' '}
                {new Date(stats.last_reconciled_date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Link href="/dashboard/finances/transactions">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <TransactionsTable
            transactions={recentTransactions}
            showReconciled={false}
          />
        </div>
      </div>
    </div>
    </FinanceDisclaimerModal>
  );
}
