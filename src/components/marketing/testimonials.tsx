import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, software that gets how tradespeople actually work. Can't wait for launch!",
    author: "Mike R.",
    role: "Electrician, 15 years",
  },
  {
    quote: "I've tried every app out there. GrittyOS looks like the first one built by someone who's actually been in the field.",
    author: "Sarah T.",
    role: "Plumber & Business Owner",
  },
  {
    quote: "The invoicing alone will save me hours every week. Sign me up.",
    author: "James K.",
    role: "General Contractor",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            From the Community
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Built for Tradespeople, By Tradespeople
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We talked to hundreds of solo tradespeople to understand exactly
            what they need. Here&apos;s what they&apos;re saying.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative rounded-xl border border-border bg-background p-6"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/20" />
              <blockquote className="mb-6 text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
