import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import NavigationLogo from "../NavigationLogo/NavigationLogo";

/**
 * NavigationBar component renders the top navigation bar, it handles the user navigation.
 * @prop {boolean} isLoggedIn - it allows us to know if user is logged-in or not.
 * @prop {boolean} isAdmin - it allows us to know if the user is admin or not.
 * @returns {React.ReactElement}
 */
const NavigationBar = ({ isLoggedIn, isAdmin }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#3f51b5",
            justifyContent: "space-between",
          }}
        >
          <NavigationLogo />
          <SearchBar />
          <NavigationLinks isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
