import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const HobbyPage = () => {
    const { name } = useParams();
    const [activities, setActivities] = useState([]);
    const user_id = sessionStorage.getItem("user_id");
  
    useEffect(() => {
      if (user_id) {
        const fetchActivities = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/activities/${name}`);
            const allActivities = response.data;
  
            console.log('user_id before fetching joined activities:', user_id)
  
            // Fetch the user's joined activities from the backend
            const joinedActivitiesResponse = await axios.get(`http://localhost:3000/api/joined-activities/${user_id}`);
            const joinedActivities = joinedActivitiesResponse.data.joinedActivities;
  
            // Filter out the joined activities from the fetched activities
            const filteredActivities = allActivities.filter(activity => {
              // Check if the activity is not in the user's joined activities list
              return !joinedActivities.some(joinedActivity => joinedActivity.activity_id === activity.activity_id);
            });
  
            setActivities(filteredActivities);
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
  
        await axios.post("http://localhost:3000/api/join-activity", joinData);
        console.log("Joined Activity:", activity_id);

        setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.activity_id !== activity_id)
      );

        // Optionally, you can update the state or perform any additional actions after joining the activity
      } catch (error) {
        console.error("Error joining activity:", error);
      }
    };

  return (
   <div>
      <h2>coLab Space - {name}</h2>
      
      {/* Render the specific content for the hobby page */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            What's on?
          </Typography>
          {activities.map((activity) => (
            <Card key={activity.activity_id} variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {activity.user_id}: {activity.activity} on {activity.time} in {activity.location}
                </Typography>
                {activity.joined ? (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled
                    >
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

      <Link to={`/add-activity?hobby=${name}`}>
        <Button
          variant="contained"
          color="primary"
        >
          Create Activity
        </Button>
      </Link>
    </div>
  );
};

export default HobbyPage;
