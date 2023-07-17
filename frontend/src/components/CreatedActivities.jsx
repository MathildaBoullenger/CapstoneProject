import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import ActivityTile from "./ActivityTile";
import { Typography, Box, Button } from "@mui/material";
import "./Styles.css"; // external sylesheet

const UserActivities = () => {
  const [userActivities, setUserActivities] = useState([]);
  const user_id = sessionStorage.getItem("user_id");
  console.log("user id before sending to the backend:", user_id);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user-activities/${user_id}`
        );
        console.log(response.data);

        setUserActivities(response.data);
      } catch (error) {
        console.error("Error fetching user activities:", error);
      }
    };

    fetchUserActivities();
  }, [user_id]);

  const handleDeleteActivity = async (activity_id) => {
    try {
      await axios.post(
        `http://localhost:3000/api/delete-activity/${activity_id}`
      );
      console.log("Deleted Activity:", activity_id);

      setUserActivities((prevUserActivities) =>
        prevUserActivities.filter(
          (activity) => activity.activity_id !== activity_id
        )
      );
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <>
      <Menu />
      <Box mx="auto" maxWidth="1200px" p={3}>
        <Typography variant="h3" className="createdActivities-title">
          Created Activities
        </Typography>

        {userActivities.map((activity) => (
          <div
            className="createdActivities-background"
            key={activity.activity_id}
          >
            <div style={{ flex: "1 1 100%" }}>
              <ActivityTile activity={activity} />
            </div>
            <div className="cancel-activity-button">
              <Button
                onClick={() => handleDeleteActivity(activity.activity_id)}
                variant="contained"
                color="secondary"
              >
                Cancel Activity
              </Button>
            </div>
          </div>
        ))}
      </Box>
    </>
  );
};

export default UserActivities;
