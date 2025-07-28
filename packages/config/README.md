# @my-monorepo/config

Shared configuration package for the monorepo, providing environment variable validation and centralized configuration.

## Installation

```bash
pnpm add @my-monorepo/config
```

## Environment Variables

The following environment variables are supported:

- **NODE_ENV** (optional, default: `"development"`): Environment mode (`"development"`, `"production"`, or `"test"`).
- **PORT** (required on server, optional on client): Server port number (e.g., `4000`).
- **DATABASE_URL** (required on server, optional on client): Database connection URL (e.g., `postgres://user:pass@localhost:5432/db`).
- **BACKEND_BASE_URL** (required): Base URL for the backend (e.g., `http://localhost:4000`).
- **API_BASE_URL** (optional): API base URL (defaults to `BACKEND_BASE_URL/api`).
- **TRPC_BASE_URL** (optional): tRPC base URL (defaults to `BACKEND_BASE_URL/trpc`).

For client-side (browser) environments, prefix variables with `VITE_` (e.g., `VITE_BACKEND_BASE_URL`) when using Vite.

## Usage

```typescript
import { global_config, AppConfig } from "@my-monorepo/config";

console.log(global_config.api.backendBaseUrl); // e.g., "http://localhost:4000"
console.log(global_config.web.isDev); // true in development
```

## Notes

- Server-side environments require `PORT` and `DATABASE_URL`.
- Client-side environments use defaults for `PORT` (`4000`) and `DATABASE_URL` (`http://localhost:5432`).
- The configuration is frozen to prevent mutations.