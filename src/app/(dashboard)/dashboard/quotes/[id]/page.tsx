import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Receipt,
  Send,
  User,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuoteStatusBadge } from '@/components/dashboard/status-badge';
import { LineItemsDisplay } from '@/components/dashboard/line-items-editor';
import {
  getQuoteById,
  formatDate,
  formatCurrency,
  formatRelativeTime,
} from '@/lib/demo-data';

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quote = getQuoteById(id);

  if (!quote) {
    notFound();
  }

  const customer = quote.customer;
  const isExpired =
    quote.expiration_date && new Date(quote.expiration_date) < new Date();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild className="shrink-0">
            <Link href="/dashboard/quotes">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {quote.quote_number}
              </span>
              <QuoteStatusBadge status={quote.status} />
              {isExpired && quote.status === 'sent' && (
                <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  Expired
                </span>
              )}
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold sm:text-3xl">
              {quote.title}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pl-14 sm:pl-0">
          {quote.status === 'draft' && (
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Quote
            </Button>
          )}
          {quote.status === 'accepted' && (
            <Button asChild>
              <Link href={`/dashboard/invoices/new?quote=${quote.id}`}>
                <Receipt className="mr-2 h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/quotes/${quote.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quote Document */}
      <Card className="overflow-hidden">
        {/* Quote Header */}
        <div className="border-b border-border bg-muted/30 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                  <span className="font-heading text-lg font-bold text-primary-foreground">
                    G
                  </span>
                </div>
                <span className="font-heading text-xl font-semibold">GrittyOS</span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>Your Business Name</p>
                <p>123 Business Street</p>
                <p>Austin, TX 78701</p>
                <p>contact@yourbusiness.com</p>
              </div>
            </div>

            {/* Quote Details */}
            <div className="text-sm sm:text-right">
              <h2 className="font-heading text-2xl font-bold text-primary">QUOTE</h2>
              <p className="mt-2 font-medium">{quote.quote_number}</p>
              <div className="mt-3 space-y-1 text-muted-foreground">
                <p>Date: {formatDate(quote.created_at)}</p>
                {quote.expiration_date && (
                  <p>
                    Valid Until:{' '}
                    <span className={isExpired ? 'text-red-600' : ''}>
                      {formatDate(quote.expiration_date)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border-b border-border p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Quote For</h3>
          {customer ? (
            <div className="mt-2">
              <p className="font-medium">
                {customer.first_name} {customer.last_name}
              </p>
              {customer.street_address && (
                <p className="text-sm text-muted-foreground">
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

        {/* Description */}
        {quote.description && (
          <div className="border-b border-border p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-2">{quote.description}</p>
          </div>
        )}

        {/* Line Items */}
        <div className="p-6">
          <LineItemsDisplay
            items={quote.items}
            subtotal={quote.subtotal}
            taxRate={quote.tax_rate}
            taxAmount={quote.tax_amount}
            total={quote.total_amount}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-border bg-muted/30 p-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for the opportunity to provide this quote.</p>
            <p className="mt-1">
              Questions? Contact us at contact@yourbusiness.com
            </p>
          </div>
        </div>
      </Card>

      {/* Sidebar Info */}
      <div className="grid gap-6 lg:grid-cols-3">
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

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Quote created</p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(quote.created_at)}
                  </p>
                </div>
              </div>
              {quote.status === 'sent' && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Send className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quote sent</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(quote.updated_at)}
                    </p>
                  </div>
                </div>
              )}
              {quote.status === 'accepted' && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quote accepted</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(quote.updated_at)}
                    </p>
                  </div>
                </div>
              )}
              {quote.status === 'rejected' && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Quote rejected</p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(quote.updated_at)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate Quote
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Email to Customer
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
