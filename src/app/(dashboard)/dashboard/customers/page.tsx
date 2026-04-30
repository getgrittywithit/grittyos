'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/dashboard/data-table';
import {
  CustomerStatusBadge,
  CustomerTypeBadge,
} from '@/components/dashboard/status-badge';
import { NoCustomersState } from '@/components/dashboard/empty-state';
import { demoCustomers, formatRelativeTime } from '@/lib/demo-data';
import type { Customer } from '@/types/crm';

const columns = [
  {
    key: 'name',
    header: 'Customer',
    cell: (customer: Customer) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {customer.first_name.charAt(0)}
          {customer.last_name.charAt(0)}
        </div>
        <div>
          <p className="font-medium">
            {customer.first_name} {customer.last_name}
          </p>
          {customer.email && (
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          )}
        </div>
      </div>
    ),
  },
  {
    key: 'type',
    header: 'Type',
    cell: (customer: Customer) => (
      <CustomerTypeBadge type={customer.customer_type} />
    ),
    className: 'hidden sm:table-cell',
  },
  {
    key: 'status',
    header: 'Status',
    cell: (customer: Customer) => <CustomerStatusBadge status={customer.status} />,
  },
  {
    key: 'phone',
    header: 'Phone',
    cell: (customer: Customer) => (
      <span className="text-muted-foreground">{customer.phone || '—'}</span>
    ),
    className: 'hidden md:table-cell',
  },
  {
    key: 'location',
    header: 'Location',
    cell: (customer: Customer) => (
      <span className="text-muted-foreground">
        {customer.city && customer.state
          ? `${customer.city}, ${customer.state}`
          : '—'}
      </span>
    ),
    className: 'hidden lg:table-cell',
  },
  {
    key: 'updated',
    header: 'Last Activity',
    cell: (customer: Customer) => (
      <span className="text-muted-foreground">
        {formatRelativeTime(customer.updated_at)}
      </span>
    ),
    className: 'hidden xl:table-cell',
  },
];

function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <Link href={`/dashboard/customers/${customer.id}`}>
      <Card className="transition-colors hover:border-primary/50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {customer.first_name.charAt(0)}
                {customer.last_name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">
                  {customer.first_name} {customer.last_name}
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <CustomerTypeBadge type={customer.customer_type} />
                  <CustomerStatusBadge status={customer.status} />
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            {customer.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="truncate">{customer.email}</span>
              </div>
            )}
            {customer.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{customer.phone}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CustomersPage() {
  const router = useRouter();

  const handleRowClick = (customer: Customer) => {
    router.push(`/dashboard/customers/${customer.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer relationships and records.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/customers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <DataTable
          data={demoCustomers}
          columns={columns}
          keyExtractor={(customer) => customer.id}
          searchPlaceholder="Search customers..."
          searchKeys={['first_name', 'last_name', 'email', 'phone']}
          onRowClick={handleRowClick}
          emptyState={<NoCustomersState />}
        />
      </div>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {demoCustomers.length === 0 ? (
          <NoCustomersState />
        ) : (
          demoCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        )}
      </div>
    </div>
  );
}
