'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  FileBarChart,
  Calculator,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DISCLAIMER_STORAGE_KEY = 'grittyos-finance-disclaimer-accepted';

interface FinanceDisclaimerModalProps {
  children: React.ReactNode;
}

function DisclaimerItem({
  icon: Icon,
  title,
  description,
  variant = 'default',
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant?: 'default' | 'warning';
}) {
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          variant === 'warning'
            ? 'bg-amber-100 text-amber-700'
            : 'bg-primary/10 text-primary'
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function FinanceDisclaimerModal({ children }: FinanceDisclaimerModalProps) {
  const [open, setOpen] = React.useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = React.useState(false);

  // Check localStorage on mount
  React.useEffect(() => {
    const accepted = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
    if (!accepted) {
      setOpen(true);
    }
    setHasCheckedStorage(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_STORAGE_KEY, new Date().toISOString());
    setOpen(false);
  };

  // Don't render children until we've checked storage to prevent flash
  if (!hasCheckedStorage) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-w-xl">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Welcome to GrittyOS Financial Tracking
            </DialogTitle>
            <DialogDescription className="text-center">
              Before you get started, please review this important information.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 space-y-5">
            <DisclaimerItem
              icon={FileBarChart}
              title="Track Your Business Finances"
              description="Record income and expenses, categorize transactions, and see job profitability at a glance."
            />
            <DisclaimerItem
              icon={Calculator}
              title="Schedule C Categories Built-In"
              description="Expenses are pre-mapped to IRS Schedule C line items for easier tax prep with your accountant."
            />

            <div className="my-4 h-px bg-border" />

            <DisclaimerItem
              icon={AlertTriangle}
              title="Not Professional Accounting Software"
              description="GrittyOS is a financial organization tool, not a replacement for QuickBooks, Xero, or professional bookkeeping software."
              variant="warning"
            />
            <DisclaimerItem
              icon={ShieldAlert}
              title="Consult a Tax Professional"
              description="This tool does not provide tax, legal, or accounting advice. Always work with a qualified CPA or tax professional for tax preparation and financial decisions."
              variant="warning"
            />
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Important:</strong> By using GrittyOS financial tracking features, you
              acknowledge that this is a business organization tool and not a substitute for
              professional accounting, tax preparation, or financial advice.
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button onClick={handleAccept} className="w-full sm:w-auto">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              I Understand, Let's Get Started
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
}

// Smaller inline disclaimer banner for use on pages
export function FinanceDisclaimerBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20',
        className
      )}
    >
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <p className="font-medium text-amber-800 dark:text-amber-400">
            Financial Tracking Tool - Not Professional Accounting
          </p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-500">
            GrittyOS provides tools to help organize your business finances. This is not a
            substitute for professional accounting or tax advice. Always consult with a
            qualified accountant for tax preparation and financial decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
