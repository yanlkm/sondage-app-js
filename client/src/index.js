import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import axios from "axios";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user.reducers";
import factoriesReducers from "./reducers/factories.reducers";
import usersReducers from "./reducers/users.reducers";

axios.defaults.withCredentials = true;

const store = configureStore({
  reducer: {
    user: userReducers,
    users : usersReducers,
    etablishment : factoriesReducers
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
