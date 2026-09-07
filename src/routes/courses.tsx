import { createFileRoute, Link } from "@tanstack/react-router";

import deepLearningImg from "../assets/course-deep-learning.jpg";
import algorithmsImg from "../assets/course-algorithms.jpg";
import probabilisticImg from "../assets/course-probabilistic.jpg";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "All Courses — Northlight Academy" },
      {
        name: "description",
        content:
          "Browse our full catalog of Computer Science, Artificial Intelligence, and Machine Learning courses.",
      },
      { property: "og:title", content: "All Courses — Northlight Academy" },
      {
        property: "og:description",
        content:
          "Browse our full catalog of Computer Science, Artificial Intelligence, and Machine Learning courses.",
      },
    ],
  }),
  component: CoursesPage,
});

const courses = [
  {
    id: "cs-fundamentals",
    track: "Computer Science",
    trackColor: "text-aurora-teal",
    title: "CSE Foundations",
    description:
      "Computer organization, operating systems, and the abstractions that make software possible.",
    weeks: "8 weeks",
    level: "Beginner",
  },
  {
    id: "algorithms",
    track: "Computer Science",
    trackColor: "text-aurora-indigo",
    title: "Algorithms & Complexity",
    description:
      "Asymptotic reasoning, graph theory, and the trade-offs behind efficient systems.",
    weeks: "10 weeks",
    level: "Intermediate",
  },
  {
    id: "distributed-systems",
    track: "Computer Science",
    trackColor: "text-aurora-indigo",
    title: "Distributed Systems",
    description:
      "Consistency, consensus, and the architecture of resilient systems at scale.",
    weeks: "7 weeks",
    level: "Advanced",
  },
  {
    id: "ai-foundations",
    track: "Artificial Intelligence",
    trackColor: "text-aurora-green",
    title: "AI Foundations",
    description:
      "Search, knowledge representation, and the history of artificial intelligence.",
    weeks: "6 weeks",
    level: "Beginner",
  },
  {
    id: "probabilistic-reasoning",
    track: "Artificial Intelligence",
    trackColor: "text-aurora-green",
    title: "Probabilistic Reasoning",
    description:
      "Bayesian networks, inference, and uncertainty at the heart of intelligent agents.",
    weeks: "9 weeks",
    level: "Advanced",
  },
  {
    id: "llms",
    track: "Artificial Intelligence",
    trackColor: "text-aurora-green",
    title: "Foundations of LLMs",
    description:
      "How large language models are trained, aligned, and deployed responsibly.",
    weeks: "8 weeks",
    level: "Intermediate",
  },
  {
    id: "ml-intro",
    track: "Machine Learning",
    trackColor: "text-aurora-teal",
    title: "Machine Learning Intro",
    description:
      "Supervised and unsupervised learning, evaluation, and the ML workflow.",
    weeks: "6 weeks",
    level: "Beginner",
  },
  {
    id: "deep-learning",
    track: "Machine Learning",
    trackColor: "text-aurora-teal",
    title: "Deep Learning Fundamentals",
    description:
      "Backprop, optimization, and the architecture patterns behind modern neural nets.",
    weeks: "12 weeks",
    level: "Advanced",
  },
  {
    id: "nlp",
    track: "Machine Learning",
    trackColor: "text-aurora-teal",
    title: "Natural Language Processing",
    description:
      "Text classification, embeddings, and building language-aware applications.",
    weeks: "9 weeks",
    level: "Intermediate",
  },
];

const coverImages: Record<string, string> = {
  "deep-learning": deepLearningImg,
  algorithms: algorithmsImg,
  "probabilistic-reasoning": probabilisticImg,
};

function CoursesPage() {
  return (
    <main className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-aurora-teal">
            Catalog
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Every course, one path.
          </h1>
          <p className="mt-4 text-lg text-fog text-pretty">
            Pick a track or browse the full catalog. Each course builds toward a
            working project you can show.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="card-lift glass flex flex-col overflow-hidden rounded-2xl"
            >
              {coverImages[course.id] ? (
                <img
                  src={coverImages[course.id]}
                  alt={`${course.title} course cover`}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <div className="aspect-[16/10] w-full bg-ink-soft" />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] ${course.trackColor}`}
                >
                  {course.track}
                </div>
                <h3 className="mt-3 text-lg font-medium tracking-tight">
                  {course.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-fog text-pretty">
                  {course.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-fog">
                  <span>{course.weeks}</span>
                  <span className="font-mono">{course.level}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
