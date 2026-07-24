import CreatureCarousel from "./CreatureCarousel.jsx";
import specimens from "./specimens.js";
import "./styles.css";

export default function App() {
  return (
    <main className="page">
      <h1 className="page-title">Bestiary</h1>
      <p className="page-note">
        Black-shape pass. Read the silhouettes as they travel — hover to hold the strip.
      </p>

      <CreatureCarousel
        items={specimens}
        height={180}
        speed={55}
        gap={18}
        direction="left"
        pauseOnHover
        label="Plate 01 — silhouette studies"
      />
    </main>
  );
}
