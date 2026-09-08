import { useEffect, useMemo, useState } from "react";

/* ============================================================
   CapstoneTimeline.jsx — pLAtform / Ryman Arts
   September 2026 Capstone timeline + Sept 19 run of show.

   <CapstoneTimeline />                       horizontal (default)
   <CapstoneTimeline orientation="vertical" /> stacked version
   Below 720px the horizontal layout stacks automatically.

   Edit the DATA block to change dates, copy, or times.
   Design system: oxblood #8b3a2f, paper #f5efe1,
   Newsreader (display/body), IBM Plex Mono (times/labels).
   ============================================================ */

export const DATA = {
  title: "September pLAtform Capstone Timeline",
  year: 2026,
  days: [
    {
      date: 5,
      weekday: "Saturday",
      kind: "off",
      title: "No class",
      detail: "Continue working on your Capstone project independently if you have time.",
    },
    {
      date: 8,
      weekday: "Tuesday",
      kind: "class",
      title: "Capstone project reviews",
      detail: "Regular Tuesday class focused on Capstone project reviews. There will be no guest speaker.",
    },
    {
      date: 12,
      weekday: "Saturday",
      kind: "review",
      time: "1:00 PM",
      title: "Initial portfolio review",
      detail: "Portfolio review with Heidi Hirsch.",
    },
    {
      date: 14,
      weekday: "Monday",
      kind: "deadline",
      title: "Portfolio submission deadline",
      detail: "Upload your portfolio to Dropbox for the WDI review.",
    },
    {
      date: 18,
      weekday: "Friday",
      kind: "offsite",
      time: "10:00 AM – 12:30 PM",
      title: "WDI tour and portfolio review",
      detail: "",
    },
    {
      date: 19,
      weekday: "Saturday",
      kind: "showcase",
      time: "11:00 AM – 3:30 PM",
      title: "Capstone presentation and reception",
      detail: "Run of show below.",
      // Run of show. `start`/`end` are minutes after 11:00 AM and drive the ruler.
      schedule: [
        { start: 0, end: 45, time: "11:00 AM", label: "Students arrive to set up", short: "Set up", lane: "prep" },
        { start: 45, end: 60, time: "11:45 AM", label: "Space ready for guest arrival", lane: "prep" },
        {
          start: 60, end: 90, time: "12:00 PM",
          label: "Official event begins", short: "Doors",
          note: "Beverages available. Food is served during the reception.",
          lane: "event",
        },
        {
          start: 90, end: 95, time: "12:30 PM",
          label: "Opening remarks",
          lane: "event",
          speakers: [
            { name: "Audrey", says: "welcomes guests, shares her excitement about the program's launch, introduces Rebecca" },
            { name: "Rebecca", says: "on the depth of the program and its connection to Ryman Arts alumni, introduces Joe" },
            { name: "Joe", says: "on the semester and future opportunities, introduces the student presenters" },
          ],
        },
        {
          start: 95, end: 135, time: "12:35 – 1:15 PM",
          label: "Student presentations", short: "Presentations",
          note: "Three minutes maximum per student.",
          lane: "event",
        },
        {
          start: 105, end: 105, time: "12:45 PM",
          label: "Catering delivery", short: "Catering",
          note: "Through the rear entrance, set up quietly while presentations continue.",
          lane: "back",
        },
        { start: 135, end: 240, time: "1:15 – 3:00 PM", label: "Reception", short: "Reception", note: "Food and beverages available.", lane: "event" },
        { start: 240, end: 270, time: "3:00 PM", label: "Guests depart, cleanup begins", short: "Cleanup", lane: "prep" },
        { start: 270, end: 270, time: "3:30 PM", label: "Staff depart", lane: "prep" },
      ],
    },
  ],
};

/* ---------- helpers ---------- */

const RULER = { total: 270, hours: [0, 60, 120, 180, 240], hourLabels: ["11 AM", "12 PM", "1 PM", "2 PM", "3 PM"] };

function isPast(day, today, year) {
  if (!today) return false;
  const d = new Date(year, 8 /* September */, day.date);
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d < t;
}

function useNarrow(bp) {
  const query = `(max-width: ${bp}px)`;
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setNarrow(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return narrow;
}

/* ---------- ruler (SVG) for the showcase day ---------- */

function DayRuler({ schedule, compact = false }) {
  const W = compact ? 400 : 920, H = 118, PAD = compact ? 8 : 24;
  const x = (m) => PAD + ((W - PAD * 2) * m) / RULER.total;
  const BLOCK_Y = 40, BLOCK_H = 40, BASE_Y = 84;
  const blocks = schedule.filter((s) => s.end > s.start);
  const points = schedule.filter((s) => s.end === s.start && s.lane === "back");

  return (
    <svg className="cap-ruler" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Run of show, 11 AM to 3:30 PM">
      <line x1={x(0)} y1={BASE_Y} x2={x(RULER.total)} y2={BASE_Y} className="cap-ruler-base" />
      {[...RULER.hours, RULER.total].map((m, i) => {
        const label = RULER.hourLabels[i] ?? (compact ? null : "3:30");
        return (
          <g key={m}>
            <line x1={x(m)} y1={BASE_Y} x2={x(m)} y2={BASE_Y + 8} className="cap-ruler-tick" />
            {label && (
              <text x={x(m)} y={BASE_Y + 24} textAnchor="middle" className="cap-ruler-hour">{label}</text>
            )}
          </g>
        );
      })}

      {blocks.map((b) => {
        const x1 = x(b.start) + 1, x2 = x(b.end) - 1;
        const label = b.short ?? b.label;
        const fits = x2 - x1 > label.length * 8 + 16;
        return (
          <g key={b.label}>
            <rect x={x1} y={BLOCK_Y} width={Math.max(2, x2 - x1)} height={BLOCK_H} className={`cap-ruler-block is-${b.lane}`} />
            {fits && <text x={x1 + 9} y={BLOCK_Y + 25} className={`cap-ruler-label is-${b.lane}`}>{label}</text>}
          </g>
        );
      })}

      {/* back-of-house point events sit above the bar (catering arrives mid-presentation) */}
      {points.map((p) => (
        <g key={p.label}>
          <line x1={x(p.start)} y1={22} x2={x(p.start)} y2={BLOCK_Y} className="cap-ruler-point" />
          <circle cx={x(p.start)} cy={20} r={4} className="cap-ruler-dot" />
          <text x={x(p.start) + 10} y={24} className="cap-ruler-label is-back">
            {p.short ?? p.label}, {p.time}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- run of show list ---------- */

function RunOfShow({ schedule }) {
  return (
    <ol className="cap-ros">
      {schedule.map((s) => (
        <li key={s.time + s.label} className={`cap-ros-row is-${s.lane}`}>
          <span className="cap-ros-time">{s.time}</span>
          <div className="cap-ros-body">
            <span className="cap-ros-label">{s.label}</span>
            {s.note && <p className="cap-ros-note">{s.note}</p>}
            {s.speakers && (
              <ol className="cap-speakers">
                {s.speakers.map((sp) => (
                  <li key={sp.name}>
                    <span className="cap-speaker-name">{sp.name}</span> {sp.says}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- main component ---------- */

export default function CapstoneTimeline({
  data = DATA,
  orientation = "horizontal",
  today = new Date(),
  showToday = true,
}) {
  const stacked = useNarrow(720);
  const compactRuler = useNarrow(640);
  const horizontal = orientation === "horizontal" && !stacked;

  const todayLabel = useMemo(
    () => today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    [today]
  );
  const showDay = data.days.find((d) => d.schedule);

  return (
    <section className={`cap-timeline${horizontal ? " is-horizontal" : ""}`} aria-labelledby="cap-timeline-title">
      <style>{CSS}</style>

      <header className="cap-head">
        <h1 id="cap-timeline-title" className="cap-title">{data.title}</h1>
        {showToday && <p className="cap-today">Today is {todayLabel}. Past dates are dimmed.</p>}
      </header>

      <ol className="cap-days" style={horizontal ? { gridTemplateColumns: `repeat(${data.days.length}, 1fr)` } : undefined}>
        {data.days.map((day, i) => {
          const next = data.days[i + 1];
          const gap = next ? next.date - day.date : 0;
          const past = isPast(day, today, data.year);
          return (
            <li key={day.date} className={`cap-day is-${day.kind}${past ? " is-past" : ""}`}>
              <div className="cap-date">
                <span className="cap-num">{day.date}</span>
                <span className="cap-weekday">{day.weekday.slice(0, 3)}</span>
              </div>

              <div className="cap-spine" aria-hidden="true">
                <span className="cap-marker" />
                {next && <span className="cap-gap">{gap} {gap === 1 ? "day" : "days"}</span>}
              </div>

              <div className="cap-body">
                <h2 className="cap-event">{day.title}</h2>
                {day.time && <span className="cap-time">{day.time}</span>}
                {day.detail && <p className="cap-detail">{day.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {showDay && (
        <section className="cap-show" aria-labelledby="cap-show-title">
          <h2 id="cap-show-title" className="cap-show-title">
            Run of show, {showDay.weekday} September {showDay.date}
          </h2>
          <DayRuler schedule={showDay.schedule} compact={compactRuler} />
          <RunOfShow schedule={showDay.schedule} />
        </section>
      )}
    </section>
  );
}

/* ---------- styles (scoped under .cap-timeline) ---------- */

const CSS = `
.cap-timeline {
  --ox: #8b3a2f;
  --ox-soft: rgba(139, 58, 47, 0.14);
  --paper: #f5efe1;
  --ink: #1d1714;
  --ink-2: #6a5c53;
  --rule: #d8ccb6;
  --serif: "Newsreader", Georgia, "Times New Roman", serif;
  --mono: "IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace;

  background: var(--paper);
  color: var(--ink);
  font-family: var(--serif);
  max-width: 840px;
  margin: 0 auto;
  padding: 48px 24px 72px;
  line-height: 1.5;
}
.cap-timeline * { box-sizing: border-box; }
.cap-timeline h1, .cap-timeline h2, .cap-timeline p, .cap-timeline ol { margin: 0; }
.cap-timeline ol { list-style: none; padding: 0; }

/* header */
.cap-head { margin-bottom: 40px; border-bottom: 2px solid var(--ox); padding-bottom: 20px; }
.cap-title {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(34px, 5vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.01em;
}
.cap-today { font-family: var(--mono); font-size: 12px; color: var(--ink-2); margin-top: 14px; }

/* ---- stacked (vertical) layout: date | spine | body ---- */
.cap-day {
  display: grid;
  grid-template-columns: 64px 24px 1fr;
  column-gap: 12px;
  padding: 22px 0 28px;
  position: relative;
}
.cap-date { text-align: right; }
.cap-num {
  display: block;
  font-family: var(--serif);
  font-weight: 500;
  font-size: 44px;
  line-height: 1;
  font-variant-numeric: lining-nums tabular-nums;
}
.cap-weekday { display: block; font-family: var(--mono); font-size: 12px; color: var(--ink-2); line-height: 1; margin-top: 6px; }

.cap-spine { position: relative; }
.cap-spine::before, .cap-spine::after {
  content: ""; position: absolute; background: var(--rule);
}
/* vertical: line from top of row to marker, and marker to bottom of row */
.cap-spine::before { left: 11px; width: 2px; top: -22px; height: 44px; }
.cap-spine::after  { left: 11px; width: 2px; top: 22px; bottom: -28px; }
.cap-day:first-child .cap-spine::before { display: none; }
.cap-day:last-child .cap-spine::after { display: none; }
.cap-gap { display: none; }

.cap-marker {
  position: absolute; z-index: 1;
  left: 5px; top: 15px;
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 2px solid var(--ox);
  background: var(--paper);
}
.cap-day.is-off .cap-marker { border-color: var(--rule); }
.cap-day.is-deadline .cap-marker { background: var(--ox); border-radius: 2px; transform: rotate(45deg); }
.cap-day.is-showcase .cap-marker { background: var(--ox); width: 18px; height: 18px; left: 3px; top: 13px; }

.cap-body { padding-top: 8px; min-width: 0; }
.cap-event { font-family: var(--serif); font-weight: 500; font-size: 24px; line-height: 1.15; }
.cap-day.is-showcase .cap-event { font-size: 30px; }
.cap-time { display: block; font-family: var(--mono); font-size: 13px; color: var(--ox); margin-top: 6px; }
.cap-detail { margin-top: 8px; font-size: 18px; color: var(--ink-2); max-width: 58ch; }
.cap-day.is-showcase .cap-detail { font-style: italic; }

.cap-day.is-off .cap-event { color: var(--ink-2); font-weight: 400; font-style: italic; }
.cap-day.is-past { opacity: 0.45; }

/* ---- horizontal layout: one column per date, spine runs left to right ---- */
.cap-timeline.is-horizontal { max-width: 1160px; }
.is-horizontal .cap-days { display: grid; column-gap: 0; margin-top: 8px; }
.is-horizontal .cap-day {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 24px auto;
  align-content: start; /* keep the spine level regardless of body length */
  row-gap: 22px;
  padding: 0 20px 0 0;
}
.is-horizontal .cap-day:last-child { padding-right: 0; }
.is-horizontal .cap-date { text-align: left; display: flex; align-items: baseline; gap: 8px; }
.is-horizontal .cap-weekday { margin-top: 0; }

.is-horizontal .cap-spine { height: 24px; }
.is-horizontal .cap-spine::before { display: none; }
.is-horizontal .cap-spine::after {
  left: 12px; right: -20px; top: 11px; bottom: auto; width: auto; height: 2px;
}
.is-horizontal .cap-day:last-child .cap-spine::after { display: none; }
.is-horizontal .cap-marker { left: 5px; top: 5px; }
.is-horizontal .cap-day.is-showcase .cap-marker { left: 3px; top: 3px; }
.is-horizontal .cap-gap {
  display: block;
  position: absolute;
  left: calc(50% + 6px); top: -18px;
  transform: translateX(-50%);
  font-family: var(--mono); font-size: 11px; color: var(--ink-2);
  white-space: nowrap;
}

.is-horizontal .cap-body { padding-top: 0; margin-top: -6px; }
.is-horizontal .cap-event, .is-horizontal .cap-day.is-showcase .cap-event { font-size: 20px; }
.is-horizontal .cap-time { font-size: 12px; }
.is-horizontal .cap-detail { font-size: 15px; margin-top: 8px; }

/* ---- showcase: ruler + run of show ---- */
.cap-show { margin-top: 36px; border-top: 1px solid var(--rule); padding-top: 26px; }
.is-horizontal .cap-show { margin-top: 56px; }
.cap-show-title { font-family: var(--serif); font-weight: 500; font-size: 26px; line-height: 1.15; margin-bottom: 18px; }

.cap-ruler { width: 100%; height: auto; display: block; overflow: visible; }
.cap-ruler-base { stroke: var(--ink); stroke-width: 1.5; }
.cap-ruler-tick { stroke: var(--ink); stroke-width: 1.5; }
.cap-ruler-hour { font-family: var(--mono); font-size: 13px; fill: var(--ink-2); }
.cap-ruler-block.is-prep { fill: var(--ox-soft); }
.cap-ruler-block.is-event { fill: var(--ox); }
.cap-ruler-label { font-family: var(--mono); font-size: 13px; }
.cap-ruler-label.is-event { fill: var(--paper); }
.cap-ruler-label.is-prep, .cap-ruler-label.is-back { fill: var(--ink-2); }
.cap-ruler-point { stroke: var(--ink-2); stroke-width: 1.5; stroke-dasharray: 3 3; }
.cap-ruler-dot { fill: var(--ink-2); }

.cap-ros { margin-top: 22px; border-top: 1px solid var(--rule); }
.cap-ros-row {
  display: grid;
  grid-template-columns: 132px 1fr;
  column-gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid var(--rule);
  break-inside: avoid;
}
.is-horizontal .cap-ros { column-count: 2; column-gap: 48px; }
.cap-ros-time { font-family: var(--mono); font-size: 13px; color: var(--ink); padding-top: 3px; white-space: nowrap; }
.cap-ros-row.is-prep .cap-ros-time, .cap-ros-row.is-back .cap-ros-time { color: var(--ink-2); }
.cap-ros-label { font-size: 19px; font-weight: 500; }
.cap-ros-row.is-prep .cap-ros-label, .cap-ros-row.is-back .cap-ros-label { font-weight: 400; color: var(--ink-2); }
.cap-ros-note { font-size: 16px; color: var(--ink-2); margin-top: 2px; max-width: 54ch; }
.cap-speakers { margin-top: 8px; padding-left: 0; counter-reset: sp; }
.cap-speakers li {
  counter-increment: sp;
  font-size: 16px; color: var(--ink-2);
  padding: 4px 0 4px 26px; position: relative;
}
.cap-speakers li::before {
  content: counter(sp);
  position: absolute; left: 0; top: 5px;
  font-family: var(--mono); font-size: 12px; color: var(--ox);
}
.cap-speaker-name { color: var(--ink); font-weight: 500; }

/* narrow screens (stacked layout only) */
@media (max-width: 640px) {
  .cap-timeline { padding: 32px 16px 56px; }
  .cap-day { grid-template-columns: 44px 20px 1fr; column-gap: 8px; }
  .cap-spine::before, .cap-spine::after { left: 9px; }
  .cap-spine::before { top: -22px; height: 39px; }
  .cap-spine::after { top: 17px; }
  .cap-marker { left: 3px; top: 10px; }
  .cap-day.is-showcase .cap-marker { left: 1px; top: 8px; }
  .cap-body { padding-top: 5px; }
  .cap-num { font-size: 34px; }
  .cap-event { font-size: 21px; }
  .cap-day.is-showcase .cap-event { font-size: 25px; }
  .cap-detail { font-size: 17px; }
  .cap-show-title { font-size: 22px; }
  .cap-ros-row { grid-template-columns: 1fr; row-gap: 2px; }
}

/* print: one clean sheet */
@media print {
  .cap-timeline { max-width: none; padding: 0; background: #fff; }
  .cap-today { display: none; }
  .cap-day.is-past { opacity: 1; }
  .cap-day, .cap-ros-row { break-inside: avoid; }
}
`;
