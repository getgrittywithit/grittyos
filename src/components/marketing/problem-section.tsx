import { AlertCircle, Clock, DollarSign, FileX } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "10pm Invoicing",
    description: "You finished the job at 5. You're still doing paperwork at 10. From the couch.",
  },
  {
    icon: FileX,
    title: "The Shoebox",
    description: "Receipts in the glovebox. Notes on napkins. Tax time is a nightmare.",
  },
  {
    icon: DollarSign,
    title: "Chasing Payments",
    description: "You did the work. They forgot to pay. Now you're texting reminders.",
  },
  {
    icon: AlertCircle,
    title: "Wrong Software",
    description: "Every app is built for crews of five. You are the crew.",
  },
];

export function ProblemSection() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight md:text-4xl">
            You run the whole business from <em className="text-primary">your truck</em>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            But the software out there? Built for companies with office staff. Not for you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="relative rounded-xl border border-border bg-background p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <problem.icon className="h-6 w-6 text-destructive" />
              </div>
              <h3 className="mb-2 font-semibold">{problem.title}</h3>
              <p className="text-sm text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
