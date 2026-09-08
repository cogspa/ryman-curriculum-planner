import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import CapstoneTimeline from "./CapstoneTimeline.jsx";

// Add ?vertical to the URL to preview the stacked version.
const orientation = new URLSearchParams(window.location.search).has("vertical") ? "vertical" : "horizontal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CapstoneTimeline orientation={orientation} />
  </React.StrictMode>
);
