import { generateOpenApiDocument } from "trpc-to-openapi";
import { appRouter } from "./routers";
import { global_config } from "@repo/config";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "TRPC API",
  description: "OpenAPI compliant REST API built using tRPC with Fastify",
  version: "1.0.0",
  baseUrl: `${global_config.api.apiBaseUrl}/api`,
  docsUrl: "https://github.com/mcampa/trpc-to-openapi",
});
