import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./0-app/index";

import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
