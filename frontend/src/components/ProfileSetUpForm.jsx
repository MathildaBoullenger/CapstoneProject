import React, { useContext } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';
import { ProfileContext } from './ProfileContext';

const ProfileSetupForm = () => {
  const { profilePicture, bio, handleProfilePictureChange, handleBioChange, resetForm } = useContext(ProfileContext);

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
      <Grid container spacing={2} direction="column" alignItems="center">
        {/* Form fields and submit button */}
      </Grid>
    </form>
  );
};

export default ProfileSetupForm;
