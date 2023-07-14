import React from "react";
import { TextField } from "@mui/material";

const BioTextField = ({ bio, handleBioChange }) => {
  return (
    <TextField
      label="Short Bio"
      variant="outlined"
      value={bio}
      onChange={handleBioChange}
      fullWidth
      multiline
      rows={4}
    />
  );
};

export default BioTextField;