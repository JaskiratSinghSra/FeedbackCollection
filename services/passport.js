const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // pull out the schema from mongoose

// User is handle (model class) whic gives control over underlying collection

//To generate identifying piece of info
//user which is returned from oatrh flow or existing user,what we pulled from database
// done after we have done something
//user.id mlab id givrn to user so that make compatible for other logins like fb twitter
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Identifies iser who is stored in database.OAth only purpose is allow to someone to sign in.
//After that we use inter ids.Take identifying information and turn into user model.
//Return user with that specific id in databse
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// iF FIRST TIME CREATE A NEW USER OTHERWISWE if logged in before USE EXISITMG USER
//callback functio  has a,r,p,d profile contains uder id
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //already have a record with given prfile id.
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    } // we dont have a user record with this id. make a new record.
  )
);
//.save to persist into database
