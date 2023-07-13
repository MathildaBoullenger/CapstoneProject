import React, { useState, useEffect } from "react";
import axios from "axios";

const JoinedActivities = () => {
  const [joinedActivities, setJoinedActivities] = useState([]);
  const [userData, setUserData] = useState([]);
  const user_id = sessionStorage.getItem("user_id");
  console.log("user id before sending to the backend joined:", user_id);

  useEffect(() => {
    const fetchJoinedActivities = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/joined-activities/${user_id}`
        );
        console.log(response.data);

        const { userData, joinedActivities } = response.data;
        setUserData(userData);
        setJoinedActivities(joinedActivities);
      } catch (error) {
        console.error("Error fetching joined activities:", error);
      }
    };

    fetchJoinedActivities();
  }, [user_id]);

  const handleOptOutActivity = async (activity_id) => {
    try {
      await axios.post("http://localhost:3000/api/opt-out-activity", {
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
    <div>
    <h3>Joined Activities</h3>
    {joinedActivities
        .filter((activityData) => activityData.isJoined)
        .map((activityData) => {
      const user = userData.find((user) => user.user_id === activityData.user_id);
      return (
        <div key={activityData.activity.activity_id}>
          <p>Activity: {activityData.activity.activity}</p>
          <p>Location: {activityData.activity.location}</p>
          <p>Time: {activityData.activity.time}</p>
          {/* Render other properties of the activity object as needed */}
          {user && (
            <div>
              <p>User: {user.username}</p>
              <p>Email: {user.email}</p>
              {user.pic && <img src={`/backend/images/${user.pic}`} alt="Profile Pic" />} //look into AWS
            </div>
          )}
          <button
            onClick={() =>
              handleOptOutActivity(activityData.activity.activity_id)
            }
          >
            Opt Out
          </button>
        </div>
      );
    })}
  </div>
);
};

export default JoinedActivities;
