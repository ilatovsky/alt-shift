import { ErrorInfo, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./normalize.css";
import "./main.css";
import { App } from "./App";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorBoundary";

const logError = (error: Error, info: ErrorInfo) => {
  console.error(error, info);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
