import React, { useContext, useState } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import { FacebookAccountContext } from '../FacebookContext';
import { RegistrationContext } from '../RegistrationContext';

const UserProfileForm = () => {
  const { username, handleUsernameChange } = useContext(RegistrationContext);
  const { profilePicture, bio, handleProfilePictureChange, handleBioChange } = useContext(FacebookAccountContext);
  const [facebookAccount, setFacebookAccount] = useState('');

  const handleFacebookAccountChange = (event) => {
    setFacebookAccount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission, e.g., update user profile and Facebook account details

    // Reset form after submission
    setFacebookAccount('');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleProfilePictureChange(file);

    // Create a preview URL for the uploaded picture
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);
  };

  const [previewURL, setPreviewURL] = useState(null);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h5" align="center">
            Update User Profile
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          {previewURL && (
            <img src={previewURL} alt="Profile Preview" style={{ width: '200px', height: '200px' }} />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Grid>
        <Grid item>
          <TextField
            label="Bio"
            variant="outlined"
            value={bio}
            onChange={handleBioChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item>
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
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserProfileForm;
