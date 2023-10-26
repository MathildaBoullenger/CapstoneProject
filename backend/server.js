const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const secretKey = "secretKey";
const Models = require("./models");
const cors = require("cors");
const app = express();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

require("dotenv").config();
const associations = require("./models/modelAssociations");

let dbConnect = require("./dbConnect");

// parse requests of content-type - application / json;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ optionsSuccessStatus: 200 }));

//Middleware
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

// josh - Passport config
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-secret-key", // Replace with your own secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MySQL application." });
});

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;

const { usersRoutes, activityRoutes } = require("./routes");

app.use("/api", usersRoutes);
app.use("/api", activityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
