import { Metadata } from "next";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { WaitlistForm } from "@/components/marketing/waitlist-form";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for GrittyOS. Start free, upgrade when you're ready. No hidden fees.",
};

const faqs = [
  {
    question: "Is there really a free plan?",
    answer:
      "Yes! The Starter plan is free forever. It's perfect for getting started and includes basic scheduling and invoicing. Upgrade when you need more features or capacity.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. If you upgrade, you'll be prorated for the remainder of your billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and ACH bank transfers. All payments are processed securely through Stripe.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No contracts, no commitments. All plans are month-to-month and you can cancel anytime. We also offer annual plans with a discount.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes! When you pay annually, you get 2 months free. That's a 17% savings compared to monthly billing.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data is yours. If you cancel, you can export all your customer data, invoices, and job history. We keep your data for 30 days after cancellation in case you change your mind.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Pricing
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Simple Pricing That Grows With You
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Start free and upgrade when you&apos;re ready. No hidden fees, no surprises,
              no contracts. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingCards />

      {/* FAQ Section */}
      <section className="border-t border-border/40 bg-muted/30 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <dl className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg font-semibold">{faq.question}</dt>
                  <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <WaitlistForm />
    </>
  );
}
