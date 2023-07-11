import React, { useState, useContext } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './CredentialsContext';

const LoginForm = () => {
  const { setUserCredentials } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add your login logic here, e.g., send login request to server

    const loginData = {
      username,
      password,
    };
    console.log(loginData)

    try {
      const response = await axios.post('http://localhost:3000/api/login-token', loginData);
      // Handle the response from the server
      console.log(response.data); // Log the response data or perform further actions
      localStorage.setItem('accessToken', response.data);
      setUserCredentials(username, password);
      navigate('/hobbies')
    } catch (error) {
      // Handle errors
      console.error(error);
    }
    // Reset the form after submission
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="username"
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