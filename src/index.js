import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";
import { captureMarketingParams } from "@/lib/marketing";

// Store utm_* / gclid etc. from the landing URL (30-day cookies) before the router can change the URL.
captureMarketingParams();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

// Only honour PUBLIC_URL as a router basename when it is a path (e.g. "/arkade"), not "." or a full URL.
const basename = (process.env.PUBLIC_URL || "").startsWith("/") ? process.env.PUBLIC_URL : "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);