// packages/config/utils.ts

import { EnvSchema, type EnvSchemaType } from "./schema";

export const isBrowser = typeof window !== "undefined";
export const isServer = !isBrowser;
import dotenv from "dotenv";

// Load dotenv for server-side
// Load dotenv for server-side
if (!isBrowser) {
  dotenv.config(); // Load .env file in Node.js environments
}

export const env: EnvSchemaType = (() => {
  const rawEnv = isBrowser
    ? Object.fromEntries(
        Object.entries(
          (import.meta as unknown as { env: Record<string, string> }).env || process.env
        ).map(([key, value]) => [key.replace(/^VITE_|^APP_/, ""), value])
      )
    : process.env;

  const parsed = EnvSchema.safeParse(rawEnv);
  if (!parsed.success) {
    throw new Error(
      `Environment validation failed: ${parsed.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ")}`
    );
  }
  return parsed.data;
})();

export const isBackendEnv = (env: EnvSchemaType): boolean =>
  isServer && !!env.PORT && !!env.DATABASE_URL;

export const isFrontendEnv = (env: EnvSchemaType): boolean =>
  isBrowser && !!env.API_BASE_URL;
