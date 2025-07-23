// packages/config/schema.ts
import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  BACKEND_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url().optional(),
  TRPC_BASE_URL: z.string().url().optional(),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
