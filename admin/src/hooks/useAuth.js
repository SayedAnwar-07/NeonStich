import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendURL from "../components/allURL.js";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = backendURL;

  const checkAuth = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle user login
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(
        `${url}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
    } catch (error) {
      console.error("Login Error:", error);
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${url}/api/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error("Logout error:", error);
      }
    }

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return { user, loading, checkAuth, handleLogin, handleLogout };
};

export default useAuth;
