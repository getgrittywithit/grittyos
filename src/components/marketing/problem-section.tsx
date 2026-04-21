import { AlertCircle, Clock, DollarSign, Users } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Scheduling Chaos",
    description: "Juggling appointments on paper, missing jobs, and double-booking customers.",
  },
  {
    icon: Users,
    title: "Lost Leads",
    description: "Potential customers slip through the cracks because you're too busy working to follow up.",
  },
  {
    icon: DollarSign,
    title: "Unpaid Invoices",
    description: "Chasing payments while trying to run your business. Money sitting on the table.",
  },
  {
    icon: AlertCircle,
    title: "No Time for Growth",
    description: "Stuck doing paperwork instead of the work that actually pays the bills.",
  },
];

export function ProblemSection() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Sound Familiar?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Running a trade business is hard enough. You shouldn&apos;t need a degree in
            software to manage your customers and get paid.
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
