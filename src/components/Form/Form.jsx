import React, { useEffect, useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { formDataValidator, isInvalidData } from "../../common/lib/validator";
import CustomButton from "../CustomButton/CustomButton";

const Form = ({
  fields,
  buttonCta,
  formHandler,
  formData,
  handleSubmit,
  linkToSignup,
  linkPosition,
  linkCta,
  linkUrl,
}) => {
  const [error, setError] = useState({ isPristine: true });
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  useEffect(() => {
    setError(formDataValidator(formData));
  }, [formData]);

  useEffect(() => {
    setDisableSubmitButton(error?.isPristine || isInvalidData(error));
  }, [error]);

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
          key={field?.name}
          type={field?.type}
          variant="outlined"
          label={field?.label}
          onChange={formHandler}
          value={formData[field?.name]}
          error={!!formData[field?.name] && !error[field?.name]?.isValid}
          {...field}
        />
      ))}
      <CustomButton
        variant="contained"
        onClick={handleSubmit}
        disabled={disableSubmitButton}
      >
        {buttonCta}
      </CustomButton>
      {linkToSignup ? (
        <Link to={linkUrl} style={{ alignSelf: linkPosition }}>
          {linkCta}
        </Link>
      ) : null}
    </Box>
  );
};

export default Form;
