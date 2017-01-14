'use strict'

var LocalStrategy = require('passport-local').Strategy;
var acl = require('../authentication/acl');
var User = require('../models').User;

// expose this function to our app using module.exports
module.exports = function (passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log("serialize" + user);
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.find({ where: { id: id } }).then(function (user) {
      done(null, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      console.log("usao");
      User.find({ where: { 'email': email } }).then(function (user, err) {
        // if there are any errors, return the error
        //check password
        var validator = require("email-validator");
 
        ; // true 
        if(!validator.validate(email)) {
          return done(null, false, { message: req.flash('message', "Bad email")});
        }
        if(req.body.password != req.body.confpassword) {
          return done(null, false, { message: req.flash('message', "Passwords don't match")});
        }

        if (err){
          return done(null, false, console.log(err));
        }
        // check to see if theres already a user with that email
        if (user) {
            return done(null, false, { message: req.flash('message', 'That email is already taken.')});
        } else {
            //check username
            console.log("JEDAN");
            User.find({ where: { 'username': req.body.username }}).then(function(sameUsername, err){
              //if there is someone with username return
                console.log("DVA");
                if(sameUsername){
                  return done(null, false, { message: req.flash('message', 'Username taken.')});
                }
                //not the same username
                else{
                  console.log("TRi");
                  // if there is no user with that email
                  // create the user
                  User.create({
                                'email': email,
                                'password_digest': password,
                                'username': req.body.username
                              })
                              .then(function(user) {
                                      acl.addUserRoles(user.username, 'user');
                                      return done(null, user, { message: req.flash('message', '')});
                              })
                              .catch(function(err) {
                                  return done(null, err);
                              });
                  if(user){
                    return done(null, false);
                  }
                }
            })                
        }
      })
    }));   


  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  }, function (req, username, password, done) {
    // callback with email and password from our form
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.find({ where: { 'email': username } }).then(function (user) {
      // if there are any errors, return the error before anything else
      // if no user is found, return the message
      //console.log("Password "+ user.password_digest);
      if (!user) return done(null, false, console.log('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      // if the user is found but the password is wrong
      if (user.password_digest != password) return done(null, false, console.log('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    })['catch'](function (err) {
      if (err) return done(err);
    });
  }));

  //----------------------------------------------------------------
};