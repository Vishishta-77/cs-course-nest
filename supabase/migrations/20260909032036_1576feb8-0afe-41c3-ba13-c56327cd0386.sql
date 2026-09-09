CREATE TABLE public.sleep_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  bedtime timestamptz NOT NULL,
  wake_time timestamptz NOT NULL,
  duration_minutes integer NOT NULL,
  quality smallint NOT NULL CHECK (quality BETWEEN 1 AND 5),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

CREATE TABLE public.sleep_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_minutes integer NOT NULL DEFAULT 480,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sleep_entries TO authenticated;
GRANT ALL ON public.sleep_entries TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.sleep_goals TO authenticated;
GRANT ALL ON public.sleep_goals TO service_role;

ALTER TABLE public.sleep_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sleep entries"
  ON public.sleep_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own sleep goals"
  ON public.sleep_goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_sleep_entries_updated_at
  BEFORE UPDATE ON public.sleep_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sleep_goals_updated_at
  BEFORE UPDATE ON public.sleep_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
