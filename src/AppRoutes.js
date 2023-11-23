import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useauth.js";
import LoginPage from "./pages/Login/Login";
import Browsing from "./pages/Home/Browsing";
import Register from "./pages/Register/register";
import SearchResults from "./pages/Searchresult/searchresult";
import About from "./pages/Extra/About";
import Contact from "./pages/Extra/Contact";
import ManagerRegister from "./pages/Admin/managerpages/ManRegister/ManagerRegister";
import ManagerLogin from "./pages/Admin/managerpages/ManagerMain/ManagerLogin/ManagerLogin";
import Dashboard from "./pages/Admin/managerpages/ManagerMain/Dashboard.js";

export default function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const ProtectedRoute = ({ children }) => {
    return user && user.isAdmin ? (
      children
    ) : (
      <Navigate
        to="/ManagerMainPage/managerlogin"
        replace
        state={{ from: location }}
      />
    );
  };
  return (
    <Routes>
      {/* change this later on back to route to /login */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Browsing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/ManagerMainPage/managerregister"
        element={<ManagerRegister />}
      />
      <Route path="/ManagerMainPage/managerlogin" element={<ManagerLogin />} />
      <Route
        path="/ManagerMainPage/dashboard"
        element={ProtectedRoute({ children: <Dashboard /> })}
      />
    </Routes>
  );
}
