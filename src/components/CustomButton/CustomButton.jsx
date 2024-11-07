import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ children, overrideStyles, ...otherProps }) => (
  <Button
    {...otherProps}
    sx={{ ...overrideStyles, backgroundColor: "#3f51b5" }}
  >
    {children}
  </Button>
);

export default CustomButton;
