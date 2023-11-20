import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import Browsing from "./pages/Home/Browsing";
import Register from "./pages/Register/register";
import SearchResults from "./pages/Searchresult/searchresult";

export default function AppRoutes() {
  return (
    <Routes>
      {/* change this later on back to route to /login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Browsing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}
