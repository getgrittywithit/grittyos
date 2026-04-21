import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the team behind GrittyOS and our mission to help solo tradespeople run their businesses more efficiently.",
};

const values = [
  {
    title: "Built for the Field",
    description:
      "We design every feature with the reality of trade work in mind. Dirty hands, job sites, limited connectivity—we get it.",
  },
  {
    title: "Simplicity First",
    description:
      "Software should save you time, not create more work. Every feature earns its place by being genuinely useful.",
  },
  {
    title: "Your Business, Your Data",
    description:
      "You own your data, period. Export it anytime, delete it anytime. No lock-in, no tricks.",
  },
  {
    title: "Honest Pricing",
    description:
      "No hidden fees, no surprise charges. What you see is what you pay. We make money when you succeed.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              About Us
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              We&apos;re Building Software That Actually Works
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              GrittyOS was born from frustration with software that doesn&apos;t understand
              how tradespeople actually work. We&apos;re here to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                Every day, millions of solo tradespeople—plumbers, electricians, HVAC techs,
                contractors—keep our homes and businesses running. They&apos;re experts at their
                craft, but running the business side? That&apos;s a different story.
              </p>
              <p>
                We talked to hundreds of tradespeople and heard the same frustrations over
                and over: scheduling nightmares, chasing payments, losing track of leads,
                and spending nights doing paperwork instead of being with family.
              </p>
              <p>
                The software that exists was built for big companies with office staff—not
                for someone managing everything from their truck between jobs.
              </p>
              <p>
                <strong className="text-foreground">GrittyOS is different.</strong> We&apos;re
                building the CRM we wish existed: simple enough to use on a job site,
                powerful enough to actually grow your business, and priced fairly for
                independent operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">What We Believe</h2>
            <p className="mt-4 text-muted-foreground">
              These principles guide everything we build.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border bg-background p-8"
              >
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">The Team</h2>
            <p className="mt-4 text-muted-foreground">
              A small team with big ambitions to help tradespeople succeed.
            </p>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                <span className="text-4xl font-bold text-primary">G</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">Founding Team</h3>
              <p className="text-muted-foreground">Coming Soon</p>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
                We&apos;re a team of builders who&apos;ve worked with tradespeople and
                understand the challenges of running a trade business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Join Us on This Journey
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              We&apos;re just getting started. Join the waitlist and help shape the future
              of GrittyOS.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8"
            >
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
