'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineItemsEditor } from '@/components/dashboard/line-items-editor';
import { demoCustomers, demoJobs } from '@/lib/demo-data';
import type { LineItem } from '@/types/crm';

function NewInvoiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomerId = searchParams.get('customer');
  const preselectedJobId = searchParams.get('job');

  const [formData, setFormData] = React.useState({
    customer_id: preselectedCustomerId || '',
    job_id: preselectedJobId || '',
    due_days: '30',
    notes: '',
  });

  const [items, setItems] = React.useState<LineItem[]>([
    {
      id: 'li-new-1',
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
    },
  ]);

  const [taxRate, setTaxRate] = React.useState(0.0825);
  const [isLoading, setIsLoading] = React.useState(false);

  // Get jobs for selected customer
  const customerJobs = React.useMemo(() => {
    if (!formData.customer_id) return [];
    return demoJobs.filter((job) => job.customer_id === formData.customer_id);
  }, [formData.customer_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear job selection if customer changes
    if (name === 'customer_id') {
      setFormData((prev) => ({ ...prev, job_id: '' }));
    }
  };

  // Auto-populate line items from job
  React.useEffect(() => {
    if (formData.job_id) {
      const job = demoJobs.find((j) => j.id === formData.job_id);
      if (job && job.estimated_amount) {
        setItems([
          {
            id: 'li-job-1',
            description: job.title,
            quantity: 1,
            unit_price: job.actual_amount || job.estimated_amount,
            total: job.actual_amount || job.estimated_amount,
          },
        ]);
      }
    }
  }, [formData.job_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    // In production, this would make an API call
    console.log('Creating invoice:', {
      ...formData,
      items,
      subtotal,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total_amount: total,
    });

    // Simulate success and redirect
    setTimeout(() => {
      router.push('/dashboard/invoices');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
      {/* Customer & Job Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customer_id">Customer *</Label>
              <select
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                required
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select a customer...</option>
                {demoCustomers
                  .filter((c) => c.status !== 'inactive')
                  .map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="job_id">Related Job (Optional)</Label>
              <select
                id="job_id"
                name="job_id"
                value={formData.job_id}
                onChange={handleChange}
                disabled={!formData.customer_id}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              >
                <option value="">No job selected</option>
                {customerJobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="due_days">Payment Terms</Label>
              <select
                id="due_days"
                name="due_days"
                value={formData.due_days}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="0">Due on receipt</option>
                <option value="7">Net 7</option>
                <option value="14">Net 14</option>
                <option value="30">Net 30</option>
                <option value="60">Net 60</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <LineItemsEditor
            items={items}
            onChange={setItems}
            taxRate={taxRate}
            onTaxRateChange={setTaxRate}
          />
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Thank you for your business!"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="outline" disabled={isLoading}>
          Save as Draft
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create & Send'}
        </Button>
      </div>
    </form>
  );
}

function FormSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-9 animate-pulse rounded bg-muted" />
          <div className="h-9 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewInvoicePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/invoices">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            Create Invoice
          </h1>
          <p className="text-muted-foreground">
            Bill your customer for completed work.
          </p>
        </div>
      </div>

      {/* Form with Suspense */}
      <Suspense fallback={<FormSkeleton />}>
        <NewInvoiceForm />
      </Suspense>
    </div>
  );
}
