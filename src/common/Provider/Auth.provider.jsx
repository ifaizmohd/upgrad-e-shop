import React, { useEffect, useState } from "react";
import {
  getItemFromStorage,
  removeItemFromStorage,
  saveToStorage,
} from "../lib/utils";
import { Authentication } from "../api";
import { AuthContext } from "./Auth.context";

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (formData) => {
    const res = await Authentication.login(formData);
    const data = await res?.json();
    if (data && data.token) {
      saveToStorage("token", data.token);
      setUserToken(data.token);
      setIsLoggedIn(true);
      if (window && window.location) {
        window.location.href = "/";
      }
    }
  };

  const signup = async (formData) => {
    const res = await Authentication.signUp(formData);
    const data = await res?.json();
    console.log("[SIGN UP] ", data);
    if (data.message && window.location) {
      window.location.href = "/products";
    }
  };

  const logout = () => {
    removeItemFromStorage("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = getItemFromStorage("token");
    if (token) {
      setUserToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, isLoggedIn, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
