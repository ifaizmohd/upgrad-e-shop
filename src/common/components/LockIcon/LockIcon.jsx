import React from "react";
import { Box, Typography } from "@mui/material";
import Lock from "@mui/icons-material/Lock";

const LockIcon = ({ label }) => {
  return (
    <Box sx={{ marginBottom: "25px" }}>
      <Box
        sx={{
          backgroundColor: "#F50057",
          color: "#fff",
          borderRadius: "50%",
          padding: "10px",
        }}
      >
        <Lock />
      </Box>
      <Typography>{label}</Typography>
    </Box>
  );
};

export default LockIcon;
