import { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Receipt,
  Users,
  FileText,
  TrendingUp,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Discover the powerful features that make GrittyOS the best CRM for solo tradespeople. Scheduling, invoicing, lead management, and more.",
};

const features = [
  {
    icon: Calendar,
    title: "Job Scheduling & Calendar",
    description:
      "Visual calendar that shows all your appointments, jobs, and availability at a glance. Drag and drop to reschedule, set recurring appointments, and never double-book again.",
    benefits: [
      "Color-coded job types",
      "Customer reminders via SMS",
      "Block off personal time",
      "Sync with Google Calendar",
    ],
  },
  {
    icon: Receipt,
    title: "Invoicing & Payments",
    description:
      "Create professional invoices in seconds and get paid faster. Accept credit cards, ACH transfers, or record cash payments. Automatic payment reminders do the chasing for you.",
    benefits: [
      "Custom invoice templates",
      "Online payment portal",
      "Automatic late reminders",
      "Payment tracking dashboard",
    ],
  },
  {
    icon: Users,
    title: "Customer & Lead Management",
    description:
      "Keep all your customer information in one place. Full history of jobs, notes, photos, and communication. Never forget a detail or lose a lead again.",
    benefits: [
      "Complete job history",
      "Notes and photos per job",
      "Lead pipeline tracking",
      "Customer communication log",
    ],
  },
  {
    icon: FileText,
    title: "Estimates & Quotes",
    description:
      "Send professional quotes that make you look good. Itemized pricing, terms and conditions, and easy conversion to invoices when the job is approved.",
    benefits: [
      "Professional templates",
      "Itemized line items",
      "Digital signatures",
      "One-click to invoice",
    ],
  },
  {
    icon: TrendingUp,
    title: "Financial Tracking",
    description:
      "Know your numbers without being an accountant. See income, expenses, and profitability at a glance. Track which jobs and customers are most profitable.",
    benefits: [
      "Revenue dashboards",
      "Expense tracking",
      "Profit by job type",
      "Tax-ready reports",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Built for the field, not the office. Everything works perfectly on your phone so you can manage your business between jobs, on the road, or from the couch.",
    benefits: [
      "Works offline",
      "Photo capture on jobs",
      "GPS time tracking",
      "Push notifications",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Features
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Everything You Need to Run Your Business
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              GrittyOS brings all the tools solo tradespeople need into one simple app.
              No more juggling multiple systems or losing track of important details.
            </p>
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-24">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">{feature.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    {feature.description}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted to-muted/50 ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <feature.icon className="mx-auto h-16 w-16 text-primary/30" />
                      <p className="mt-4 text-sm text-muted-foreground">
                        Feature Preview Coming Soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Simplify Your Business?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the waitlist today and be first in line when we launch.
              Early members get exclusive pricing.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/#waitlist">
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
