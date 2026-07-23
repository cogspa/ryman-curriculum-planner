-- ============================================================================
-- Critique Zone — Supabase schema
-- pLAtform Curriculum · Ryman Arts
-- Run once in the Supabase SQL Editor (same project as the planner is fine).
-- ============================================================================

-- ---------------------------------------------------------------- tables
create table if not exists public.critique_pins (
  id          uuid primary key default gen_random_uuid(),
  week        int  not null check (week between 1 and 52),
  author      text not null check (char_length(author) between 1 and 40),
  title       text default '' check (char_length(title) <= 80),
  image_path  text not null,
  image_url   text not null,
  width       int,
  height      int,
  created_at  timestamptz not null default now()
);

create table if not exists public.critique_notes (
  id          uuid primary key default gen_random_uuid(),
  pin_id      uuid not null references public.critique_pins(id) on delete cascade,
  author      text not null check (char_length(author) between 1 and 40),
  body        text not null check (char_length(body) between 1 and 600),
  created_at  timestamptz not null default now()
);

create index if not exists critique_pins_week_created
  on public.critique_pins (week, created_at desc);
create index if not exists critique_notes_pin
  on public.critique_notes (pin_id, created_at);

-- ---------------------------------------------------------------- RLS
-- Classroom model: anyone with the anon key (i.e., the class site) can read
-- and add; nobody can edit or delete through the client. Moderation happens
-- in the Supabase dashboard (delete rows / storage objects there).
alter table public.critique_pins  enable row level security;
alter table public.critique_notes enable row level security;

drop policy if exists "pins readable by all"   on public.critique_pins;
drop policy if exists "pins insertable by all" on public.critique_pins;
drop policy if exists "notes readable by all"   on public.critique_notes;
drop policy if exists "notes insertable by all" on public.critique_notes;

create policy "pins readable by all"
  on public.critique_pins for select using (true);
create policy "pins insertable by all"
  on public.critique_pins for insert with check (true);

create policy "notes readable by all"
  on public.critique_notes for select using (true);
create policy "notes insertable by all"
  on public.critique_notes for insert with check (true);

-- ---------------------------------------------------------------- storage
insert into storage.buckets (id, name, public)
values ('critique-uploads', 'critique-uploads', true)
on conflict (id) do nothing;

drop policy if exists "critique uploads readable" on storage.objects;
drop policy if exists "critique uploads writable" on storage.objects;

create policy "critique uploads readable"
  on storage.objects for select
  using (bucket_id = 'critique-uploads');

create policy "critique uploads writable"
  on storage.objects for insert
  with check (bucket_id = 'critique-uploads');

-- ---------------------------------------------------------------- realtime
-- Enables live pin/note pushes to the wall.
alter publication supabase_realtime add table public.critique_pins;
alter publication supabase_realtime add table public.critique_notes;

-- ---------------------------------------------------------------- optional: instructor cleanup helpers
-- Delete a pin (cascades notes). Run from the SQL editor / service role:
--   delete from public.critique_pins where id = '...';
--   -- then remove the file in Storage > critique-uploads if desired.
