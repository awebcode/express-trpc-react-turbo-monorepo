import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@repo/ui/styles/globals.css";
import App from "./App.tsx";
import { TRPCProvider } from "./components/providers/TRPCProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TRPCProvider>
      <App />
    </TRPCProvider>
  </StrictMode>
);
