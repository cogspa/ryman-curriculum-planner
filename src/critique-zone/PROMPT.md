# IDE PROMPT — Integrate Critique Zone into the pLAtform Curriculum Site

Paste this into Cursor / Windsurf / Claude Code at the repo root.

---

Integrate the Critique Zone feature into this React/Vite curriculum site.

## Files provided
- `CritiqueZone.jsx` — self-contained component (wall + upload + notes).
  Place it in `src/components/CritiqueZone.jsx`.
- `supabase-schema.sql` — already run against the Supabase project (or run it
  now via the Supabase SQL editor before testing).

## Tasks
1. Install the dependency: `npm i @supabase/supabase-js`.
2. Move `CritiqueZone.jsx` into `src/components/`.
3. Confirm `.env` contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   (same project as the curriculum planner). If they're absent, leave them
   absent — the component demo-modes gracefully — but add both keys to
   `.env.example` and note them in the Netlify env config.
4. Routing: add a top-level route `/critique` that renders `<CritiqueZone />`
   (built-in week selector, weeks=14). Follow whatever router this repo uses
   (React Router / file-based); match existing route patterns.
5. Week pages: on each week's page component, add a section at the bottom
   rendering `<CritiqueZone week={N} />` where N is that page's week number.
   If week pages are generated from a config/map, add it in one place there
   rather than per-file.
6. Navigation: add "Critique Zone" to the site nav using the existing nav
   item pattern (IBM Plex Mono label, same active-state treatment).
7. Do NOT restyle the component — it already implements the pLAtform design
   system (oxblood #8b3a2f, cream #f5efe1, IBM Plex Mono, Newsreader). Only
   adjust the outer page wrapper if the site layout requires it.
8. Verify: `npm run dev`, open `/critique`, pin a test image, open it, leave
   a note, confirm the note chip increments. Then check a week page renders
   its locked-week wall. Test at 375px width.

## Constraints
- No new global CSS; the component injects its own scoped styles.
- Keep the component self-contained — no extraction into multiple files.
- Escape/keyboard behavior and reduced-motion handling are already inside;
  don't wrap the overlays in another modal system.
