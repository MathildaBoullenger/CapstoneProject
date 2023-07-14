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
    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
    <h3>Joined Activities</h3>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {joinedActivities
        .filter((activityData) => activityData.isJoined)
        .map((activityData) => {
          const user = userData.find(
            (user) => user.user_id === activityData.user_id
          );
          return (
            <div
              key={activityData.activity.activity_id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                flex: "0 0 100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                lineHeight: "1.2", // Adjust line height here
              }}
            >
              <p>
                <strong style={{ fontSize: "14px" }}>Activity:</strong>{" "}
                {activityData.activity.activity}
              </p>
              <p>
                <strong style={{ fontSize: "14px" }}>Location:</strong>{" "}
                {activityData.activity.location}
              </p>
              <p>
                <strong style={{ fontSize: "14px" }}>Time:</strong>{" "}
                {activityData.activity.time}
              </p>
              {/* Render other properties of the activity object as needed */}
              {user && (
                <div>
                  <p>
                    <strong style={{ fontSize: "14px" }}>User:</strong>{" "}
                    {user.username}
                  </p>
                  <p>
                    <strong style={{ fontSize: "14px" }}>Email:</strong>{" "}
                    {user.email}
                  </p>
                  {user.pic && (
                    <img
                      src={`http://localhost:3000/api/${user.pic}`}
                      alt="Profile Pic"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                      }}
                    />
                  )}
                  <p>
                    <strong style={{ fontSize: "14px" }}>
                      Facebook profile:
                    </strong>{" "}
                    <a
                      href={user.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {user.facebook}
                    </a>
                  </p>
                </div>
              )}
              <button
                onClick={() =>
                  handleOptOutActivity(activityData.activity.activity_id)
                }
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Opt Out
              </button>
            </div>
          );
        })}
    </div>
  </div>
);
};


export default JoinedActivities;
