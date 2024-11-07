import React, { useCallback, useEffect, useState } from "react";
import {
  getItemFromStorage,
  removeItemFromStorage,
  saveToStorage,
} from "../../common/lib/utils";
import { Authentication } from "../../common/api";
import { AuthContext } from "./Auth.context";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      const { data } = await Authentication.login(formData);
      if (data) {
        saveToStorage("session", data);
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
      (role) => role?.toLowerCase() === "admin"
    );
    if (!!adminRole) setIsAdmin(true);
  }, []);

  const getUserDetails = useCallback(async () => {
    const session = getItemFromStorage("session");
    if (session) {
      setUser(session);
      getIsAdmin(session);
    }
  }, [getIsAdmin]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserDetails();
    }
  }, [isLoggedIn, getUserDetails]);

  useEffect(() => {
    const session = getItemFromStorage("session");
    if (session) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, isLoggedIn, logout, signup, isAdmin, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
