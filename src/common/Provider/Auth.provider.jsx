import React, { useCallback, useEffect, useState } from "react";
import {
  getItemFromStorage,
  removeItemFromStorage,
  saveToStorage,
} from "../lib/utils";
import { Authentication } from "../api";
import { AuthContext } from "./Auth.context";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      const res = await Authentication.login(formData);
      if (res?.data && res?.data.token) {
        saveToStorage("session", { email: formData?.username });
        saveToStorage("token", res?.data.token);
        setIsLoggedIn(true);
        if (window && window.location) {
          window.location.href = "/products";
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const signup = async (formData) => {
    const { data } = await Authentication.signUp(formData);
    console.log("[SIGN UP] ", data);
    if (data.message && window.location) {
      window.location.href = "/products";
    }
  };

  const logout = useCallback(() => {
    removeItemFromStorage("token");
    removeItemFromStorage("session");
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  const getIsAdmin = useCallback((user) => {
    const adminRole = user?.roles?.find(
      (role) => role?.name?.toLowerCase() === "admin"
    );
    if (!!adminRole) setIsAdmin(true);
  }, []);

  const getUserDetails = useCallback(async () => {
    const session = getItemFromStorage("session");
    if (session) {
      const res = await Authentication.getUserDetails(session.email);
      setUser(res?.data);
      if (res?.data) {
        saveToStorage("user", res?.data);
        getIsAdmin(res?.data);
      }
    }
  }, []);

  useEffect(() => {
    const token = getItemFromStorage("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails();
    }
  }, [isLoggedIn, getUserDetails]);

  return (
    <AuthContext.Provider
      value={{ login, isLoggedIn, logout, signup, isAdmin, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
