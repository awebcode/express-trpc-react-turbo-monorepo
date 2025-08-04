// components/TRPCProvider.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, queryClient, trpcClient } from "../../utils/trpc";
import type { ReactNode } from "react";

interface TRPCProviderProps {
  children: ReactNode;
}

export function TRPCProvider({ children }: TRPCProviderProps) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
