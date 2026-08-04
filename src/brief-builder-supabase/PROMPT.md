# PROMPT.md — Project Brief Builder integration
# Paste this into Cursor / Windsurf / Claude Code from the repo root.

Integrate the Project Brief Builder into the pLAtform curriculum site (React/Vite).

## Files in this package
- `src/components/ProjectBriefBuilder.jsx` — the complete component (self-styled, pLAtform design system, no CSS imports needed)
- `supabase-schema.sql` — one-time database setup (I run this manually, not you)

## Your tasks
1. Copy `src/components/ProjectBriefBuilder.jsx` into the project's components directory (match wherever `CritiqueZone.jsx` lives).
2. Install dependencies if not already present:
   ```
   npm i @supabase/supabase-js xlsx
   ```
   Note: `@supabase/supabase-js` is likely already installed (the planner and Critique Zone use it). `xlsx` may be new.
3. Add a route/page for the tool (match the existing routing pattern in the repo), e.g. `/brief-builder`, rendering `<ProjectBriefBuilder />`. Add it to the site nav where the other tools are listed.
4. Do NOT create or modify any `.env` files. The component reads the same env vars the Critique Zone already uses:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   If they exist, the tool goes live automatically. If they don't, it runs in demo mode with a banner — that is expected behavior, not a bug.
5. Verify the build passes (`npm run build`).

## What NOT to do
- Don't touch Supabase credentials or Netlify config.
- Don't restyle the component — it ships in the pLAtform design system (oxblood #8b3a2f, cream #f5efe1, IBM Plex Mono, Newsreader).
- Don't add global CSS; all styles are scoped under the `.pbb` class inside the component.

## Manual step (human only — do not attempt)
The database table must be created by hand:
1. Open the Supabase dashboard → SQL Editor (same project as the Critique Zone).
2. Paste and run `supabase-schema.sql`. Expect "Success. No rows returned."
3. Done. No new env vars, no new bucket, no Netlify changes.
