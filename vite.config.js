import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  publicDir: "assets",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        // about: resolve(__dirname, "src/about.html"),
      },
    },
  },
});