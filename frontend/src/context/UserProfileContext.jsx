import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import backendURL from "../components/backendURL";

const UserProfileContext = createContext(null);

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    setProfileLoading(true);

    try {
      const res = await axios.get(`${backendURL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUser(res.data.user);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const updateUserProfile = async (formData) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    setProfileLoading(true);

    try {
      const res = await axios.put(`${backendURL}/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setUser(res.data.user);
      toast.success(res.data.message || "Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setProfileLoading(false);
    }
  };

  const logoutUser = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${backendURL}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      localStorage.removeItem("token");
      setUser(null);

      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider
      value={{
        user,
        setUser,
        profileLoading,
        fetchUserProfile,
        updateUserProfile,
        logoutUser,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
