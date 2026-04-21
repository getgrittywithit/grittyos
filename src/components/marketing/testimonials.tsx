import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Every other app wanted me to be a different business. This one just lets me work.",
    author: "Mike R.",
    role: "Electrician, 15 years",
  },
  {
    quote: "I invoiced from my truck yesterday. Got paid this morning. That's never happened before.",
    author: "Sarah T.",
    role: "Solo Plumber",
  },
  {
    quote: "No more shoebox at tax time. That alone is worth $29 a month.",
    author: "James K.",
    role: "Handyman",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            The gritty few
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Built by operators. <em className="text-primary">For operators.</em>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We talked to hundreds of solo tradespeople. Then we built what they asked for.
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
