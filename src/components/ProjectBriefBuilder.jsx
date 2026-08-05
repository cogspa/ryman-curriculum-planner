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
  const [activeSvgBrief, setActiveSvgBrief] = useState(null);
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
      const demoBrief = { ...form, id: `demo_${Date.now()}`, submittedAt: new Date().toISOString() };
      demoStore.briefs.push(demoBrief);
      setStatus({ type: "ok", msg: "Filed (demo mode — session only). Set Supabase env vars to make it stick." });
      setSaving(false);
      setActiveSvgBrief(demoBrief);
      return;
    }
    const { error } = await sb.from(TABLE).insert(toRow(form));
    if (error) {
      setStatus({ type: "err", msg: `Not saved: ${error.message}` });
    } else {
      setStatus({ type: "ok", msg: "Brief filed to the Master Sheet. Your entry is visible to the whole class." });
      setActiveSvgBrief({ ...form, submittedAt: new Date().toISOString() });
    }
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
              <button className="btn" onClick={() => setActiveSvgBrief(form)}>
                🎨 View SVG Brief Plate
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
                      <th>Success</th><th>Filed</th><th className="no-print">Actions</th>
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
                        <td className="no-print" style={{ whiteSpace: "nowrap" }}>
                          <button className="btn" style={{ padding: "4px 8px", fontSize: "0.6rem", marginRight: "4px", color: OX, fontWeight: "bold" }} onClick={() => setActiveSvgBrief(b)}>
                            🎨 SVG Plate
                          </button>
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

        {/* Modal for SVG Brief Plate */}
        <BriefSvgModal brief={activeSvgBrief} onClose={() => setActiveSvgBrief(null)} />

        <footer style={{ borderTop: `1px solid ${RULE}`, padding: "16px 24px" }}>
          <div className="mono" style={{ maxWidth: 900, margin: "0 auto", fontSize: "0.62rem", letterSpacing: "0.12em", color: FADE, textTransform: "uppercase" }}>
            A brief that fits on one page is a brief that gets read.
          </div>
        </footer>
      </div>
    </div>
  );
}

function wrapSvgText(text = "", maxChars = 72) {
  if (!text) return ["—"];
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + " " + word).trim().length <= maxChars) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines.length ? lines : ["—"];
}

function BriefSvgModal({ brief, onClose }) {
  const svgRef = useRef(null);
  if (!brief) return null;

  const dateStr = brief.submittedAt ? brief.submittedAt.slice(0, 10) : new Date().toISOString().slice(0, 10);
  const designerName = brief.name || "Anonymous Designer";
  const clientName = brief.client || "Unspecified Client";

  const projectLines = wrapSvgText(brief.project || "—", 72);
  const audienceLines = wrapSvgText(brief.audience || "—", 72);
  const deliverableLines = wrapSvgText(brief.deliverables || "—", 72);
  const successLines = wrapSvgText(brief.success || "—", 72);

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Creative_Brief_${(brief.name || "Student").replace(/\s+/g, "_")}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print-modal" style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(20, 16, 14, 0.85)", backdropFilter: "blur(6px)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "20px"
    }}>
      {/* Top action bar */}
      <div className="no-print" style={{
        display: "flex", gap: "12px", alignItems: "center", justifyContent: "space-between",
        maxWidth: "840px", width: "100%", marginBottom: "12px", background: "#f5efe1",
        padding: "10px 16px", borderRadius: "6px", border: "1.5px solid #8b3a2f"
      }}>
        <span style={{ fontFamily: "Menlo, monospace", fontSize: "12px", fontWeight: "bold", color: "#8b3a2f" }}>
          📄 CREATIVE BRIEF SVG PLATE PREVIEW
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn solid" style={{ fontSize: "11px", padding: "6px 12px" }} onClick={handleDownloadSvg}>
            📥 Download .SVG
          </button>
          <button className="btn" style={{ fontSize: "11px", padding: "6px 12px" }} onClick={handlePrint}>
            🖨️ Print / PDF
          </button>
          <button className="btn" style={{ fontSize: "11px", padding: "6px 12px", background: "#8b3a2f", color: "#fff" }} onClick={onClose}>
            ✕ Close
          </button>
        </div>
      </div>

      {/* SVG Container Stage */}
      <div style={{
        maxWidth: "840px", width: "100%", maxHeight: "85vh", overflowY: "auto",
        background: "#f5efe1", borderRadius: "8px", border: "2px solid #2b2320",
        padding: "16px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
      }}>
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 1060"
          width="100%"
          style={{ display: "block", background: "#FDFBF3" }}
        >
          {/* Paper Border & Shadow */}
          <rect x="15" y="15" width="770" height="1030" fill="#FDFBF3" stroke="#2B2320" strokeWidth="2.5" />
          <rect x="25" y="25" width="750" height="1010" fill="none" stroke="#8b3a2f" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />

          {/* Header Section */}
          <rect x="40" y="45" width="720" height="95" fill="#1F1B16" />
          <text x="60" y="70" fontFamily="'IBM Plex Mono', monospace" fontSize="9" fill="#8b3a2f" letterSpacing="2.5" fontWeight="bold">
            pLAtform · RYMAN ARTS CAPSTONE PROGRAM
          </text>
          <text x="60" y="98" fontFamily="'Newsreader', Georgia, serif" fontSize="24" fill="#FDFBF3" fontWeight="bold" letterSpacing="0.5">
            OFFICIAL CREATIVE BRIEF
          </text>

          {/* Header Metadata Box (Right) */}
          <rect x="480" y="55" width="265" height="75" fill="none" stroke="#8b3a2f" strokeWidth="1.2" />
          <text x="492" y="72" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fill="#FDFBF3" letterSpacing="1">
            DESIGNER: <tspan fill="#e2b980" fontWeight="bold">{designerName.slice(0, 24)}</tspan>
          </text>
          <text x="492" y="90" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fill="#FDFBF3" letterSpacing="1">
            CLIENT: <tspan fill="#e2b980">{clientName.slice(0, 26)}</tspan>
          </text>
          <text x="492" y="108" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fill="#8b3a2f" letterSpacing="1">
            FILED DATE: {dateStr}
          </text>

          {/* Section 1: PROJECT STATEMENT */}
          <g transform="translate(40, 160)">
            <rect x="0" y="0" width="720" height="22" fill="#1F1B16" />
            <text x="12" y="15" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill="#FDFBF3" fontWeight="bold" letterSpacing="1.5">
              1 · PROJECT STATEMENT &amp; LOGLINE
            </text>
            <rect x="0" y="26" width="720" height="95" fill="#F8F4E8" stroke="#D4C9A8" strokeWidth="1" />
            <text x="16" y="48" fontFamily="'Newsreader', Georgia, serif" fontSize="13.5" fill="#2B2320">
              {projectLines.map((line, i) => (
                <tspan key={i} x="16" dy={i === 0 ? 0 : 20}>{line}</tspan>
              ))}
            </text>
          </g>

          {/* Section 2: TARGET AUDIENCE */}
          <g transform="translate(40, 295)">
            <rect x="0" y="0" width="720" height="22" fill="#1F1B16" />
            <text x="12" y="15" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill="#FDFBF3" fontWeight="bold" letterSpacing="1.5">
              2 · TARGET AUDIENCE &amp; USER PROFILE
            </text>
            <rect x="0" y="26" width="720" height="95" fill="#F8F4E8" stroke="#D4C9A8" strokeWidth="1" />
            <text x="16" y="48" fontFamily="'Newsreader', Georgia, serif" fontSize="13.5" fill="#2B2320">
              {audienceLines.map((line, i) => (
                <tspan key={i} x="16" dy={i === 0 ? 0 : 20}>{line}</tspan>
              ))}
            </text>
          </g>

          {/* Section 3: SCOPE & DELIVERABLES */}
          <g transform="translate(40, 430)">
            <rect x="0" y="0" width="720" height="22" fill="#1F1B16" />
            <text x="12" y="15" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill="#FDFBF3" fontWeight="bold" letterSpacing="1.5">
              3 · SCOPE, FORMATS &amp; DELIVERABLES
            </text>
            <rect x="0" y="26" width="720" height="95" fill="#F8F4E8" stroke="#D4C9A8" strokeWidth="1" />
            <text x="16" y="48" fontFamily="'Newsreader', Georgia, serif" fontSize="13.5" fill="#2B2320">
              {deliverableLines.map((line, i) => (
                <tspan key={i} x="16" dy={i === 0 ? 0 : 20}>{line}</tspan>
              ))}
            </text>
          </g>

          {/* Section 4: PRODUCTION SCHEDULE TIMELINE */}
          <g transform="translate(40, 565)">
            <rect x="0" y="0" width="720" height="22" fill="#8b3a2f" />
            <text x="12" y="15" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill="#FDFBF3" fontWeight="bold" letterSpacing="1.5">
              4 · PRODUCTION SCHEDULE TIMELINE
            </text>
            <rect x="0" y="26" width="720" height="135" fill="#F8F4E8" stroke="#8b3a2f" strokeWidth="1" />

            {/* Dates grid display */}
            <g transform="translate(20, 42)">
              {[
                { label: "BRIEF DUE", val: brief.briefDue || "—" },
                { label: "THUMBS DUE", val: brief.thumbsDue || "—" },
                { label: "COMP DUE", val: brief.compDue || "—" },
                { label: "FINAL DUE", val: brief.finalDue || "—" },
              ].map((d, idx) => (
                <g key={idx} transform={`translate(${idx * 170}, 0)`}>
                  <rect x="0" y="0" width="150" height="42" fill="#F5EFE1" stroke="#D4C9A8" strokeWidth="1" />
                  <text x="10" y="16" fontFamily="'IBM Plex Mono', monospace" fontSize="8" fill="#8b3a2f" letterSpacing="1" fontWeight="bold">
                    {d.label}
                  </text>
                  <text x="10" y="32" fontFamily="'IBM Plex Mono', monospace" fontSize="11" fill="#2B2320" fontWeight="bold">
                    {d.val}
                  </text>
                </g>
              ))}
            </g>

            {/* Visual Timeline Bar */}
            <g transform="translate(20, 105)">
              <line x1="0" y1="12" x2="680" y2="12" stroke="#8b3a2f" strokeWidth="2" />
              <rect x="0" y="4" width="220" height="16" fill="#8b3a2f" opacity="0.85" />
              <rect x="220" y="4" width="230" height="16" fill="#a85a4a" opacity="0.85" />
              <rect x="450" y="4" width="230" height="16" fill="#c07d66" opacity="0.85" />
              <circle cx="0" cy="12" r="5" fill="#1F1B16" />
              <circle cx="220" cy="12" r="5" fill="#1F1B16" />
              <circle cx="450" cy="12" r="5" fill="#1F1B16" />
              <circle cx="680" cy="12" r="5" fill="#1F1B16" />
            </g>
          </g>

          {/* Section 5: SUCCESS CRITERIA */}
          <g transform="translate(40, 740)">
            <rect x="0" y="0" width="720" height="22" fill="#1F1B16" />
            <text x="12" y="15" fontFamily="'IBM Plex Mono', monospace" fontSize="9.5" fill="#FDFBF3" fontWeight="bold" letterSpacing="1.5">
              5 · SUCCESS CRITERIA &amp; PORTFOLIO STANDARDS
            </text>
            <rect x="0" y="26" width="720" height="95" fill="#F8F4E8" stroke="#D4C9A8" strokeWidth="1" />
            <text x="16" y="48" fontFamily="'Newsreader', Georgia, serif" fontSize="13.5" fill="#2B2320">
              {successLines.map((line, i) => (
                <tspan key={i} x="16" dy={i === 0 ? 0 : 20}>{line}</tspan>
              ))}
            </text>
          </g>

          {/* Footer & Approval Signatures */}
          <g transform="translate(40, 880)">
            <line x1="0" y1="50" x2="300" y2="50" stroke="#2B2320" strokeWidth="1.5" />
            <text x="0" y="66" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill="#8b3a2f" letterSpacing="1">
              CLIENT APPROVAL SIGNATURE
            </text>

            <line x1="420" y1="50" x2="720" y2="50" stroke="#2B2320" strokeWidth="1.5" />
            <text x="420" y="66" fontFamily="'IBM Plex Mono', monospace" fontSize="8.5" fill="#8b3a2f" letterSpacing="1">
              DESIGNER: {designerName.toUpperCase()}
            </text>
          </g>

          {/* Official Stamp Graphic */}
          <g transform="translate(540, 935) rotate(-6)">
            <rect width="210" height="52" fill="none" stroke="#8b3a2f" strokeWidth="2.5" rx="3" />
            <rect x="4" y="4" width="202" height="44" fill="none" stroke="#8b3a2f" strokeWidth="1" strokeDasharray="4 2" />
            <text x="105" y="24" fontFamily="'IBM Plex Mono', monospace" fontSize="10" fill="#8b3a2f" textAnchor="middle" fontWeight="bold" letterSpacing="1.5">
              ★ APPROVED BRIEF ★
            </text>
            <text x="105" y="40" fontFamily="'IBM Plex Mono', monospace" fontSize="7.5" fill="#8b3a2f" textAnchor="middle" letterSpacing="1">
              RYMAN ARTS · PRODUCTION v1.0
            </text>
          </g>
        </svg>
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
