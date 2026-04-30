import Link from 'next/link';
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  MoreHorizontal,
  Plus,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsGrid, RevenueCard } from '@/components/dashboard/stats-cards';
import { JobStatusBadge, PriorityBadge } from '@/components/dashboard/status-badge';
import {
  demoDashboardStats,
  getUpcomingJobs,
  getRecentActivity,
  formatDate,
  formatRelativeTime,
  formatCurrency,
  demoCustomers,
} from '@/lib/demo-data';
import type { ActivityLog } from '@/types/crm';

// Activity icon based on entity type and action
function ActivityIcon({ log }: { log: ActivityLog }) {
  const colors: Record<string, string> = {
    customer: 'bg-blue-100 text-blue-600',
    job: 'bg-green-100 text-green-600',
    quote: 'bg-purple-100 text-purple-600',
    invoice: 'bg-amber-100 text-amber-600',
    payment: 'bg-emerald-100 text-emerald-600',
  };

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colors[log.entity_type] || 'bg-muted text-muted-foreground'}`}
    >
      <span className="text-xs font-semibold uppercase">
        {log.entity_type.charAt(0)}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  const upcomingJobs = getUpcomingJobs(5);
  const recentActivity = getRecentActivity(5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/jobs/new">
              <Plus className="mr-2 h-4 w-4" />
              New Job
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsGrid stats={demoDashboardStats} />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Jobs - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Upcoming Jobs</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/jobs">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingJobs.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No upcoming jobs scheduled.
              </p>
            ) : (
              upcomingJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/dashboard/jobs/${job.id}`}
                  className="group block rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium group-hover:text-primary">
                          {job.title}
                        </h3>
                        <JobStatusBadge status={job.status} />
                        {job.priority !== 'normal' && (
                          <PriorityBadge priority={job.priority} />
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {job.customer && (
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {job.customer.first_name} {job.customer.last_name}
                          </span>
                        )}
                        {job.scheduled_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(job.scheduled_date, {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                        {job.job_location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{job.job_location.split(',')[0]}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    {job.estimated_amount && (
                      <div className="shrink-0 text-right">
                        <span className="font-semibold text-foreground">
                          {formatCurrency(job.estimated_amount)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        {/* Revenue Card + Recent Activity */}
        <div className="space-y-6">
          <RevenueCard stats={demoDashboardStats} />

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((log) => (
                  <div key={log.id} className="flex items-start gap-3">
                    <ActivityIcon log={log} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{log.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(log.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-1 p-4 text-left"
              asChild
            >
              <Link href="/dashboard/customers/new">
                <span className="font-semibold">Add Customer</span>
                <span className="text-xs text-muted-foreground">
                  Create a new customer record
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-1 p-4 text-left"
              asChild
            >
              <Link href="/dashboard/jobs/new">
                <span className="font-semibold">Create Job</span>
                <span className="text-xs text-muted-foreground">
                  Schedule a new job
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-1 p-4 text-left"
              asChild
            >
              <Link href="/dashboard/quotes/new">
                <span className="font-semibold">New Quote</span>
                <span className="text-xs text-muted-foreground">
                  Draft a quote for a customer
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex-col items-start gap-1 p-4 text-left"
              asChild
            >
              <Link href="/dashboard/invoices/new">
                <span className="font-semibold">Send Invoice</span>
                <span className="text-xs text-muted-foreground">
                  Bill a customer for work
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
