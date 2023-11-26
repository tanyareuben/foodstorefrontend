//GETTING THE DATA FROM THE BACKEND
//communication of frontend and back end
import axios from "axios";

//getting user data
export const getUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const login = async (email, password) => {
  const { data } = await axios.post("/users/login", {
    email,
    password,
  });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const register = async (registerData) => {
  const { data } = await axios.post(
    "/users/register",
    registerData
  );
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const isUserLoggedIn = async () => {
  const user = getUser();
  if (!user || !user.token) {
    return false;
  }
  try {
    // Here you would call an endpoint that verifies the token
    const response = await axios.get(
      "http://localhost:5001/api/users/validateToken",
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

//create logout function
