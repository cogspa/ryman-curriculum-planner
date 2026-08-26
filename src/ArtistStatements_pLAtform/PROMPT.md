# IDE prompt — ArtistStatements.jsx

Paste into Cursor / Windsurf / Claude Code from the pLAtform repo root.

---

Add a new lesson page to the pLAtform curriculum site (React 18 + Vite).

1. Copy `src/components/ArtistStatements.jsx` and the folder `src/assets/artist-statements/`
   (three JPGs) from this package into the project, preserving the relative paths used by the
   three image imports at the top of the component.
2. Register a route for it under the Capstone Preparation section, e.g.
   `/capstone/artist-statements`, and add it to whatever nav/index lists the Capstone lessons
   with the label "Real Artist Statements".
3. If the site already loads IBM Plex Mono and Newsreader globally, remove the `@import url(...)`
   line inside the `CSS` template string in the component so fonts aren't fetched twice.
4. Do not restyle it — it follows the pLAtform design system (oxblood #8b3a2f, paper cream
   #f5efe1, IBM Plex Mono, Newsreader). All classes are prefixed `as-`.
5. Run the dev server and confirm: 11 slides navigate with ← →, the three images render on
   slides 4, 6 and 7, external links open in a new tab, and typing in slide 10 updates the word
   counter and survives a page reload.
