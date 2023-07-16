import React from "react";
import { Card, CardMedia, CardContent, Typography, useTheme } from "@mui/material";

const HobbyTile = ({ hobby, onClick, selected }) => {
  const theme = useTheme(); // Access the MUI theme

  const tileStyle = {
    border: selected ? '2px solid red' : 'none',
    // Add any other desired styles
  };

  const buttonStyle = {
    background: theme.palette.tertiary.main, // Use the tertiary color as the button background
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };
  
  return (
    <Card onClick={onClick} className={`hobby-tile ${selected ? 'selected' : ''}`} style={tileStyle}>
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
        />
        <CardContent
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            ...buttonStyle, // Merge the button styles here
          }}
        >
          <Typography variant="h6" align="center">{hobby.name}</Typography>
          <Typography variant="body2" align="center">{hobby.description}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default HobbyTile;
