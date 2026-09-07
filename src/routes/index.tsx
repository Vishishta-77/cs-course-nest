import { createFileRoute, Link } from "@tanstack/react-router";

import deepLearningImg from "../assets/course-deep-learning.jpg";
import algorithmsImg from "../assets/course-algorithms.jpg";
import probabilisticImg from "../assets/course-probabilistic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northlight Academy — CSE, AI & ML Courses" },
      {
        name: "description",
        content:
          "Structured, research-informed pathways in Computer Science, Artificial Intelligence, and Machine Learning.",
      },
      {
        property: "og:title",
        content: "Northlight Academy — CSE, AI & ML Courses",
      },
      {
        property: "og:description",
        content:
          "Structured, research-informed pathways in Computer Science, Artificial Intelligence, and Machine Learning.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="glass relative overflow-hidden rounded-[min(1.4vw,24px)] p-8 sm:p-12 lg:p-16">
            <div className="max-w-[42ch]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-aurora-teal">
                CSE · AI · ML programs
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-none tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Learn the field that is reshaping how machines think.
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg text-fog text-pretty">
                Structured, research-informed pathways in computer science,
                artificial intelligence, and machine learning. Built for people
                who want depth, not just certificates.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full bg-aurora-teal py-2.5 pr-5 pl-5 text-sm font-semibold text-ink ring-1 ring-aurora-teal/40 transition-colors hover:bg-aurora-teal/90"
                >
                  Explore the curriculum
                  <span className="font-mono text-xs">→</span>
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                >
                  View course catalog
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">42</div>
                  <div className="mt-1 text-xs text-fog">Guided courses</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">9</div>
                  <div className="mt-1 text-xs text-fog">Research labs</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">
                    1.2k
                  </div>
                  <div className="mt-1 text-xs text-fog">Active learners</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">
                    180+
                  </div>
                  <div className="mt-1 text-xs text-fog">Hours of content</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* categories */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Three disciplines, one connected path
              </h2>
              <p className="mt-2 max-w-[44ch] text-sm text-fog text-pretty">
                Start where your curiosity lives. Every track feeds into the
                next.
              </p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              to="/courses"
              className="card-lift glass block rounded-2xl p-7"
            >
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-aurora-teal">
                Track 01
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Computer Science
              </h3>
              <p className="mt-3 text-sm text-fog text-pretty">
                Foundations, algorithms, data structures, and systems thinking
                that underpin everything else.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/80">
                14 courses <span className="text-xs">→</span>
              </div>
            </Link>
            <Link
              to="/courses"
              className="card-lift glass block rounded-2xl p-7"
            >
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-aurora-indigo">
                Track 02
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Artificial Intelligence
              </h3>
              <p className="mt-3 text-sm text-fog text-pretty">
                Reasoning, planning, and the principles behind systems that
                perceive and decide.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/80">
                13 courses <span className="text-xs">→</span>
              </div>
            </Link>
            <Link
              to="/courses"
              className="card-lift glass block rounded-2xl p-7"
            >
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-aurora-green">
                Track 03
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Machine Learning
              </h3>
              <p className="mt-3 text-sm text-fog text-pretty">
                From linear models to transformers. Train, evaluate, and ship
                models that generalize.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/80">
                15 courses <span className="text-xs">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* featured courses */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Featured courses
            </h2>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm text-fog transition-colors hover:text-white"
            >
              See all <span className="text-xs">→</span>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <article className="card-lift glass flex flex-col overflow-hidden rounded-2xl">
              <img
                src={deepLearningImg}
                alt="Abstract neural network graph in teal tones"
                width={1024}
                height={640}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-aurora-teal">
                  Machine Learning
                </div>
                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  Deep Learning Fundamentals
                </h3>
                <p className="mt-2 flex-1 text-sm text-fog text-pretty">
                  Backprop, optimization, and the architecture patterns behind
                  modern neural nets.
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-fog">
                  <span>12 weeks</span>
                  <span className="font-mono">4.8 / 5</span>
                </div>
              </div>
            </article>
            <article className="card-lift glass flex flex-col overflow-hidden rounded-2xl">
              <img
                src={algorithmsImg}
                alt="Minimal state machine diagram in indigo tones"
                width={1024}
                height={640}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-aurora-indigo">
                  Computer Science
                </div>
                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  Algorithms & Complexity
                </h3>
                <p className="mt-2 flex-1 text-sm text-fog text-pretty">
                  Asymptotic reasoning, graph theory, and the trade-offs behind
                  efficient systems.
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-fog">
                  <span>10 weeks</span>
                  <span className="font-mono">4.7 / 5</span>
                </div>
              </div>
            </article>
            <article className="card-lift glass flex flex-col overflow-hidden rounded-2xl">
              <img
                src={probabilisticImg}
                alt="Probability distribution curve in soft green tones"
                width={1024}
                height={640}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-aurora-green">
                  Artificial Intelligence
                </div>
                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  Probabilistic Reasoning
                </h3>
                <p className="mt-2 flex-1 text-sm text-fog text-pretty">
                  Bayesian networks, inference, and uncertainty at the heart of
                  intelligent agents.
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-fog">
                  <span>9 weeks</span>
                  <span className="font-mono">4.9 / 5</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="glass relative overflow-hidden rounded-[min(1.4vw,24px)] p-10 text-center sm:p-14">
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-aurora-teal/10 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Ready to build real understanding?
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-fog text-pretty">
              Join a cohort and start with a free preview module. No
              prerequisites to look around.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-full bg-aurora-teal py-2.5 pr-5 pl-5 text-sm font-semibold text-ink ring-1 ring-aurora-teal/40 transition-colors hover:bg-aurora-teal/90"
              >
                Browse all courses
                <span className="font-mono text-xs">→</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
              >
                Talk to an advisor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
