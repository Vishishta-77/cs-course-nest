import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSleepEntries } from "@/lib/sleep.functions";
import { formatDuration, formatShortDate, localDateString, qualityLabel } from "@/lib/sleep";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Moon,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/history")({
  head: () => ({
    meta: [
      { title: "History — Sleep Tracker" },
      { name: "description", content: "Review your sleep history month by month." },
    ],
  }),
  component: History,
});

function History() {
  const [monthOffset, setMonthOffset] = useState(0);

  const { from, to, label } = useMemo(() => {
    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
    const start = new Date(target.getFullYear(), target.getMonth(), 1);
    const end = new Date(target.getFullYear(), target.getMonth() + 1, 0);
    return {
      from: localDateString(start),
      to: localDateString(end),
      label: target.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
  }, [monthOffset]);

  const fetchEntries = useServerFn(getSleepEntries);
  const entriesQuery = useQuery({
    queryKey: ["sleepEntries", from, to],
    queryFn: () => fetchEntries({ data: { from, to } }),
  });

  const daysInMonth = useMemo(() => {
    const start = new Date(from + "T00:00:00");
    const count = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
    const entries = new Map(entriesQuery.data?.map((e) => [e.date, e]));
    const rows = [];
    for (let day = 1; day <= count; day++) {
      const d = new Date(start.getFullYear(), start.getMonth(), day);
      const key = localDateString(d);
      const entry = entries.get(key);
      rows.push({ day, date: key, entry });
    }
    return rows;
  }, [entriesQuery.data, from]);

  const stats = useMemo(() => {
    const entries = entriesQuery.data ?? [];
    if (!entries.length) return { avg: 0, best: 0, count: 0 };
    const total = entries.reduce((sum, e) => sum + e.duration_minutes, 0);
    const best = Math.max(...entries.map((e) => e.duration_minutes));
    return { avg: total / entries.length, best, count: entries.length };
  }, [entriesQuery.data]);

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Sleep history</h1>
          <p className="mt-2 text-fog">A month-by-month view of your logged nights.</p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
        >
          <LayoutDashboard className="size-4" />
          Back to dashboard
        </Link>
      </div>

      <Card className="glass border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">{label}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMonthOffset((v) => v - 1)}
              aria-label="Previous month"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMonthOffset((v) => v + 1)}
              aria-label="Next month"
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium uppercase tracking-wider text-fog">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {(() => {
              const start = new Date(from + "T00:00:00");
              const offset = start.getDay();
              return Array.from({ length: offset }).map((_, i) => (
                <div key={`pad-${i}`} className="aspect-square rounded-xl" />
              ));
            })()}
            {daysInMonth.map(({ day, date, entry }) => (
              <div
                key={date}
                className={`aspect-square rounded-xl border p-2 transition-colors ${
                  entry
                    ? "border-aurora-teal/30 bg-aurora-teal/10"
                    : "border-white/8 bg-white/[0.02]"
                }`}
              >
                <div className="text-sm font-medium">{day}</div>
                {entry ? (
                  <div className="mt-1 text-[10px] leading-tight text-fog">
                    {formatDuration(entry.duration_minutes)}
                    <br />
                    {qualityLabel(entry.quality)}
                  </div>
                ) : (
                  <div className="mt-1 text-[10px] text-fog/50">—</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-fog">
              <Moon className="size-4" />
              Nights logged
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.count}</div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-normal uppercase tracking-wider text-fog">
              Average sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.avg ? formatDuration(Math.round(stats.avg)) : "—"}</div>
          </CardContent>
        </Card>
        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-normal uppercase tracking-wider text-fog">
              Longest night
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{stats.best ? formatDuration(stats.best) : "—"}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass mt-6 border-white/10">
        <CardHeader>
          <CardTitle className="text-base font-medium">Detailed entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {(entriesQuery.data ?? []).length === 0 && (
              <p className="text-sm text-fog">No entries this month.</p>
            )}
            {(entriesQuery.data ?? []).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between rounded-xl border border-white/8 px-4 py-3"
              >
                <div>
                  <div className="font-medium">{formatShortDate(entry.date)}</div>
                  {entry.notes && <div className="text-xs text-fog">{entry.notes}</div>}
                </div>
                <div className="text-right text-sm">
                  <div>{formatDuration(entry.duration_minutes)}</div>
                  <div className="text-xs text-fog">{qualityLabel(entry.quality)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
