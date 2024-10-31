import { Box, Button, Link } from "@mui/material";
import React from "react";

/**
 * @description - it renders the navigations linke like - home, login, signup in the top navigation bar. to add another link, please add in this component.
 * @param {*} param0
 * @returns {React.ReactElement} -
 */
const NavigationLinks = ({ isLoggedIn, isAdmin }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {isLoggedIn ? (
        <Link sx={{ color: "white" }}>Home</Link>
      ) : (
        <Link sx={{ color: "white" }}>Login</Link>
      )}
      {isAdmin ? <Link sx={{ color: "white" }}>Add Products</Link> : null}
      {isLoggedIn ? (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#F50057", color: "#fff" }}
        >
          LOGOUT
        </Button>
      ) : (
        <Link sx={{ color: "white" }}>Sign Up</Link>
      )}
    </Box>
  );
};

export default NavigationLinks;
