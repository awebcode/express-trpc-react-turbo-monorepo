//packages/config/index.ts

import dotenv from "dotenv";
import { env } from "./utils";
const isBrowser = typeof window !== "undefined";

if (!isBrowser) {
  dotenv.config(); // Ensure .env is loaded before accessing process.env
}

/**
 * Centralized configuration for the application.
 */
interface ApiConfig {
  port: number;
  isDev: boolean;
  databaseUrl: string;
  backendBaseUrl: string;
  apiBaseUrl: string;
  trpcBaseUrl: string;
}

interface WebConfig {
  isDev: boolean;
}

interface AppConfig {
  api: ApiConfig;
  web: WebConfig;
}

// Map VITE_ prefixed variables to non-prefixed keys
const getEnv = (key: string): string | undefined => {
  if (isBrowser) {
    return env[`APP_${key}`] || env[key];
  }
  return env[key];
};

const backendBaseUrl = getEnv("BACKEND_BASE_URL") || "http://localhost:4000";
const normalizedBackendBaseUrl = backendBaseUrl.replace(/\/$/, "");

const global_config: AppConfig = {
  api: {
    port: getEnv("PORT") as unknown as number,
    isDev: (getEnv("NODE_ENV") || "development") === "development",
    databaseUrl: getEnv("DATABASE_URL")!,
    backendBaseUrl: normalizedBackendBaseUrl,
    apiBaseUrl: getEnv("API_BASE_URL") || `${normalizedBackendBaseUrl}/api`,
    trpcBaseUrl: getEnv("TRPC_BASE_URL") || `${normalizedBackendBaseUrl}/trpc`,
  },
  web: {
    isDev: (getEnv("NODE_ENV") || "development") === "development",
  },
};

Object.freeze(global_config.api);
Object.freeze(global_config.web);
Object.freeze(global_config);
console.log({ global_config });

if (!isBrowser && !global_config.api.databaseUrl) {
  throw new Error("DATABASE_URL must be defined");
}

if (!global_config.api.port && !isBrowser) {
  throw new Error("PORT must be defined");
}

if (!global_config.api.backendBaseUrl) {
  throw new Error("BACKEND_BASE_URL must be defined");
}
if (!global_config.api.apiBaseUrl) {
  throw new Error("API_BASE_URL could not be derived");
}
if (!global_config.api.trpcBaseUrl) {
  throw new Error("TRPC_BASE_URL could not be derived");
}

export { global_config };

export type { ApiConfig, WebConfig, AppConfig };
