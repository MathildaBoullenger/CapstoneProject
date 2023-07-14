import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import coLabImage from "../assets/coLabImage.png"

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
      <img src={coLabImage} alt="CoLab" style={{ width: "100%" }} />
      </Grid>
      <Grid item>
        <Typography variant="h3" align="center">
          Welcome to CoLab!
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
