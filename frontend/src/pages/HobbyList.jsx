import React from "react";
import HobbyTile from "../components/HobbyTile";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import hikingImage from "../assets/hikingImage-min.jpg";
import fishingImage from "../assets/fishingImage-min.jpg";
import campingImage from "../assets/campingImage-min.jpg";
import paintingImage from "../assets/paintingImage-min.jpg";
import cyclingImage from "../assets/cyclingImage-min.jpg";
import runningImage from "../assets/runningImage-min.jpg";
import soccerImage from "../assets/soccerImage-min.jpg";
import rugbyImage from "../assets/rugbyImage-min.jpg";
import rowingImage from "../assets/rowingImage-min.jpg";
import gardeningImage from "../assets/gardeningImage-min.jpg";
import cricketImage from "../assets/cricketImage-min.jpg";
import woodworkImage from "../assets/woodworkImage-min.jpg";
import potteryImage from "../assets/potteryImage-min.jpg";
import dancingImage from "../assets/dancingImage-min.jpg";
import bowlingImage from "../assets/bowlingImage-min.jpg";
import knittingImage from "../assets/knittingImage-min.jpg";
import archeryImage from "../assets/archeryImage-min.jpg";
import crochetImage from "../assets/crochetImage-min.jpg";
import cookingImage from "../assets/cookingImage-min.jpg";
import sewingImage from "../assets/sewingImage-min.jpg";

const hobbies = [
  { id: 1, name: "Hiking", image: hikingImage },
  { id: 2, name: "Camping", image: campingImage },
  { id: 3, name: "Fishing", image: fishingImage },
  { id: 4, name: "Cycling", image: cyclingImage },
  { id: 5, name: "Running", image: runningImage },
  { id: 6, name: "Rugby", image: rugbyImage },
  { id: 7, name: "Soccer", image: soccerImage },
  { id: 8, name: "Cricket", image: cricketImage },
  { id: 9, name: "Rowing", image: rowingImage },
  { id: 10, name: "Gardening", image: gardeningImage },
  { id: 11, name: "Woodworking", image: woodworkImage },
  { id: 12, name: "Painting", image: paintingImage },
  { id: 13, name: "Pottery", image: potteryImage },
  { id: 14, name: "Bowling", image: bowlingImage },
  { id: 15, name: "Dancing", image: dancingImage },
  { id: 16, name: "Archery", image: archeryImage },
  { id: 17, name: "Cooking", image: cookingImage },
  { id: 18, name: "Knitting", image: knittingImage },
  { id: 19, name: "Crocheting", image: crochetImage },
  { id: 20, name: "Sewing", image: sewingImage },
];

const HobbyList = () => (
  <>
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h5" align="center" color="secondary">
          Click on a tile to see what’s on in your space of interest!
        </Typography>
      </Grid>
    </Grid>

    <br></br>

    <Grid container spacing={2} className="hobby-list">
      {hobbies.map((hobby) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={hobby.id}>
          <Link to={`/hobbies/${hobby.name}`}>
            <HobbyTile hobby={hobby} />
          </Link>
        </Grid>
      ))}
    </Grid>
  </>
);

export default HobbyList;
