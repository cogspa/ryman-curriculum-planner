-- ============================================================
-- pLAtform — PROJECT BRIEF BUILDER · Supabase schema
-- Run ONCE in the SQL Editor of your existing Supabase project
-- (the same project that powers the planner + Critique Zone).
-- Safe to re-run: everything is IF NOT EXISTS / OR REPLACE.
-- ============================================================

create table if not exists public.project_briefs (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  identity_type text not null default 'studio',   -- 'studio' | 'student'
  name          text not null,
  client        text not null,
  project       text not null,
  audience      text not null,
  deliverables  text not null,
  success       text not null,
  brief_due     date,
  thumbs_due    date,
  comp_due      date,
  final_due     date
);

-- Row Level Security: open classroom policy, same posture as the
-- Critique Zone (anon key can read / write / delete).
alter table public.project_briefs enable row level security;

drop policy if exists "briefs_read"   on public.project_briefs;
drop policy if exists "briefs_insert" on public.project_briefs;
drop policy if exists "briefs_delete" on public.project_briefs;

create policy "briefs_read"   on public.project_briefs for select using (true);
create policy "briefs_insert" on public.project_briefs for insert with check (true);
create policy "briefs_delete" on public.project_briefs for delete using (true);

-- Realtime: master sheet updates live when a student files a brief.
do $$
begin
  alter publication supabase_realtime add table public.project_briefs;
exception
  when duplicate_object then null;
end $$;

-- Sanity check (optional): should return 0 rows, no error.
-- select * from public.project_briefs limit 1;
