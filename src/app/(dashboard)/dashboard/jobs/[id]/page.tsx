import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  FileText,
  MapPin,
  MoreHorizontal,
  Phone,
  Receipt,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  JobStatusBadge,
  PriorityBadge,
  InvoiceStatusBadge,
} from '@/components/dashboard/status-badge';
import {
  getJobById,
  getInvoicesForCustomer,
  formatDate,
  formatCurrency,
  formatRelativeTime,
} from '@/lib/demo-data';

// Status timeline data
const statusSteps = [
  { status: 'pending', label: 'Created' },
  { status: 'quoted', label: 'Quoted' },
  { status: 'scheduled', label: 'Scheduled' },
  { status: 'in_progress', label: 'In Progress' },
  { status: 'completed', label: 'Completed' },
];

function StatusTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = statusSteps.findIndex((s) => s.status === currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
        <span className="text-sm font-medium text-red-700">
          This job was cancelled
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      {statusSteps.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.status} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : isCurrent
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-muted bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCurrent ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < statusSteps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  index < currentIndex ? 'bg-green-500' : 'bg-muted'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  const customer = job.customer;
  const relatedInvoices = customer
    ? getInvoicesForCustomer(customer.id).filter((inv) => inv.job_id === job.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard/jobs">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl">
              {job.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <JobStatusBadge status={job.status} />
              <PriorityBadge priority={job.priority} />
              <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium capitalize">
                {job.job_type}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 pl-14 sm:pl-0">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/jobs/${job.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <StatusTimeline currentStatus={job.status} />
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Job Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {job.description && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Description
                </h4>
                <p className="mt-1">{job.description}</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {job.scheduled_date && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="font-medium">
                      {formatDate(job.scheduled_date, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {job.completion_date && (
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="font-medium">
                      {formatDate(job.completion_date, {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {job.job_location && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{job.job_location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <h4 className="font-medium">Financial Summary</h4>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated</p>
                  <p className="text-xl font-semibold">
                    {job.estimated_amount
                      ? formatCurrency(job.estimated_amount)
                      : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actual</p>
                  <p className="text-xl font-semibold">
                    {job.actual_amount ? (
                      <span
                        className={
                          job.actual_amount > (job.estimated_amount || 0)
                            ? 'text-amber-600'
                            : 'text-green-600'
                        }
                      >
                        {formatCurrency(job.actual_amount)}
                      </span>
                    ) : (
                      '—'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 border-t border-border pt-4">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/quotes/new?job=${job.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Create Quote
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/invoices/new?job=${job.id}`}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Create Invoice
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent>
              {customer ? (
                <div className="space-y-4">
                  <Link
                    href={`/dashboard/customers/${customer.id}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {customer.first_name.charAt(0)}
                      {customer.last_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium group-hover:text-primary">
                        {customer.first_name} {customer.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {customer.customer_type}
                      </p>
                    </div>
                  </Link>

                  <div className="space-y-2 border-t border-border pt-4">
                    {customer.phone && (
                      <a
                        href={`tel:${customer.phone}`}
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {customer.phone}
                      </a>
                    )}
                    {customer.email && (
                      <a
                        href={`mailto:${customer.email}`}
                        className="flex items-center gap-2 text-sm hover:text-primary"
                      >
                        <User className="h-4 w-4 text-muted-foreground" />
                        {customer.email}
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Customer not found</p>
              )}
            </CardContent>
          </Card>

          {/* Timeline / Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Job created</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(job.created_at)}
                    </p>
                  </div>
                </div>
                {job.updated_at !== job.created_at && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last updated</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(job.updated_at)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Invoices */}
      {relatedInvoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Related Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatedInvoices.map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/dashboard/invoices/${invoice.id}`}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{invoice.invoice_number}</h4>
                      <InvoiceStatusBadge status={invoice.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Issued {formatDate(invoice.issue_date)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(invoice.total_amount)}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
