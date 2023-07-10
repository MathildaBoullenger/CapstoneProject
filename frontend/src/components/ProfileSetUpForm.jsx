import React, { useState, useContext } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

const ProfileSetupForm = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');

  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const resetForm = () => {
    setProfilePicture(null);
    setBio('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission, e.g., upload profile picture and save bio

    // Reset form after submission
    resetForm();
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
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
              <Typography variant="h5" align="center">
                Welcome to coLab!
              </Typography>
          <Typography variant="body1" align="center">
            To join groups, please upload a picture of yourself and enter a
            short bio.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {previewURL && (
            <img
              src={previewURL}
              alt="Preview"
              style={{ width: "200px", height: "200px" }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Short Bio"
            variant="outlined"
            value={bio}
            onChange={handleBioChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileSetupForm;
