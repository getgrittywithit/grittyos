'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JobStatusBadge } from '@/components/dashboard/status-badge';
import {
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  MinusCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/demo-data';
import {
  getAllJobProfitabilities,
  getFinancialStats,
} from '@/lib/demo-data-financial';
import type { JobProfitability } from '@/types/crm';

function ProfitabilityCard({ profitability }: { profitability: JobProfitability }) {
  const marginColor =
    profitability.profit_margin >= 40
      ? 'text-emerald-600'
      : profitability.profit_margin >= 20
        ? 'text-amber-600'
        : 'text-red-600';

  const marginBg =
    profitability.profit_margin >= 40
      ? 'bg-emerald-50 dark:bg-emerald-950/30'
      : profitability.profit_margin >= 20
        ? 'bg-amber-50 dark:bg-amber-950/30'
        : 'bg-red-50 dark:bg-red-950/30';

  return (
    <div className="rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <Link
              href={`/dashboard/jobs/${profitability.job_id}`}
              className="font-medium hover:text-primary hover:underline"
            >
              {profitability.job?.title || 'Unknown Job'}
            </Link>
            <p className="text-sm text-muted-foreground">
              {profitability.customer?.first_name} {profitability.customer?.last_name}
            </p>
          </div>
        </div>
        <JobStatusBadge status={profitability.job?.status || 'pending'} />
      </div>

      {/* Revenue & Costs Grid */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        {/* Revenue */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Revenue
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Invoiced</span>
              <span className="font-medium">
                {formatCurrency(profitability.invoiced_amount)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Collected</span>
              <span className="font-medium text-emerald-600">
                {formatCurrency(profitability.collected_amount)}
              </span>
            </div>
            {profitability.outstanding_amount > 0 && (
              <div className="flex justify-between text-sm">
                <span>Outstanding</span>
                <span className="font-medium text-amber-600">
                  {formatCurrency(profitability.outstanding_amount)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Costs */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Costs
          </p>
          <div className="space-y-1">
            {profitability.materials_cost > 0 && (
              <div className="flex justify-between text-sm">
                <span>Materials</span>
                <span className="font-medium">
                  {formatCurrency(profitability.materials_cost)}
                </span>
              </div>
            )}
            {profitability.labor_cost > 0 && (
              <div className="flex justify-between text-sm">
                <span>Labor</span>
                <span className="font-medium">
                  {formatCurrency(profitability.labor_cost)}
                </span>
              </div>
            )}
            {profitability.other_costs > 0 && (
              <div className="flex justify-between text-sm">
                <span>Other</span>
                <span className="font-medium">
                  {formatCurrency(profitability.other_costs)}
                </span>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-1 text-sm">
              <span>Total</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(profitability.total_costs)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Section */}
      <div className={cn('mt-4 rounded-lg p-4', marginBg)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {profitability.is_profitable ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : profitability.gross_profit === 0 ? (
              <MinusCircle className="h-5 w-5 text-amber-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
            <span className="font-medium">
              {profitability.is_profitable
                ? 'Profitable'
                : profitability.gross_profit === 0
                  ? 'Break Even'
                  : 'Loss'}
            </span>
          </div>
          <div className="text-right">
            <p
              className={cn(
                'text-xl font-bold',
                profitability.gross_profit >= 0 ? 'text-emerald-700' : 'text-red-700'
              )}
            >
              {profitability.gross_profit >= 0 ? '+' : ''}
              {formatCurrency(profitability.gross_profit)}
            </p>
            <p className={cn('text-sm font-medium', marginColor)}>
              {profitability.profit_margin}% margin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfitabilityPage() {
  const profitabilities = getAllJobProfitabilities();
  const stats = getFinancialStats();

  // Calculate overall metrics
  const totalRevenue = profitabilities.reduce((sum, p) => sum + p.collected_amount, 0);
  const totalCosts = profitabilities.reduce((sum, p) => sum + p.total_costs, 0);
  const totalProfit = totalRevenue - totalCosts;
  const profitableJobs = profitabilities.filter((p) => p.is_profitable).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/finances">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold">Job Profitability</h1>
          <p className="text-muted-foreground">
            See exactly how much you're making (or losing) on each job
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 text-muted-foreground">
            <DollarSign className="h-5 w-5" />
            <span className="text-sm font-medium">Total Revenue</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 text-muted-foreground">
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-sm font-medium">Total Costs</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-red-600">
            -{formatCurrency(totalCosts)}
          </p>
        </div>
        <div
          className={cn(
            'rounded-xl border p-5',
            totalProfit >= 0
              ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20'
              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
          )}
        >
          <div className="flex items-center gap-3 text-muted-foreground">
            {totalProfit >= 0 ? (
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className="text-sm font-medium">Total Profit</span>
          </div>
          <p
            className={cn(
              'mt-2 text-2xl font-bold',
              totalProfit >= 0 ? 'text-emerald-700' : 'text-red-700'
            )}
          >
            {totalProfit >= 0 ? '+' : ''}
            {formatCurrency(totalProfit)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Briefcase className="h-5 w-5" />
            <span className="text-sm font-medium">Profitable Jobs</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {profitableJobs} / {profitabilities.length}
          </p>
          <p className="text-sm text-muted-foreground">
            {stats.avg_job_profit_margin}% avg margin
          </p>
        </div>
      </div>

      {/* Best/Worst Jobs Highlight */}
      {profitabilities.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Best Job */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Most Profitable Job</span>
            </div>
            <p className="mt-2 font-medium">{profitabilities[0]?.job?.title}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-700">
                +{formatCurrency(profitabilities[0]?.gross_profit || 0)}
              </span>
              <span className="text-sm text-emerald-600">
                ({profitabilities[0]?.profit_margin}% margin)
              </span>
            </div>
          </div>

          {/* Worst Job */}
          {profitabilities.length > 1 && (
            <div
              className={cn(
                'rounded-xl border p-5',
                profitabilities[profitabilities.length - 1]?.is_profitable
                  ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20'
                  : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
              )}
            >
              <div
                className={cn(
                  'flex items-center gap-2',
                  profitabilities[profitabilities.length - 1]?.is_profitable
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-red-700 dark:text-red-400'
                )}
              >
                <TrendingDown className="h-5 w-5" />
                <span className="font-medium">Lowest Margin Job</span>
              </div>
              <p className="mt-2 font-medium">
                {profitabilities[profitabilities.length - 1]?.job?.title}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={cn(
                    'text-2xl font-bold',
                    profitabilities[profitabilities.length - 1]?.is_profitable
                      ? 'text-amber-700'
                      : 'text-red-700'
                  )}
                >
                  {profitabilities[profitabilities.length - 1]?.gross_profit >= 0 ? '+' : ''}
                  {formatCurrency(profitabilities[profitabilities.length - 1]?.gross_profit || 0)}
                </span>
                <span
                  className={cn(
                    'text-sm',
                    profitabilities[profitabilities.length - 1]?.is_profitable
                      ? 'text-amber-600'
                      : 'text-red-600'
                  )}
                >
                  ({profitabilities[profitabilities.length - 1]?.profit_margin}% margin)
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Job Cards Grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">All Jobs</h2>
        {profitabilities.length === 0 ? (
          <div className="rounded-xl border border-border bg-background p-12 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No jobs with tracked expenses yet</p>
            <p className="mt-1 text-muted-foreground">
              Start adding expenses to jobs to see profitability analysis
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profitabilities.map((p) => (
              <ProfitabilityCard key={p.job_id} profitability={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
