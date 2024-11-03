import { Container } from "@mui/material";
import React from "react";

const PageLayout = ({ children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </Container>
  );
};

export default PageLayout;
