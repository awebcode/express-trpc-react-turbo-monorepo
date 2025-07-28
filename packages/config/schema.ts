// packages/config/schema.ts
import { z } from "zod";

export const EnvSchema = z.object({
  // Shared variables
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  BACKEND_BASE_URL: z
    .string()
    .url("BACKEND_BASE_URL must be a valid URL")
    .transform((url) => url.replace(/\/$/, "")),

  // Backend-specific
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, "PORT must be a positive number")
    .default("4000")
    .optional(),
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL").optional(),

  // Frontend-specific
  API_BASE_URL: z.string().url("API_BASE_URL must be a valid URL").optional(),
  TRPC_BASE_URL: z.string().url("TRPC_BASE_URL must be a valid URL").optional(),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;