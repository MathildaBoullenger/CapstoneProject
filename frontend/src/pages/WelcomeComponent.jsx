import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import colabImage from "../assets/colab1.png";
import colabVideo from "../assets/colabVideo.mp4"

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
      <video width="640" height="360" autoPlay muted>
        <source src={colabVideo} type="video/mp4" />
      </video>  
      </Grid>
 
      <Grid item>
        <Typography variant="h5" align="center" color="secondary">
        Connecting Hobbies, Creating Friendships: 
        <br></br>
        CoLab, <strong>Where Interests Unite</strong>
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
