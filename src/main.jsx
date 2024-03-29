import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  // <BrowserRouter basename={process.env.PUBLIC_URL}>

  <BrowserRouter basename="/seniorproject">
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>

  //</React.StrictMode>,
);
