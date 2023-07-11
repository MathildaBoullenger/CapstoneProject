import React from "react";
import HobbyTile from "./HobbyTile";
import placeholderImage from "../assets/hobbyplaceholderimage.jpg";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

const HobbyList = ({ onHobbyClick }) => {
  const [selectedHobby, setSelectedHobby] = useState(null);
  
  const hobbies = [
    { id: 1, name: "Hiking/Tramping", image: placeholderImage },
    { id: 2, name: "Camping", image: placeholderImage },
    { id: 3, name: "Fishing", image: placeholderImage },
    { id: 4, name: "Cycling", image: placeholderImage },
    { id: 5, name: "Running", image: placeholderImage },
    { id: 6, name: "Rugby", image: placeholderImage },
    { id: 7, name: "Soccer", image: placeholderImage },
    { id: 8, name: "Cricket", image: placeholderImage },
    { id: 9, name: "Rowing", image: placeholderImage },
    { id: 10, name: "Gardening", image: placeholderImage },
    { id: 11, name: "Woodworking", image: placeholderImage },
    { id: 12, name: "Painting/Drawing", image: placeholderImage },
    { id: 13, name: "Pottery", image: placeholderImage },
    { id: 14, name: "Bowling", image: placeholderImage },
    { id: 15, name: "Dancing", image: placeholderImage },
    { id: 16, name: "Archery", image: placeholderImage },
    { id: 17, name: "Cooking", image: placeholderImage },
    { id: 18, name: "Knitting", image: placeholderImage },
    { id: 19, name: "Crocheting", image: placeholderImage },
  ];

  return (
    <>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h5" style={{ margin: "50px 0" }}>
            Click to see what’s on in your spaces of interest!
          </Typography>
        </Grid>
      </Grid>
    
      <Grid container spacing={2} className="hobby-list">
        {hobbies.map((hobby) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={hobby.id}>
            <HobbyTile
              key={hobby.id}
              hobby={hobby}
              onClick={() => onHobbyClick(hobby)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HobbyList;
