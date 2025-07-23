import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/**/*.ts"], // Include all modules
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: false, // Skip declaration files for now
  splitting: true, // Preserve module structure
  bundle: false, // Disable bundling
  clean: false, // Avoid cleaning dist to prevent delays
  tsconfig: "./tsconfig.json",
  target: "es2020",
  silent: false, // Show compilation logs
  onSuccess: "nodemon dist/index.js", // Run the compiled code after each build
});
