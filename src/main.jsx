import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App.jsx";
import theme from "./theme.js";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);