import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./CreatureCarousel.css";

export const defaultSpecimens = Array.from({ length: 20 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/specimens/specimen-${num}.png`,
    alt: `Character & creature silhouette study, specimen ${num}`,
    file: `specimen-${num}.png`
  };
});

/**
 * CreatureCarousel
 * An infinite, constant-speed horizontal strip. Two identical groups are rendered;
 * the track translates by exactly one group width + gap, so the seam is invisible.
 */
export default function CreatureCarousel({
  items = defaultSpecimens,
  height = 180,
  speed = 55,
  gap = 18,
  direction = "left",
  pauseOnHover = true,
  label = "Plate 01 — Character & Silhouette Studies",
}) {
  const groupRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [running, setRunning] = useState(true);

  // Measure one group so the loop distance is exact at any item count.
  useLayoutEffect(() => {
    const el = groupRef.current;
    if (!el) return;
    const measure = () => setDistance(el.getBoundingClientRect().width + gap);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [gap, items, height]);

  // Re-measure once webfonts/images settle.
  useEffect(() => {
    const id = setTimeout(() => {
      const el = groupRef.current;
      if (el) setDistance(el.getBoundingClientRect().width + gap);
    }, 400);
    return () => clearTimeout(id);
  }, [gap, items]);

  const duration = distance > 0 ? distance / speed : 0;

  const group = (clone) => (
    <ul className="cc-group" ref={clone ? null : groupRef} aria-hidden={clone || undefined}>
      {items.map((it, i) => (
        <li className="cc-card" key={`${clone ? "b" : "a"}-${i}`}>
          <div className="cc-plate">
            <img src={it.src} alt={clone ? "" : it.alt || `Specimen ${i + 1}`} height={height} draggable="false" />
          </div>
          <p className="cc-tag">
            <span>Spec.</span>
            <span className="cc-num">{String(i + 1).padStart(2, "0")}</span>
          </p>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="cc"
      style={{
        "--cc-gap": `${gap}px`,
        "--cc-height": `${height}px`,
        "--cc-distance": `${distance}px`,
        "--cc-duration": `${duration}s`,
      }}
    >
      <header className="cc-head">
        <p className="cc-eyebrow">{label}</p>
        <p className="cc-count">{items.length} specimens</p>
      </header>

      <div
        className="cc-viewport"
        onMouseEnter={pauseOnHover ? () => setRunning(false) : undefined}
        onMouseLeave={pauseOnHover ? () => setRunning(true) : undefined}
      >
        <div
          className={`cc-track cc-${direction}`}
          style={{ animationPlayState: running ? "running" : "paused" }}
        >
          {group(false)}
          {group(true)}
        </div>
      </div>

      <div className="cc-rail">
        <div className="cc-ticks" aria-hidden="true">
          {items.map((_, i) => (
            <i key={i} className={i % 5 === 0 ? "cc-tick cc-tick-major" : "cc-tick"} />
          ))}
          <span
            className={`cc-marker cc-${direction}-marker`}
            style={{ animationPlayState: running ? "running" : "paused" }}
          />
        </div>
        <button type="button" className="cc-btn" onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Resume"}
        </button>
      </div>
    </section>
  );
}
