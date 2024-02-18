import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";

ReactDOM.createRoot(document.getElementById("RentEase")).render(
  <React.Fragment>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Provider>
    </Router>
  </React.Fragment>
);
