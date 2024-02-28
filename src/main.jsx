import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import { DataProvider } from "./context/DataContext.jsx";
import { getAllAmenities } from "./actions/rentals.jsx";

store.dispatch(getAllAmenities())
// store.dispatch(getRentalData)
ReactDOM.createRoot(document.getElementById("RentEase")).render(
  <React.Fragment>
    <Router>
      <Provider store={store}>
        <DataProvider>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </DataProvider>
      </Provider>
    </Router>
  </React.Fragment>
);
