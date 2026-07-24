// ============================================================================
// CritiqueZone.jsx — pLAtform Curriculum · Ryman Arts
// ----------------------------------------------------------------------------
// A per-week studio crit wall. Students pin work (image upload), classmates
// leave notes. Endless scroll, realtime updates, pLAtform design system.
//
// USAGE
//   <CritiqueZone />                 // built-in week selector (WK 01–14)
//   <CritiqueZone week={4} />        // locked to a week page (no selector)
//   <CritiqueZone week={4} weeks={14} title="Composition Crit" />
//
// BACKEND
//   Supabase (same stack as the planner). Set env vars in .env:
//     VITE_SUPABASE_URL=...
//     VITE_SUPABASE_ANON_KEY=...
//   Run supabase-schema.sql once (tables + storage bucket + realtime).
//   No env vars? Component runs in DEMO MODE (session-only, banner shown).
//
// DEPENDENCIES
//   npm i @supabase/supabase-js     (only imported if env vars exist)
// ============================================================================

import React, {
  useCallback, useEffect, useRef, useState,
} from "react";

// ---------------------------------------------------------------- design tokens
const T = {
  oxblood: "#8b3a2f",
  oxbloodDeep: "#6e2d24",
  cream: "#f5efe1",
  paper: "#faf6ec",
  board: "#d9d0bd",          // homasote pin-board tone
  boardLine: "#c9bfa9",
  ink: "#2b2320",
  inkSoft: "#5c5248",
  mono: "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace",
  serif: "'Newsreader', 'Iowan Old Style', Georgia, serif",
};

const PAGE_SIZE = 12;
const BUCKET = "critique-uploads";
const MAX_EDGE = 1600;          // client-side resize longest edge
const JPEG_Q = 0.85;

// ---------------------------------------------------------------- supabase (lazy)
let _sb = null;
let _sbTried = false;

async function getSupabase() {
  if (_sbTried) return _sb;
  _sbTried = true;
  const url = import.meta.env?.VITE_SUPABASE_URL;
  const key = import.meta.env?.VITE_SUPABASE_ANON_KEY;
  if (!url || !key || typeof url !== 'string' || (!url.startsWith('http://') && !url.startsWith('https://'))) {
    return null;
  }
  try {
    const { createClient } = await import("@supabase/supabase-js");
    _sb = createClient(url, key);
  } catch (e) {
    console.warn("[CritiqueZone] Supabase client init failed — falling back to demo mode.", e);
    _sb = null;
  }
  return _sb;
}

// ---------------------------------------------------------------- demo store
// Session-only fallback so the component renders before backend setup.
const demoStore = { pins: [], notes: {} };

// ---------------------------------------------------------------- utils
const uid = () =>
  (crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random()}`);

function hashRotation(id) {
  // deterministic tilt per pin, -2.4deg … 2.4deg
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return ((h % 480) / 100 - 2.4).toFixed(2);
}

function timeAgo(iso) {
  const s = Math.max(1, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

async function resizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d").drawImage(bitmap, 0, 0, w, h);
  const blob = await new Promise((res) =>
    canvas.toBlob(res, "image/jpeg", JPEG_Q));
  return { blob, w, h };
}

// ---------------------------------------------------------------- data layer
async function fetchPins({ week, offset }) {
  const sb = await getSupabase();
  if (!sb) {
    const rows = demoStore.pins
      .filter((p) => p.week === week)
      .slice(offset, offset + PAGE_SIZE);
    return { rows, demo: true };
  }
  const { data, error } = await sb
    .from("critique_pins")
    .select("*, critique_notes(count)")
    .eq("week", week)
    .order("created_at", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);
  if (error) throw error;
  return {
    rows: data.map((r) => ({
      ...r,
      note_count: r.critique_notes?.[0]?.count ?? 0,
    })),
    demo: false,
  };
}

async function createPin({ week, author, title, file }) {
  const { blob, w, h } = await resizeImage(file);
  const sb = await getSupabase();
  const id = uid();
  if (!sb) {
    const pin = {
      id, week, author, title,
      image_url: URL.createObjectURL(blob),
      width: w, height: h,
      note_count: 0,
      created_at: new Date().toISOString(),
    };
    demoStore.pins.unshift(pin);
    return pin;
  }
  const path = `wk${String(week).padStart(2, "0")}/${id}.jpg`;
  const { error: upErr } = await sb.storage
    .from(BUCKET)
    .upload(path, blob, { contentType: "image/jpeg" });
  if (upErr) throw upErr;
  const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(path);
  const row = {
    id, week, author, title,
    image_path: path,
    image_url: pub.publicUrl,
    width: w, height: h,
  };
  const { data, error } = await sb
    .from("critique_pins").insert(row).select().single();
  if (error) throw error;
  return { ...data, note_count: 0 };
}

async function fetchNotes(pinId) {
  const sb = await getSupabase();
  if (!sb) return demoStore.notes[pinId] ?? [];
  const { data, error } = await sb
    .from("critique_notes")
    .select("*")
    .eq("pin_id", pinId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

async function createNote({ pinId, author, body }) {
  const sb = await getSupabase();
  const note = {
    id: uid(), pin_id: pinId, author, body,
    created_at: new Date().toISOString(),
  };
  if (!sb) {
    (demoStore.notes[pinId] ??= []).push(note);
    const p = demoStore.pins.find((x) => x.id === pinId);
    if (p) p.note_count += 1;
    return note;
  }
  const { data, error } = await sb
    .from("critique_notes")
    .insert({ id: note.id, pin_id: pinId, author, body })
    .select().single();
  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------- root component
export default function CritiqueZone({
  week: lockedWeek = null,
  weeks = 14,
  title = "Critique Zone",
}) {
  const [week, setWeek] = useState(lockedWeek ?? 1);
  const [pins, setPins] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [demo, setDemo] = useState(false);
  const [openPin, setOpenPin] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [err, setErr] = useState(null);
  const sentinelRef = useRef(null);
  const offsetRef = useRef(0);
  const loadingRef = useRef(false);
  const weekRef = useRef(week);
  weekRef.current = week;

  const loadPage = useCallback(async (reset = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    setErr(null);
    const w = weekRef.current;
    const offset = reset ? 0 : offsetRef.current;
    try {
      const { rows, demo: isDemo } = await fetchPins({ week: w, offset });
      setDemo(isDemo);
      setPins((prev) => {
        const base = reset ? [] : prev;
        const seen = new Set(base.map((p) => p.id));
        return [...base, ...rows.filter((r) => !seen.has(r.id))];
      });
      offsetRef.current = offset + rows.length;
      setHasMore(rows.length === PAGE_SIZE);
    } catch (e) {
      console.error(e);
      setErr("Couldn't load the wall. Check your connection and reload.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // week change → reset wall
  useEffect(() => {
    offsetRef.current = 0;
    setPins([]);
    setHasMore(true);
    loadPage(true);
  }, [week, loadPage]);

  // endless scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          loadPage();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadPage]);

  // realtime: new pins for current week + note counts
  useEffect(() => {
    let channel;
    (async () => {
      const sb = await getSupabase();
      if (!sb) return;
      channel = sb
        .channel(`crit-wk-${week}`)
        .on("postgres_changes",
          { event: "INSERT", schema: "public", table: "critique_pins",
            filter: `week=eq.${week}` },
          (payload) => {
            setPins((prev) =>
              prev.some((p) => p.id === payload.new.id)
                ? prev
                : [{ ...payload.new, note_count: 0 }, ...prev]);
            offsetRef.current += 1;
          })
        .on("postgres_changes",
          { event: "INSERT", schema: "public", table: "critique_notes" },
          (payload) => {
            setPins((prev) => prev.map((p) =>
              p.id === payload.new.pin_id
                ? { ...p, note_count: (p.note_count ?? 0) + 1 }
                : p));
          })
        .subscribe();
    })();
    return () => { channel?.unsubscribe(); };
  }, [week]);

  const handlePinned = (pin) => {
    setPins((prev) =>
      prev.some((p) => p.id === pin.id) ? prev : [pin, ...prev]);
    offsetRef.current += 1;
    setUploadOpen(false);
  };

  const weekLabel = `WK ${String(week).padStart(2, "0")}`;

  return (
    <section style={S.zone}>
      <StyleTag />

      <header style={S.header}>
        <div>
          <div style={S.eyebrow}>pLAtform · Studio Wall · {weekLabel}</div>
          <h2 style={S.title}>{title}</h2>
          <p style={S.subtitle}>
            Pin your work. Walk the wall. Leave a note — what's working,
            what to push, one specific suggestion.
          </p>
        </div>
        <div style={S.headerRight}>
          {lockedWeek === null && (
            <label style={S.weekPickWrap}>
              <span style={S.weekPickLabel}>WEEK</span>
              <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                style={S.weekPick}
                aria-label="Select week"
              >
                {Array.from({ length: weeks }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button
            style={S.pinBtn}
            className="cz-pinbtn"
            onClick={() => setUploadOpen(true)}
          >
            + PIN YOUR WORK
          </button>
        </div>
      </header>

      {demo && (
        <div style={S.demoBanner}>
          DEMO MODE — no Supabase credentials found. Pins live for this
          session only. See README to connect the backend.
        </div>
      )}
      {err && <div style={S.errBanner}>{err}</div>}

      <div style={S.wall}>
        {pins.length === 0 && !loading ? (
          <div style={S.empty}>
            <div style={S.emptyPinDot} />
            <p style={S.emptyLede}>The wall is empty.</p>
            <p style={S.emptyBody}>
              Be the first to pin — everyone crits braver once one piece
              is up.
            </p>
          </div>
        ) : (
          <div style={S.columns}>
            {pins.map((pin) => (
              <PinCard key={pin.id} pin={pin} onOpen={() => setOpenPin(pin)} />
            ))}
          </div>
        )}
        <div ref={sentinelRef} style={{ height: 1 }} />
        {loading && <div style={S.loading}>LOADING THE WALL…</div>}
        {!hasMore && pins.length > 0 && (
          <div style={S.endMark}>— END OF WALL · {weekLabel} —</div>
        )}
      </div>

      {uploadOpen && (
        <UploadSheet
          week={week}
          onClose={() => setUploadOpen(false)}
          onPinned={handlePinned}
        />
      )}
      {openPin && (
        <PinDetail pin={openPin} onClose={() => setOpenPin(null)} />
      )}
    </section>
  );
}

// ---------------------------------------------------------------- pin card
function PinCard({ pin, onOpen }) {
  const rot = hashRotation(pin.id);
  return (
    <figure
      className="cz-card"
      style={{ ...S.card, "--rot": `${rot}deg` }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      aria-label={`Open ${pin.title || "untitled"} by ${pin.author}`}
    >
      <span style={S.pushpin} aria-hidden="true" />
      <img
        src={pin.image_url}
        alt={pin.title || `Work by ${pin.author}`}
        style={S.cardImg}
        loading="lazy"
      />
      <figcaption style={S.cardCap}>
        <div style={S.capText}>
          <span style={S.capTitle}>{pin.title || "Untitled"}</span>
          <span style={S.capAuthor}>{pin.author}</span>
        </div>
        <span style={S.noteChip}>
          {pin.note_count ?? 0} NOTE{(pin.note_count ?? 0) === 1 ? "" : "S"}
        </span>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------- upload sheet
function UploadSheet({ week, onClose, onPinned }) {
  const [author, setAuthor] = useState(
    () => localStorage.getItem("cz-name") ?? "");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [err, setErr] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const takeFile = (f) => {
    if (!f || !f.type.startsWith("image/")) {
      setErr("That file isn't an image. Pin a JPG, PNG, or WebP.");
      return;
    }
    setErr(null);
    setFile(f);
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(f);
    });
  };

  const submit = async () => {
    if (!author.trim()) { setErr("Add your name so the class knows whose work this is."); return; }
    if (!file) { setErr("Choose an image to pin."); return; }
    setBusy(true); setErr(null);
    try {
      localStorage.setItem("cz-name", author.trim());
      const pin = await createPin({
        week, author: author.trim(),
        title: title.trim(), file,
      });
      onPinned(pin);
    } catch (e) {
      console.error(e);
      setErr("Upload didn't go through. Check your connection and try again.");
      setBusy(false);
    }
  };

  return (
    <Overlay onClose={onClose} label="Pin your work">
      <div style={S.sheet}>
        <div style={S.sheetHead}>
          <span style={S.eyebrow}>WK {String(week).padStart(2, "0")} · NEW PIN</span>
          <button style={S.xBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div
          style={{ ...S.dropZone, ...(drag ? S.dropZoneActive : null) }}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault(); setDrag(false);
            takeFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          role="button" tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview of your upload" style={S.dropPreview} />
          ) : (
            <>
              <div style={S.dropGlyph}>⌖</div>
              <div style={S.dropLede}>Drop your image here</div>
              <div style={S.dropSub}>or click to browse · resized to {MAX_EDGE}px on upload</div>
            </>
          )}
          <input
            ref={inputRef} type="file" accept="image/*" hidden
            onChange={(e) => takeFile(e.target.files?.[0])}
          />
        </div>

        <label style={S.fieldLabel}>
          YOUR NAME
          <input
            style={S.field} value={author} maxLength={40}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="First name + last initial"
          />
        </label>
        <label style={S.fieldLabel}>
          TITLE <span style={S.opt}>(optional)</span>
          <input
            style={S.field} value={title} maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Notan study 03 — harbor at dusk"
          />
        </label>

        {err && <div style={S.errInline}>{err}</div>}

        <button
          style={{ ...S.pinBtn, width: "100%", opacity: busy ? 0.6 : 1 }}
          className="cz-pinbtn"
          disabled={busy}
          onClick={submit}
        >
          {busy ? "PINNING…" : "PIN TO THE WALL"}
        </button>
      </div>
    </Overlay>
  );
}

// ---------------------------------------------------------------- pin detail + notes
function PinDetail({ pin, onClose }) {
  const [notes, setNotes] = useState(null);
  const [author, setAuthor] = useState(
    () => localStorage.getItem("cz-name") ?? "");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    let live = true;
    fetchNotes(pin.id)
      .then((n) => { if (live) setNotes(n); })
      .catch(() => { if (live) setErr("Couldn't load notes."); });
    return () => { live = false; };
  }, [pin.id]);

  // realtime notes on this pin
  useEffect(() => {
    let channel;
    (async () => {
      const sb = await getSupabase();
      if (!sb) return;
      channel = sb
        .channel(`crit-pin-${pin.id}`)
        .on("postgres_changes",
          { event: "INSERT", schema: "public", table: "critique_notes",
            filter: `pin_id=eq.${pin.id}` },
          (payload) => {
            setNotes((prev) =>
              prev?.some((n) => n.id === payload.new.id)
                ? prev
                : [...(prev ?? []), payload.new]);
          })
        .subscribe();
    })();
    return () => { channel?.unsubscribe(); };
  }, [pin.id]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [notes?.length]);

  const submit = async () => {
    if (!author.trim()) { setErr("Add your name — crit is signed here."); return; }
    if (!body.trim()) { setErr("Write the note first."); return; }
    setBusy(true); setErr(null);
    try {
      localStorage.setItem("cz-name", author.trim());
      const note = await createNote({
        pinId: pin.id, author: author.trim(), body: body.trim(),
      });
      setNotes((prev) =>
        prev?.some((n) => n.id === note.id) ? prev : [...(prev ?? []), note]);
      setBody("");
    } catch (e) {
      console.error(e);
      setErr("Note didn't send. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Overlay onClose={onClose} label={`${pin.title || "Untitled"} — critique`}>
      <div style={S.detail}>
        <div style={S.detailImgWrap}>
          <img
            src={pin.image_url}
            alt={pin.title || `Work by ${pin.author}`}
            style={S.detailImg}
          />
        </div>
        <div style={S.detailSide}>
          <div style={S.sheetHead}>
            <div>
              <div style={S.capTitleBig}>{pin.title || "Untitled"}</div>
              <div style={S.capAuthor}>
                {pin.author} · {timeAgo(pin.created_at)}
              </div>
            </div>
            <button style={S.xBtn} onClick={onClose} aria-label="Close">✕</button>
          </div>

          <div ref={listRef} style={S.noteList}>
            {notes === null ? (
              <div style={S.loading}>LOADING NOTES…</div>
            ) : notes.length === 0 ? (
              <div style={S.noteEmpty}>
                No notes yet. Open the crit: name one thing that's working
                before anything else.
              </div>
            ) : (
              notes.map((n) => (
                <div key={n.id} style={S.noteCard} className="cz-note">
                  <div style={S.noteMeta}>
                    <span style={S.noteAuthor}>{n.author}</span>
                    <span style={S.noteTime}>{timeAgo(n.created_at)}</span>
                  </div>
                  <p style={S.noteBody}>{n.body}</p>
                </div>
              ))
            )}
          </div>

          {err && <div style={S.errInline}>{err}</div>}

          <div style={S.noteForm}>
            <input
              style={S.field} value={author} maxLength={40}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              aria-label="Your name"
            />
            <textarea
              style={{ ...S.field, ...S.noteInput }}
              value={body} maxLength={600} rows={3}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Leave a note — specific beats nice."
              aria-label="Your note"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
              }}
            />
            <button
              style={{ ...S.pinBtn, opacity: busy ? 0.6 : 1 }}
              className="cz-pinbtn"
              disabled={busy}
              onClick={submit}
            >
              {busy ? "SENDING…" : "PIN NOTE"}
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

// ---------------------------------------------------------------- overlay shell
function Overlay({ children, onClose, label }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      style={S.scrim}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-label={label}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------- global css
function StyleTag() {
  return (
    <style>{`
      .cz-card { transition: transform .18s ease, box-shadow .18s ease; }
      .cz-card:hover, .cz-card:focus-visible {
        transform: rotate(0deg) translateY(-4px) !important;
        box-shadow: 0 14px 28px rgba(43,35,32,.22);
        z-index: 2;
      }
      .cz-card:focus-visible, .cz-pinbtn:focus-visible {
        outline: 2px solid ${T.oxblood}; outline-offset: 3px;
      }
      .cz-pinbtn:hover { background: ${T.oxbloodDeep}; }
      @media (prefers-reduced-motion: reduce) {
        .cz-card { transition: none; }
        .cz-card:hover { transform: none !important; }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------- styles
const S = {
  zone: {
    fontFamily: T.serif,
    color: T.ink,
    background: T.cream,
    padding: "clamp(20px, 4vw, 48px)",
  },
  header: {
    display: "flex", flexWrap: "wrap", gap: 20,
    alignItems: "flex-end", justifyContent: "space-between",
    marginBottom: 20,
  },
  eyebrow: {
    fontFamily: T.mono, fontSize: 11, letterSpacing: "0.14em",
    color: T.oxblood, textTransform: "uppercase", marginBottom: 8,
  },
  title: {
    fontFamily: T.serif, fontWeight: 500,
    fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.05, margin: 0,
  },
  subtitle: {
    maxWidth: 520, margin: "10px 0 0", fontSize: 16,
    lineHeight: 1.5, color: T.inkSoft,
  },
  headerRight: { display: "flex", gap: 12, alignItems: "center" },
  weekPickWrap: { display: "flex", alignItems: "center", gap: 8 },
  weekPickLabel: {
    fontFamily: T.mono, fontSize: 11, letterSpacing: "0.12em",
    color: T.inkSoft,
  },
  weekPick: {
    fontFamily: T.mono, fontSize: 14, padding: "10px 12px",
    background: T.paper, border: `1.5px solid ${T.ink}`,
    borderRadius: 2, color: T.ink,
  },
  pinBtn: {
    fontFamily: T.mono, fontSize: 12, letterSpacing: "0.1em",
    background: T.oxblood, color: T.cream, border: "none",
    padding: "13px 20px", borderRadius: 2, cursor: "pointer",
  },
  demoBanner: {
    fontFamily: T.mono, fontSize: 11, letterSpacing: "0.06em",
    background: "rgba(139,58,47,0.09)", border: `1px dashed ${T.oxblood}`,
    color: T.oxbloodDeep, padding: "10px 14px", marginBottom: 16,
  },
  errBanner: {
    fontFamily: T.mono, fontSize: 12, background: T.oxblood,
    color: T.cream, padding: "10px 14px", marginBottom: 16,
  },
  wall: {
    background: T.board,
    backgroundImage: `radial-gradient(${T.boardLine} 1px, transparent 1px)`,
    backgroundSize: "22px 22px",
    border: `1.5px solid ${T.ink}`,
    borderRadius: 3,
    padding: "clamp(16px, 3vw, 36px)",
    minHeight: 320,
  },
  columns: { columnWidth: 260, columnGap: 24 },
  card: {
    breakInside: "avoid",
    display: "block",
    margin: "0 0 24px",
    background: T.paper,
    padding: "10px 10px 12px",
    boxShadow: "0 6px 14px rgba(43,35,32,.16)",
    transform: "rotate(var(--rot))",
    cursor: "pointer",
    position: "relative",
    border: "1px solid rgba(43,35,32,.12)",
  },
  pushpin: {
    position: "absolute", top: -7, left: "50%", marginLeft: -7,
    width: 14, height: 14, borderRadius: "50%",
    background: `radial-gradient(circle at 35% 30%, #c4685b, ${T.oxbloodDeep} 70%)`,
    boxShadow: "0 2px 3px rgba(43,35,32,.4)",
  },
  cardImg: {
    display: "block", width: "100%", height: "auto",
    background: T.board,
  },
  cardCap: {
    display: "flex", alignItems: "flex-end", gap: 8,
    justifyContent: "space-between", paddingTop: 10,
  },
  capText: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 },
  capTitle: {
    fontFamily: T.serif, fontSize: 15, fontWeight: 500, lineHeight: 1.25,
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
  },
  capTitleBig: { fontFamily: T.serif, fontSize: 20, fontWeight: 500 },
  capAuthor: {
    fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.08em",
    color: T.inkSoft, textTransform: "uppercase",
  },
  noteChip: {
    flexShrink: 0, fontFamily: T.mono, fontSize: 10,
    letterSpacing: "0.08em", color: T.oxblood,
    border: `1px solid ${T.oxblood}`, padding: "3px 7px", borderRadius: 2,
  },
  empty: { textAlign: "center", padding: "64px 20px", color: T.inkSoft },
  emptyPinDot: {
    width: 14, height: 14, borderRadius: "50%", margin: "0 auto 16px",
    background: `radial-gradient(circle at 35% 30%, #c4685b, ${T.oxbloodDeep} 70%)`,
  },
  emptyLede: {
    fontFamily: T.serif, fontSize: 22, margin: "0 0 6px", color: T.ink,
  },
  emptyBody: { fontFamily: T.serif, fontSize: 15, margin: 0 },
  loading: {
    fontFamily: T.mono, fontSize: 11, letterSpacing: "0.14em",
    textAlign: "center", padding: 24, color: T.inkSoft,
  },
  endMark: {
    fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.18em",
    textAlign: "center", padding: "28px 0 8px", color: T.inkSoft,
  },
  scrim: {
    position: "fixed", inset: 0, zIndex: 60,
    background: "rgba(43,35,32,.55)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 16,
  },
  sheet: {
    width: "min(460px, 100%)", background: T.cream,
    border: `1.5px solid ${T.ink}`, borderRadius: 3,
    padding: 20, maxHeight: "92vh", overflowY: "auto",
  },
  sheetHead: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", gap: 12, marginBottom: 14,
  },
  xBtn: {
    fontFamily: T.mono, fontSize: 14, background: "transparent",
    border: `1px solid ${T.ink}`, borderRadius: 2, cursor: "pointer",
    width: 30, height: 30, color: T.ink, flexShrink: 0,
  },
  dropZone: {
    border: `1.5px dashed ${T.inkSoft}`, borderRadius: 3,
    background: T.paper, minHeight: 160, cursor: "pointer",
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 6, marginBottom: 16, padding: 10,
    textAlign: "center",
  },
  dropZoneActive: {
    borderColor: T.oxblood, background: "rgba(139,58,47,0.06)",
  },
  dropGlyph: { fontSize: 26, color: T.oxblood },
  dropLede: { fontFamily: T.serif, fontSize: 17 },
  dropSub: {
    fontFamily: T.mono, fontSize: 10.5, color: T.inkSoft,
    letterSpacing: "0.06em",
  },
  dropPreview: { maxWidth: "100%", maxHeight: 280, display: "block" },
  fieldLabel: {
    display: "block", fontFamily: T.mono, fontSize: 10.5,
    letterSpacing: "0.12em", color: T.inkSoft, marginBottom: 14,
    textTransform: "uppercase",
  },
  opt: { textTransform: "none", letterSpacing: 0 },
  field: {
    display: "block", width: "100%", marginTop: 6, boxSizing: "border-box",
    fontFamily: T.serif, fontSize: 16, padding: "11px 12px",
    background: T.paper, border: `1.5px solid ${T.ink}`,
    borderRadius: 2, color: T.ink,
  },
  errInline: {
    fontFamily: T.mono, fontSize: 11.5, color: T.oxbloodDeep,
    background: "rgba(139,58,47,0.09)", padding: "8px 10px",
    marginBottom: 12, border: `1px solid ${T.oxblood}`,
  },
  detail: {
    width: "min(1040px, 100%)", maxHeight: "92vh",
    background: T.cream, border: `1.5px solid ${T.ink}`, borderRadius: 3,
    display: "flex", flexWrap: "wrap", overflow: "hidden",
  },
  detailImgWrap: {
    flex: "1 1 420px", minWidth: 280, background: T.ink,
    display: "flex", alignItems: "center", justifyContent: "center",
    maxHeight: "92vh",
  },
  detailImg: { maxWidth: "100%", maxHeight: "92vh", display: "block" },
  detailSide: {
    flex: "1 1 320px", minWidth: 280, display: "flex",
    flexDirection: "column", padding: 18, maxHeight: "92vh",
  },
  noteList: {
    flex: 1, overflowY: "auto", margin: "6px 0 12px",
    display: "flex", flexDirection: "column", gap: 10, minHeight: 120,
  },
  noteEmpty: {
    fontFamily: T.serif, fontSize: 14.5, color: T.inkSoft,
    padding: "16px 4px",
  },
  noteCard: {
    background: T.paper, border: "1px solid rgba(43,35,32,.16)",
    borderLeft: `3px solid ${T.oxblood}`, padding: "9px 12px",
    borderRadius: 2,
  },
  noteMeta: {
    display: "flex", justifyContent: "space-between", gap: 8,
    marginBottom: 3,
  },
  noteAuthor: {
    fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.08em",
    textTransform: "uppercase", color: T.oxbloodDeep,
  },
  noteTime: { fontFamily: T.mono, fontSize: 10, color: T.inkSoft },
  noteBody: {
    margin: 0, fontFamily: T.serif, fontSize: 15, lineHeight: 1.45,
    whiteSpace: "pre-wrap",
  },
  noteForm: { display: "flex", flexDirection: "column", gap: 8 },
  noteInput: { resize: "vertical", marginTop: 0 },
};
