import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
/// <reference types="vitest" />

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    hmr: { overlay: false },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    css: true,
    coverage: {
      provider: "istanbul", // or 'v8'
    },
  },
});
