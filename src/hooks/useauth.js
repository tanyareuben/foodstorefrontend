//FRONTEND USER FUNCTIONS
import { useState, createContext, useContext, useEffect } from "react";
import * as userService from "../services/userService.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Ideally, you would have a method to validate the current token
      const isLoggedIn = await userService.isUserLoggedIn();
      if (!isLoggedIn && user) {
        toast.info("Session expired. Please log in again.");
        userService.logout();
        // If the validation fails, clear the user state
        setUser(null);
      }
    };

    if (user) {
      checkAuthStatus();
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      if (user.isAdmin === true) {
        toast.success("Logged in as Admin!");
        navigate("/ManagerMainPage/dashboard");
      } else {
        toast.success("Logged in as Customer!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      if (user.isAdmin === true) {
        toast.success("Registered  as Admin!");
        navigate("/ManagerMainPage/dashboard");
      } else {
        toast.success("Registered as Customer!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success("Logout Successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
