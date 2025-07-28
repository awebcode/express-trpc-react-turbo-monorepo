// packages/config/index.ts
import { env, isBackendEnv, isBrowser } from "./utils";

import dotenv from "dotenv";

// Load dotenv for server-side
// Load dotenv for server-side
if (!isBrowser) {
  dotenv.config(); // Load .env file in Node.js environments
}

export interface Config {
  nodeEnv: "development" | "production" | "test";
  isDev: boolean;
  backendBaseUrl: string;
  apiBaseUrl: string;
  trpcBaseUrl: string;
  port?: number | undefined; // Backend-only
  databaseUrl?: string | undefined; // Backend-only
}
export const root_config: Config = {
  nodeEnv: env.NODE_ENV,
  isDev: env.NODE_ENV === "development",
  backendBaseUrl: env.BACKEND_BASE_URL,
  apiBaseUrl: env.API_BASE_URL || `${env.BACKEND_BASE_URL}/api`,
  trpcBaseUrl: env.TRPC_BASE_URL || `${env.BACKEND_BASE_URL}/trpc`,
  port: isBackendEnv(env) ? env.PORT : undefined,
  databaseUrl: isBackendEnv(env) ? env.DATABASE_URL : undefined,
};

// Freeze config to prevent accidental modifications
Object.freeze(root_config);

// Utility to access config values
export function getConfig<K extends keyof Config>(key: K): Config[K] {
  return root_config[key];
}

export { EnvSchema, type EnvSchemaType } from "./schema";
export * from "./utils";
