import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Northlight Academy" },
      {
        name: "description",
        content:
          "Northlight Academy offers structured, research-informed courses in Computer Science, Artificial Intelligence, and Machine Learning.",
      },
      { property: "og:title", content: "About — Northlight Academy" },
      {
        property: "og:description",
        content:
          "Northlight Academy offers structured, research-informed courses in Computer Science, Artificial Intelligence, and Machine Learning.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-aurora-teal">
            About
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Depth-first education for the people building tomorrow.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fog text-pretty">
            Northlight Academy was started by a group of engineers and educators
            who believed that the fastest-moving fields in tech deserve a
            slower, more deliberate way to learn them. We focus on three
            disciplines — Computer Science, Artificial Intelligence, and
            Machine Learning — because they are inseparable in practice.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-fog text-pretty">
            Every course is designed around a real artifact: a working system,
            a trained model, or a reasoned argument. Our mentors read your code,
            your proofs, and your project write-ups. Certificates are a side
            effect; understanding is the goal.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="glass rounded-2xl p-7">
            <h3 className="text-xl font-medium tracking-tight">Project-first</h3>
            <p className="mt-3 text-sm text-fog text-pretty">
              Lessons are small enough to finish in a sitting and substantial
              enough to become part of a portfolio.
            </p>
          </div>
          <div className="glass rounded-2xl p-7">
            <h3 className="text-xl font-medium tracking-tight">
              Research-informed
            </h3>
            <p className="mt-3 text-sm text-fog text-pretty">
              We read papers, reproduce results, and teach the ideas that are
              shaping the discipline.
            </p>
          </div>
          <div className="glass rounded-2xl p-7">
            <h3 className="text-xl font-medium tracking-tight">
              Human feedback
            </h3>
            <p className="mt-3 text-sm text-fog text-pretty">
              Automated tests check syntax. Humans check reasoning, design,
              and clarity.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
