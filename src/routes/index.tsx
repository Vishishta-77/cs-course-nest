import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon, BarChart3, Target, CalendarCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sleep Tracker — Understand Your Rest" },
      {
        name: "description",
        content: "Log your sleep, track quality, set goals, and build healthier rest habits.",
      },
      {
        property: "og:title",
        content: "Sleep Tracker — Understand Your Rest",
      },
      {
        property: "og:description",
        content: "Log your sleep, track quality, set goals, and build healthier rest habits.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16">
          <div className="glass relative overflow-hidden rounded-[min(1.4vw,24px)] p-8 sm:p-12 lg:p-16">
            <div className="max-w-[42ch]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-aurora-teal">
                Rest, redefined
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-none tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Understand your sleep, one night at a time.
              </h1>
              <p className="mt-6 max-w-[48ch] text-lg text-fog text-pretty">
                Log bedtime, wake time, and quality. Track your weekly average, set a sleep goal, and build habits that help you feel better.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 rounded-full bg-aurora-teal py-2.5 pr-5 pl-5 text-sm font-semibold text-ink ring-1 ring-aurora-teal/40 transition-colors hover:bg-aurora-teal/90"
                >
                  Start tracking
                  <span className="font-mono text-xs">→</span>
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
                >
                  Create free account
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">Daily log</div>
                  <div className="mt-1 text-xs text-fog">Bedtime, wake time & quality</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">7-day chart</div>
                  <div className="mt-1 text-xs text-fog">Spot patterns quickly</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight">Monthly view</div>
                  <div className="mt-1 text-xs text-fog">Review every night</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Everything you need to sleep better
            </h2>
            <p className="mt-2 max-w-[44ch] text-sm text-fog text-pretty">
              Simple tools that help you notice what affects your rest.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="card-lift glass rounded-2xl p-7">
              <div className="grid size-10 place-items-center rounded-lg bg-aurora-teal/15 text-aurora-teal">
                <Moon className="size-5" />
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight">Log each night</h3>
              <p className="mt-3 text-sm text-fog text-pretty">
                Record bedtime, wake time, quality rating, and notes in seconds.
              </p>
            </div>
            <div className="card-lift glass rounded-2xl p-7">
              <div className="grid size-10 place-items-center rounded-lg bg-aurora-indigo/15 text-aurora-indigo">
                <BarChart3 className="size-5" />
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight">Visualize trends</h3>
              <p className="mt-3 text-sm text-fog text-pretty">
                See your week at a glance with a clear bar chart and averages.
              </p>
            </div>
            <div className="card-lift glass rounded-2xl p-7">
              <div className="grid size-10 place-items-center rounded-lg bg-aurora-green/15 text-aurora-green">
                <Target className="size-5" />
              </div>
              <h3 className="mt-4 text-xl font-medium tracking-tight">Set a goal</h3>
              <p className="mt-3 text-sm text-fog text-pretty">
                Choose your target sleep duration and compare each night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="glass relative overflow-hidden rounded-[min(1.4vw,24px)] p-10 text-center sm:p-14">
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-48 bg-aurora-indigo/10 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Ready to sleep better?
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-fog text-pretty">
              Create a free account and start logging tonight. Your data syncs across devices.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-aurora-teal py-2.5 pr-5 pl-5 text-sm font-semibold text-ink ring-1 ring-aurora-teal/40 transition-colors hover:bg-aurora-teal/90"
              >
                Get started
                <span className="font-mono text-xs">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
