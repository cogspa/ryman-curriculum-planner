// Auto-loads every PNG in ./assets/specimens — drop a new file in and it joins the strip.
const files = import.meta.glob("./assets/specimens/*.png", { eager: true, query: "?url", import: "default" });

const specimens = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src], i) => ({
    src,
    alt: `Creature silhouette study, specimen ${i + 1}`,
    file: path.split("/").pop(),
  }));

export default specimens;
