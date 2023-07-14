import React, { useState, useContext } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import ProfilePictureUpload from "./PictureUpload";
import BioTextField from "./BioTextField";

const ProfileSetupForm = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const { username, user_id, setProfileInformation } = useContext(UserContext);

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

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("bio", bio);
    formData.append("username", username);

    try {
      const response = await axios.post("http://localhost:3000/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Log or handle the response as needed
      console.log(response.data);

      // Update the user information in the context
      setProfileInformation({
        profilePicture,
        bio,
      });

      resetForm();
      navigate("./facebook");
    } catch (error) {
      console.error("Error saving profile information:", error);
      // Handle error
    }
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
            To join groups, please upload a picture of yourself and enter a short bio.
          </Typography>
        </Grid>

        <Grid item xs={12}>
        <ProfilePictureUpload previewURL={previewURL} handleFileChange={handleFileChange} />
        </Grid>

        <Grid item xs={12}>
        <BioTextField bio={bio} handleBioChange={handleBioChange} />
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
