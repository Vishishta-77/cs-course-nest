import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const sleepEntrySchema = z.object({
  id: z.string().uuid().optional(),
  date: z.string().date(),
  bedtime: z.string().datetime(),
  wake_time: z.string().datetime(),
  duration_minutes: z.number().int().min(0).max(1440),
  quality: z.number().int().min(1).max(5),
  notes: z.string().max(500).optional(),
});

const dateRangeSchema = z.object({
  from: z.string().date(),
  to: z.string().date(),
});

export const getSleepEntries = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => dateRangeSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase
      .from("sleep_entries")
      .select("*")
      .eq("user_id", context.userId)
      .gte("date", data.from)
      .lte("date", data.to)
      .order("date", { ascending: false });

    if (error) throw error;
    return rows ?? [];
  });

export const upsertSleepEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => sleepEntrySchema.parse(input))
  .handler(async ({ data, context }) => {
    const payload = {
      user_id: context.userId,
      date: data.date,
      bedtime: data.bedtime,
      wake_time: data.wake_time,
      duration_minutes: data.duration_minutes,
      quality: data.quality,
      notes: data.notes ?? null,
    };

    const { data: row, error } = await context.supabase
      .from("sleep_entries")
      .upsert(payload, { onConflict: "user_id,date" })
      .select()
      .single();

    if (error) throw error;
    return row;
  });

export const deleteSleepEntry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("sleep_entries")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId);

    if (error) throw error;
    return { ok: true };
  });

export const getSleepGoal = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: row, error } = await context.supabase
      .from("sleep_goals")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();

    if (error) throw error;
    return row ?? { target_minutes: 480 };
  });

export const updateSleepGoal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ target_minutes: z.number().int().min(60).max(1440) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("sleep_goals")
      .upsert(
        { user_id: context.userId, target_minutes: data.target_minutes },
        { onConflict: "user_id" },
      )
      .select()
      .single();

    if (error) throw error;
    return row;
  });
