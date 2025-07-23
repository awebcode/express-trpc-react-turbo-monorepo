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
import { global_config } from "@repo/config";

const app = express();

// Setup CORS
app.use(
  cors({
    origin: "*",
  })
);

// Parse JSON bodies
app.use(express.json());

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
  res.send("Hello from Express + tRPC!");
});

// Start the server
app.listen(global_config.api.port, () => {
  console.log(`🚀 Server running on ${global_config.api.apiBaseUrl}`);
  console.log(`📚 Swagger UI: ${global_config.api.trpcBaseUrl}/docs`);
});
