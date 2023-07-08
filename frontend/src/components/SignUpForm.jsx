import React, { useState, useContext } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { RegistrationContext } from './RegistrationContext';

const SignUpForm = () => {
    const { username, email, password, confirmPassword, handleUsernameChange, handleEmailChange, handlePasswordChange, handleConfirmPasswordChange } =
      useContext(RegistrationContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your registration logic here, e.g., send registration request to server

    // Reset the form after submission
    handleUsernameChange({ target: { value: '' } });
    handleEmailChange({ target: { value: '' } });
    handlePasswordChange({ target: { value: '' } });
    handleConfirmPasswordChange({ target: { value: '' } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
