import React from "react";
import { TextField } from "@mui/material";

const FacebookAccountField = ({ facebookAccount, handleFacebookAccountChange }) => {

  return (
    <TextField
      label="Facebook Account"
      variant="outlined"
      value={facebookAccount}
      onChange={handleFacebookAccountChange}
      fullWidth
    />
  );
};

export default FacebookAccountField;