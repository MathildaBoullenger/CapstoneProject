import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const HobbyTile = ({ hobby, onClick, selected }) => {

  const tileStyle = {
    border: selected ? '2px solid red' : 'none',
    // Add any other desired styles
  };
  
  return (
    <Card onClick={onClick} className={`hobby-tile ${selected ? 'selected' : ''}`}>
      <CardMedia
        component="img"
        height="200"
        image={hobby.image}
        alt={hobby.name}
      />
      <CardContent>
        <Typography variant="h6">{hobby.name}</Typography>
        <Typography variant="body2">{hobby.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default HobbyTile;
