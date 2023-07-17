import React, { useState, useContext } from "react";
import { Typography, Button, Grid } from "@mui/material";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import ProfilePictureUpload from "./PictureUpload";
import BioTextField from "./BioTextField";

const ProfileSetupForm = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const { username, setProfileInformation } = useContext(UserContext);

  const handleProfilePictureChange = (file) => {
    setProfilePicture(file);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const resetForm = () => {
    setProfilePicture(null);
    setBio(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("bio", bio);
    formData.append("username", username);

    try {
      await axios.post(
        "http://localhost:3000/api/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log('response data check:', response.data);

      // update user information in the context
      setProfileInformation(profilePicture, bio, null);

      resetForm();
      navigate("./facebook");
    } catch (error) {
      console.error("Error saving profile information:", error);
    }
  };

  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleProfilePictureChange(file);

    // preview URL for the uploaded picture
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Grid container spacing={2} direction="column" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" align="center" color="secondary">
            Please add a profile picture and a few words about yourself.
          </Typography>
        </Grid>
        <br></br>
        <Grid item xs={12}>
          <ProfilePictureUpload
            previewURL={previewURL}
            handleFileChange={handleFileChange}
          />
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
