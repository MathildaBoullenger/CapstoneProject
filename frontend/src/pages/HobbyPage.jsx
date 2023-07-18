import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import "../components/Styles.css";

const HobbyPage = () => {
  const { name } = useParams();
  const [activities, setActivities] = useState([]);
  const user_id = sessionStorage.getItem("user_id");

  useEffect(() => {
    if (user_id) {
      const fetchActivities = async () => {
        try {
          const response = await axios.get(
            //`http://localhost:3000/api/activities/${name}`
            `${import.meta.env.VITE_BASE_URL}/activities/${name}`
          );
          const activitiesData = response.data;

          const participantsResponse = await axios.get(
            //`http://localhost:3000/api/participant/${user_id}`
            `${import.meta.env.VITE_BASE_URL}/participant/${user_id}`
          );
          const participantsData = participantsResponse.data;
          console.log("participants data:", participantsData);

          const joinedActivityIds = participantsData.map(
            (participant) => participant.activity_id
          );

          const unjoinedActivities = activitiesData.filter(
            (activity) => !joinedActivityIds.includes(activity.activity_id)
          );

          setActivities(unjoinedActivities);
          console.log(unjoinedActivities);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      };

      fetchActivities();
    }
  }, [user_id, name]);

  const handleJoinActivity = async (activity_id) => {
    try {
      const joinData = {
        user_id,
        activity_id,
      };

      await axios.post( //"http://localhost:3000/api/join-activity"
      `${import.meta.env.VITE_BASE_URL}/join-activity`
      , joinData);
      console.log("Joined Activity:", activity_id);

      setActivities((prevActivities) =>
        prevActivities.filter(
          (activity) => activity.activity_id !== activity_id
        )
      );

      // Optionally, you can update the state or perform any additional actions after joining the activity
    } catch (error) {
      console.error("Error joining activity:", error);
    }
  };

  return (
    <div
      style={{ margin: "0 auto", padding: "50px", backgroundColor: "#fffd77" }}
    >
      <Menu />

      <Grid item>
        <Typography variant="h3" align="center" color="secondary">
          coLab Space
          <br></br>
          {name}
        </Typography>

        <br></br>
      </Grid>

      <Card variant="outlined" className="whats-on-card">
        <CardContent>
          <Typography variant="h5" component="div">
            What's on?
          </Typography>

          <br></br>

          {activities.map((activity) => (
            <Card
              key={activity.activity_id}
              style={{ width: "100%", marginBottom: "16px" }}
              variant="outlined"
            >
              <CardContent>
                <Typography variant="h6" component="div">
                  {activity.user.username}: {activity.activity} on{" "}
                  {activity.time} in {activity.location}
                </Typography>

                <br></br>

                {activity.joined ? (
                  <div>
                    <Button variant="contained" color="primary" disabled>
                      Joined
                    </Button>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOptOutActivity(activity.activity_id)}
                    >
                      Opt-Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleJoinActivity(activity.activity_id)}
                  >
                    Join
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <br></br>

      <Link to={`/add-activity?hobby=${name}`}>
        <Button variant="contained" color="primary">
          Create Activity
        </Button>
      </Link>
    </div>
  );
};

export default HobbyPage;
