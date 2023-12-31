import React, { useContext, useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const FacebookAccountForm = () => {
  const [facebookAccount, setFacebookAccount] = useState("");

  const navigate = useNavigate();
  const { username, password, profilePicture, bio, setProfileInformation } =
    useContext(UserContext);
  console.log("first fb log", username);
  console.log("second fb log", password);

  const handleFacebookAccountChange = (event) => {
    setFacebookAccount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const facebookData = {
        username,
        facebookAccount,
      };

      // saves Facebook account information in database and context
      await axios.post(`${import.meta.env.VITE_BASE_URL}/facebook`, facebookData);
      //"http://localhost:3000/api/facebook"
      // console.log('Response:', response.data);

      // Update the Facebook account information in the UserContext
      setProfileInformation(profilePicture, bio, facebookAccount);

      setFacebookAccount("");
      navigate("/hobbies");
    } catch (error) {
      // error handling
      console.error("Error submitting Facebook account information:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="body1">
            Finally, to be able to connect further with other group members,
            please share your Facebook profile.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">How to find:</Typography>
          <Typography variant="body2">
            1. Log in to your Facebook account using your credentials.
          </Typography>
          <Typography variant="body2">
            2. Once you're on your Facebook home page, locate the search bar at
            the top of the page.
          </Typography>
          <Typography variant="body2">
            3. Type your name into the search bar and press Enter or click on
            your name in the suggested search results.
          </Typography>
          <Typography variant="body2">
            4. This will take you to your Facebook profile.
          </Typography>
          <Typography variant="body2">
            5. Look at the address bar of your browser. The URL in the address
            bar is the URL of your Facebook profile, please paste it below.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Facebook Account"
            variant="outlined"
            value={facebookAccount}
            onChange={handleFacebookAccountChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FacebookAccountForm;
