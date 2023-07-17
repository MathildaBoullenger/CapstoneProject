import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const buttonStyle = {
  background: "#fffd77",
  padding: "12px 20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};

const HobbyTile = ({ hobby, onClick, selected }) => (
  <Card
    onClick={onClick}
    className={`hobby-tile ${selected ? "selected" : ""}`}
  >
    <div style={{ position: "relative" }}>
      <CardMedia
        component="img"
        image={hobby.image}
        alt={hobby.name}
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
        }}
        loading="lazy"
      />
      <CardContent
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          ...buttonStyle, // merging the button styles
        }}
      >
        <Typography variant="h6" align="center">
          {hobby.name}
        </Typography>
        <Typography variant="body2" align="center">
          {hobby.description}
        </Typography>
      </CardContent>
    </div>
  </Card>
);

export default HobbyTile;
