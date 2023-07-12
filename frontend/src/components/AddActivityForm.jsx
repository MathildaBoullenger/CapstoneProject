import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './CredentialsContext';

const AddActivityForm = ({ onAddActivity }) => {
  const { user_id } = useContext(UserContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hobbyName = searchParams.get('hobby');

  const [activity, setActivity] = useState('');
  const [activityLocation, setActivityLocation] = useState('');
  const [activityTime, setActivityTime] = useState('');

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
      user_id: user_id
    };

    console.log('trying to display the new activity before sending to backend:', newActivity);

    try {
      const response = await axios.post('http://localhost:3000/api/new-activity', newActivity);

      if (response.status === 201) {
        // Activity was successfully posted to the backend
        // You can perform any necessary actions here, such as updating the UI or fetching the updated list of activities from the backend

        // Reset form fields
        setActivity('');
        setActivityLocation('');
        setActivityTime('');

        // Call the onAddActivity callback if needed in the parent component
        //onAddActivity(newActivity);
      } else {
        // Handle error if the request was not successful
        console.error('Error posting activity to the backend.');
      }
    } catch (error) {
      console.error('Error posting activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>  
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="body2">Please provide the following details:</Typography>
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
            <Typography variant="caption">(verb + activity i.e. 'play soccer')</Typography>
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
            <Typography variant="caption">(be specific i.e 'Cornwall Park, Epsom, Auckland')</Typography>
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
            <Typography variant="caption">(day ? time i.e 'Sat 11 Jul 15:00')</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add to coLab space
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddActivityForm;
