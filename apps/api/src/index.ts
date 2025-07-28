// src/server.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createOpenApiExpressMiddleware } from "trpc-to-openapi";
import swaggerUi from "swagger-ui-express";

import { appRouter } from "./routers";
import { createContext } from "./context";
import { openApiDocument } from "./openapi";
import { root_config } from "@repo/config";

const app = express();
// Setup CORS
app.use(
  cors({
    origin: "*",
  })
);

// Parse JSON bodies
app.use(express.json());
//root prefix v1

// tRPC middleware
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
// OpenAPI middleware
app.use(
  "/api",
  createOpenApiExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
// Serve OpenAPI JSON
app.get("/openapi.json", (_req, res) => {
  res.json(openApiDocument);
});

// Swagger UI route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

// Start the server
app.listen(root_config.port, () => {
  console.log(`🚀 Server running on ${root_config.apiBaseUrl}`);
  console.log(`📚 Swagger UI: ${root_config.trpcBaseUrl}`);
  console.log(`📚 OpenAPI JSON: ${root_config.backendBaseUrl}/openapi.json`);
  console.log(`📚 Docs: ${root_config.backendBaseUrl}/docs`);
});
