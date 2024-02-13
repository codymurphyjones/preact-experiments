import { createRequire } from "module";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import preact from "@preact/preset-vite";
import path from "path";
import vercel from "vite-plugin-vercel";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Assets": path.resolve(__dirname, "./src/assets"),
      "@Components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [
    vercel(),
    preact({
      reactAliasesEnabled: false,
      babel: {
        // Change cwd to load Preact Babel plugins
        cwd: createRequire(import.meta.url).resolve("@preact/preset-vite"),
      },
    }),
    dts(),
  ],
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  build: {
    // // generate .vite/manifest.json in outDir
    // watch: {
    //   include: "src/**",
    // },
    manifest: true,
    rollupOptions: {
      external: ["fsevents", /node:*/],
      // overwrite default .html entry
      input: "./server.js",
    },
  },
});
