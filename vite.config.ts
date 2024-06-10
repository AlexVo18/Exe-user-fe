import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { env } from "process";

export default defineConfig({
  define: {
    "process.env.SOME_KEY": JSON.stringify(env.SOME_KEY),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
