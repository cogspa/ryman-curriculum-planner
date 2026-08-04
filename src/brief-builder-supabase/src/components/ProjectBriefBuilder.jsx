// ============================================================================
// pLAtform — PROJECT BRIEF BUILDER  (Supabase edition)
// Fill-in-the-blank creative brief → shared Master Sheet (project_briefs table)
// with live realtime updates, mini Gantt timeline, and CSV/XLSX export.
//
// USAGE
//   <ProjectBriefBuilder />
//
// BACKEND
//   Supabase — same stack and SAME env vars as the planner + Critique Zone:
//     VITE_SUPABASE_URL=...
//     VITE_SUPABASE_ANON_KEY=...
//   Run supabase-schema.sql once (project_briefs table + RLS + realtime).
//   No env vars? Component runs in DEMO MODE (session-only, banner shown).
//
// DEPENDENCIES
//   npm i @supabase/supabase-js xlsx     (both lazy-imported)
// ============================================================================

import React, { useState, useEffect, useCallback, useRef } from "react";

const OX = "#8b3a2f";
const CREAM = "#f5efe1";
const INK = "#2b2320";
const FADE = "rgba(43,35,32,0.55)";
const RULE = "rgba(139,58,47,0.35)";
const TABLE = "project_briefs";

// ---------------------------------------------------------------- supabase (lazy)
let _sb = null;
let _sbTried = false;

async function getSupabase() {
  if (_sbTried) return _sb;
  _sbTried = true;
  const url = import.meta.env?.VITE_SUPABASE_URL;
  const key = import.meta.env?.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    _sb = createClient(url, key);
  } catch (e) {
    console.warn("[BriefBuilder] supabase-js not installed — demo mode.", e);
    _sb = null;
  }
  return _sb;
}

// Session-only fallback so the component renders before backend setup.
const demoStore = { briefs: [] };

const SECTIONS = [
  { key: "client", label: "CLIENT", prompt: "Who is hiring me?" },
  { key: "project", label: "PROJECT", prompt: "What am I making, in one sentence?" },
  { key: "audience", label: "AUDIENCE", prompt: "Who will see this?" },
  { key: "deliverables", label: "DELIVERABLES", prompt: "Exactly what files, dimensions, formats?" },
  { key: "success", label: "SUCCESS", prompt: "How will I know it worked?" },
];

const DATES = [
  { key: "briefDue", col: "brief_due", label: "Brief due" },
  { key: "thumbsDue", col: "thumbs_due", label: "Thumbnails due" },
  { key: "compDue", col: "comp_due", label: "Comp due" },
  { key: "finalDue", col: "final_due", label: "Final due" },
];

const countSentences = (t) =>
  t.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean).length;

const emptyForm = () => ({
  identityType: "studio", name: "",
  client: "", project: "", audience: "", deliverables: "", success: "",
  briefDue: "", thumbsDue: "", compDue: "", finalDue: "",
});

// row (snake_case) <-> form (camelCase)
const toRow = (f) => ({
  identity_type: f.identityType, name: f.name.trim(),
  client: f.client.trim(), project: f.project.trim(), audience: f.audience.trim(),
  deliverables: f.deliverables.trim(), success: f.success.trim(),
  brief_due: f.briefDue || null, thumbs_due: f.thumbsDue || null,
  comp_due: f.compDue || null, final_due: f.finalDue || null,
});
const fromRow = (r) => ({
  id: r.id, submittedAt: r.created_at,
  identityType: r.identity_type, name: r.name,
  client: r.client, project: r.project, audience: r.audience,
  deliverables: r.deliverables, success: r.success,
  briefDue: r.brief_due || "", thumbsDue: r.thumbs_due || "",
  compDue: r.comp_due || "", finalDue: r.final_due || "",
});

export default function ProjectBriefBuilder() {
  const [view, setView] = useState("write");
  const [form, setForm] = useState(emptyForm());
  const [status, setStatus] = useState(null);
  const [briefs, setBriefs] = useState([]);
  const [loadingSheet, setLoadingSheet] = useState(false);
  const [saving, setSaving] = useState(false);
  const [demo, setDemo] = useState(false);
  const channelRef = useRef(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  /* ---------- master sheet ---------- */
  const loadBriefs = useCallback(async () => {
    setLoadingSheet(true);
    const sb = await getSupabase();
    if (!sb) {
      setDemo(true);
      setBriefs([...demoStore.briefs].reverse());
      setLoadingSheet(false);
      return;
    }
    const { data, error } = await sb
      .from(TABLE).select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setStatus({ type: "err", msg: `Couldn't load the sheet: ${error.message}` });
      setBriefs([]);
    } else {
      setBriefs((data || []).map(fromRow));
    }
    setLoadingSheet(false);
  }, []);

  // realtime: refresh the sheet when anyone files or deletes a brief
  useEffect(() => {
    let active = true;
    (async () => {
      const sb = await getSupabase();
      if (!sb || !active) { if (active && !sb) setDemo(true); return; }
      channelRef.current = sb
        .channel("brief-builder")
        .on("postgres_changes", { event: "*", schema: "public", table: TABLE }, () => loadBriefs())
        .subscribe();
    })();
    return () => {
      active = false;
      if (channelRef.current) channelRef.current.unsubscribe();
    };
  }, [loadBriefs]);

  useEffect(() => { if (view === "sheet") loadBriefs(); }, [view, loadBriefs]);

  /* ---------- validation ---------- */
  const problems = [];
  if (!form.name.trim()) problems.push("Add your name (or your studio's name).");
  SECTIONS.forEach((s) => {
    const val = form[s.key].trim();
    if (!val) problems.push(`${s.label} is blank.`);
    else if (countSentences(val) > 3) problems.push(`${s.label} is over three sentences.`);
  });
  if (!DATES.every((d) => form[d.key])) problems.push("Fill in all four schedule dates.");

  /* ---------- submit ---------- */
  const submit = async () => {
    if (problems.length) { setStatus({ type: "err", msg: problems[0] }); return; }
    setSaving(true);
    const sb = await getSupabase();
    if (!sb) {
      demoStore.briefs.push({ ...form, id: `demo_${Date.now()}`, submittedAt: new Date().toISOString() });
      setStatus({ type: "ok", msg: "Filed (demo mode — session only). Set Supabase env vars to make it stick." });
      setSaving(false);
      return;
    }
    const { error } = await sb.from(TABLE).insert(toRow(form));
    setStatus(error
      ? { type: "err", msg: `Not saved: ${error.message}` }
      : { type: "ok", msg: "Brief filed to the Master Sheet. Your entry is visible to the whole class." });
    setSaving(false);
  };

  /* ---------- text file download ---------- */
  const briefText = () => {
    const sched = DATES.map((d) => `${d.label}: ${form[d.key] || "—"}`).join(" · ");
    return [
      `${form.identityType === "studio" ? "STUDIO" : "NAME"}: ${form.name}`, "",
      `CLIENT: ${form.client}`, "", `PROJECT: ${form.project}`, "",
      `AUDIENCE: ${form.audience}`, "", `DELIVERABLES: ${form.deliverables}`, "",
      `SCHEDULE: ${sched}`, "", `SUCCESS: ${form.success}`,
    ].join("\n");
  };

  const downloadTxt = () => {
    const blob = new Blob([briefText()], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${(form.name || "brief").replace(/\s+/g, "_")}_brief.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ---------- exports (xlsx lazy-imported) ---------- */
  const sheetRows = () =>
    briefs.map((b) => ({
      "Studio / Name": b.name, Type: b.identityType,
      Client: b.client, Project: b.project, Audience: b.audience,
      Deliverables: b.deliverables,
      "Brief due": b.briefDue, "Thumbnails due": b.thumbsDue,
      "Comp due": b.compDue, "Final due": b.finalDue,
      Success: b.success,
      Submitted: b.submittedAt ? b.submittedAt.slice(0, 16).replace("T", " ") : "",
    }));

  const exportSheet = async (kind) => {
    try {
      const XLSX = await import("xlsx");
      const ws = XLSX.utils.json_to_sheet(sheetRows());
      if (kind === "xlsx") {
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Briefs");
        XLSX.writeFile(wb, "pLAtform_master_briefs.xlsx");
      } else {
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "pLAtform_master_briefs.csv";
        a.click();
        URL.revokeObjectURL(a.href);
      }
    } catch (e) {
      setStatus({ type: "err", msg: "Export needs the xlsx package: npm i xlsx" });
    }
  };

  const removeRow = async (id) => {
    const sb = await getSupabase();
    if (!sb) {
      demoStore.briefs = demoStore.briefs.filter((b) => b.id !== id);
      setBriefs((rows) => rows.filter((r) => r.id !== id));
      return;
    }
    const { error } = await sb.from(TABLE).delete().eq("id", id);
    if (error) setStatus({ type: "err", msg: `Couldn't delete: ${error.message}` });
    else setBriefs((rows) => rows.filter((r) => r.id !== id));
  };

  /* ============================ UI ============================ */
  return (
    <div style={{ minHeight: "100vh", background: CREAM, color: INK }}>
      <style>{`
        .pbb .mono { font-family: 'IBM Plex Mono', monospace; }
        .pbb .news { font-family: 'Newsreader', serif; }
        .pbb textarea.blank {
          width: 100%; background: transparent; border: none; resize: vertical;
          border-bottom: 1px dashed ${RULE}; outline: none;
          font-family: 'Newsreader', serif; font-size: 1.15rem; line-height: 1.5;
          color: ${INK}; padding: 4px 0 8px 0; min-height: 58px;
        }
        .pbb textarea.blank:focus { border-bottom: 1px solid ${OX}; }
        .pbb input.datebox {
          background: transparent; border: 1px solid ${RULE}; border-radius: 2px;
          font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem;
          padding: 6px 8px; color: ${INK}; outline: none; width: 100%;
        }
        .pbb input.datebox:focus { border-color: ${OX}; }
        .pbb .btn {
          font-family: 'IBM Plex Mono', monospace; font-size: 0.78rem; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 10px 18px; cursor: pointer;
          border: 1px solid ${OX}; background: transparent; color: ${OX};
          transition: background 0.15s, color 0.15s;
        }
        .pbb .btn:hover { background: ${OX}; color: ${CREAM}; }
        .pbb .btn.solid { background: ${OX}; color: ${CREAM}; }
        .pbb .btn.solid:hover { background: #6f2e25; }
        .pbb .btn:disabled { opacity: 0.4; cursor: default; }
        .pbb table.master { border-collapse: collapse; width: 100%; font-size: 0.78rem; }
        .pbb table.master th {
          font-family: 'IBM Plex Mono', monospace; text-transform: uppercase;
          letter-spacing: 0.06em; font-size: 0.68rem; text-align: left;
          color: ${OX}; border-bottom: 2px solid ${OX}; padding: 8px 10px; white-space: nowrap;
        }
        .pbb table.master td {
          font-family: 'Newsreader', serif; font-size: 0.9rem; vertical-align: top;
          border-bottom: 1px solid ${RULE}; padding: 8px 10px; max-width: 220px;
        }
        @media print { .pbb .no-print { display: none !important; } }
      `}</style>

      <div className="pbb">
        {demo && (
          <div className="mono" style={{ background: OX, color: CREAM, fontSize: "0.7rem", letterSpacing: "0.1em", textAlign: "center", padding: "6px 12px", textTransform: "uppercase" }}>
            Demo mode — no Supabase env vars found. Briefs live for this session only.
          </div>
        )}

        <header style={{ borderBottom: `3px double ${OX}`, padding: "28px 24px 18px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.25em", color: OX, textTransform: "uppercase" }}>
                pLAtform · Ryman Arts
              </div>
              <h1 className="news" style={{ fontSize: "2.2rem", fontWeight: 500, margin: "4px 0 0" }}>
                Project Brief Builder
              </h1>
            </div>
            <nav className="mono no-print" style={{ display: "flex", gap: 8 }}>
              {[["write", "Write a brief"], ["sheet", "Master sheet"]].map(([k, label]) => (
                <button key={k} onClick={() => { setView(k); setStatus(null); }} className="btn"
                  style={view === k ? { background: OX, color: CREAM } : {}}>
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {view === "write" ? (
          <main style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 80px" }}>
            <p className="news" style={{ fontSize: "1.05rem", fontStyle: "italic", color: FADE, marginBottom: 28 }}>
              Fill each blank. Three sentences max per section. The whole brief fits on one page —
              if it doesn't, cut until it does.
            </p>

            <section style={{ marginBottom: 36 }}>
              <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.15em", color: OX, marginBottom: 8 }}>
                WHO'S WRITING THIS?
              </div>
              <div className="no-print" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {[["studio", "We are a design studio"], ["student", "I'm a student"]].map(([k, label]) => (
                  <button key={k} className="btn" onClick={() => set("identityType", k)}
                    style={form.identityType === k ? { background: OX, color: CREAM } : {}}>
                    {label}
                  </button>
                ))}
              </div>
              <textarea className="blank" style={{ minHeight: 40, fontSize: "1.4rem" }} rows={1}
                placeholder={form.identityType === "studio" ? "Studio name — invent one. Make it sound real." : "Your name"}
                value={form.name} onChange={(e) => set("name", e.target.value)} />
            </section>

            {SECTIONS.slice(0, 4).map((s) => (
              <BriefBlank key={s.key} section={s} value={form[s.key]} onChange={(v) => set(s.key, v)} />
            ))}

            <section style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span className="mono" style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", color: OX }}>SCHEDULE:</span>
                <span className="news" style={{ fontStyle: "italic", color: FADE, fontSize: "0.95rem" }}>
                  Brief due, thumbnails due, comp due, final due.
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 12 }}>
                {DATES.map((d) => (
                  <label key={d.key} style={{ display: "block" }}>
                    <span className="mono" style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: FADE, display: "block", marginBottom: 4 }}>
                      {d.label}
                    </span>
                    <input type="date" className="datebox" value={form[d.key]} onChange={(e) => set(d.key, e.target.value)} />
                  </label>
                ))}
              </div>
              <GanttMini form={form} />
            </section>

            <BriefBlank section={SECTIONS[4]} value={form.success} onChange={(v) => set("success", v)} />

            {status && (
              <div className="mono" style={{
                fontSize: "0.8rem", padding: "12px 14px", marginBottom: 20,
                border: `1px solid ${status.type === "ok" ? "#3d6b35" : OX}`,
                color: status.type === "ok" ? "#3d6b35" : OX,
              }}>
                {status.msg}
              </div>
            )}

            <div className="no-print" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn solid" onClick={submit} disabled={saving}>
                {saving ? "Filing…" : "File brief → master sheet"}
              </button>
              <button className="btn" onClick={downloadTxt}>Download .txt</button>
              <button className="btn" onClick={() => { setForm(emptyForm()); setStatus(null); }}>Clear</button>
            </div>
            <p className="mono" style={{ fontSize: "0.65rem", color: FADE, marginTop: 14 }}>
              Filed briefs are shared — everyone in the class can read the Master Sheet.
            </p>
          </main>
        ) : (
          <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
              <p className="news" style={{ fontStyle: "italic", color: FADE }}>
                Every filed brief, newest first. {briefs.length} on record.
                {!demo && " Updates live."}
              </p>
              <div className="no-print" style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={loadBriefs}>Refresh</button>
                <button className="btn" onClick={() => exportSheet("csv")} disabled={!briefs.length}>Export CSV</button>
                <button className="btn solid" onClick={() => exportSheet("xlsx")} disabled={!briefs.length}>Export XLSX</button>
              </div>
            </div>

            {loadingSheet ? (
              <p className="mono" style={{ fontSize: "0.8rem", color: FADE }}>Loading the sheet…</p>
            ) : briefs.length === 0 ? (
              <div style={{ border: `1px dashed ${RULE}`, padding: 40, textAlign: "center" }}>
                <p className="news" style={{ fontSize: "1.2rem", marginBottom: 6 }}>No briefs filed yet.</p>
                <p className="mono" style={{ fontSize: "0.75rem", color: FADE }}>Write one and file it — it lands here.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="master">
                  <thead>
                    <tr>
                      <th>Studio / Name</th><th>Client</th><th>Project</th><th>Audience</th>
                      <th>Deliverables</th><th>Brief</th><th>Thumbs</th><th>Comp</th><th>Final</th>
                      <th>Success</th><th>Filed</th><th className="no-print"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {briefs.map((b) => (
                      <tr key={b.id}>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <span style={{ fontWeight: 500 }}>{b.name}</span>
                          <div className="mono" style={{ fontSize: "0.6rem", color: FADE, textTransform: "uppercase" }}>{b.identityType}</div>
                        </td>
                        <td>{b.client}</td>
                        <td>{b.project}</td>
                        <td>{b.audience}</td>
                        <td>{b.deliverables}</td>
                        <td className="mono" style={{ fontSize: "0.7rem" }}>{b.briefDue}</td>
                        <td className="mono" style={{ fontSize: "0.7rem" }}>{b.thumbsDue}</td>
                        <td className="mono" style={{ fontSize: "0.7rem" }}>{b.compDue}</td>
                        <td className="mono" style={{ fontSize: "0.7rem" }}>{b.finalDue}</td>
                        <td>{b.success}</td>
                        <td className="mono" style={{ fontSize: "0.7rem", whiteSpace: "nowrap" }}>
                          {b.submittedAt ? b.submittedAt.slice(0, 10) : ""}
                        </td>
                        <td className="no-print">
                          <button className="btn" style={{ padding: "4px 8px", fontSize: "0.6rem" }} onClick={() => removeRow(b.id)}>✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        )}

        <footer style={{ borderTop: `1px solid ${RULE}`, padding: "16px 24px" }}>
          <div className="mono" style={{ maxWidth: 900, margin: "0 auto", fontSize: "0.62rem", letterSpacing: "0.12em", color: FADE, textTransform: "uppercase" }}>
            A brief that fits on one page is a brief that gets read.
          </div>
        </footer>
      </div>
    </div>
  );
}

/* Mini Gantt — draws phase bars between the four schedule dates */
function GanttMini({ form }) {
  const parse = (s) => (s ? new Date(s + "T00:00:00") : null);
  const dates = [parse(form.briefDue), parse(form.thumbsDue), parse(form.compDue), parse(form.finalDue)];
  const filled = dates.filter(Boolean).length;
  if (filled < 2) return null;

  const valid = dates.every((d, i) => !d || !dates.slice(0, i).some((p) => p && p > d));
  const known = dates.filter(Boolean);
  const start = known[0], end = known[known.length - 1];
  const span = Math.max(end - start, 1);
  const DAY = 86400000;
  const days = (a, b) => Math.round((b - a) / DAY);
  const x = (d) => 40 + ((d - start) / span) * 620;

  const PHASES = [
    { label: "Brief → Thumbs", a: 0, b: 1 },
    { label: "Thumbs → Comp", a: 1, b: 2 },
    { label: "Comp → Final", a: 2, b: 3 },
  ];
  const MILESTONES = ["Brief", "Thumbs", "Comp", "Final"];
  const shades = ["#8b3a2f", "#a85a4a", "#c07d66"];

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const showToday = today >= start && today <= end;

  return (
    <div style={{ marginTop: 18 }}>
      <svg viewBox="0 0 700 120" style={{ width: "100%", display: "block" }} role="img" aria-label="Project schedule timeline">
        <line x1="40" y1="62" x2="660" y2="62" stroke={RULE} strokeWidth="1" />
        {PHASES.map((p, i) => {
          const a = dates[p.a], b = dates[p.b];
          if (!a || !b || b < a) return null;
          const x1 = x(a), x2 = x(b);
          return (
            <g key={p.label}>
              <rect x={x1} y={52} width={Math.max(x2 - x1, 2)} height={20} fill={shades[i]} opacity="0.9" />
              {x2 - x1 > 70 && (
                <text x={(x1 + x2) / 2} y={66} textAnchor="middle" fill={CREAM}
                  style={{ font: "600 9px 'IBM Plex Mono', monospace", letterSpacing: "0.05em" }}>
                  {days(a, b)}d
                </text>
              )}
            </g>
          );
        })}
        {dates.map((d, i) => d && (
          <g key={i}>
            <line x1={x(d)} y1={44} x2={x(d)} y2={80} stroke={INK} strokeWidth="1.5" />
            <circle cx={x(d)} cy={62} r="3.5" fill={CREAM} stroke={INK} strokeWidth="1.5" />
            <text x={x(d)} y={i % 2 === 0 ? 34 : 96} textAnchor="middle" fill={INK}
              style={{ font: "600 9px 'IBM Plex Mono', monospace", letterSpacing: "0.08em" }}>
              {MILESTONES[i].toUpperCase()}
            </text>
            <text x={x(d)} y={i % 2 === 0 ? 22 : 108} textAnchor="middle" fill={FADE}
              style={{ font: "400 8.5px 'IBM Plex Mono', monospace" }}>
              {d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </text>
          </g>
        ))}
        {showToday && (
          <g>
            <line x1={x(today)} y1={40} x2={x(today)} y2={84} stroke={OX} strokeWidth="1" strokeDasharray="3 3" />
            <text x={x(today)} y={116} textAnchor="middle" fill={OX}
              style={{ font: "600 8px 'IBM Plex Mono', monospace", letterSpacing: "0.1em" }}>
              TODAY
            </text>
          </g>
        )}
      </svg>
      <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: "0.62rem", color: FADE, marginTop: 4 }}>
        <span>{filled === 4 ? `${days(start, end)} days, brief to final` : "Timeline updates as you add dates"}</span>
        {!valid && <span style={{ color: OX, fontWeight: 600 }}>DATES ARE OUT OF ORDER</span>}
      </div>
    </div>
  );
}

/* One fill-in-the-blank section with a live sentence counter */
function BriefBlank({ section, value, onChange }) {
  const n = countSentences(value);
  const over = n > 3;
  return (
    <section style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span className="mono" style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", color: OX }}>
            {section.label}:
          </span>
          <span className="news" style={{ fontStyle: "italic", color: "rgba(43,35,32,0.55)", fontSize: "0.95rem" }}>
            {section.prompt}
          </span>
        </div>
        <span className="mono" style={{ fontSize: "0.65rem", color: over ? OX : "rgba(43,35,32,0.4)", fontWeight: over ? 600 : 400, whiteSpace: "nowrap" }}>
          {n}/3 {over ? "— CUT IT DOWN" : "sentences"}
        </span>
      </div>
      <textarea className="blank" rows={2} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Write here…" />
    </section>
  );
}
