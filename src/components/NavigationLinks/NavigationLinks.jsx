import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavigationLinks.css";
import { AuthContext } from "../Providers/Auth.context";

/**
 * @description - it renders the navigations linke like - home, login, signup in the top navigation bar. to add another link, please add in this component.
 * @param {*} param0
 * @returns {React.ReactElement} -
 */
const NavigationLinks = () => {
  const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "3em" }}>
        {isLoggedIn ? (
          <Link className="nav-link" to="/">
            Home
          </Link>
        ) : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}
        <Link className="nav-link" to="/products">
          Products
        </Link>
        {isAdmin ? (
          <Link className="nav-link" to="/add-product">
            Add Products
          </Link>
        ) : null}
        {!isLoggedIn ? (
          <Link className="nav-link" to="/sign-up">
            Sign Up
          </Link>
        ) : null}
      </Box>
      {isLoggedIn ? (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#F50057", color: "#fff" }}
          onClick={logout}
        >
          LOGOUT
        </Button>
      ) : null}
    </Box>
  );
};

export default NavigationLinks;
