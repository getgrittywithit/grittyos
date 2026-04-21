export const siteConfig = {
  name: "GrittyOS",
  tagline: "The system for the gritty few who run everything themselves.",
  description: "Voice-first job capture, one-tap invoicing, automatic financial tracking. Priced for one, built for one. $29/month.",
  url: "https://grittyos.com",
  ogImage: "https://grittyos.com/og-image.png",
  links: {
    twitter: "https://twitter.com/grittyos",
    github: "https://github.com/grittyos",
  },
  creator: "GrittyOS Team",
  // Brand messaging
  elevatorPitch: "GrittyOS is the business operating system for solo tradespeople—handymen, electricians, plumbers—running one-person businesses. Voice-first job capture from the truck, one-tap invoicing, automatic financial tracking, and quarterly tax estimates—all at $29 a month, onboarded in under ten minutes.",
  keyPhrases: {
    audience: "The gritty few",
    promise: "In the truck, in the job, in the books",
    positioning: "Priced for one, built for one",
    journey: "One tap from quote to paid to taxed",
    result: "Back in command",
  },
};

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/investors", label: "Investors" },
] as const;

export const features = [
  {
    title: "Voice-First Job Capture",
    description: "Capture a job in one breath from your truck. No typing, no forms. Just talk.",
    icon: "Smartphone",
  },
  {
    title: "One-Tap Invoicing",
    description: "Invoice goes out. Reminder goes out if they forget. You get paid.",
    icon: "Receipt",
  },
  {
    title: "Customer History",
    description: "Every job, every note, every photo. All in one place. Never forget a detail.",
    icon: "Users",
  },
  {
    title: "Quotes That Convert",
    description: "Send a quote. They approve. One tap to invoice. Done.",
    icon: "FileText",
  },
  {
    title: "Schedule C Ready",
    description: "Every transaction categorized. Tax time sorted. No more shoebox.",
    icon: "TrendingUp",
  },
  {
    title: "Works From the Truck",
    description: "Hands-free. Offline-capable. Built for the job site, not the desk.",
    icon: "Calendar",
  },
] as const;

export const tradeTypes = [
  "Handyman",
  "Electrician",
  "Plumber",
  "HVAC Technician",
  "General Contractor",
  "Carpenter",
  "Painter",
  "Mobile Mechanic",
  "Landscaper",
  "Roofer",
  "Other",
] as const;
