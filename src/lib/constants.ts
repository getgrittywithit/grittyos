export const siteConfig = {
  name: "GrittyOS",
  description: "The all-in-one CRM built for solo tradespeople. Schedule jobs, send invoices, track leads, and grow your business.",
  url: "https://grittyos.com",
  ogImage: "https://grittyos.com/og-image.png",
  links: {
    twitter: "https://twitter.com/grittyos",
    github: "https://github.com/grittyos",
  },
  creator: "GrittyOS Team",
};

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/investors", label: "Investors" },
] as const;

export const features = [
  {
    title: "Job Scheduling & Calendar",
    description: "Visual calendar for appointments, jobs, and availability. Never double-book again.",
    icon: "Calendar",
  },
  {
    title: "Invoicing & Payments",
    description: "Create professional invoices, accept payments, and track what you're owed.",
    icon: "Receipt",
  },
  {
    title: "Customer & Lead Management",
    description: "Full customer history, job notes, and lead tracking in one place.",
    icon: "Users",
  },
  {
    title: "Estimates & Quotes",
    description: "Send professional quotes and convert them to jobs with one click.",
    icon: "FileText",
  },
  {
    title: "Financial Tracking",
    description: "Know your numbers: income, expenses, and profitability at a glance.",
    icon: "TrendingUp",
  },
  {
    title: "Mobile-First",
    description: "Manage your business from the job site. Works on any device.",
    icon: "Smartphone",
  },
] as const;

export const tradeTypes = [
  "Plumber",
  "Electrician",
  "HVAC Technician",
  "General Contractor",
  "Carpenter",
  "Painter",
  "Landscaper",
  "Roofer",
  "Mason",
  "Handyman",
  "Other",
] as const;
