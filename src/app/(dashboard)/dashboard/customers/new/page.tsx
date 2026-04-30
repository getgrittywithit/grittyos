'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerForm } from '@/components/dashboard/customer-form';
import type { Customer } from '@/types/crm';

export default function NewCustomerPage() {
  const router = useRouter();

  const handleSubmit = (data: Partial<Customer>) => {
    // In production, this would make an API call
    console.log('Creating customer:', data);
    // Simulate success and redirect
    router.push('/dashboard/customers');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/customers">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">
            Add Customer
          </h1>
          <p className="text-muted-foreground">
            Create a new customer record in your CRM.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl">
        <CustomerForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
