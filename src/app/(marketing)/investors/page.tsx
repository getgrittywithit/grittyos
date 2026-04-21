import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PitchDeckEmbed } from "@/components/marketing/pitch-deck-embed";

export const metadata: Metadata = {
  title: "For Investors",
  description:
    "Learn about the GrittyOS investment opportunity. We're building the CRM that solo tradespeople deserve.",
};

const metrics = [
  {
    icon: Users,
    label: "Target Market",
    value: "10M+",
    description: "Solo tradespeople in the US alone",
  },
  {
    icon: DollarSign,
    label: "Market Size",
    value: "$15B",
    description: "TAM for trade business software",
  },
  {
    icon: TrendingUp,
    label: "Growth Rate",
    value: "12%",
    description: "Annual growth in solo contractors",
  },
];

const highlights = [
  "Large, underserved market of 10M+ solo tradespeople in the US",
  "Fragmented competition with no dominant mobile-first solution",
  "High customer lifetime value with sticky, daily-use product",
  "Clear path to expansion: payments, financing, marketplace",
  "Experienced team with deep domain expertise",
  "Capital-efficient growth strategy via word-of-mouth",
];

export default function InvestorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              For Investors
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              The CRM Solo Tradespeople Deserve
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We&apos;re building the all-in-one business platform for the 10+ million
              solo tradespeople who keep America running. Here&apos;s why we&apos;re excited—and
              why you should be too.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="border-t border-border/40 bg-muted/30 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-xl border border-border bg-background p-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-4xl font-bold">{metric.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch Deck */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pitch Deck</h2>
            <p className="mt-4 text-muted-foreground">
              View our investor presentation below or request access to our full
              materials.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            {/* Pass your Google Slides embed URL here */}
            <PitchDeckEmbed />
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Why GrittyOS?
              </h2>
              <p className="mt-4 text-muted-foreground">
                The trades industry is ripe for disruption. Here&apos;s what makes
                GrittyOS a compelling opportunity.
              </p>
              <ul className="mt-8 space-y-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                      <svg
                        className="h-3 w-3 text-primary-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background p-8">
              <h3 className="text-xl font-semibold">The Opportunity</h3>
              <div className="mt-6 space-y-6 text-muted-foreground">
                <p>
                  <strong className="text-foreground">The market:</strong> Over 10 million
                  solo tradespeople in the US, growing 12% annually as more workers choose
                  independence.
                </p>
                <p>
                  <strong className="text-foreground">The problem:</strong> Existing
                  software is built for large contractors with office staff—not solo
                  operators managing everything from their truck.
                </p>
                <p>
                  <strong className="text-foreground">The solution:</strong> GrittyOS is
                  mobile-first, dead simple, and priced for independent operators. We grow
                  with our customers.
                </p>
                <p>
                  <strong className="text-foreground">The vision:</strong> Start with CRM,
                  expand to payments, financing, and a marketplace connecting tradespeople
                  with customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-gradient-to-b from-background to-muted/30 p-8 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Let&apos;s Talk</h2>
            <p className="mt-3 text-muted-foreground">
              Interested in learning more? We&apos;d love to share our vision and discuss
              how GrittyOS is positioned to capture this opportunity.
            </p>
            <Button asChild size="lg" className="mt-8">
              <a href="mailto:investors@grittyos.com">
                Schedule a Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Or email us at{" "}
              <a
                href="mailto:investors@grittyos.com"
                className="text-primary hover:underline"
              >
                investors@grittyos.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
