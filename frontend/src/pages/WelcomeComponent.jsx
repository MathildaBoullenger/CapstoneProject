import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import colabImage from "../assets/CoLab.png";

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
        <img src={colabImage} alt="CoLab" style={{ width: "100%" }} />
      </Grid>

      <Grid item>
        <Typography variant="h5" align="center" color="secondary">
          Your place to make new friends and hobbies!
        </Typography>
      </Grid>

      <br></br>

      <Grid item>
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
          Login
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="tertiary"
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default WelcomeComponent;
