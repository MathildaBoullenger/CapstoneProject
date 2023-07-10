import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const HobbyTile = ({ hobby, onClick }) => {
  return (
    <Card onClick={onClick}>
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
