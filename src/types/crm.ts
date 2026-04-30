// CRM Entity Types for GrittyOS Multi-Tenant CRM

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  tier: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface TenantMember {
  id: string;
  tenant_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  invited_at: string;
  accepted_at?: string;
}

export interface Customer {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  street_address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  customer_type: 'residential' | 'commercial';
  status: 'active' | 'inactive' | 'prospect';
  tags: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  tenant_id: string;
  customer_id: string;
  customer?: Customer;
  title: string;
  description?: string;
  job_type: 'estimate' | 'project' | 'maintenance' | 'emergency';
  status: 'pending' | 'quoted' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_date?: string;
  completion_date?: string;
  estimated_amount?: number;
  actual_amount?: number;
  job_location?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  created_at: string;
  updated_at: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quote {
  id: string;
  tenant_id: string;
  customer_id: string;
  customer?: Customer;
  job_id?: string;
  quote_number: string;
  title: string;
  description?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  items: LineItem[];
  expiration_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  tenant_id: string;
  customer_id: string;
  customer?: Customer;
  job_id?: string;
  job?: Job;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  paid_date?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  items: LineItem[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  tenant_id: string;
  invoice_id: string;
  customer_id: string;
  amount: number;
  payment_method: 'cash' | 'check' | 'card' | 'bank_transfer' | 'other';
  reference_number?: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  payment_date: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  tenant_id: string;
  user_id?: string;
  entity_type: 'customer' | 'job' | 'quote' | 'invoice' | 'payment';
  entity_id: string;
  action: 'created' | 'updated' | 'deleted' | 'viewed' | 'status_changed';
  changes?: Record<string, unknown>;
  description?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalCustomers: number;
  activeJobs: number;
  pendingQuotes: number;
  unpaidInvoices: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  jobsCompletedThisMonth: number;
  outstandingBalance: number;
}

// Helper type for status colors
export type StatusColor = 'default' | 'success' | 'warning' | 'danger' | 'info';

export const JOB_STATUS_COLORS: Record<Job['status'], StatusColor> = {
  pending: 'default',
  quoted: 'info',
  scheduled: 'info',
  in_progress: 'warning',
  completed: 'success',
  cancelled: 'danger',
};

export const QUOTE_STATUS_COLORS: Record<Quote['status'], StatusColor> = {
  draft: 'default',
  sent: 'info',
  accepted: 'success',
  rejected: 'danger',
  expired: 'default',
};

export const INVOICE_STATUS_COLORS: Record<Invoice['status'], StatusColor> = {
  draft: 'default',
  sent: 'info',
  paid: 'success',
  overdue: 'danger',
  cancelled: 'default',
};

export const CUSTOMER_STATUS_COLORS: Record<Customer['status'], StatusColor> = {
  active: 'success',
  inactive: 'default',
  prospect: 'info',
};

export const PRIORITY_COLORS: Record<Job['priority'], StatusColor> = {
  low: 'default',
  normal: 'info',
  high: 'warning',
  urgent: 'danger',
};

// ============================================
// Financial Tracking Types (QB-Lite)
// ============================================

// Transaction sources - how the transaction entered the system
export type TransactionSource = 'stripe' | 'manual' | 'csv';

// Transaction types
export type TransactionType = 'income' | 'expense';

// Category for transactions (mirrors IRS Schedule C buckets)
export interface Category {
  id: string;
  tenant_id: string;
  name: string;
  type: TransactionType;
  schedule_c_line?: string; // e.g., "Line 8" for Advertising
  description?: string;
  is_system: boolean; // System categories can't be deleted
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// The spine of the ledger - single transactions table
export interface Transaction {
  id: string;
  tenant_id: string;
  date: string;
  amount: number; // Always positive, type indicates direction
  type: TransactionType;
  source: TransactionSource;
  category_id: string;
  category?: Category;
  customer_id?: string;
  customer?: Customer;
  job_id?: string;
  job?: Job;
  invoice_id?: string;
  invoice?: Invoice;
  description: string;
  attachment_url?: string;
  stripe_payment_intent_id?: string;
  stripe_payout_id?: string;
  reconciled: boolean;
  reconciled_period_id?: string;
  // Audit fields
  is_deleted: boolean; // Soft delete only
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

// Audit log for transaction changes
export interface TransactionAuditLog {
  id: string;
  tenant_id: string;
  transaction_id: string;
  user_id: string;
  action: 'created' | 'updated' | 'deleted' | 'restored';
  before_state?: Partial<Transaction>;
  after_state?: Partial<Transaction>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// Reconciliation period - locked periods become read-only
export interface ReconciliationPeriod {
  id: string;
  tenant_id: string;
  period_start: string;
  period_end: string;
  ending_balance: number;
  status: 'open' | 'reconciling' | 'locked';
  locked_at?: string;
  locked_by?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Bank import row for reconciliation
export interface BankImportRow {
  id: string;
  tenant_id: string;
  import_batch_id: string;
  date: string;
  amount: number;
  description: string;
  reference?: string;
  match_status: 'unmatched' | 'matched' | 'created' | 'ignored';
  matched_transaction_id?: string;
  created_at: string;
}

// CSV import batch
export interface ImportBatch {
  id: string;
  tenant_id: string;
  filename: string;
  row_count: number;
  matched_count: number;
  created_count: number;
  ignored_count: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

// Job profitability calculation (the killer feature)
export interface JobProfitability {
  job_id: string;
  job?: Job;
  customer?: Customer;
  // Revenue
  invoiced_amount: number;
  collected_amount: number;
  outstanding_amount: number;
  // Costs
  materials_cost: number;
  labor_cost: number; // Subcontractor/contract labor
  other_costs: number;
  total_costs: number;
  // Profit
  gross_profit: number;
  profit_margin: number; // Percentage
  // Status
  is_profitable: boolean;
}

// P&L Report structure
export interface ProfitLossReport {
  period_start: string;
  period_end: string;
  // Income
  total_income: number;
  income_by_category: CategoryTotal[];
  // Expenses
  total_expenses: number;
  expenses_by_category: CategoryTotal[];
  // Net
  net_income: number;
  // Comparison
  previous_period_net?: number;
  change_percent?: number;
}

export interface CategoryTotal {
  category_id: string;
  category_name: string;
  schedule_c_line?: string;
  total: number;
  transaction_count: number;
  percent_of_total: number;
}

// Cash flow report
export interface CashFlowReport {
  period_start: string;
  period_end: string;
  months: MonthlyFlow[];
  total_inflow: number;
  total_outflow: number;
  net_flow: number;
}

export interface MonthlyFlow {
  month: string; // YYYY-MM
  inflow: number;
  outflow: number;
  net: number;
  running_balance: number;
}

// A/R Aging report
export interface AgingReport {
  as_of_date: string;
  current: number; // Not yet due
  days_1_30: number;
  days_31_60: number;
  days_61_90: number;
  days_over_90: number;
  total_outstanding: number;
  invoices: AgingInvoice[];
}

export interface AgingInvoice {
  invoice_id: string;
  invoice_number: string;
  customer_name: string;
  issue_date: string;
  due_date: string;
  amount: number;
  paid_amount: number;
  balance: number;
  days_outstanding: number;
  aging_bucket: 'current' | '1-30' | '31-60' | '61-90' | '90+';
}

// Schedule C export structure
export interface ScheduleCExport {
  tax_year: number;
  // Gross receipts (Line 1)
  gross_receipts: number;
  // Expenses by category
  advertising: number; // Line 8
  car_truck: number; // Line 9
  commissions: number; // Line 10
  contract_labor: number; // Line 11
  depreciation: number; // Line 13
  insurance: number; // Line 15
  interest_mortgage: number; // Line 16a
  interest_other: number; // Line 16b
  legal_professional: number; // Line 17
  office_expense: number; // Line 18
  pension: number; // Line 19
  rent_equipment: number; // Line 20a
  rent_property: number; // Line 20b
  repairs: number; // Line 21
  supplies: number; // Line 22
  taxes_licenses: number; // Line 23
  travel: number; // Line 24a
  meals: number; // Line 24b
  utilities: number; // Line 25
  wages: number; // Line 26
  other_expenses: number; // Line 27
  total_expenses: number;
  net_profit: number; // Line 31
}

// Financial dashboard stats
export interface FinancialStats {
  // Current period
  income_this_month: number;
  expenses_this_month: number;
  net_this_month: number;
  // Comparisons
  income_last_month: number;
  expenses_last_month: number;
  income_change_percent: number;
  // Outstanding
  accounts_receivable: number;
  overdue_amount: number;
  // Job metrics
  avg_job_profit_margin: number;
  most_profitable_job?: JobProfitability;
  least_profitable_job?: JobProfitability;
  // Reconciliation
  unreconciled_count: number;
  last_reconciled_date?: string;
}

// Default Schedule C categories
export const DEFAULT_EXPENSE_CATEGORIES: Omit<Category, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>[] = [
  { name: 'Advertising', type: 'expense', schedule_c_line: 'Line 8', description: 'Advertising and marketing expenses', is_system: true, is_active: true, sort_order: 1 },
  { name: 'Car & Truck', type: 'expense', schedule_c_line: 'Line 9', description: 'Vehicle expenses for business use', is_system: true, is_active: true, sort_order: 2 },
  { name: 'Commissions & Fees', type: 'expense', schedule_c_line: 'Line 10', description: 'Commissions and fees paid', is_system: true, is_active: true, sort_order: 3 },
  { name: 'Contract Labor', type: 'expense', schedule_c_line: 'Line 11', description: 'Payments to subcontractors', is_system: true, is_active: true, sort_order: 4 },
  { name: 'Insurance', type: 'expense', schedule_c_line: 'Line 15', description: 'Business insurance premiums', is_system: true, is_active: true, sort_order: 5 },
  { name: 'Legal & Professional', type: 'expense', schedule_c_line: 'Line 17', description: 'Legal, accounting, and professional fees', is_system: true, is_active: true, sort_order: 6 },
  { name: 'Office Expense', type: 'expense', schedule_c_line: 'Line 18', description: 'Office supplies and expenses', is_system: true, is_active: true, sort_order: 7 },
  { name: 'Rent - Equipment', type: 'expense', schedule_c_line: 'Line 20a', description: 'Rental of equipment and machinery', is_system: true, is_active: true, sort_order: 8 },
  { name: 'Repairs & Maintenance', type: 'expense', schedule_c_line: 'Line 21', description: 'Repairs and maintenance of business property', is_system: true, is_active: true, sort_order: 9 },
  { name: 'Supplies', type: 'expense', schedule_c_line: 'Line 22', description: 'Materials and supplies', is_system: true, is_active: true, sort_order: 10 },
  { name: 'Taxes & Licenses', type: 'expense', schedule_c_line: 'Line 23', description: 'Business taxes and licenses', is_system: true, is_active: true, sort_order: 11 },
  { name: 'Travel', type: 'expense', schedule_c_line: 'Line 24a', description: 'Business travel expenses', is_system: true, is_active: true, sort_order: 12 },
  { name: 'Meals', type: 'expense', schedule_c_line: 'Line 24b', description: 'Business meals (50% deductible)', is_system: true, is_active: true, sort_order: 13 },
  { name: 'Utilities', type: 'expense', schedule_c_line: 'Line 25', description: 'Utilities for business property', is_system: true, is_active: true, sort_order: 14 },
  { name: 'Tools & Equipment', type: 'expense', schedule_c_line: 'Line 27', description: 'Small tools and equipment purchases', is_system: true, is_active: true, sort_order: 15 },
  { name: 'Other Expenses', type: 'expense', schedule_c_line: 'Line 27', description: 'Other business expenses', is_system: true, is_active: true, sort_order: 99 },
];

export const DEFAULT_INCOME_CATEGORIES: Omit<Category, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>[] = [
  { name: 'Service Income', type: 'income', schedule_c_line: 'Line 1', description: 'Income from services provided', is_system: true, is_active: true, sort_order: 1 },
  { name: 'Product Sales', type: 'income', schedule_c_line: 'Line 1', description: 'Income from product sales', is_system: true, is_active: true, sort_order: 2 },
  { name: 'Other Income', type: 'income', schedule_c_line: 'Line 6', description: 'Other business income', is_system: true, is_active: true, sort_order: 3 },
];
