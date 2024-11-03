import { TextField } from "@mui/material";
import React from "react";

const CustomInput = ({ type, placeholder, overrideStyles, ...otherProps }) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      sx={overrideStyles}
      {...otherProps}
    />
  );
};

export default CustomInput;
