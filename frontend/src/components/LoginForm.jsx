import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your login logic here, e.g., send login request to server

    // Reset the form after submission
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
