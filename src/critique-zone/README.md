# Critique Zone — pLAtform Curriculum

A per-week studio crit wall for the Ryman Curriculum site. Students pin work
(image upload) to a homasote-style board; classmates leave signed notes; the
wall endless-scrolls. Realtime, so pins and notes appear live during class.

Design system: oxblood `#8b3a2f` · paper cream `#f5efe1` · IBM Plex Mono ·
Newsreader. Matches all existing pLAtform components.

## Files

| File | Purpose |
|---|---|
| `CritiqueZone.jsx` | The whole feature — wall, upload sheet, note thread |
| `supabase-schema.sql` | Tables, RLS, storage bucket, realtime (run once) |
| `PROMPT.md` | IDE-ready prompt for Cursor / Windsurf / Claude Code |

## Install

```bash
npm i @supabase/supabase-js
```

Drop `CritiqueZone.jsx` into `src/components/`.

## Backend (5 minutes)

1. Open your Supabase project (the planner's project works fine).
2. SQL Editor → paste `supabase-schema.sql` → Run.
3. Add to `.env` (and Netlify env vars):

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

No env vars set? The component runs in **demo mode** — fully interactive,
session-only, with a banner — so you can style-check before wiring anything.

## Usage

```jsx
import CritiqueZone from "./components/CritiqueZone";

// Standalone page with its own week selector (WK 01–14):
<CritiqueZone />

// Embedded on a week page, locked to that week:
<CritiqueZone week={4} />

// Custom heading:
<CritiqueZone week={4} title="Composition Crit — Screen-Based Media" />
```

## How it behaves

- **Endless scroll** — 12 pins per page, loaded 600px before the sentinel
  enters view; deduped; "END OF WALL" marker when exhausted.
- **Uploads** — drag-drop or click; client-side resize to 1600px longest
  edge, JPEG 85%, so student phone photos don't blow up storage.
- **Names** — remembered in `localStorage` (`cz-name`) so students type it once.
- **Notes** — signed, 600-char max, Cmd/Ctrl+Enter to send. Note counts show
  on each pin's chip and update live.
- **Realtime** — new pins prepend to the wall; new notes appear in open
  threads; both via Supabase channels.
- **Moderation** — clients can only read + insert (RLS). Remove anything from
  the Supabase dashboard: delete the row in `critique_pins` (notes cascade),
  then the file in Storage → `critique-uploads`.
- **Accessibility** — keyboard-operable cards and dialogs, Escape closes
  overlays, visible focus rings, `prefers-reduced-motion` respected.

## Classroom notes

The empty state and placeholder copy nudge crit etiquette ("name one thing
that's working before anything else", "specific beats nice") — tune those
strings to your own crit protocol; they're plain text near the top of each
subcomponent.

Week range defaults to 14 (`weeks` prop) to match the pLAtform semester.
