import {
  Calendar,
  Receipt,
  Users,
  FileText,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import { features } from "@/lib/constants";

const iconMap = {
  Calendar,
  Receipt,
  Users,
  FileText,
  TrendingUp,
  Smartphone,
} as const;

export function FeaturesGrid() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            The tools
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            One tap from quote to <em className="text-primary">paid</em> to taxed.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Truck-first, not desk-first. Every feature works hands-free.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.title}
                className="group relative rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
