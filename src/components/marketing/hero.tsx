import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent via-background to-background" />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Coming Soon
            </span>
            <span className="text-muted-foreground">Priced for one. Built for one.</span>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            The system for the{" "}
            <em className="text-primary">gritty few</em>{" "}
            who run everything themselves.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Voice-first job capture from the truck. One-tap invoicing. Automatic
            financial tracking. $29/month. Onboarded in under ten minutes.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="#waitlist">
                Join the Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/features">See How It Works</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Early members get exclusive pricing. No credit card required.
          </p>
        </div>

        {/* Hero image placeholder */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-secondary shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                  <span className="text-3xl font-bold text-primary-foreground">G</span>
                </div>
                <p className="text-sm text-secondary-foreground/70">Command Bar Preview Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
