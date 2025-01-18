import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_GITHUB_PAT: JSON.stringify(process.env.VITE_GITHUB_PAT),
  },
});
