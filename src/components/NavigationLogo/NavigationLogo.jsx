import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const NavigationLogo = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => navigate("/")}
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
