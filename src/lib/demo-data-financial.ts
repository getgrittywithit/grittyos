// Financial Demo Data for GrittyOS CRM - QB-Lite Module
// Realistic transactions, categories, and job profitability data

import type {
  Category,
  Transaction,
  ReconciliationPeriod,
  JobProfitability,
  FinancialStats,
  ProfitLossReport,
  CashFlowReport,
  AgingReport,
  CategoryTotal,
  MonthlyFlow,
  DEFAULT_EXPENSE_CATEGORIES,
  DEFAULT_INCOME_CATEGORIES,
} from '@/types/crm';
import {
  demoCustomers,
  demoJobs,
  demoInvoices,
  formatCurrency,
} from './demo-data';

const DEMO_TENANT_ID = 'demo-tenant-001';

// Helper to generate dates
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

const monthsAgo = (months: number) => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
};

// Demo Categories (based on Schedule C)
export const demoCategories: Category[] = [
  // Income categories
  {
    id: 'cat-income-service',
    tenant_id: DEMO_TENANT_ID,
    name: 'Service Income',
    type: 'income',
    schedule_c_line: 'Line 1',
    description: 'Income from services provided',
    is_system: true,
    is_active: true,
    sort_order: 1,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-income-parts',
    tenant_id: DEMO_TENANT_ID,
    name: 'Parts & Materials Markup',
    type: 'income',
    schedule_c_line: 'Line 1',
    description: 'Markup on parts and materials sold',
    is_system: false,
    is_active: true,
    sort_order: 2,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  // Expense categories
  {
    id: 'cat-supplies',
    tenant_id: DEMO_TENANT_ID,
    name: 'Supplies & Materials',
    type: 'expense',
    schedule_c_line: 'Line 22',
    description: 'Materials and supplies for jobs',
    is_system: true,
    is_active: true,
    sort_order: 10,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-tools',
    tenant_id: DEMO_TENANT_ID,
    name: 'Tools & Equipment',
    type: 'expense',
    schedule_c_line: 'Line 27',
    description: 'Small tools and equipment purchases',
    is_system: true,
    is_active: true,
    sort_order: 11,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-vehicle',
    tenant_id: DEMO_TENANT_ID,
    name: 'Vehicle Expenses',
    type: 'expense',
    schedule_c_line: 'Line 9',
    description: 'Gas, maintenance, vehicle costs',
    is_system: true,
    is_active: true,
    sort_order: 12,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-subcontractor',
    tenant_id: DEMO_TENANT_ID,
    name: 'Contract Labor',
    type: 'expense',
    schedule_c_line: 'Line 11',
    description: 'Payments to subcontractors',
    is_system: true,
    is_active: true,
    sort_order: 13,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-insurance',
    tenant_id: DEMO_TENANT_ID,
    name: 'Insurance',
    type: 'expense',
    schedule_c_line: 'Line 15',
    description: 'Business insurance premiums',
    is_system: true,
    is_active: true,
    sort_order: 14,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-advertising',
    tenant_id: DEMO_TENANT_ID,
    name: 'Advertising',
    type: 'expense',
    schedule_c_line: 'Line 8',
    description: 'Marketing and advertising expenses',
    is_system: true,
    is_active: true,
    sort_order: 15,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-office',
    tenant_id: DEMO_TENANT_ID,
    name: 'Office & Admin',
    type: 'expense',
    schedule_c_line: 'Line 18',
    description: 'Office supplies, phone, software',
    is_system: true,
    is_active: true,
    sort_order: 16,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
  {
    id: 'cat-meals',
    tenant_id: DEMO_TENANT_ID,
    name: 'Meals & Entertainment',
    type: 'expense',
    schedule_c_line: 'Line 24b',
    description: 'Business meals (50% deductible)',
    is_system: true,
    is_active: true,
    sort_order: 17,
    created_at: monthsAgo(12),
    updated_at: monthsAgo(12),
  },
];

// Demo Transactions - mix of income (from Stripe/invoices) and expenses
export const demoTransactions: Transaction[] = [
  // Income from completed jobs (Stripe source)
  {
    id: 'txn-001',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(5),
    amount: 1200,
    type: 'income',
    source: 'stripe',
    category_id: 'cat-income-service',
    customer_id: 'cust-002',
    job_id: undefined,
    invoice_id: 'inv-003',
    description: 'Property management - Monthly maintenance (March)',
    stripe_payment_intent_id: 'pi_3abc123',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
  },
  {
    id: 'txn-002',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(35),
    amount: 211.09,
    type: 'income',
    source: 'stripe',
    category_id: 'cat-income-service',
    customer_id: 'cust-005',
    invoice_id: 'inv-005',
    description: 'Annual HVAC service',
    stripe_payment_intent_id: 'pi_3def456',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(35),
    updated_at: daysAgo(35),
  },
  {
    id: 'txn-003',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(45),
    amount: 850,
    type: 'income',
    source: 'stripe',
    category_id: 'cat-income-service',
    customer_id: 'cust-001',
    description: 'Bathroom fixture installation',
    stripe_payment_intent_id: 'pi_3ghi789',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(45),
    updated_at: daysAgo(45),
  },
  {
    id: 'txn-004',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(60),
    amount: 2400,
    type: 'income',
    source: 'stripe',
    category_id: 'cat-income-service',
    customer_id: 'cust-007',
    description: 'Emergency HVAC repair - Hill Country Inn',
    stripe_payment_intent_id: 'pi_3jkl012',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(60),
    updated_at: daysAgo(60),
  },

  // Materials & Supplies (linked to jobs)
  {
    id: 'txn-010',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(4),
    amount: 42.50,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-supplies',
    job_id: 'job-001',
    description: 'Plumbing supplies - kitchen faucet job',
    attachment_url: '/receipts/home-depot-001.jpg',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(4),
    updated_at: daysAgo(4),
  },
  {
    id: 'txn-011',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(2),
    amount: 185.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-supplies',
    job_id: 'job-002',
    description: 'Drywall, paint, bathroom parts - Unit 4B turnover',
    attachment_url: '/receipts/lowes-001.jpg',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
  },
  {
    id: 'txn-012',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(1),
    amount: 160.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-supplies',
    job_id: 'job-003',
    description: 'AC capacitor + refrigerant - emergency repair',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },

  // Vehicle expenses
  {
    id: 'txn-020',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(3),
    amount: 65.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-vehicle',
    description: 'Gas - work truck',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 'txn-021',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(15),
    amount: 85.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-vehicle',
    description: 'Gas - work truck',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(15),
    updated_at: daysAgo(15),
  },
  {
    id: 'txn-022',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(30),
    amount: 420.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-vehicle',
    description: 'Oil change + tire rotation + brake inspection',
    attachment_url: '/receipts/jiffy-lube-001.jpg',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(30),
    updated_at: daysAgo(30),
  },

  // Tools
  {
    id: 'txn-030',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(20),
    amount: 299.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-tools',
    description: 'Milwaukee M18 impact driver',
    attachment_url: '/receipts/home-depot-002.jpg',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(20),
    updated_at: daysAgo(20),
  },

  // Subcontractor (linked to job)
  {
    id: 'txn-040',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(10),
    amount: 200.00,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-subcontractor',
    job_id: 'job-002',
    description: 'Helper for Unit 4B turnover - 4 hours @ $50/hr',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(10),
    updated_at: daysAgo(10),
  },

  // Insurance (monthly from CSV import)
  {
    id: 'txn-050',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(1),
    amount: 215.00,
    type: 'expense',
    source: 'csv',
    category_id: 'cat-insurance',
    description: 'Monthly liability insurance premium',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 'txn-051',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(31),
    amount: 215.00,
    type: 'expense',
    source: 'csv',
    category_id: 'cat-insurance',
    description: 'Monthly liability insurance premium',
    reconciled: true,
    reconciled_period_id: 'rec-001',
    is_deleted: false,
    created_at: daysAgo(31),
    updated_at: daysAgo(31),
  },

  // Advertising
  {
    id: 'txn-060',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(7),
    amount: 150.00,
    type: 'expense',
    source: 'csv',
    category_id: 'cat-advertising',
    description: 'Google Ads - local service ads',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(7),
    updated_at: daysAgo(7),
  },

  // Office
  {
    id: 'txn-070',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(5),
    amount: 49.99,
    type: 'expense',
    source: 'csv',
    category_id: 'cat-office',
    description: 'QuickBooks subscription (to be replaced by GrittyOS!)',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
  },
  {
    id: 'txn-071',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(5),
    amount: 89.00,
    type: 'expense',
    source: 'csv',
    category_id: 'cat-office',
    description: 'Verizon - business phone',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
  },

  // Meals
  {
    id: 'txn-080',
    tenant_id: DEMO_TENANT_ID,
    date: daysAgo(8),
    amount: 28.50,
    type: 'expense',
    source: 'manual',
    category_id: 'cat-meals',
    description: 'Lunch with Marcus Thompson - property management discussion',
    customer_id: 'cust-002',
    reconciled: false,
    is_deleted: false,
    created_at: daysAgo(8),
    updated_at: daysAgo(8),
  },
];

// Demo Reconciliation Periods
export const demoReconciliationPeriods: ReconciliationPeriod[] = [
  {
    id: 'rec-001',
    tenant_id: DEMO_TENANT_ID,
    period_start: monthsAgo(2),
    period_end: monthsAgo(1),
    ending_balance: 4250.00,
    status: 'locked',
    locked_at: daysAgo(25),
    locked_by: 'demo-user-001',
    notes: 'February reconciliation complete',
    created_at: monthsAgo(1),
    updated_at: daysAgo(25),
  },
  {
    id: 'rec-002',
    tenant_id: DEMO_TENANT_ID,
    period_start: monthsAgo(1),
    period_end: daysAgo(0),
    ending_balance: 0, // Not yet reconciled
    status: 'open',
    created_at: monthsAgo(1),
    updated_at: monthsAgo(1),
  },
];

// Calculate Job Profitability from transactions
export function calculateJobProfitability(jobId: string): JobProfitability | null {
  const job = demoJobs.find(j => j.id === jobId);
  if (!job) return null;

  const customer = demoCustomers.find(c => c.id === job.customer_id);

  // Get invoices for this job
  const jobInvoices = demoInvoices.filter(inv => inv.job_id === jobId);
  const invoicedAmount = jobInvoices.reduce((sum, inv) => sum + inv.total_amount, 0);
  const collectedAmount = jobInvoices.reduce((sum, inv) => sum + inv.paid_amount, 0);

  // Get expenses linked to this job
  const jobExpenses = demoTransactions.filter(
    txn => txn.job_id === jobId && txn.type === 'expense' && !txn.is_deleted
  );

  const materialsCost = jobExpenses
    .filter(txn => txn.category_id === 'cat-supplies')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const laborCost = jobExpenses
    .filter(txn => txn.category_id === 'cat-subcontractor')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const otherCosts = jobExpenses
    .filter(txn => !['cat-supplies', 'cat-subcontractor'].includes(txn.category_id))
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalCosts = materialsCost + laborCost + otherCosts;
  const grossProfit = collectedAmount - totalCosts;
  const profitMargin = collectedAmount > 0 ? (grossProfit / collectedAmount) * 100 : 0;

  return {
    job_id: jobId,
    job,
    customer,
    invoiced_amount: invoicedAmount,
    collected_amount: collectedAmount,
    outstanding_amount: invoicedAmount - collectedAmount,
    materials_cost: materialsCost,
    labor_cost: laborCost,
    other_costs: otherCosts,
    total_costs: totalCosts,
    gross_profit: grossProfit,
    profit_margin: Math.round(profitMargin * 10) / 10,
    is_profitable: grossProfit > 0,
  };
}

// Get all job profitabilities
export function getAllJobProfitabilities(): JobProfitability[] {
  return demoJobs
    .filter(job => job.status === 'completed' || job.status === 'in_progress')
    .map(job => calculateJobProfitability(job.id))
    .filter((p): p is JobProfitability => p !== null)
    .sort((a, b) => b.gross_profit - a.gross_profit);
}

// Calculate P&L Report
export function calculateProfitLoss(startDate: string, endDate: string): ProfitLossReport {
  const periodTransactions = demoTransactions.filter(
    txn => !txn.is_deleted && txn.date >= startDate && txn.date <= endDate
  );

  const incomeTransactions = periodTransactions.filter(txn => txn.type === 'income');
  const expenseTransactions = periodTransactions.filter(txn => txn.type === 'expense');

  const totalIncome = incomeTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  // Group by category
  const incomeByCat = groupByCategory(incomeTransactions, totalIncome);
  const expensesByCat = groupByCategory(expenseTransactions, totalExpenses);

  return {
    period_start: startDate,
    period_end: endDate,
    total_income: totalIncome,
    income_by_category: incomeByCat,
    total_expenses: totalExpenses,
    expenses_by_category: expensesByCat,
    net_income: totalIncome - totalExpenses,
  };
}

function groupByCategory(transactions: Transaction[], total: number): CategoryTotal[] {
  const groups = new Map<string, { amount: number; count: number }>();

  transactions.forEach(txn => {
    const existing = groups.get(txn.category_id) || { amount: 0, count: 0 };
    groups.set(txn.category_id, {
      amount: existing.amount + txn.amount,
      count: existing.count + 1,
    });
  });

  return Array.from(groups.entries())
    .map(([categoryId, data]) => {
      const category = demoCategories.find(c => c.id === categoryId);
      return {
        category_id: categoryId,
        category_name: category?.name || 'Unknown',
        schedule_c_line: category?.schedule_c_line,
        total: data.amount,
        transaction_count: data.count,
        percent_of_total: total > 0 ? Math.round((data.amount / total) * 1000) / 10 : 0,
      };
    })
    .sort((a, b) => b.total - a.total);
}

// Calculate Cash Flow
export function calculateCashFlow(months: number): CashFlowReport {
  const now = new Date();
  const monthlyData: MonthlyFlow[] = [];
  let runningBalance = 0;
  let totalInflow = 0;
  let totalOutflow = 0;

  for (let i = months - 1; i >= 0; i--) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = monthDate.toISOString().slice(0, 7);
    const monthStart = `${monthStr}-01`;
    const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];

    const monthTransactions = demoTransactions.filter(
      txn => !txn.is_deleted && txn.date >= monthStart && txn.date <= monthEnd
    );

    const inflow = monthTransactions
      .filter(txn => txn.type === 'income')
      .reduce((sum, txn) => sum + txn.amount, 0);

    const outflow = monthTransactions
      .filter(txn => txn.type === 'expense')
      .reduce((sum, txn) => sum + txn.amount, 0);

    runningBalance += inflow - outflow;
    totalInflow += inflow;
    totalOutflow += outflow;

    monthlyData.push({
      month: monthStr,
      inflow,
      outflow,
      net: inflow - outflow,
      running_balance: runningBalance,
    });
  }

  return {
    period_start: monthlyData[0]?.month + '-01' || '',
    period_end: daysAgo(0),
    months: monthlyData,
    total_inflow: totalInflow,
    total_outflow: totalOutflow,
    net_flow: totalInflow - totalOutflow,
  };
}

// Financial Stats for dashboard
export function getFinancialStats(): FinancialStats {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];

  const thisMonthTxns = demoTransactions.filter(
    txn => !txn.is_deleted && txn.date >= thisMonthStart
  );
  const lastMonthTxns = demoTransactions.filter(
    txn => !txn.is_deleted && txn.date >= lastMonthStart && txn.date <= lastMonthEnd
  );

  const incomeThisMonth = thisMonthTxns
    .filter(txn => txn.type === 'income')
    .reduce((sum, txn) => sum + txn.amount, 0);
  const expensesThisMonth = thisMonthTxns
    .filter(txn => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const incomeLastMonth = lastMonthTxns
    .filter(txn => txn.type === 'income')
    .reduce((sum, txn) => sum + txn.amount, 0);
  const expensesLastMonth = lastMonthTxns
    .filter(txn => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0);

  const incomeChangePercent = incomeLastMonth > 0
    ? Math.round(((incomeThisMonth - incomeLastMonth) / incomeLastMonth) * 100)
    : 0;

  // A/R from unpaid invoices
  const accountsReceivable = demoInvoices
    .filter(inv => ['sent', 'overdue'].includes(inv.status))
    .reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0);

  const overdueAmount = demoInvoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0);

  // Job profitability
  const allProfitabilities = getAllJobProfitabilities();
  const avgMargin = allProfitabilities.length > 0
    ? allProfitabilities.reduce((sum, p) => sum + p.profit_margin, 0) / allProfitabilities.length
    : 0;

  // Unreconciled transactions
  const unreconciledCount = demoTransactions.filter(
    txn => !txn.is_deleted && !txn.reconciled
  ).length;

  const lastReconciled = demoReconciliationPeriods
    .filter(p => p.status === 'locked')
    .sort((a, b) => new Date(b.locked_at!).getTime() - new Date(a.locked_at!).getTime())[0];

  return {
    income_this_month: incomeThisMonth,
    expenses_this_month: expensesThisMonth,
    net_this_month: incomeThisMonth - expensesThisMonth,
    income_last_month: incomeLastMonth,
    expenses_last_month: expensesLastMonth,
    income_change_percent: incomeChangePercent,
    accounts_receivable: accountsReceivable,
    overdue_amount: overdueAmount,
    avg_job_profit_margin: Math.round(avgMargin * 10) / 10,
    most_profitable_job: allProfitabilities[0],
    least_profitable_job: allProfitabilities[allProfitabilities.length - 1],
    unreconciled_count: unreconciledCount,
    last_reconciled_date: lastReconciled?.period_end,
  };
}

// Get category by ID
export function getCategoryById(id: string): Category | undefined {
  return demoCategories.find(c => c.id === id);
}

// Get transactions with related data
export function getTransactionsWithRelations(): (Transaction & {
  category?: Category;
})[] {
  return demoTransactions
    .filter(txn => !txn.is_deleted)
    .map(txn => ({
      ...txn,
      category: getCategoryById(txn.category_id),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Format helpers
export function formatTransactionAmount(txn: Transaction): string {
  const prefix = txn.type === 'expense' ? '-' : '+';
  return `${prefix}${formatCurrency(txn.amount)}`;
}

export function getTransactionSourceLabel(source: Transaction['source']): string {
  const labels: Record<Transaction['source'], string> = {
    stripe: 'Stripe',
    manual: 'Manual',
    csv: 'Bank Import',
  };
  return labels[source];
}
