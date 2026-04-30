'use client';

import * as React from 'react';
import Link from 'next/link';
import { Plus, Calendar, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { JobCard } from '@/components/dashboard/job-card';
import { JobStatusBadge } from '@/components/dashboard/status-badge';
import { NoJobsState } from '@/components/dashboard/empty-state';
import { demoJobs, formatDate, formatCurrency, getCustomerById } from '@/lib/demo-data';
import type { Job } from '@/types/crm';
import { cn } from '@/lib/utils';

type ViewMode = 'list' | 'calendar';
type StatusFilter = 'all' | Job['status'];

const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
];

export default function JobsPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('list');
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter jobs
  const filteredJobs = React.useMemo(() => {
    return demoJobs.filter((job) => {
      // Status filter
      if (statusFilter !== 'all' && job.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const customer = getCustomerById(job.customer_id);
        const customerName = customer
          ? `${customer.first_name} ${customer.last_name}`.toLowerCase()
          : '';
        return (
          job.title.toLowerCase().includes(query) ||
          customerName.includes(query) ||
          job.job_location?.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [statusFilter, searchQuery]);

  // Group jobs by status for kanban-like view
  const jobsByStatus = React.useMemo(() => {
    const groups: Record<string, Job[]> = {
      pending: [],
      scheduled: [],
      in_progress: [],
      completed: [],
    };

    filteredJobs.forEach((job) => {
      if (groups[job.status]) {
        groups[job.status].push(job);
      }
    });

    return groups;
  }, [filteredJobs]);

  // Count jobs by status
  const statusCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: demoJobs.length };
    demoJobs.forEach((job) => {
      counts[job.status] = (counts[job.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Jobs</h1>
          <p className="text-muted-foreground">
            Track and manage all your service jobs.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Job
          </Link>
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(filter.value)}
              className="gap-1.5"
            >
              {filter.label}
              {statusCounts[filter.value] !== undefined && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-xs',
                    statusFilter === filter.value
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted'
                  )}
                >
                  {statusCounts[filter.value]}
                </span>
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64"
          />
          <div className="flex rounded-lg border border-border">
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('calendar')}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Jobs Content */}
      {filteredJobs.length === 0 ? (
        statusFilter === 'all' && !searchQuery ? (
          <NoJobsState />
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No jobs found matching your filters.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
              >
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )
      ) : viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        // Kanban-like view by status
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(jobsByStatus).map(([status, jobs]) => (
            <Card key={status} className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium">
                  <JobStatusBadge status={status} />
                  <span className="text-muted-foreground">{jobs.length}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {jobs.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No jobs
                  </p>
                ) : (
                  jobs.map((job) => {
                    const customer = getCustomerById(job.customer_id);
                    return (
                      <Link
                        key={job.id}
                        href={`/dashboard/jobs/${job.id}`}
                        className="block rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/50"
                      >
                        <h4 className="truncate text-sm font-medium">{job.title}</h4>
                        {customer && (
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {customer.first_name} {customer.last_name}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          {job.scheduled_date && (
                            <span>{formatDate(job.scheduled_date, { month: 'short', day: 'numeric' })}</span>
                          )}
                          {(job.estimated_amount || job.actual_amount) && (
                            <span className="font-medium text-foreground">
                              {formatCurrency(job.actual_amount || job.estimated_amount || 0)}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
