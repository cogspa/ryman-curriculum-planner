// Builds one self-contained HTML file (React, fonts, styles inlined) → dist-single/index.html
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { outDir: "dist-single", assetsInlineLimit: 100000000, cssCodeSplit: false },
});
