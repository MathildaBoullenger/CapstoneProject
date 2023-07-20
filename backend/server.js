const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const associations = require('./models/modelAssociations');

let dbConnect = require("./dbConnect");

app.use(cors({ optionsSuccessStatus: 200 }));

// parse requests of content-type - application / json;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MySQL application." });
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;

const {
    usersRoutes,
    activityRoutes
} = require("./routes")

app.use('/api', usersRoutes)
app.use('/api', activityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

