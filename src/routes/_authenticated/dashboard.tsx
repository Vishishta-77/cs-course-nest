import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useServerFn } from "@tanstack/react-start";
import {
  getSleepEntries,
  upsertSleepEntry,
  deleteSleepEntry,
  getSleepGoal,
  updateSleepGoal,
} from "@/lib/sleep.functions";
import {
  formatDuration,
  formatShortDate,
  formatTimeInput,
  localDateString,
  parseTimeOnDate,
  qualityLabel,
  computeDurationMinutes,
} from "@/lib/sleep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CalendarDays, Moon, Clock, Target, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Sleep Tracker" },
      { name: "description", content: "Log and review your sleep patterns." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const queryClient = useQueryClient();
  const today = localDateString(new Date());

  const [date, setDate] = useState(today);
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [quality, setQuality] = useState(3);
  const [notes, setNotes] = useState("");

  const sevenDaysAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 6);
    return localDateString(d);
  }, []);

  const fetchEntries = useServerFn(getSleepEntries);
  const entriesQuery = useQuery({
    queryKey: ["sleepEntries", sevenDaysAgo, today],
    queryFn: () => fetchEntries({ data: { from: sevenDaysAgo, to: today } }),
  });

  const fetchGoal = useServerFn(getSleepGoal);
  const goalQuery = useQuery({
    queryKey: ["sleepGoal"],
    queryFn: () => fetchGoal({}),
  });

  const upsert = useMutation({
    mutationFn: upsertSleepEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sleepEntries"] });
      toast.success("Sleep entry saved.");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const remove = useMutation({
    mutationFn: deleteSleepEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sleepEntries"] });
      toast.success("Entry deleted.");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateGoal = useMutation({
    mutationFn: updateSleepGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sleepGoal"] });
      toast.success("Sleep goal updated.");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const chartData = useMemo(() => {
    if (!entriesQuery.data) return [];
    const map = new Map(entriesQuery.data.map((e) => [e.date, e]));
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = localDateString(d);
      const entry = map.get(key);
      out.push({
        date: key,
        label: formatShortDate(key),
        hours: entry ? entry.duration_minutes / 60 : 0,
        quality: entry?.quality ?? null,
      });
    }
    return out;
  }, [entriesQuery.data]);

  const stats = useMemo(() => {
    const entries = entriesQuery.data ?? [];
    if (!entries.length) return { avg: 0, avgQuality: 0, total: 0, goal: goalQuery.data?.target_minutes ?? 480 };
    const totalMinutes = entries.reduce((sum, e) => sum + e.duration_minutes, 0);
    const avgQuality = entries.reduce((sum, e) => sum + e.quality, 0) / entries.length;
    return {
      avg: totalMinutes / entries.length,
      avgQuality,
      total: entries.length,
      goal: goalQuery.data?.target_minutes ?? 480,
    };
  }, [entriesQuery.data, goalQuery.data]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bedtimeDate = parseTimeOnDate(bedtime, date, false);
    const wakeDate = parseTimeOnDate(wakeTime, date, true);
    const duration = computeDurationMinutes(bedtimeDate, wakeDate);

    upsert.mutate({
      data: {
        date,
        bedtime: bedtimeDate.toISOString(),
        wake_time: wakeDate.toISOString(),
        duration_minutes: duration,
        quality,
        notes: notes || undefined,
      },
    });
  };

  const goalHours = Math.floor(stats.goal / 60);

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Your sleep dashboard</h1>
          <p className="mt-2 text-fog">Log last night and see how your week is shaping up.</p>
        </div>
        <Link
          to="/history"
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/5"
        >
          <CalendarDays className="size-4" />
          View history
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <Moon className="size-5 text-aurora-teal" />
              Log sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedtime">Bedtime</Label>
                  <Input id="bedtime" type="time" value={bedtime} onChange={(e) => setBedtime(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wake">Wake time</Label>
                  <Input id="wake" type="time" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Quality: {qualityLabel(quality)}</Label>
                <Slider
                  value={[quality]}
                  onValueChange={(v) => setQuality(v[0])}
                  min={1}
                  max={5}
                  step={1}
                />
                <div className="flex justify-between text-xs text-fog">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="How did you sleep?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-aurora-teal text-ink hover:bg-aurora-teal/90"
                disabled={upsert.isPending}
              >
                {upsert.isPending ? "Saving…" : "Save entry"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="glass border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-fog">
                  <Clock className="size-4" />
                  7-day average
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{formatDuration(Math.round(stats.avg))}</div>
                <p className="mt-1 text-xs text-fog">Across {stats.total} entries</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-fog">
                  <Moon className="size-4" />
                  Avg quality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{stats.avgQuality ? stats.avgQuality.toFixed(1) : "—"}</div>
                <p className="mt-1 text-xs text-fog">{qualityLabel(Math.round(stats.avgQuality))}</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-fog">
                  <Target className="size-4" />
                  Sleep goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-semibold">{goalHours}h</div>
                <button
                  onClick={() => {
                    const next = prompt("Set your sleep goal in minutes (e.g. 480 for 8 hours):", String(stats.goal));
                    if (next) updateGoal.mutate({ data: { target_minutes: Number(next) } });
                  }}
                  className="mt-1 text-xs text-aurora-teal hover:underline"
                >
                  Edit goal
                </button>
              </CardContent>
            </Card>
          </div>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium">Last 7 nights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="label" stroke="#93a1b0" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#93a1b0"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 12]}
                      tickFormatter={(v) => `${v}h`}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        background: "#0a0e12",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "0.625rem",
                      }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#2dd4bf" }}
                      formatter={(value: number) => [`${value.toFixed(1)}h`, "Sleep" ]}
                    />
                    <ReferenceLine y={stats.goal / 60} stroke="#818cf8" strokeDasharray="4 4" />
                    <Bar dataKey="hours" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-center text-xs text-fog">Dashed line = your {goalHours}h goal</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-base font-medium">Recent entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(entriesQuery.data ?? []).slice(0, 7).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-xl border border-white/8 px-4 py-3"
                  >
                    <div>
                      <div className="font-medium">{formatShortDate(entry.date)}</div>
                      <div className="text-xs text-fog">
                        {formatDuration(entry.duration_minutes)} · {qualityLabel(entry.quality)}
                      </div>
                    </div>
                    <button
                      onClick={() => remove.mutate({ data: { id: entry.id } })}
                      className="rounded-lg p-2 text-fog transition-colors hover:bg-white/5 hover:text-red-400"
                      aria-label="Delete entry"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
                {!entriesQuery.data?.length && (
                  <p className="text-sm text-fog">No entries yet. Log your first night above.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
