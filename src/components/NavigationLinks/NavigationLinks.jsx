import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NavigationLinks.css";

/**
 * @description - it renders the navigations linke like - home, login, signup in the top navigation bar. to add another link, please add in this component.
 * @param {*} param0
 * @returns {React.ReactElement} -
 */
const NavigationLinks = ({ isLoggedIn, isAdmin }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {isLoggedIn ? (
        <Link className="nav-link" to="/">
          Home
        </Link>
      ) : (
        <Link className="nav-link" to="/login">
          Login
        </Link>
      )}
      {isAdmin ? (
        <Link className="nav-link" to="/">
          Add Products
        </Link>
      ) : null}
      {isLoggedIn ? (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#F50057", color: "#fff" }}
        >
          LOGOUT
        </Button>
      ) : (
        <Link className="nav-link" to="/sign-up">
          Sign Up
        </Link>
      )}
    </Box>
  );
};

export default NavigationLinks;
