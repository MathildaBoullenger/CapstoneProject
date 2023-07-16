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

  const handlePicUpdate = async () => {
    try {
      // Simulate API call to update the profile picture
      // Replace the API endpoint with your actual endpoint for updating the profile picture
      const response = await axios.post('your-update-profile-picture-api-endpoint', {
        profilePicture: updatedProfilePicture,
      });
  
      // Assuming the API call is successful, update the profile picture in the context or state
      setProfilePicture(updatedProfilePicture);
      console.log("Profile picture updated successfully:", updatedProfilePicture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };
  
  const handleBioUpdate = async () => {
    try {
      // Simulate API call to update the bio
      // Replace the API endpoint with your actual endpoint for updating the bio
      const response = await axios.post('your-update-bio-api-endpoint', {
        bio: updatedBio,
      });
  
      // Assuming the API call is successful, update the bio in the context or state
      setBio(updatedBio);
      console.log("Bio updated successfully:", updatedBio);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };
  
  const handleFacebookUpdate = async () => {
    try {
      // Simulate API call to update the Facebook account
      // Replace the API endpoint with your actual endpoint for updating the Facebook account
      const response = await axios.post('your-update-facebook-account-api-endpoint', {
        facebookAccount: updatedFacebookAccount,
      });
  
      // Assuming the API call is successful, update the Facebook account in the context or state
      setFacebookAccount(updatedFacebookAccount);
      console.log("Facebook account updated successfully:", updatedFacebookAccount);
    } catch (error) {
      console.error("Error updating Facebook account:", error);
    }
  };
   
  return (
    <div>
      <Menu />
      <h2>Update Profile</h2>

      <Grid item xs={12}>
        <ProfilePictureUpload
          previewURL={previewURL} handleFileChange={handleFileChange}
        />
        <Button variant="contained" color="primary" onClick={handlePicUpdate}>
          Save Profile Picture
        </Button>
      </Grid>

      <BioTextField bio={updatedBio} handleBioChange={handleBioChange} />
      {/* Other sections */}
      <Button variant="contained" color="primary" onClick={handleBioUpdate}>
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
