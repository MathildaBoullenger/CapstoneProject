import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";

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
    <div>
      <Menu />
      <h3>Created Activities</h3>
      {userActivities.map((activity) => (
        <div
          key={activity.activity_id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Activity: {activity.activity}</p>
          <p>Location: {activity.location}</p>
          <p>Time: {activity.time}</p>
          {/* Render other properties of the activity object as needed */}
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <h4>Participants:</h4>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {activity.participants.map((participant) => (
                <div
                  key={participant.participant_id}
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
                    <strong style={{ fontSize: "14px" }}>User:</strong>{" "}
                    {participant.user.username}
                  </p>
                  <p>
                    <strong style={{ fontSize: "14px" }}>Email:</strong>{" "}
                    {participant.user.email}
                  </p>
                  {participant.user.pic && (
                    <img
                      src={`http://localhost:3000/api/${participant.user.pic}`}
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
                      href={participant.user.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      {participant.user.facebook}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleDeleteActivity(activity.activity_id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel Activity
          </button>
        </div>
      ))}
    </div>
  );
}  

export default UserActivities;
