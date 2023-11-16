import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Browsing from "./pages/Home/Browsing";

export default function AppRoutes() {
  return (
    <Routes>
      {/* change this later on back to route to /login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Browsing />} />
    </Routes>
  );
}
