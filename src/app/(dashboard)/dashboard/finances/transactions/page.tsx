'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TransactionsTable } from '@/components/dashboard/transactions-table';
import { ChevronLeft, Upload, Plus } from 'lucide-react';
import { getTransactionsWithRelations } from '@/lib/demo-data-financial';

export default function TransactionsPage() {
  const transactions = getTransactionsWithRelations();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/finances">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              All income and expense transactions
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionsTable
        transactions={transactions}
        showReconciled={true}
        showJobLink={true}
      />
    </div>
  );
}
