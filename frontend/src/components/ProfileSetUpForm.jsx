import React, { useState, useContext } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { UserContext } from "./CredentialsContext";
import { useNavigate } from "react-router-dom";

const ProfileSetupForm = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const { username, user_id } = useContext(UserContext);
  console.log('first log', username);
  console.log('second log', user_id);

  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const resetForm = () => {
    setProfilePicture(null);
    setBio("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('simple log1:', profilePicture);
    console.log(bio);
    console.log(username);

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("bio", bio);
    formData.append("username", username);

    console.log("formData:", formData);

    for (const [key, value] of formData.entries()) {
      console.log('What we see in the formData:',`${key}: ${value}`);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/profile", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Log or handle the response as needed
    } catch (error) {
      console.error("Error saving profile information:", error);
      // Handle error
    }
    resetForm();
    navigate('./facebook')
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} />
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
