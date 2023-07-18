import React from "react";
import "./Styles.css"; // Import the external stylesheet
import { Card, CardContent, Typography } from "@mui/material";

const ActivityTile = ({ activity, handleDeleteActivity }) => {

return (
  <div className="activity-tile-container">
    <Typography variant="h6" className="activity-tile-header">
      Activity: {activity?.activity}
    </Typography>
    <Typography variant="body1">Location: {activity.location}</Typography>
    <Typography variant="body1">Time: {activity.time}</Typography>

    <br></br>

    <Typography variant="h5">Participants</Typography>
    <br></br>
    <div className="activity-tile-participants">
      {activity.participants.map((participant) => (
        <Card
          key={participant.participant_id}
          className="activity-tile-participant-card"
        >
          <CardContent>
            <Typography variant="body1">
              <strong>User:</strong> {participant.user.username}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {participant.user.email}
              <br></br>
            </Typography>

            {participant?.user?.pic ? (
              <img
              src={`${import.meta.env.VITE_BASE_URL}/${participant.user.pic}`}
              //src={`http://localhost:3000/api${participant.user.pic}`}
                alt="Profile Pic"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                }}
              />
            ) : null}
            <Typography variant="body1">
              <strong>Facebook profile:</strong>{" "}
              <a
                href={participant.user.facebook}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                {participant.user.facebook}
              </a>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
}

export default ActivityTile;
