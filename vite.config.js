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
        albums: resolve(__dirname, "src/albums.html"),
        blogs: resolve(__dirname, "src/blogs.html"),
        contact: resolve(__dirname, "src/contact.html"),
      },
    },
  },
});