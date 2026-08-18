# Repomix: Ryman Curriculum Planner — Notes Feature

This document packages all files, components, state management, persistence layers, cloud sync logic, and styling responsible for the **"Your Notes"** feature shown on the curriculum week cards.

---

## Table of Contents
1. [Overview & Architecture](#1-overview--architecture)
2. [UI & React Component Implementation (`src/App.jsx`)](#2-ui--react-component-implementation)
3. [Persistence & LocalStorage Layer (`src/App.jsx`)](#3-persistence--localstorage-layer)
4. [Cloud Sync & Supabase Integration (`src/App.jsx` & `src/supabaseClient.js`)](#4-cloud-sync--supabase-integration)
5. [Database Schema (`notes` table)](#5-database-schema)
6. [Styling & CSS Tokens (`src/index.css`)](#6-styling--css-tokens)

---

## 1. Overview & Architecture

The **"Your Notes"** section sits at the bottom of each week card on the main curriculum grid.
It allows students and instructors to write notes, prep materials, reflections, reference links, and assignment drafting.

### Key Behaviors:
- **Instant Local Autosave**: Debounced (800ms) save to browser `localStorage` using a versioned prefix `cp-v${config.storageVersion}-notes-week-${weekNum}`.
- **Bi-directional Cloud Sync**: When connected to Supabase, it loads remote notes on mount and syncs updates to the PostgreSQL `notes` table with upserts (`week_number`, `content`).
- **Live Sync Indicators**: Displays visual status feedback (`"connecting..."`, `"syncing..."`, `"cloud saved"`, `"offline — saved locally"`, `"local save"`).
- **Graceful Fallback**: If Supabase is unconfigured or offline, notes work 100% locally with zero errors.

---

## 2. UI & React Component Implementation

From `src/App.jsx` (inside `WeekCard` component, lines 1350–1367):

```jsx
      {/* ─── Notes Section ─── */}
      <div className="notes-wrap">
        <label className="notes-label" htmlFor={`notes-${week.week}`}>
          Your notes
        </label>
        <textarea
          id={`notes-${week.week}`}
          className="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Prep, reflections, references, links…"
          rows={6}
        />
        <div className="save-row">
          {syncStatus ? (
            <span className="saved">{syncStatus}</span>
          ) : savedAt ? (
            <span className="saved">local save</span>
          ) : null}
        </div>
      </div>
```

---

## 3. Persistence & LocalStorage Layer

From `src/App.jsx` (lines 85–100):

```javascript
// ─── Local Persistence ─────────────────────────────────────────────────────────────

const STORAGE_PREFIX = `cp-v${config.storageVersion}-notes-week-`;

export function loadNote(weekNum) {
  try {
    return localStorage.getItem(STORAGE_PREFIX + weekNum) || '';
  } catch {
    return '';
  }
}

export function saveNote(weekNum, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + weekNum, value);
  } catch {}
}
```

---

## 4. Cloud Sync & Supabase Integration

### A. Supabase Client (`src/supabaseClient.js`)

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http://') || url.startsWith('https://');
};

let client = null;

if (isValidUrl(supabaseUrl) && supabaseKey) {
  try {
    client = createClient(supabaseUrl, supabaseKey);
  } catch (e) {
    console.warn('[SupabaseClient] Initialization failed, falling back to local mode:', e);
    client = null;
  }
}

export const supabase = client;
```

### B. React Hooks for Cloud Loading & Debounced Sync (`src/App.jsx`, lines 659–708)

```javascript
function WeekCard({ week, ...props }) {
  // Initialize from localStorage first for instant rendering
  const [notes, setNotes] = useState(() => loadNote(week.week));
  const [savedAt, setSavedAt] = useState(null);
  const [syncStatus, setSyncStatus] = useState(supabase ? 'connecting...' : null);

  // 1. Fetch initial notes from Supabase on mount
  useEffect(() => {
    if (!supabase) return;
    let isMounted = true;
    supabase
      .from('notes')
      .select('content')
      .eq('week_number', week.week)
      .single()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (data && !error && data.content !== undefined) {
          setNotes(data.content || '');
          saveNote(week.week, data.content || '');
        }
        setSyncStatus(null);
      })
      .catch(() => {
        if (isMounted) setSyncStatus(null);
      });
    return () => { isMounted = false; };
  }, [week.week]);

  // 2. Debounced save (800ms) to LocalStorage and Supabase upsert
  useEffect(() => {
    const t = setTimeout(async () => {
      // Always save locally first
      saveNote(week.week, notes);
      setSavedAt(Date.now());
      
      // Then sync to Supabase if connected
      if (supabase) {
        try {
          setSyncStatus('syncing...');
          const { error } = await supabase
            .from('notes')
            .upsert(
              { week_number: week.week, content: notes },
              { onConflict: 'week_number' }
            );
          setSyncStatus(error ? 'sync error — saved locally' : 'cloud saved');
        } catch {
          setSyncStatus('offline — saved locally');
        }
        setTimeout(() => setSyncStatus(null), 2500);
      }
    }, 800);

    return () => clearTimeout(t);
  }, [notes, week.week]);

  // ... rest of WeekCard JSX
}
```

---

## 5. Database Schema

The SQL definition for the `notes` table in Supabase PostgreSQL:

```sql
CREATE TABLE IF NOT EXISTS public.notes (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  week_number INTEGER NOT NULL UNIQUE,
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and public read/write policy for classroom collaboration
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on notes"
  ON public.notes FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert/update on notes"
  ON public.notes FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

## 6. Styling & CSS Tokens (`src/index.css`)

From `src/index.css` (lines 522–578):

```css
/* ─── Notes Styles ─── */

.notes-wrap {
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed var(--hairline, rgba(43, 38, 34, 0.15));
}

.notes-label {
  display: block;
  font-family: var(--font-mono, Menlo, monospace);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-mute, #8c827a);
  margin-bottom: 6px;
}

.notes {
  width: 100%;
  background: transparent;
  border: 1px solid var(--hairline, rgba(43, 38, 34, 0.15));
  border-radius: 4px;
  padding: 10px 12px;
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 13px;
  line-height: 1.55;
  color: var(--ink, #2b2622);
  resize: vertical;
  min-height: 96px;
  transition: border-color 150ms ease, background 150ms ease;
}

.notes::placeholder { 
  color: var(--ink-mute, #8c827a); 
}

.notes:focus {
  outline: none;
  border-color: var(--accent, #8b3a2f);
  background: rgba(168, 72, 42, 0.02);
}

.save-row {
  height: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 4px;
}

.saved {
  font-family: var(--font-mono, Menlo, monospace);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink-mute, #8c827a);
  animation: fadeInOut 1600ms ease;
}

@keyframes fadeInOut {
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}
```
