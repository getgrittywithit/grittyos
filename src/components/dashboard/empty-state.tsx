import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Users,
  Briefcase,
  FileText,
  Receipt,
  Search,
  Plus,
  type LucideIcon,
} from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && (
        <Button className="mt-6" asChild={!!action.href} onClick={action.onClick}>
          {action.href ? (
            <a href={action.href}>
              <Plus className="mr-2 h-4 w-4" />
              {action.label}
            </a>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              {action.label}
            </>
          )}
        </Button>
      )}
    </div>
  );
}

// Pre-configured empty states
export function NoCustomersState() {
  return (
    <EmptyState
      icon={Users}
      title="No customers yet"
      description="Get started by adding your first customer. You'll be able to track jobs, send quotes, and manage invoices for them."
      action={{
        label: 'Add Customer',
        href: '/dashboard/customers/new',
      }}
    />
  );
}

export function NoJobsState() {
  return (
    <EmptyState
      icon={Briefcase}
      title="No jobs yet"
      description="Jobs help you track your work from start to finish. Create a job for a customer to get started."
      action={{
        label: 'Create Job',
        href: '/dashboard/jobs/new',
      }}
    />
  );
}

export function NoQuotesState() {
  return (
    <EmptyState
      icon={FileText}
      title="No quotes yet"
      description="Create professional quotes for your customers. Once accepted, you can easily convert them to invoices."
      action={{
        label: 'Create Quote',
        href: '/dashboard/quotes/new',
      }}
    />
  );
}

export function NoInvoicesState() {
  return (
    <EmptyState
      icon={Receipt}
      title="No invoices yet"
      description="Create and send professional invoices to your customers. Track payments and get paid faster."
      action={{
        label: 'Create Invoice',
        href: '/dashboard/invoices/new',
      }}
    />
  );
}

export function NoSearchResultsState({ query }: { query: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search or filters.`}
    />
  );
}
