import React from "react";
import CustomInput from "../CustomInput/CustomInput";
import { Box, Button } from "@mui/material";

const Form = ({ fields, buttonCta, formHandler, formData, handleSubmit }) => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        gap: "15px",
      }}
    >
      {fields?.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          variant="outlined"
          label={field.label}
          onChange={formHandler}
          value={formData[field.name]}
          {...field}
        />
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        {buttonCta}
      </Button>
    </Box>
  );
};

export default Form;
