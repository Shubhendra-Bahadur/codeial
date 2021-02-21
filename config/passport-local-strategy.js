const express = require("express");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../modals/user");
//authentication using passport

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish the identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("error in finding user --> passport");
          return done(err);
        }

        if (!user || user.password != password) {
          console.log("invalid username password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//seralising the user to decide which iuser id should be kept in cookie
//                                      /--> done or any name you want
//                                     /
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize user

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user ---> passport");
      return done(err);
    }

    return done(null, user);
  });
});

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // console.log(req.user);
        // console.log(req.local);
        res.locals.user=req.user;
        // console.log(req.local);
    }

    next();
}

module.exports = passport;
