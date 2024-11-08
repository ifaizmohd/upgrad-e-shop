import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const InputDropdown = ({
  options,
  placeholder,
  onChange,
  value,
  label,
  name,
  handleChange,
  ...otherProps
}) => {
  console.log({ options, placeholder, onChange, value, otherProps });
  return (
    <Autocomplete
      name={name}
      value={value}
      inputValue={value}
      options={options}
      onInputChange={handleChange}
      onChange={handleChange}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label} />}
      {...otherProps}
    />
  );
};

export default InputDropdown;
