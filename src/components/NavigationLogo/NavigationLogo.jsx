import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavigationLogo = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
      >
        <ShoppingCartIcon />
      </IconButton>
      <Typography
        variant="body"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        upGrad E-Shop
      </Typography>
    </Box>
  );
};

export default NavigationLogo;
