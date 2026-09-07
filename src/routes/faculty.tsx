import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — Northlight Academy" },
      {
        name: "description",
        content:
          "Meet the researchers and engineers who teach at Northlight Academy.",
      },
      { property: "og:title", content: "Faculty — Northlight Academy" },
      {
        property: "og:description",
        content:
          "Meet the researchers and engineers who teach at Northlight Academy.",
      },
    ],
  }),
  component: FacultyPage,
});

const faculty = [
  {
    initials: "AR",
    name: "Dr. Aria Reeves",
    role: "Computer Science Lead",
    bio: "Former systems engineer at a cloud infrastructure lab. Teaches operating systems, distributed computing, and performance modeling.",
  },
  {
    initials: "KM",
    name: "Prof. Kenji Mori",
    role: "AI Research Director",
    bio: "Published work on symbolic planning and neuro-symbolic AI. Leads the AI track and mentors capstone projects.",
  },
  {
    initials: "SP",
    name: "Dr. Sarah Park",
    role: "Machine Learning Lead",
    bio: "Applied scientist with a background in recommender systems and generative modeling. Focuses on reproducible ML pipelines.",
  },
];

function FacultyPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-aurora-indigo">
            Faculty
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Learn from people building the field.
          </h1>
          <p className="mt-4 text-lg text-fog text-pretty">
            Our instructors are active researchers and engineers who bring
            current problems into every lesson.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {faculty.map((person) => (
            <div
              key={person.name}
              className="glass rounded-2xl p-7 transition-colors hover:border-aurora-indigo/30"
            >
              <div className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-aurora-teal to-aurora-indigo text-lg font-semibold text-ink">
                {person.initials}
              </div>
              <h3 className="mt-5 text-xl font-medium tracking-tight">
                {person.name}
              </h3>
              <p className="mt-1 text-sm text-aurora-indigo">{person.role}</p>
              <p className="mt-3 text-sm text-fog text-pretty">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
