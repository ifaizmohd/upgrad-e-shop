// AdminRoute.js
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/Auth.context";

const AdminRoute = () => {
  const { isAdmin } = useContext(AuthContext); // Replace this with your authentication context or logic
  // Check if the user is logged in and has an 'admin' role
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
