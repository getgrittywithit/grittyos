import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Schedule jobs and appointments in seconds",
  "Send professional invoices from your phone",
  "Never lose a lead again with automatic follow-ups",
  "See your business finances at a glance",
  "Works on any device, anywhere",
  "Built by tradespeople, for tradespeople",
];

export function SolutionSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              The Solution
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              One App to Run Your Entire Business
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              GrittyOS brings everything together—scheduling, invoicing, customer management,
              and more—in one simple app that actually makes sense for tradespeople.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
                    <span className="text-4xl font-bold text-primary-foreground">G</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Product Demo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
