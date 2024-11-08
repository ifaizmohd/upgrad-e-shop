import React, { useCallback, useEffect, useState } from "react";
import {
  getItemFromStorage,
  removeItemFromStorage,
  saveToStorage,
} from "../../common/lib/utils";
import { Authentication } from "../../common/api";
import { AuthContext } from "./Auth.context";
import { useNotification } from "./Notification.provider";

const AuthProvider = ({ children }) => {
  // State variables to manage authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // Custom hook for displaying notifications
  const { showNotification } = useNotification();

  // Login function
  const login = async (formData) => {
    try {
      const { data, error } = await Authentication.login(formData);
      if (data) {
        // Save user session data to local storage
        saveToStorage("session", data);
        // Set the logged-in state
        setIsLoggedIn(true);
        // Redirect to the products page
        window.location.href = "/products";
      } else if (error) {
        // Show an error notification
        showNotification("Username or Password is Incorrect!", "error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // Signup function
  const signup = async (formData) => {
    const { data } = await Authentication.signUp(formData);
    console.log("[SIGN UP] ", data);
    if (data.message && window.location) {
      window.location.href = "/products";
    }
  };

  // Logout function
  const logout = useCallback(() => {
    // Remove session data from local storage
    removeItemFromStorage("token");
    removeItemFromStorage("session");
    // Reset authentication state
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  // Function to check if the user is an admin
  const getIsAdmin = useCallback((user) => {
    const adminRole = user?.roles?.find(
      (role) => role?.toLowerCase() === "admin"
    );
    if (!!adminRole) {
      setIsAdmin(true);
    }
  }, []);

  // Function to fetch user details from local storage
  const getUserDetails = useCallback(async () => {
    const session = getItemFromStorage("session");
    if (session) {
      // Set user details and check admin role
      setUser(session);
      getIsAdmin(session);
      setIsAdmin(true);
    }
  }, [getIsAdmin]);

  // Effect to fetch user details on initial render and when isLoggedIn changes
  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails();
    }
  }, [isLoggedIn, getUserDetails]);

  // Effect to check for existing session on initial render
  useEffect(() => {
    const session = getItemFromStorage("session");
    if (session) {
      setIsLoggedIn(true);
      setIsAdmin(true);
    }
  }, []);

  // Provide authentication context to child components
  return (
    <AuthContext.Provider
      value={{ login, isLoggedIn, logout, signup, isAdmin, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
