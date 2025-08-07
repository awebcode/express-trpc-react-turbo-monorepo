// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@repo/api";
import { root_config } from "@repo/config";

// Initialize tRPC client with React Query
export const trpc = createTRPCReact<AppRouter>();


// Create a QueryClient instance for React Query
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 2, // Retry failed queries twice
        },
    },
});

// Create tRPC client with httpBatchLink
export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: root_config.trpcBaseUrl, // Adjust to your backend URL
            // fetch: (input, init) => fetch(input, { ...init, credentials: 'include' }),
        }),
    ],
});
