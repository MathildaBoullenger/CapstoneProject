import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import ProfilePictureUpload from "./PictureUpload";
import BioTextField from "./BioTextField";
import FacebookAccountField from "./FacebookAccountTextField";
import { Typography, TextField, Button, Grid } from "@mui/material";
import Menu from "./Menu";

const ProfileUpdatePage = () => {
  const { username, user_id, profilePicture, bio, facebookAccount } = useContext(UserContext);
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState(profilePicture);
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [updatedFacebookAccount, setUpdatedFacebookAccount] = useState(facebookAccount);

  const handleProfilePictureChange = (file) => {
    setUpdatedProfilePicture(file);
  };

  const handleBioChange = (event) => {
    setUpdatedBio(event.target.value);
  };

  const handleFacebookAccountChange = (event) => {
    setUpdatedFacebookAccount(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleProfilePictureChange(file);

    // Create a preview URL for the uploaded picture
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);
  };
  
  const [previewURL, setPreviewURL] = useState(null);

   const handleProfileUpdate = () => {
    // Handle the profile update logic, e.g., make an API call to update the profile with the updated information
    // Pass the updated values: updatedProfilePicture, updatedBio, updatedFacebookAccount
  };

  const handleFacebookUpdate = () => {
    // Handle the Facebook account update logic, e.g., make an API call to update the Facebook account
    // Pass the updated value: updatedFacebookAccount
  };

  return (
    <div>
      <Menu />
      <h2>Update Profile</h2>

      <Grid item xs={12}>
        <ProfilePictureUpload
          previewURL={previewURL} handleFileChange={handleFileChange}
        />
        <Button variant="contained" color="primary" onClick={handleProfileUpdate}>
          Save Profile Picture
        </Button>
      </Grid>

      <BioTextField bio={updatedBio} handleBioChange={handleBioChange} />
      {/* Other sections */}
      <Button variant="contained" color="primary" onClick={handleProfileUpdate}>
        Save Bio
      </Button>

      <FacebookAccountField
        facebookAccount={updatedFacebookAccount}
        handleFacebookAccountChange={handleFacebookAccountChange}
      />
      {/* Other sections */}
      <Button variant="contained" color="primary" onClick={handleFacebookUpdate}>
        Save Facebook Account
      </Button>
    </div>
  );
};

export default ProfileUpdatePage;
