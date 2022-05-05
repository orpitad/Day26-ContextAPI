import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "./features/users/CreateUser";
import UserState from "./context/user/UserState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserState>
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Navigate replace to="/"/>} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/edit/:id" element={<CreateUser />} />

    </Routes>
  </HashRouter>
  </UserState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
