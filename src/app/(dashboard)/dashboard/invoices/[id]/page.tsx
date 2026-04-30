import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Printer,
  Send,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceStatusBadge } from '@/components/dashboard/status-badge';
import { LineItemsDisplay } from '@/components/dashboard/line-items-editor';
import {
  getInvoiceById,
  formatDate,
  formatCurrency,
  formatRelativeTime,
} from '@/lib/demo-data';

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoice = getInvoiceById(id);

  if (!invoice) {
    notFound();
  }

  const customer = invoice.customer;
  const job = invoice.job;
  const isOverdue =
    invoice.status !== 'paid' && new Date(invoice.due_date) < new Date();
  const balanceDue = invoice.total_amount - invoice.paid_amount;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard/invoices">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {invoice.invoice_number}
              </span>
              <InvoiceStatusBadge status={invoice.status} />
              {isOverdue && invoice.status !== 'paid' && (
                <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                  Overdue
                </span>
              )}
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold sm:text-3xl">
              Invoice for{' '}
              {customer
                ? `${customer.first_name} ${customer.last_name}`
                : 'Customer'}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pl-14 sm:pl-0">
          {invoice.status === 'draft' && (
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Invoice
            </Button>
          )}
          {invoice.status === 'sent' && (
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          )}
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Invoice Document - Print Ready Layout */}
      <Card className="overflow-hidden print:shadow-none print:border-none">
        {/* Invoice Header */}
        <div className="border-b border-border bg-gradient-to-br from-secondary to-secondary/90 p-8 text-secondary-foreground">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <span className="font-heading text-xl font-bold text-primary-foreground">
                    G
                  </span>
                </div>
                <span className="font-heading text-2xl font-bold">GrittyOS</span>
              </div>
              <div className="mt-4 text-sm opacity-80">
                <p>Your Business Name</p>
                <p>123 Business Street</p>
                <p>Austin, TX 78701</p>
                <p>contact@yourbusiness.com</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="sm:text-right">
              <h2 className="font-heading text-3xl font-bold">INVOICE</h2>
              <p className="mt-2 text-lg font-medium">{invoice.invoice_number}</p>
              <div className="mt-4 space-y-1 text-sm opacity-80">
                <p>Issue Date: {formatDate(invoice.issue_date)}</p>
                <p>
                  Due Date:{' '}
                  <span className={isOverdue ? 'font-semibold text-red-300' : ''}>
                    {formatDate(invoice.due_date)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To / Balance Due */}
        <div className="grid border-b border-border sm:grid-cols-2">
          <div className="border-b border-border p-6 sm:border-b-0 sm:border-r">
            <h3 className="text-sm font-medium text-muted-foreground">Bill To</h3>
            {customer ? (
              <div className="mt-2">
                <p className="text-lg font-medium">
                  {customer.first_name} {customer.last_name}
                </p>
                {customer.street_address && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {customer.street_address}
                    <br />
                    {customer.city}, {customer.state} {customer.postal_code}
                  </p>
                )}
                {customer.email && (
                  <p className="mt-1 text-sm text-muted-foreground">{customer.email}</p>
                )}
              </div>
            ) : (
              <p className="mt-2 text-muted-foreground">Customer not found</p>
            )}
          </div>
          <div className="p-6">
            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">Balance Due</p>
              <p
                className={`mt-1 text-3xl font-bold ${
                  balanceDue > 0 ? '' : 'text-green-600'
                }`}
              >
                {formatCurrency(balanceDue)}
              </p>
              {invoice.paid_amount > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(invoice.paid_amount)} paid
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Job */}
        {job && (
          <div className="border-b border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Related Job</h3>
            <Link
              href={`/dashboard/jobs/${job.id}`}
              className="mt-2 inline-block font-medium text-primary hover:underline"
            >
              {job.title}
            </Link>
          </div>
        )}

        {/* Line Items */}
        <div className="p-6">
          <LineItemsDisplay
            items={invoice.items}
            subtotal={invoice.subtotal}
            taxRate={invoice.tax_rate}
            taxAmount={invoice.tax_amount}
            total={invoice.total_amount}
          />
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="border-t border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
            <p className="mt-2 text-sm">{invoice.notes}</p>
          </div>
        )}

        {/* Payment Info Footer */}
        <div className="border-t border-border bg-muted/30 p-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium">Payment Methods Accepted</p>
            <p className="mt-1">Check, Cash, Credit Card, Bank Transfer</p>
            <p className="mt-3">
              Questions? Contact us at contact@yourbusiness.com or (512) 555-0100
            </p>
          </div>
        </div>
      </Card>

      {/* Sidebar Info */}
      <div className="grid gap-6 lg:grid-cols-3 print:hidden">
        {/* Customer Contact */}
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
                      <Mail className="h-4 w-4 text-muted-foreground" />
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

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {invoice.paid_amount > 0 ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Payment received: {formatCurrency(invoice.paid_amount)}
                    </p>
                    {invoice.paid_date && (
                      <p className="text-xs text-muted-foreground">
                        {formatDate(invoice.paid_date)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Send Reminder
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Invoice
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Edit className="mr-2 h-4 w-4" />
              Edit Invoice
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
