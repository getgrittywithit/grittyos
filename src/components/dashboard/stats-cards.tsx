'use client';

import {
  Users,
  Briefcase,
  FileText,
  Receipt,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { DashboardStats } from '@/types/crm';
import { formatCurrency } from '@/lib/demo-data';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantStyles = {
  default: {
    iconBg: 'bg-muted',
    iconColor: 'text-foreground',
  },
  primary: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  success: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  warning: {
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  danger: {
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = 'default',
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 text-sm">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={cn(
                    'font-medium',
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend.isPositive ? '+' : ''}
                  {trend.value}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
              styles.iconBg
            )}
          >
            <Icon className={cn('h-6 w-6', styles.iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: DashboardStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const revenueChange = stats.revenueLastMonth > 0
    ? Math.round(((stats.revenueThisMonth - stats.revenueLastMonth) / stats.revenueLastMonth) * 100)
    : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Customers"
        value={stats.totalCustomers}
        description="Total active accounts"
        icon={Users}
        variant="primary"
      />
      <StatCard
        title="Active Jobs"
        value={stats.activeJobs}
        description={`${stats.jobsCompletedThisMonth} completed this month`}
        icon={Briefcase}
        variant="success"
      />
      <StatCard
        title="Pending Quotes"
        value={stats.pendingQuotes}
        description="Awaiting response"
        icon={FileText}
        variant="warning"
      />
      <StatCard
        title="Unpaid Invoices"
        value={stats.unpaidInvoices}
        description={formatCurrency(stats.outstandingBalance)}
        icon={Receipt}
        variant={stats.unpaidInvoices > 3 ? 'danger' : 'default'}
      />
    </div>
  );
}

export function RevenueCard({ stats }: StatsGridProps) {
  const revenueChange = stats.revenueLastMonth > 0
    ? Math.round(((stats.revenueThisMonth - stats.revenueLastMonth) / stats.revenueLastMonth) * 100)
    : 0;

  return (
    <Card className="bg-gradient-to-br from-secondary to-secondary/90">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-secondary-foreground/80">
              Revenue This Month
            </p>
            <p className="text-4xl font-bold tracking-tight text-secondary-foreground">
              {formatCurrency(stats.revenueThisMonth)}
            </p>
            <div className="flex items-center gap-1 text-sm">
              {revenueChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span
                className={cn(
                  'font-medium',
                  revenueChange >= 0 ? 'text-green-400' : 'text-red-400'
                )}
              >
                {revenueChange >= 0 ? '+' : ''}
                {revenueChange}%
              </span>
              <span className="text-secondary-foreground/60">vs last month</span>
            </div>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary-foreground/10">
            <DollarSign className="h-8 w-8 text-secondary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading skeleton for stats
export function StatsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-12 w-12 animate-pulse rounded-lg bg-muted" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
