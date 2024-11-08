import { TextField } from "@mui/material";
import React from "react";
import InputDropdown from "../InputDropdown/InputDropdown";

const CustomInput = ({
  type,
  placeholder,
  overrideStyles,
  options,
  ...otherProps
}) => {
  if (type === "select") {
    const { customHandler } = otherProps;
    return (
      <InputDropdown
        placeholder={placeholder}
        overrideStyles={overrideStyles}
        options={options}
        handleChange={customHandler}
        {...otherProps}
      />
    );
  }
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
