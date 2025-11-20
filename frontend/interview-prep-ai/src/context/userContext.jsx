import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/appPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data.user || response.data);
      } catch (error) {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, [user]);

  const updateUser = (data) => {
    const token = data.token;
    const userData = data.user || data;

    localStorage.setItem("token", token);
    setUser(userData);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
