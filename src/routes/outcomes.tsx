import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/outcomes")({
  head: () => ({
    meta: [
      { title: "Outcomes — Northlight Academy" },
      {
        name: "description",
        content:
          "See where Northlight Academy graduates land and how the curriculum prepares them for real work.",
      },
      { property: "og:title", content: "Outcomes — Northlight Academy" },
      {
        property: "og:description",
        content:
          "See where Northlight Academy graduates land and how the curriculum prepares them for real work.",
      },
    ],
  }),
  component: OutcomesPage,
});

function OutcomesPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-aurora-green">
            Outcomes
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Built for what comes next.
          </h1>
          <p className="mt-4 text-lg text-fog text-pretty">
            Our learners leave with projects, portfolios, and the judgment to
            keep learning as the field evolves.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="glass rounded-2xl p-7">
            <div className="text-3xl font-semibold tracking-tight">87%</div>
            <p className="mt-2 text-sm text-fog">
              of graduates report a role change within 6 months
            </p>
          </div>
          <div className="glass rounded-2xl p-7">
            <div className="text-3xl font-semibold tracking-tight">42</div>
            <p className="mt-2 text-sm text-fog">
              guided courses mapped to industry skills
            </p>
          </div>
          <div className="glass rounded-2xl p-7">
            <div className="text-3xl font-semibold tracking-tight">12</div>
            <p className="mt-2 text-sm text-fog">
              capstone projects built per learner on average
            </p>
          </div>
          <div className="glass rounded-2xl p-7">
            <div className="text-3xl font-semibold tracking-tight">4.8</div>
            <p className="mt-2 text-sm text-fog">
              average course rating out of 5
            </p>
          </div>
        </div>

        <div className="mt-10 glass rounded-2xl p-8 sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            What graduates are building
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-medium">Compiler for a subset of Python</h3>
              <p className="mt-2 text-sm text-fog">
                CSE capstone · lexer, parser, and bytecode generator from
                scratch.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-medium">
                Autonomous agent for board-game strategy
              </h3>
              <p className="mt-2 text-sm text-fog">
                AI capstone · search, heuristics, and self-play training.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-medium">
                Production-ready recommendation API
              </h3>
              <p className="mt-2 text-sm text-fog">
                ML capstone · feature store, model serving, and A/B testing.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-medium">Fine-tuned vision classifier</h3>
              <p className="mt-2 text-sm text-fog">
                ML capstone · data augmentation, training loop, and edge
                deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
