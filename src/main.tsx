import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import App from "@/App.tsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/clippings-to-cards">
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
);
