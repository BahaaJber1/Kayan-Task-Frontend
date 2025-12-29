import App from "@app/App.jsx";
import "@app/index.css";
import { setStartTheme } from "@store/slices/theme.js";
import { store } from "@store/store.js";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

store.dispatch(setStartTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

