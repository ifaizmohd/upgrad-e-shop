import { Container } from "@mui/material";
import React from "react";

const PageLayout = ({ children, containerSize, topMargin }) => {
  return (
    <Container
      maxWidth={containerSize}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: topMargin,
      }}
    >
      {children}
    </Container>
  );
};

export default PageLayout;
