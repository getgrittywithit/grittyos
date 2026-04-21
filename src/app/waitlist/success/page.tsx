import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "You're on the List!",
  description: "Thanks for joining the GrittyOS waitlist. We'll be in touch soon.",
};

export default function WaitlistSuccessPage() {
  const shareText = encodeURIComponent(
    "Just joined the waitlist for @GrittyOS - a CRM built specifically for solo tradespeople. Check it out!"
  );
  const shareUrl = encodeURIComponent(siteConfig.url);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            You&apos;re on the List!
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            Thanks for joining the GrittyOS waitlist. We&apos;re working hard to build
            something great, and you&apos;ll be among the first to know when we launch.
          </p>

          <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6">
            <h2 className="font-semibold">What happens next?</h2>
            <ul className="mt-4 space-y-3 text-left text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  1
                </span>
                <span>
                  Check your inbox for a confirmation email (check spam just in case)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  2
                </span>
                <span>
                  We&apos;ll send occasional updates on our progress and early access
                  opportunities
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  3
                </span>
                <span>
                  When we launch, you&apos;ll get exclusive early-bird pricing as a thank
                  you
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <p className="mb-4 text-sm font-medium">
              Help spread the word?
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button asChild variant="outline" size="sm">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Share on X
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Share on LinkedIn
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <Button asChild>
              <Link href="/">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
