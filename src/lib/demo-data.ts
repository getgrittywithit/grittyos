// Demo Data for GrittyOS CRM - Realistic seed data for pitch deck screenshots

import type {
  Customer,
  Job,
  Quote,
  Invoice,
  Payment,
  ActivityLog,
  DashboardStats,
  LineItem,
} from '@/types/crm';

const DEMO_TENANT_ID = 'demo-tenant-001';

// Helper to generate dates
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Demo Customers
export const demoCustomers: Customer[] = [
  {
    id: 'cust-001',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'Sarah',
    last_name: 'Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(512) 555-0142',
    street_address: '4521 Oak Ridge Drive',
    city: 'Austin',
    state: 'TX',
    postal_code: '78731',
    customer_type: 'residential',
    status: 'active',
    tags: ['preferred', 'referral'],
    notes: 'Great customer, always pays on time. Referred by neighbor.',
    created_at: daysAgo(180),
    updated_at: daysAgo(5),
  },
  {
    id: 'cust-002',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'Marcus',
    last_name: 'Thompson',
    email: 'marcus.t@thompsonrealty.com',
    phone: '(512) 555-0198',
    street_address: '2800 Commerce Street, Suite 400',
    city: 'Austin',
    state: 'TX',
    postal_code: '78701',
    customer_type: 'commercial',
    status: 'active',
    tags: ['commercial', 'property-manager'],
    notes: 'Manages 12 rental properties. Monthly maintenance contract.',
    created_at: daysAgo(365),
    updated_at: daysAgo(2),
  },
  {
    id: 'cust-003',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'Elena',
    last_name: 'Rodriguez',
    email: 'elena.r@gmail.com',
    phone: '(512) 555-0167',
    street_address: '1205 Riverside Parkway',
    city: 'Austin',
    state: 'TX',
    postal_code: '78741',
    customer_type: 'residential',
    status: 'active',
    tags: ['new'],
    notes: 'New homeowner, interested in full home inspection.',
    created_at: daysAgo(14),
    updated_at: daysAgo(14),
  },
  {
    id: 'cust-004',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'James',
    last_name: 'Chen',
    email: 'jchen@chendental.com',
    phone: '(512) 555-0211',
    street_address: '890 Medical Parkway',
    city: 'Austin',
    state: 'TX',
    postal_code: '78756',
    customer_type: 'commercial',
    status: 'active',
    tags: ['commercial', 'medical'],
    notes: 'Dental office. Requires after-hours work only.',
    created_at: daysAgo(90),
    updated_at: daysAgo(30),
  },
  {
    id: 'cust-005',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'Patricia',
    last_name: 'Williams',
    email: 'pwilliams@outlook.com',
    phone: '(512) 555-0134',
    street_address: '6782 Sunset Valley Lane',
    city: 'Austin',
    state: 'TX',
    postal_code: '78749',
    customer_type: 'residential',
    status: 'active',
    tags: ['preferred', 'annual-service'],
    notes: 'Annual HVAC maintenance customer since 2021.',
    created_at: daysAgo(730),
    updated_at: daysAgo(60),
  },
  {
    id: 'cust-006',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'Robert',
    last_name: 'Garcia',
    email: 'rgarcia@email.com',
    phone: '(512) 555-0156',
    street_address: '3401 Barton Springs Road',
    city: 'Austin',
    state: 'TX',
    postal_code: '78704',
    customer_type: 'residential',
    status: 'prospect',
    tags: ['lead', 'website'],
    notes: 'Submitted quote request via website.',
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 'cust-007',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'Amanda',
    last_name: 'Foster',
    email: 'amanda.foster@hillcountryinn.com',
    phone: '(512) 555-0189',
    street_address: '1500 Lake Travis Boulevard',
    city: 'Lakeway',
    state: 'TX',
    postal_code: '78734',
    customer_type: 'commercial',
    status: 'active',
    tags: ['commercial', 'hospitality', 'priority'],
    notes: 'Boutique hotel. Emergency service priority.',
    created_at: daysAgo(200),
    updated_at: daysAgo(1),
  },
  {
    id: 'cust-008',
    tenant_id: DEMO_TENANT_ID,
    first_name: 'David',
    last_name: 'Kim',
    email: 'dkim@techstartup.io',
    phone: '(512) 555-0223',
    street_address: '500 E 4th Street, Floor 3',
    city: 'Austin',
    state: 'TX',
    postal_code: '78701',
    customer_type: 'commercial',
    status: 'inactive',
    tags: ['commercial', 'tech'],
    notes: 'Office moved out of state.',
    created_at: daysAgo(400),
    updated_at: daysAgo(120),
  },
];

// Demo Jobs
export const demoJobs: Job[] = [
  {
    id: 'job-001',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-001',
    title: 'Kitchen Faucet Replacement',
    description: 'Replace leaking kitchen faucet with customer-provided Delta fixture. Check under-sink plumbing.',
    job_type: 'project',
    status: 'completed',
    scheduled_date: daysAgo(3),
    completion_date: daysAgo(3),
    estimated_amount: 185,
    actual_amount: 185,
    job_location: '4521 Oak Ridge Drive, Austin, TX',
    priority: 'normal',
    created_at: daysAgo(7),
    updated_at: daysAgo(3),
  },
  {
    id: 'job-002',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-002',
    title: 'Rental Unit Turnover - Unit 4B',
    description: 'Full inspection and repairs for rental turnover. Patch drywall, fix bathroom exhaust fan, check all outlets.',
    job_type: 'project',
    status: 'in_progress',
    scheduled_date: daysAgo(1),
    estimated_amount: 650,
    job_location: '2800 Commerce Street Unit 4B, Austin, TX',
    priority: 'high',
    created_at: daysAgo(5),
    updated_at: daysAgo(1),
  },
  {
    id: 'job-003',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-007',
    title: 'Emergency AC Repair',
    description: 'AC unit in lobby not cooling. Guest complaints. Need immediate response.',
    job_type: 'emergency',
    status: 'completed',
    scheduled_date: daysAgo(1),
    completion_date: daysAgo(1),
    estimated_amount: 450,
    actual_amount: 520,
    job_location: '1500 Lake Travis Boulevard, Lakeway, TX',
    priority: 'urgent',
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 'job-004',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-003',
    title: 'New Home Inspection',
    description: 'Full electrical and plumbing inspection for new homeowner. Document any issues found.',
    job_type: 'estimate',
    status: 'scheduled',
    scheduled_date: daysFromNow(2),
    estimated_amount: 250,
    job_location: '1205 Riverside Parkway, Austin, TX',
    priority: 'normal',
    created_at: daysAgo(10),
    updated_at: daysAgo(2),
  },
  {
    id: 'job-005',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-004',
    title: 'Dental Office Plumbing Maintenance',
    description: 'Quarterly maintenance check. Inspect all sinks, sterilization equipment connections.',
    job_type: 'maintenance',
    status: 'scheduled',
    scheduled_date: daysFromNow(5),
    estimated_amount: 300,
    job_location: '890 Medical Parkway, Austin, TX',
    priority: 'normal',
    created_at: daysAgo(14),
    updated_at: daysAgo(14),
  },
  {
    id: 'job-006',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-005',
    title: 'Annual HVAC Service',
    description: 'Annual preventive maintenance. Clean coils, check refrigerant levels, replace filters.',
    job_type: 'maintenance',
    status: 'quoted',
    scheduled_date: daysFromNow(14),
    estimated_amount: 195,
    job_location: '6782 Sunset Valley Lane, Austin, TX',
    priority: 'low',
    created_at: daysAgo(7),
    updated_at: daysAgo(5),
  },
  {
    id: 'job-007',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-006',
    title: 'Bathroom Remodel Estimate',
    description: 'Customer wants quote for full master bathroom remodel including new tile, fixtures, and vanity.',
    job_type: 'estimate',
    status: 'pending',
    estimated_amount: 8500,
    job_location: '3401 Barton Springs Road, Austin, TX',
    priority: 'normal',
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 'job-008',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-002',
    title: 'Rental Unit Turnover - Unit 2A',
    description: 'Standard turnover inspection and minor repairs.',
    job_type: 'project',
    status: 'pending',
    estimated_amount: 400,
    job_location: '2800 Commerce Street Unit 2A, Austin, TX',
    priority: 'normal',
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
];

// Demo Quotes
export const demoQuotes: Quote[] = [
  {
    id: 'quote-001',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-006',
    quote_number: 'Q-2024-0042',
    title: 'Master Bathroom Remodel',
    description: 'Complete master bathroom renovation including demolition, new tile, fixtures, and vanity installation.',
    status: 'sent',
    subtotal: 8500,
    tax_rate: 0.0825,
    tax_amount: 701.25,
    total_amount: 9201.25,
    items: [
      { id: 'li-001', description: 'Demo existing bathroom', quantity: 1, unit_price: 800, total: 800 },
      { id: 'li-002', description: 'Floor tile installation (85 sq ft)', quantity: 85, unit_price: 18, total: 1530 },
      { id: 'li-003', description: 'Shower tile installation', quantity: 1, unit_price: 2200, total: 2200 },
      { id: 'li-004', description: 'Vanity & sink installation', quantity: 1, unit_price: 1400, total: 1400 },
      { id: 'li-005', description: 'Toilet replacement', quantity: 1, unit_price: 450, total: 450 },
      { id: 'li-006', description: 'Plumbing rough-in', quantity: 1, unit_price: 1200, total: 1200 },
      { id: 'li-007', description: 'Electrical (GFI outlets, exhaust fan)', quantity: 1, unit_price: 920, total: 920 },
    ],
    expiration_date: daysFromNow(21),
    created_at: daysAgo(3),
    updated_at: daysAgo(2),
  },
  {
    id: 'quote-002',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-005',
    quote_number: 'Q-2024-0041',
    title: 'Annual HVAC Maintenance',
    description: 'Comprehensive HVAC system maintenance including cleaning and inspection.',
    status: 'accepted',
    subtotal: 195,
    tax_rate: 0.0825,
    tax_amount: 16.09,
    total_amount: 211.09,
    items: [
      { id: 'li-008', description: 'AC system inspection', quantity: 1, unit_price: 75, total: 75 },
      { id: 'li-009', description: 'Coil cleaning', quantity: 1, unit_price: 65, total: 65 },
      { id: 'li-010', description: 'Filter replacement', quantity: 2, unit_price: 27.5, total: 55 },
    ],
    expiration_date: daysFromNow(30),
    created_at: daysAgo(7),
    updated_at: daysAgo(5),
  },
  {
    id: 'quote-003',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-003',
    quote_number: 'Q-2024-0040',
    title: 'Whole Home Electrical Upgrade',
    description: 'Upgrade electrical panel and replace outdated wiring in 1970s home.',
    status: 'draft',
    subtotal: 4800,
    tax_rate: 0.0825,
    tax_amount: 396,
    total_amount: 5196,
    items: [
      { id: 'li-011', description: '200-amp panel upgrade', quantity: 1, unit_price: 2400, total: 2400 },
      { id: 'li-012', description: 'Whole-home surge protection', quantity: 1, unit_price: 350, total: 350 },
      { id: 'li-013', description: 'GFCI outlet installation', quantity: 8, unit_price: 125, total: 1000 },
      { id: 'li-014', description: 'Smoke detector hardwiring', quantity: 7, unit_price: 150, total: 1050 },
    ],
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 'quote-004',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-002',
    quote_number: 'Q-2024-0039',
    title: 'Property Management Annual Contract',
    description: '12-month maintenance contract for 12 rental units.',
    status: 'accepted',
    subtotal: 14400,
    tax_rate: 0,
    tax_amount: 0,
    total_amount: 14400,
    items: [
      { id: 'li-015', description: 'Monthly maintenance visits (12 units x 12 months)', quantity: 144, unit_price: 75, total: 10800 },
      { id: 'li-016', description: 'Priority emergency response', quantity: 12, unit_price: 150, total: 1800 },
      { id: 'li-017', description: 'Turnover support credits', quantity: 12, unit_price: 150, total: 1800 },
    ],
    expiration_date: daysAgo(30),
    created_at: daysAgo(60),
    updated_at: daysAgo(45),
  },
];

// Demo Invoices
export const demoInvoices: Invoice[] = [
  {
    id: 'inv-001',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-001',
    job_id: 'job-001',
    invoice_number: 'INV-2024-0089',
    issue_date: daysAgo(3),
    due_date: daysFromNow(27),
    status: 'sent',
    subtotal: 185,
    tax_rate: 0.0825,
    tax_amount: 15.26,
    total_amount: 200.26,
    paid_amount: 0,
    items: [
      { id: 'li-020', description: 'Kitchen faucet installation labor', quantity: 1.5, unit_price: 95, total: 142.50 },
      { id: 'li-021', description: 'Plumbing supplies', quantity: 1, unit_price: 42.50, total: 42.50 },
    ],
    notes: 'Thank you for your business!',
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
  },
  {
    id: 'inv-002',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-007',
    job_id: 'job-003',
    invoice_number: 'INV-2024-0088',
    issue_date: daysAgo(1),
    due_date: daysFromNow(14),
    status: 'sent',
    subtotal: 520,
    tax_rate: 0.0825,
    tax_amount: 42.90,
    total_amount: 562.90,
    paid_amount: 0,
    items: [
      { id: 'li-022', description: 'Emergency service call (after hours)', quantity: 1, unit_price: 175, total: 175 },
      { id: 'li-023', description: 'AC compressor capacitor replacement', quantity: 1, unit_price: 185, total: 185 },
      { id: 'li-024', description: 'Refrigerant recharge (2 lbs)', quantity: 2, unit_price: 80, total: 160 },
    ],
    notes: 'Emergency service - lobby AC unit repair.',
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
  },
  {
    id: 'inv-003',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-002',
    invoice_number: 'INV-2024-0087',
    issue_date: daysAgo(15),
    due_date: daysAgo(0),
    paid_date: daysAgo(5),
    status: 'paid',
    subtotal: 1200,
    tax_rate: 0,
    tax_amount: 0,
    total_amount: 1200,
    paid_amount: 1200,
    items: [
      { id: 'li-025', description: 'Property management - Monthly maintenance (March)', quantity: 12, unit_price: 75, total: 900 },
      { id: 'li-026', description: 'Emergency call - Unit 7A water heater', quantity: 1, unit_price: 300, total: 300 },
    ],
    created_at: daysAgo(15),
    updated_at: daysAgo(5),
  },
  {
    id: 'inv-004',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-004',
    invoice_number: 'INV-2024-0086',
    issue_date: daysAgo(45),
    due_date: daysAgo(15),
    status: 'overdue',
    subtotal: 300,
    tax_rate: 0.0825,
    tax_amount: 24.75,
    total_amount: 324.75,
    paid_amount: 0,
    items: [
      { id: 'li-027', description: 'Quarterly plumbing maintenance', quantity: 1, unit_price: 250, total: 250 },
      { id: 'li-028', description: 'Replacement drain parts', quantity: 1, unit_price: 50, total: 50 },
    ],
    notes: 'Payment reminder sent.',
    created_at: daysAgo(45),
    updated_at: daysAgo(3),
  },
  {
    id: 'inv-005',
    tenant_id: DEMO_TENANT_ID,
    customer_id: 'cust-005',
    invoice_number: 'INV-2024-0085',
    issue_date: daysAgo(60),
    due_date: daysAgo(30),
    paid_date: daysAgo(35),
    status: 'paid',
    subtotal: 195,
    tax_rate: 0.0825,
    tax_amount: 16.09,
    total_amount: 211.09,
    paid_amount: 211.09,
    items: [
      { id: 'li-029', description: 'Annual HVAC service', quantity: 1, unit_price: 195, total: 195 },
    ],
    created_at: daysAgo(60),
    updated_at: daysAgo(35),
  },
];

// Demo Payments
export const demoPayments: Payment[] = [
  {
    id: 'pay-001',
    tenant_id: DEMO_TENANT_ID,
    invoice_id: 'inv-003',
    customer_id: 'cust-002',
    amount: 1200,
    payment_method: 'bank_transfer',
    reference_number: 'ACH-44521',
    status: 'completed',
    payment_date: daysAgo(5),
    created_at: daysAgo(5),
  },
  {
    id: 'pay-002',
    tenant_id: DEMO_TENANT_ID,
    invoice_id: 'inv-005',
    customer_id: 'cust-005',
    amount: 211.09,
    payment_method: 'card',
    reference_number: 'ch_3abc123',
    status: 'completed',
    payment_date: daysAgo(35),
    created_at: daysAgo(35),
  },
];

// Demo Activity Logs
export const demoActivityLogs: ActivityLog[] = [
  {
    id: 'log-001',
    tenant_id: DEMO_TENANT_ID,
    entity_type: 'job',
    entity_id: 'job-003',
    action: 'status_changed',
    description: 'Job marked as completed',
    changes: { status: { from: 'in_progress', to: 'completed' } },
    created_at: daysAgo(1),
  },
  {
    id: 'log-002',
    tenant_id: DEMO_TENANT_ID,
    entity_type: 'invoice',
    entity_id: 'inv-002',
    action: 'created',
    description: 'Invoice created for emergency AC repair',
    created_at: daysAgo(1),
  },
  {
    id: 'log-003',
    tenant_id: DEMO_TENANT_ID,
    entity_type: 'quote',
    entity_id: 'quote-001',
    action: 'created',
    description: 'Quote sent for bathroom remodel',
    created_at: daysAgo(2),
  },
  {
    id: 'log-004',
    tenant_id: DEMO_TENANT_ID,
    entity_type: 'customer',
    entity_id: 'cust-006',
    action: 'created',
    description: 'New lead from website',
    created_at: daysAgo(3),
  },
  {
    id: 'log-005',
    tenant_id: DEMO_TENANT_ID,
    entity_type: 'invoice',
    entity_id: 'inv-003',
    action: 'status_changed',
    description: 'Payment received - Invoice paid',
    changes: { status: { from: 'sent', to: 'paid' } },
    created_at: daysAgo(5),
  },
];

// Dashboard Stats (calculated from demo data)
export const demoDashboardStats: DashboardStats = {
  totalCustomers: demoCustomers.filter(c => c.status === 'active').length,
  activeJobs: demoJobs.filter(j => ['pending', 'scheduled', 'in_progress'].includes(j.status)).length,
  pendingQuotes: demoQuotes.filter(q => ['draft', 'sent'].includes(q.status)).length,
  unpaidInvoices: demoInvoices.filter(i => ['sent', 'overdue'].includes(i.status)).length,
  revenueThisMonth: 2520, // Simulated
  revenueLastMonth: 4850, // Simulated
  jobsCompletedThisMonth: demoJobs.filter(j => j.status === 'completed').length,
  outstandingBalance: demoInvoices
    .filter(i => ['sent', 'overdue'].includes(i.status))
    .reduce((sum, inv) => sum + (inv.total_amount - inv.paid_amount), 0),
};

// Helper functions to get demo data with relationships
export function getCustomerById(id: string): Customer | undefined {
  return demoCustomers.find(c => c.id === id);
}

export function getJobsForCustomer(customerId: string): Job[] {
  return demoJobs.filter(j => j.customer_id === customerId);
}

export function getQuotesForCustomer(customerId: string): Quote[] {
  return demoQuotes.filter(q => q.customer_id === customerId);
}

export function getInvoicesForCustomer(customerId: string): Invoice[] {
  return demoInvoices.filter(i => i.customer_id === customerId);
}

export function getJobById(id: string): (Job & { customer?: Customer }) | undefined {
  const job = demoJobs.find(j => j.id === id);
  if (job) {
    return { ...job, customer: getCustomerById(job.customer_id) };
  }
  return undefined;
}

export function getQuoteById(id: string): (Quote & { customer?: Customer }) | undefined {
  const quote = demoQuotes.find(q => q.id === id);
  if (quote) {
    return { ...quote, customer: getCustomerById(quote.customer_id) };
  }
  return undefined;
}

export function getInvoiceById(id: string): (Invoice & { customer?: Customer; job?: Job }) | undefined {
  const invoice = demoInvoices.find(i => i.id === id);
  if (invoice) {
    return {
      ...invoice,
      customer: getCustomerById(invoice.customer_id),
      job: invoice.job_id ? demoJobs.find(j => j.id === invoice.job_id) : undefined,
    };
  }
  return undefined;
}

// Get recent activity for dashboard
export function getRecentActivity(limit = 5): ActivityLog[] {
  return [...demoActivityLogs]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// Get upcoming jobs for dashboard
export function getUpcomingJobs(limit = 5): (Job & { customer?: Customer })[] {
  return demoJobs
    .filter(j => ['scheduled', 'pending'].includes(j.status) && j.scheduled_date)
    .sort((a, b) => new Date(a.scheduled_date!).getTime() - new Date(b.scheduled_date!).getTime())
    .slice(0, limit)
    .map(job => ({ ...job, customer: getCustomerById(job.customer_id) }));
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(dateString));
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
