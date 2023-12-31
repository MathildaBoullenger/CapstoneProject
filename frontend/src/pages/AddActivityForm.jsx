import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";

const AddActivityForm = ({ onAddActivity }) => {
  const { user_id } = useContext(UserContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hobbyName = searchParams.get("hobby");

  const navigate = useNavigate();

  const [activity, setActivity] = useState("");
  const [activityLocation, setActivityLocation] = useState("");
  const [activityTime, setActivityTime] = useState("");

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleLocationChange = (event) => {
    setActivityLocation(event.target.value);
  };

  const handleTimeChange = (event) => {
    setActivityTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newActivity = {
      activity: activity,
      location: activityLocation,
      time: activityTime,
      hobby: hobbyName,
      user_id: user_id,
    };

    console.log(
      "trying to display the new activity before sending to backend:",
      newActivity
    );

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/new-activity`,
        //"http://localhost:3000/api/new-activity",
        newActivity
      );

      if (response.status === 201) {
        // resets the form fields
        setActivity("");
        setActivityLocation("");
        setActivityTime("");

        navigate(`/hobbies/${hobbyName}`);
      } else {
        // error handling if the request was not successful
        console.error("Error posting activity to the backend.");
      }
    } catch (error) {
      console.error("Error posting activity:", error);
    }
  };

  return (
    <div>
      <Menu />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="body2">
              Please provide the following details:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="What do you suggest?"
              variant="outlined"
              value={activity}
              onChange={handleActivityChange}
              fullWidth
            />
            <Grid item xs={12}>
              <Typography variant="caption">
                (verb + activity i.e. 'play soccer')
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Where?"
              variant="outlined"
              value={activityLocation}
              onChange={handleLocationChange}
              fullWidth
            />
            <Grid item xs={12}>
              <Typography variant="caption">
                (be specific i.e 'Cornwall Park, Epsom, Auckland')
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="When?"
              variant="outlined"
              value={activityTime}
              onChange={handleTimeChange}
              fullWidth
            />
            <Grid item xs={12}>
              <Typography variant="caption">
                (day ? time i.e 'Sat 11 Jul 15:00')
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add to coLab space
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddActivityForm;
