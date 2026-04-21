import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, TrendingUp, Users, DollarSign, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "For Investors",
  description:
    "GrittyOS is raising a $500K pre-seed round. The operating system for solo tradespeople - a $2B market opportunity.",
};

const metrics = [
  {
    value: "$1.9B",
    label: "SAM",
    description: "US solo tradespeople market",
  },
  {
    value: "900K+",
    label: "Operators",
    description: "Solo trades in the US alone",
  },
  {
    value: "$12M",
    label: "Year 4 ARR",
    description: "Conservative projection",
  },
];

const features = [
  {
    title: "Voice Command Bar",
    description: "Capture a job in one breath from the truck. Hands-free, no forms.",
  },
  {
    title: "One-Tap Invoicing",
    description: "Send invoices via SMS. Card + ACH payments. Auto-reminders.",
  },
  {
    title: "Financial Autopilot",
    description: "Every transaction categorized. Schedule C ready at tax time.",
  },
];

const askDetails = [
  { label: "Instrument", value: "SAFE" },
  { label: "Valuation Cap", value: "$5M" },
  { label: "Round Size", value: "$500K" },
  { label: "Runway", value: "18 months" },
];

const useOfFunds = [
  { pct: "52%", label: "Team & Operations", amount: "$261K" },
  { pct: "28%", label: "Go-to-Market", amount: "$140K" },
  { pct: "13%", label: "Infrastructure", amount: "$65K" },
  { pct: "7%", label: "Reserve", amount: "$34K" },
];

export default function InvestorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-secondary" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              For Investors
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] mt-4 text-4xl font-bold tracking-tight text-secondary-foreground md:text-5xl lg:text-6xl">
              The system for <em className="text-primary">gritty operators</em>.
            </h1>
            <p className="mt-6 text-lg text-secondary-foreground/70">
              GrittyOS is the business operating system for solo tradespeople—the 900K+
              handymen, electricians, and plumbers running one-person businesses.
              We&apos;re raising $500K to capture a $2B market.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/deck" target="_blank">
                  View Pitch Deck
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base bg-transparent border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                <a href="mailto:levi@grittyos.com">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="border-b border-border/40 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-primary md:text-6xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                The Opportunity
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                A <em className="text-primary">$2B market</em> running on paper and prayers.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Solo tradespeople run their business on paper, texts, and guesswork.
                Quotes in Notes, invoices in Word, payments via Venmo, receipts in a shoebox.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                The software that exists? Built for crews of 5+, with $150–$300/mo price tags
                and onboarding calls. We&apos;re building for the operator who IS the crew.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-primary">63%</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    still send invoices manually via text or paper
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-primary">$8,400</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    lost annually to missed follow-ups and unbilled jobs
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-secondary p-8 text-secondary-foreground">
              <h3 className="text-xl font-semibold">Why Now?</h3>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Solo contractor workforce growing 12% annually</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Voice AI now good enough for hands-free capture</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>Embedded payments enable 2.5× revenue per user</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>No mobile-first competitor owns this segment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Product */}
      <section className="border-y border-border/40 bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              The Product
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Quote to paid to <em className="text-primary">taxed</em>. In four taps.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-background p-6"
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="font-[family-name:var(--font-playfair)] text-xl">
              &ldquo;New job, 112 Elm, unclog kitchen drain, $180.&rdquo;
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Quote, schedule, and contact record — created in one breath.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              The Team
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Operators building for <em className="text-primary">operators</em>.
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Founder & CEO
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] mt-2 text-3xl font-bold">
                Levi Moses
              </h3>
              <p className="mt-4 text-muted-foreground">
                24 years in construction — 15 running my own solo shop. Lived every
                problem GrittyOS solves. Now building the software I wished I had.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>• 24 years in the construction industry</li>
                <li>• 15 years running a solo construction business</li>
                <li>• Shipping product with AI-assisted engineering</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Head of Marketing & Operations
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] mt-2 text-3xl font-bold">
                Lola
              </h3>
              <p className="mt-4 text-muted-foreground">
                Keeps the build on the rails and the story in the market. Runs marketing,
                organizes the product roadmap, and turns solo tradespeople into paid operators.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li>• Organizes the build — roadmap, priorities, shipping</li>
                <li>• Leads marketing — brand, content, acquisition</li>
                <li>• Moves to full-time at $1M ARR</li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="font-[family-name:var(--font-playfair)] text-xl italic text-muted-foreground">
              &ldquo;We&apos;ve been the customer for 15 years. Now we&apos;re building what we always wished we had.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section className="border-y border-border/40 bg-secondary py-20 text-secondary-foreground">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                The Ask
              </span>
              <p className="font-[family-name:var(--font-playfair)] mt-4 text-7xl font-bold text-primary md:text-8xl">
                $500K
              </p>
              <p className="mt-2 text-xl text-secondary-foreground/70">
                Pre-seed · 18-month runway
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {askDetails.map((detail) => (
                  <div key={detail.label}>
                    <p className="text-sm text-secondary-foreground/50">{detail.label}</p>
                    <p className="text-lg font-semibold">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary">Use of Funds</h3>
              <div className="mt-6 space-y-4">
                {useOfFunds.map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-secondary-foreground/10 pb-4">
                    <div className="flex items-center gap-4">
                      <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary">
                        {item.pct}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-secondary-foreground/70">{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight md:text-4xl">
              Let&apos;s put <em className="text-primary">300,000</em> solo operators back in command.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              View our full pitch deck or get in touch to learn more about the opportunity.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/deck" target="_blank">
                  View Pitch Deck
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <a href="mailto:levi@grittyos.com">
                  <Mail className="mr-2 h-4 w-4" />
                  levi@grittyos.com
                </a>
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Closing round: June 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
