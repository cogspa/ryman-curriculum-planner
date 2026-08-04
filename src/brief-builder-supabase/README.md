# Project Brief Builder — Supabase edition

Fill-in-the-blank creative brief tool for pLAtform. Students (or invented design
studios) complete six sections — CLIENT / PROJECT / AUDIENCE / DELIVERABLES /
SCHEDULE / SUCCESS — with a 3-sentence cap per section, a live mini Gantt drawn
from the four schedule dates, and a one-click .txt export of the brief. Filed
briefs land in a shared Master Sheet backed by Supabase, updating in realtime,
with CSV/XLSX export for the instructor.

## Setup — same process as the Critique Zone

1. **SQL (one time).** Supabase dashboard → SQL Editor → paste and run
   `supabase-schema.sql`. Expect "Success. No rows returned." This creates the
   `project_briefs` table, open RLS policies, and realtime.
   Sanity check in the browser:
   `https://<your-project-ref>.supabase.co/rest/v1/project_briefs?apikey=<anon-key>`
   → should return `[]`, not an error.

2. **Install.** From the repo root: `npm i @supabase/supabase-js xlsx`
   (supabase-js is already there from the planner/Critique Zone; xlsx is new.)

3. **Drop in the component.** Copy `src/components/ProjectBriefBuilder.jsx`
   next to `CritiqueZone.jsx`, add a route, add it to the nav — or paste
   `PROMPT.md` into your IDE agent and let it do steps 2–3.

## Netlify environment variables — do you need new ones?

**No.** The component reads the exact two vars the site already has:

```
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

Same Supabase project as the planner and Critique Zone, so nothing to add in
Netlify → Site settings → Environment variables. The new table rides on the
existing connection.

The only scenario requiring env var work: deploying this as a **separate**
Netlify site. Then copy those same two variables into the new site's settings
(and redeploy — Vite bakes env vars in at build time, so changing them requires
a fresh build).

## No env vars? Demo mode.

Without the vars the component still renders and works, session-only, with a
banner — same graceful-degrade pattern as the Critique Zone. Useful for local
dev without secrets.

## Notes

- RLS is the open classroom posture (anon read/write/delete), matching the
  Critique Zone. Anyone with the site can delete rows from the Master Sheet;
  if that becomes a problem, drop the `briefs_delete` policy in SQL and the
  ✕ buttons will simply start failing with a visible error.
- Realtime is enabled: the Master Sheet refreshes automatically when a
  student files a brief mid-class.
