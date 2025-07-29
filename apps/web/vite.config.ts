import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Include if using Tailwind
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()], // Add tailwindcss if needed
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../packages/ui/src"), // Point @ to packages/ui/src
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"), // Keep for compatibility
      "@web": path.resolve(__dirname, "./src"), // Optional: new alias for apps/web/src
    },
  },
  envPrefix: "APP_",
});
