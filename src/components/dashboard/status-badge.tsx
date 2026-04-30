import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { StatusColor } from '@/types/crm';

interface StatusBadgeProps {
  status: string;
  color?: StatusColor;
  className?: string;
}

const colorStyles: Record<StatusColor, string> = {
  default: 'bg-muted text-muted-foreground border-transparent',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-amber-100 text-amber-700 border-amber-200',
  danger: 'bg-red-100 text-red-700 border-red-200',
  info: 'bg-blue-100 text-blue-700 border-blue-200',
};

export function StatusBadge({ status, color = 'default', className }: StatusBadgeProps) {
  // Format status for display (e.g., "in_progress" -> "In Progress")
  const displayStatus = status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        colorStyles[color],
        className
      )}
    >
      {displayStatus}
    </span>
  );
}

// Pre-styled badges for common statuses
export function JobStatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, StatusColor> = {
    pending: 'default',
    quoted: 'info',
    scheduled: 'info',
    in_progress: 'warning',
    completed: 'success',
    cancelled: 'danger',
  };

  return <StatusBadge status={status} color={colorMap[status] || 'default'} />;
}

export function QuoteStatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, StatusColor> = {
    draft: 'default',
    sent: 'info',
    accepted: 'success',
    rejected: 'danger',
    expired: 'default',
  };

  return <StatusBadge status={status} color={colorMap[status] || 'default'} />;
}

export function InvoiceStatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, StatusColor> = {
    draft: 'default',
    sent: 'info',
    paid: 'success',
    overdue: 'danger',
    cancelled: 'default',
  };

  return <StatusBadge status={status} color={colorMap[status] || 'default'} />;
}

export function CustomerStatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, StatusColor> = {
    active: 'success',
    inactive: 'default',
    prospect: 'info',
  };

  return <StatusBadge status={status} color={colorMap[status] || 'default'} />;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const colorMap: Record<string, StatusColor> = {
    low: 'default',
    normal: 'info',
    high: 'warning',
    urgent: 'danger',
  };

  return <StatusBadge status={priority} color={colorMap[priority] || 'default'} />;
}

export function CustomerTypeBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        type === 'commercial'
          ? 'border-purple-200 bg-purple-100 text-purple-700'
          : 'border-blue-200 bg-blue-100 text-blue-700'
      )}
    >
      {type === 'commercial' ? 'Commercial' : 'Residential'}
    </span>
  );
}
