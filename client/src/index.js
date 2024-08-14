import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./Context/StoreContext";

// Use ReactDOM.render for non-concurrent rendering
ReactDOM.render(
  <React.StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
