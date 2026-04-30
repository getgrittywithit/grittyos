import Link from 'next/link';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { JobStatusBadge, PriorityBadge } from '@/components/dashboard/status-badge';
import { formatDate, formatCurrency, getCustomerById } from '@/lib/demo-data';
import type { Job } from '@/types/crm';

interface JobCardProps {
  job: Job;
  showCustomer?: boolean;
}

export function JobCard({ job, showCustomer = true }: JobCardProps) {
  const customer = showCustomer ? getCustomerById(job.customer_id) : null;

  return (
    <Link href={`/dashboard/jobs/${job.id}`}>
      <Card className="transition-colors hover:border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-medium">{job.title}</h3>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <JobStatusBadge status={job.status} />
                {job.priority !== 'normal' && (
                  <PriorityBadge priority={job.priority} />
                )}
                <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium capitalize">
                  {job.job_type}
                </span>
              </div>
            </div>
            {(job.actual_amount || job.estimated_amount) && (
              <div className="shrink-0 text-right">
                <span className="font-semibold">
                  {formatCurrency(job.actual_amount || job.estimated_amount || 0)}
                </span>
                {job.actual_amount && job.estimated_amount && job.actual_amount !== job.estimated_amount && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatCurrency(job.estimated_amount)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {customer && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {customer.first_name} {customer.last_name}
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
                <span className="truncate max-w-[200px]">
                  {job.job_location.split(',')[0]}
                </span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Compact version for lists
export function JobListItem({ job }: { job: Job }) {
  const customer = getCustomerById(job.customer_id);

  return (
    <Link
      href={`/dashboard/jobs/${job.id}`}
      className="group flex items-center justify-between gap-4 rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="truncate font-medium group-hover:text-primary">
            {job.title}
          </h4>
          <JobStatusBadge status={job.status} />
        </div>
        <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
          {customer && (
            <span>
              {customer.first_name} {customer.last_name}
            </span>
          )}
          {job.scheduled_date && (
            <>
              <span>&middot;</span>
              <span>{formatDate(job.scheduled_date)}</span>
            </>
          )}
        </div>
      </div>
      {(job.actual_amount || job.estimated_amount) && (
        <span className="shrink-0 font-semibold">
          {formatCurrency(job.actual_amount || job.estimated_amount || 0)}
        </span>
      )}
    </Link>
  );
}
