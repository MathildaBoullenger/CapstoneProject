const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

let dbConnect = require("./dbConnect");

app.use(cors({ optionsSuccessStatus: 200 }));

// parse requests of content-type - application / json;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MySQL application." });
});

// set port, listen for requests
const PORT = process.env.DB_PORT || 8080;

const {
    usersRoutes
} = require("./routes")

app.use('/api', usersRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

