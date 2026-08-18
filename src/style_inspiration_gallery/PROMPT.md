# IDE PROMPT — integrate FilmReferenceGallery into pLAtform

Paste into Cursor / Windsurf / Claude Code from the repo root of the pLAtform
React/Vite curriculum site, with this ZIP's contents extracted somewhere
reachable (e.g. `~/Downloads/gallery/`).

---

Integrate a new curriculum component called **FilmReferenceGallery** (an
"Independent Animation: Essential Short Films" screening reference gallery).

1. Copy `FilmReferenceGallery.jsx` into `src/components/`.
2. Copy the `assets/` folder (3 jpg thumbnails) to
   `src/components/assets/` — the component imports them via relative paths
   (`./assets/thumb-local-1.jpg` etc.), so keep them adjacent.
3. Add a route/page for it following the same pattern as the other lesson
   components (e.g. SwatchForge, MirrorLab, SilhouetteSymmetry):
   - Route path suggestion: `/references/animation-shorts`
   - Nav label: "Film References" or "Animation Shorts" under the references/
     screening section of the curriculum nav.
4. The component is fully self-contained (data array, scoped `<style>` block
   under a `.frg` root class, no props, no deps beyond React). Do not extract
   the CSS into global stylesheets.
5. If the site already loads IBM Plex Mono and Newsreader globally, delete the
   Google Fonts `@import` line at the top of the `css` template string in the
   component to avoid a duplicate font request.
6. Verify: era filter buttons (All / 1960s–70s / 1980s / 1990s–2000s /
   Collections) toggle the grid and update the "N references" count; every
   thumbnail and link chip opens in a new tab; the Houndstooth card renders as
   the gradient "channel" variant with no image; layout is 3-col → 2-col at
   900px → 1-col at 600px.
7. Run the dev server and confirm no console errors and no style bleed into
   surrounding pages (all selectors are `.frg`-scoped).
