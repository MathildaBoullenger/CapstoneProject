import React from "react";
import { Grid } from "@mui/material";

const ProfilePictureUpload = ({ previewURL, handleFileChange }) => (
  <Grid item xs={12}>
    {previewURL ? (
      <img
        src={previewURL}
        alt="Preview"
        style={{ width: "200px", height: "200px" }}
      />
    ) : null}
    <input
      type="file"
      name="profilePicture"
      accept="image/*"
      onChange={handleFileChange}
    />
  </Grid>
);

export default ProfilePictureUpload;
