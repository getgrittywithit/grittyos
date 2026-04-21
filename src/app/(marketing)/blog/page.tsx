import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, insights, and news for solo tradespeople looking to grow their business.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Blog
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Insights for Tradespeople
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tips, strategies, and stories to help you run a better trade business.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="border-t border-border/40 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
              <span className="text-4xl font-bold text-primary">G</span>
            </div>
            <h2 className="text-2xl font-bold">Coming Soon</h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;re working on some great content to help you grow your trade
              business. Join the waitlist to be notified when we publish our first posts.
            </p>
            <Button asChild className="mt-8">
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
