import React, { useState, useContext } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios'
import { UserContext } from "./CredentialsContext";
import { useNavigate } from "react-router-dom";

const FacebookAccountForm = () => {
  const [facebookAccount, setFacebookAccount] = useState('');

  const navigate = useNavigate();
  const { username, password } = useContext(UserContext);
  console.log('first fb log', username);
  console.log('second fb log', password);

  const handleFacebookAccountChange = (event) => {
    setFacebookAccount(event.target.value);
  };

  const facebookData = {
    username,
    facebookAccount
  };
  console.log(facebookData);


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Handle form submission, e.g., save Facebook account information
      const response = await axios.post('http://localhost:3000/api/facebook', facebookData);
  
      // Handle the response as needed
      console.log('Response:', response.data);

    setFacebookAccount('');
    navigate('/hobbies')
  }  catch (error) {
    // Handle error
    console.error('Error submitting Facebook account information:', error);
}
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="body1">
            Finally, to be able to connect further with other group members, please share your Facebook profile.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            How to find:
          </Typography>
          <Typography variant="body2">
            1. Log in to your Facebook account using your credentials.
          </Typography>
          <Typography variant="body2">
            2. Once you're on your Facebook home page, locate the search bar at the top of the page.
          </Typography>
          <Typography variant="body2">
            3. Type your name into the search bar and press Enter or click on your name in the suggested search results.
          </Typography>
          <Typography variant="body2">
            4. This will take you to your Facebook profile.
          </Typography>
          <Typography variant="body2">
            5. Look at the address bar of your browser. The URL in the address bar is the URL of your Facebook profile, please paste it below.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Facebook Account"
            variant="outlined"
            value={facebookAccount}
            onChange={handleFacebookAccountChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FacebookAccountForm;
