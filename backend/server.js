const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const Models = require("./models")
const cors = require("cors");
const app = express();

require("dotenv").config();
const associations = require('./models/modelAssociations');

let dbConnect = require("./dbConnect");

// parse requests of content-type - application / json;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({ optionsSuccessStatus: 200 }));

//Middleware
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

//Passport.js

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Assuming you're using email for login
    },
    function (username, password, done) {
      Models.UsersModel.findOne({ where: { username: username } }).then((user) => {
        if (!user) {
          console.log('server.js: there is no user with this username')
          return done(null, false, { message: "Incorrect username." });
        }

        // Use the validPassword method to check the password
        user.validPassword(password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              console.log('server.js: the password is invalid')
              return done(null, false, { message: "Incorrect password." });
            }

            // Authentication successful
            return done(null, user);
          })
          .catch((error) => {
            // Handle bcrypt or other error (e.g., invalid hashing, database errors)
            return done(error);
          });
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function (user_id, done) {
  Models.UsersModel.findByPk(user_id).then((user) => {
    done(null, user);
  });
});



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

