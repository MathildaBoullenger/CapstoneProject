import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomeComponent = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h5" align="center">
          Welcome to HobbyHub!
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default WelcomeComponent;
