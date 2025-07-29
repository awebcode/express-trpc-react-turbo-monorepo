import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Button } from "@repo/ui/components/ui/button";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
    <Button variant={"destructive"} className="bg-light-silver"> Test </Button>
  </StrictMode>
);
