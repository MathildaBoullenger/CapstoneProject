import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import ProfilePictureUpload from "../components/PictureUpload";
import BioTextField from "../components/BioTextField";
import FacebookAccountField from "../components/FacebookAccountTextField";
import { Typography, Button, Grid } from "@mui/material";
import Menu from "../components/Menu";
import axios from "axios";

const ProfileUpdatePage = () => {
  const {
    user_id,
    profilePicture,
    bio,
    facebookAccount,
    setProfileInformation,
  } = useContext(UserContext);

  console.log("profile pic:", profilePicture);
  const [updatedProfilePicture, setUpdatedProfilePicture] =
    useState(profilePicture);
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [updatedFacebookAccount, setUpdatedFacebookAccount] =
    useState(facebookAccount);
  const [previewURL, setPreviewURL] = useState(null);

  useEffect(() => {
    // initial previewURL using the profilePicture from the context
    if (profilePicture) {
      if (profilePicture instanceof File) {
        const previewURL = URL.createObjectURL(profilePicture);
        setPreviewURL(previewURL);
      } else {
        setPreviewURL(`${import.meta.env.VITE_BASE_URL}/${profilePicture}`);
      }
    }
  }, [profilePicture]);

  useEffect(() => {
    // update of the previewURL whenever the updatedProfilePicture changes
    if (updatedProfilePicture && updatedProfilePicture instanceof File) {
      const previewURL = URL.createObjectURL(updatedProfilePicture);
      setPreviewURL(previewURL);
    }
  }, [updatedProfilePicture]);

  console.log(
    "current profile info:",
    user_id,
    profilePicture,
    bio,
    facebookAccount
  );

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

    // preview URL for the uploaded picture
    const previewURL = URL.createObjectURL(file);
    setPreviewURL(previewURL);
  };

  const handlePicUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", updatedProfilePicture);
      formData.append("user_id", user_id);

      const response = await axios.post(
        //"http://localhost:3000/api/update-pic"
        `${import.meta.env.VITE_BASE_URL}/update-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // because we send a picture
          },
        }
      );

      // update the profile picture in the context
      setProfileInformation(updatedProfilePicture, bio, facebookAccount);
      console.log(
        "Profile picture updated successfully:",
        updatedProfilePicture
      );
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleBioUpdate = async () => {
    try {
      await axios.post( //"http://localhost:3000/api/update-bio"
      `${import.meta.env.VITE_BASE_URL}/update-bio`, {
        bio: updatedBio,
        user_id: user_id,
      });

      // update the bio in the context
      setProfileInformation(profilePicture, updatedBio, facebookAccount);
      console.log("Bio updated successfully:", updatedBio);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleFacebookUpdate = async () => {
    try {
      await axios.post( //"http://localhost:3000/api/update-facebook"
      `${import.meta.env.VITE_BASE_URL}/update-facebook`, {
        facebook: updatedFacebookAccount,
        user_id: user_id,
      });

      // update the bio in the context
      setProfileInformation(profilePicture, bio, updatedFacebookAccount);
      console.log("Bio updated successfully:", updatedFacebookAccount);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div>
      <Menu />
      <Typography variant="h3">Update Profile</Typography>

      <br></br>

      <Grid item xs={12}>
        {/* Display the profile picture */}
        <ProfilePictureUpload
          previewURL={previewURL}
          handleFileChange={handleFileChange}
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleFacebookUpdate}
      >
        Save Facebook Account
      </Button>
    </div>
  );
};

export default ProfileUpdatePage;
