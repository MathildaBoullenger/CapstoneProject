import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const HobbyPage = () => {
    const { name } = useParams();
    const [activities, setActivities] = useState([]);
  
    useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/activities/${name}`);
          setActivities(response.data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      };
  
      fetchActivities();
    }, [name]);
  
    const handleJoinActivity = (activityId) => {
      // Handle the join action for the specific activity
      console.log("Join Activity:", activityId);
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
                  {activity.activity} at {activity.time} in {activity.location}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleJoinActivity(activity.id)}
                >
                  Join
                </Button>
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
