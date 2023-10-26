import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

const LoginForm = () => {
  const { setUserCredentials, setProfileInformation } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // login logic below, e.g., send login request to server
    const loginData = {
      username,
      password,
    };
    console.log(loginData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        loginData
      );
      // josh - store token in session storage
      console.log(response)
      const jwtToken = response.data.token;
      sessionStorage.setItem("authToken", jwtToken);

      navigate("/hobbies");
    } catch (error) {
      // Handle errors
      console.error(error);
    }
    // Reset the form after submission
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Grid item>
            <Typography variant="h5" align="center" color="secondary">
              Welcome back!
            </Typography>
          </Grid>

          <br></br>

          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
