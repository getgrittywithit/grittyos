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
import { demoCustomers } from '@/lib/demo-data';
import type { Job } from '@/types/crm';

function NewJobForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCustomerId = searchParams.get('customer');

  const [formData, setFormData] = React.useState({
    customer_id: preselectedCustomerId || '',
    title: '',
    description: '',
    job_type: 'project' as Job['job_type'],
    status: 'pending' as Job['status'],
    priority: 'normal' as Job['priority'],
    scheduled_date: '',
    job_location: '',
    estimated_amount: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-fill location from customer address
  React.useEffect(() => {
    if (formData.customer_id && !formData.job_location) {
      const customer = demoCustomers.find((c) => c.id === formData.customer_id);
      if (customer && customer.street_address) {
        const location = [
          customer.street_address,
          customer.city,
          customer.state,
        ]
          .filter(Boolean)
          .join(', ');
        setFormData((prev) => ({ ...prev, job_location: location }));
      }
    }
  }, [formData.customer_id, formData.job_location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In production, this would make an API call
    console.log('Creating job:', formData);

    // Simulate success and redirect
    setTimeout(() => {
      router.push('/dashboard/jobs');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      {/* Customer Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="customer_id">Select Customer *</Label>
            <select
              id="customer_id"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Choose a customer...</option>
              {demoCustomers
                .filter((c) => c.status === 'active')
                .map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.first_name} {customer.last_name}
                    {customer.email && ` (${customer.email})`}
                  </option>
                ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Kitchen Faucet Repair"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the work to be done..."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="job_type">Job Type</Label>
              <select
                id="job_type"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="estimate">Estimate</option>
                <option value="project">Project</option>
                <option value="maintenance">Maintenance</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Schedule & Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scheduled_date">Scheduled Date</Label>
            <Input
              id="scheduled_date"
              name="scheduled_date"
              type="date"
              value={formData.scheduled_date}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_location">Job Location</Label>
            <Input
              id="job_location"
              name="job_location"
              value={formData.job_location}
              onChange={handleChange}
              placeholder="Service address"
            />
            <p className="text-xs text-muted-foreground">
              Auto-filled from customer address if available
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="estimated_amount">Estimated Amount ($)</Label>
            <Input
              id="estimated_amount"
              name="estimated_amount"
              type="number"
              min="0"
              step="0.01"
              value={formData.estimated_amount}
              onChange={handleChange}
              placeholder="0.00"
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Job'}
        </Button>
      </div>
    </form>
  );
}

function FormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-9 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function NewJobPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/jobs">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            Create Job
          </h1>
          <p className="text-muted-foreground">
            Schedule a new job for a customer.
          </p>
        </div>
      </div>

      {/* Form with Suspense */}
      <Suspense fallback={<FormSkeleton />}>
        <NewJobForm />
      </Suspense>
    </div>
  );
}
