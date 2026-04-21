import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Capture a job in one breath from your truck",
  "Invoice goes out with one tap. Reminder follows if they forget.",
  "Every transaction categorized. Schedule C ready.",
  "Works hands-free. Works offline. Works where you work.",
  "No training. No setup. Onboarded in under ten minutes.",
  "$29/month. Priced for one, built for one.",
];

export function SolutionSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Back in command
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              In the truck. In the job. <em className="text-primary">In the books.</em>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              GrittyOS replaces the paper, the texts, and the shoebox with software
              that fits how you actually work.
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
            <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
                    <span className="text-4xl font-bold text-primary-foreground">G</span>
                  </div>
                  <p className="text-sm text-secondary-foreground/70">Command Bar Demo Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
