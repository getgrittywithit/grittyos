import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ChevronRight,
  Edit,
  FileText,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Receipt,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CustomerStatusBadge,
  CustomerTypeBadge,
  JobStatusBadge,
  InvoiceStatusBadge,
} from '@/components/dashboard/status-badge';
import {
  getCustomerById,
  getJobsForCustomer,
  getInvoicesForCustomer,
  formatDate,
  formatCurrency,
} from '@/lib/demo-data';

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const jobs = getJobsForCustomer(customer.id);
  const invoices = getInvoicesForCustomer(customer.id);

  // Calculate totals
  const totalJobValue = jobs.reduce(
    (sum, job) => sum + (job.actual_amount || job.estimated_amount || 0),
    0
  );
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid_amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard/customers">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {customer.first_name.charAt(0)}
              {customer.last_name.charAt(0)}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold sm:text-3xl">
                {customer.first_name} {customer.last_name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <CustomerTypeBadge type={customer.customer_type} />
                <CustomerStatusBadge status={customer.status} />
                {customer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 pl-14 sm:pl-0">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/customers/${customer.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Customer Info Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact & Address Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customer.email && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${customer.email}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {customer.email}
                  </a>
                </div>
              </div>
            )}
            {customer.phone && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${customer.phone}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {customer.phone}
                  </a>
                </div>
              </div>
            )}
            {customer.street_address && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">
                    {customer.street_address}
                    <br />
                    {customer.city}, {customer.state} {customer.postal_code}
                  </p>
                </div>
              </div>
            )}
            {customer.notes && (
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="mt-1 text-sm">{customer.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats & Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="mt-1 text-2xl font-bold">{jobs.length}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(totalJobValue)} value
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(totalInvoiced)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {invoices.length} invoices
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Paid to Date</p>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  {formatCurrency(totalPaid)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(totalInvoiced - totalPaid)} outstanding
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button size="sm" asChild>
                <Link href={`/dashboard/jobs/new?customer=${customer.id}`}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  New Job
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/quotes/new?customer=${customer.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Create Quote
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dashboard/invoices/new?customer=${customer.id}`}>
                  <Receipt className="mr-2 h-4 w-4" />
                  Send Invoice
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Jobs</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/jobs?customer=${customer.id}`}>
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {jobs.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No jobs yet for this customer.
            </p>
          ) : (
            <div className="space-y-3">
              {jobs.slice(0, 5).map((job) => (
                <Link
                  key={job.id}
                  href={`/dashboard/jobs/${job.id}`}
                  className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{job.title}</h4>
                        <JobStatusBadge status={job.status} />
                      </div>
                      {job.scheduled_date && (
                        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(job.scheduled_date)}
                        </p>
                      )}
                    </div>
                    {(job.actual_amount || job.estimated_amount) && (
                      <span className="font-semibold">
                        {formatCurrency(job.actual_amount || job.estimated_amount || 0)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Invoices</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/invoices?customer=${customer.id}`}>
              View all
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No invoices yet for this customer.
            </p>
          ) : (
            <div className="space-y-3">
              {invoices.slice(0, 5).map((invoice) => (
                <Link
                  key={invoice.id}
                  href={`/dashboard/invoices/${invoice.id}`}
                  className="block rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{invoice.invoice_number}</h4>
                        <InvoiceStatusBadge status={invoice.status} />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Issued {formatDate(invoice.issue_date)} &middot; Due{' '}
                        {formatDate(invoice.due_date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        {formatCurrency(invoice.total_amount)}
                      </span>
                      {invoice.paid_amount > 0 &&
                        invoice.paid_amount < invoice.total_amount && (
                          <p className="text-sm text-muted-foreground">
                            {formatCurrency(invoice.paid_amount)} paid
                          </p>
                        )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
