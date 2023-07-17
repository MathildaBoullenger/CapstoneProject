import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import ProfilePictureUpload from "./PictureUpload";
import BioTextField from "./BioTextField";
import FacebookAccountField from "./FacebookAccountTextField";
import { Typography, TextField, Button, Grid } from "@mui/material";
import Menu from "./Menu";
import axios from "axios";

const ProfileUpdatePage = () => {
  const { username, user_id, profilePicture, bio, facebookAccount, setProfileInformation } = useContext(UserContext);

  console.log('profile pic:', profilePicture);
  const [updatedProfilePicture, setUpdatedProfilePicture] = useState(profilePicture);
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [updatedFacebookAccount, setUpdatedFacebookAccount] = useState(facebookAccount);
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    // Set the initial previewURL using the profilePicture from the context
    if (profilePicture) {
      setPreviewURL(`http://localhost:3000/api/${profilePicture}`);
    }
  
    // Update the previewURL whenever the updatedProfilePicture changes
    if (updatedProfilePicture instanceof File) {
      const previewURL = URL.createObjectURL(updatedProfilePicture);
      setPreviewURL(previewURL);
    }
  }, [profilePicture, updatedProfilePicture]);

  console.log('current profile info:', user_id, profilePicture, bio, facebookAccount);

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

  const handlePicUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', updatedProfilePicture);
      formData.append('user_id', user_id); // Append the user_id
  
      // Replace the API endpoint with your actual endpoint for updating the profile picture
      const response = await axios.post('http://localhost:3000/api/update-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important! Set the Content-Type to multipart/form-data
        },
      });
  
      // Assuming the API call is successful, update the profile picture in the context or state
      setProfileInformation(updatedProfilePicture, bio, facebookAccount);
      console.log("Profile picture updated successfully:", updatedProfilePicture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleBioUpdate = async () => {
    // ... (similar logic as handlePicUpdate)
  };

  const handleFacebookUpdate = async () => {
    // ... (similar logic as handlePicUpdate)
  };

 

  return (
    <div>
      <Menu />
      <h2>Update Profile</h2>

      <Grid item xs={12}>
        {/* Display the profile picture */}
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
