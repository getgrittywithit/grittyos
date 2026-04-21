"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tradeTypes } from "@/lib/constants";

export function WaitlistForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      name: formData.get("name") as string || undefined,
      trade_type: formData.get("trade_type") as string || undefined,
      company_name: formData.get("company_name") as string || undefined,
      referral_source: formData.get("referral_source") as string || undefined,
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      router.push("/waitlist/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="waitlist" className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-border bg-gradient-to-b from-background to-muted/30 p-8 shadow-lg md:p-12">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                Early Access
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight">
                Get <em className="text-primary">back in command</em>.
              </h2>
              <p className="mt-2 text-muted-foreground">
                Join the waitlist. Early operators get exclusive pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1.5"
                />
              </div>

              {!showOptional && (
                <button
                  type="button"
                  onClick={() => setShowOptional(true)}
                  className="text-sm text-primary hover:underline"
                >
                  + Add more details (optional)
                </button>
              )}

              {showOptional && (
                <>
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="trade_type">Trade Type</Label>
                    <select
                      id="trade_type"
                      name="trade_type"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select your trade...</option>
                      {tradeTypes.map((trade) => (
                        <option key={trade} value={trade.toLowerCase()}>
                          {trade}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      type="text"
                      placeholder="Smith Plumbing LLC"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="referral_source">How did you hear about us?</Label>
                    <Input
                      id="referral_source"
                      name="referral_source"
                      type="text"
                      placeholder="Google, friend, social media..."
                      className="mt-1.5"
                    />
                  </div>
                </>
              )}

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join the Waitlist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
