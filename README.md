# Curriculum Planner

A 12-week visual curriculum planner with persistent notes — Tuesdays + Saturdays, editorial paper aesthetic.

## Setup

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Customize the curriculum

All program content lives in **`src/curriculum.js`**.

```js
export const config = {
  startDate: '2026-06-23',  // First Tuesday
  endDate:   '2026-09-12',
  tuesday:   { time: '7:00–9:00 pm', location: 'Zoom' },
  saturday:  { time: '10:00 am–3:30 pm', location: 'Reveal Studio' },
};

export const curriculum = [
  {
    week: 1,
    title: 'Foundations of …',
    overview: 'Short paragraph describing the week.',
    topics: ['Topic A', 'Topic B'],
    readings: ['Author — Title (ch. 1–3)'],
    assignments: ['First exercise due Saturday'],
  },
  // ... 12 entries
];
```

Empty arrays/strings auto-hide — only populated sections render in the card.

## Notes persistence

Notes save automatically to `localStorage` on the browser you're using. They survive refreshes and rebuilds. To wipe a single week, clear its textarea. To wipe everything, run in DevTools:

```js
Object.keys(localStorage).filter(k => k.startsWith('cp-v1-notes-')).forEach(k => localStorage.removeItem(k));
```

## Deploy

```bash
npm run build
```

Drop the `dist/` folder on Vercel, Netlify, Cloudflare Pages, or any static host.

## Stack

- Vite + React 18
- No CSS framework — single hand-written stylesheet (`src/index.css`)
- Fraunces (display) + Geist (sans) + Geist Mono — all from Google Fonts

## Structure

```
src/
├── App.jsx          ← layout, date math, components
├── curriculum.js    ← all editable content
├── index.css        ← styles
└── main.jsx         ← entry
```
