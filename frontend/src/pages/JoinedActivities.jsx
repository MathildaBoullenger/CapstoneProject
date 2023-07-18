import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../components/Menu";
import { Typography, Grid, Button, Box } from "@mui/material"; // Import MUI components
import "../components/Styles.css"; // Import the external stylesheet
import { Card, CardContent, CardActions } from "@mui/material";

const JoinedActivities = () => {
  const [joinedActivities, setJoinedActivities] = useState([]);
  const user_id = sessionStorage.getItem("user_id");
  console.log("user id before sending to the backend joined:", user_id);

  useEffect(() => {
    const fetchJoinedActivities = async () => {
      try {
        const response = await axios.get(
          //`http://localhost:3000/api/joined-activities/${user_id}`
          `${import.meta.env.VITE_BASE_URL}/joined-activities/${user_id}`
        );
        console.log(response.data);

        const { joinedActivities } = response.data;
        setJoinedActivities(joinedActivities);
      } catch (error) {
        console.error("Error fetching joined activities:", error);
      }
    };

    fetchJoinedActivities();
  }, [user_id]);

  const handleOptOutActivity = async (activity_id) => {
    try {
      await axios.post(
        //"http://localhost:3000/api/opt-out-activity"
        `${import.meta.env.VITE_BASE_URL}/opt-out-activity`
        , {
        activity_id: activity_id,
        user_id: user_id,
      });

      // If the request is successful, remove the activity from the state
      setJoinedActivities((prevJoinedActivities) =>
        prevJoinedActivities.filter(
          (activity) => activity.activity_id !== activity_id
        )
      );
    } catch (error) {
      console.error("Error opting out of activity:", error);
      // Handle the error, display a message, or perform any necessary actions
    }
  };

  return (
    <>
      <Menu />
      <Box mx="auto" maxWidth="1200px" p={3}>
        <Typography variant="h3" className="createdActivities-title">
          Joined Activities
        </Typography>

        <div className="joinedActivities-container">
          <Grid container spacing={2}>
            {joinedActivities
              .filter((activityData) => activityData.isJoined)
              .map((activityData) => {
                const user = activityData.activity.user;
                return (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    key={activityData.activity.activity_id}
                  >
                    <Card>
                      <CardContent>
                        <Typography variant="body1">
                          <strong>Activity:</strong>{" "}
                          {activityData.activity.activity}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Location:</strong>{" "}
                          {activityData.activity.location}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Time:</strong> {activityData.activity.time}
                        </Typography>
                        {/* Render other properties of the activity object as needed */}
                        {user ? (
                          <div className="joinedActivities-userInfo">
                            <Typography variant="body1">
                              <strong>Created by:</strong> {user.username}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Email:</strong> {user.email}
                            </Typography>
                            {user.pic ? (
                              <img
                                src={`${import.meta.env.VITE_BASE_URL}/${user.pic}`} //`http://localhost:3000/api/${user.pic}`
                                alt="Profile Pic"
                                className="joinedActivities-avatar"
                              />
                            ) : null}
                            <Typography variant="body1">
                              <strong>Connect on Facebook:</strong>{" "}
                              <a
                                href={user.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="joinedActivities-facebookLink"
                              >
                                {user.facebook}
                              </a>
                            </Typography>
                          </div>
                        ) : null}
                      </CardContent>
                      <CardActions>
                        <Box
                          display="flex"
                          justifyContent="center"
                          width="100%"
                        >
                          <Button
                            onClick={() =>
                              handleOptOutActivity(
                                activityData.activity.activity_id
                              )
                            }
                            variant="contained"
                            color="secondary"
                          >
                            Opt Out
                          </Button>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default JoinedActivities;
