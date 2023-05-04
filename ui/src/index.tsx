import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import "./CSS/bootstrap.css";
import "./CSS/style.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
