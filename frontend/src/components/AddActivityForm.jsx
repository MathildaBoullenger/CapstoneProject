import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const AddActivityForm = ({ onAddActivity }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddActivity({
      activity,
      activityLocation,
      activityTime,
    });
    setActivity('');
    setActivityLocation('');
    setActivityTime('');
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
