import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

function initializeReact() {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// Get xsrf-token cookie in development
if (process.env.NODE_ENV === "development") {
  fetch("/api/csrf/restore").then(initializeReact);
} else {
  initializeReact();
}
