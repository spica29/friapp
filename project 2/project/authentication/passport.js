'use strict'

var LocalStrategy = require('passport-local').Strategy;

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
      passReqToCallBack: true
    },
    function(req, email, password, done) {
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      process.nextTick(function() {
        User.find({ where: { 'email': email } }).then(function (user, error) {
            // if there are any errors, return the error
            //check password
            if (err){
              return done(null, false, console.log(err));
            }
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, { message:'That email is already taken.'});
            } else {
                // if there is no user with that email
                // create the user
                User.create({
                              'email': email,
                              'password_digest': password
                            })
                            .then(function(user) {
                                    return done(null, user);
                            })
                            .catch(function(err) {
                                console.log("ERR");
                                return done(null, err);
                            });
                if(user){
                  return done(null, false);
                }
            }

        })
      });
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