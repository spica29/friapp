'use strict'
var models  = require('../models');
var acl = require('../authentication/acl');

module.exports = function(app, logger) {
  app.route('/editProfile')
    .get(function(req, res, next) {
        if(req.user == null) {
          logger.warn("User is not logged in, can't edit profile");
          res.redirect('/');
        }
        acl.isAllowed(req.user.username, 'profile', 'view').then(function(allowed){
          if(allowed) res.render('profile/editProfile', { title: 'Edit profile' })
          else {
            logger.warn("Can't access, no permissions");
            res.redirect('/');
          }
        })
      })
        
    .post(function(req, res, next){
      if(req.user == null) {
        logger.warn("User is not logged in, can't edit profile");
        res.redirect('/');
      }
      acl.isAllowed(req.user.username, 'profile', 'edit').then(function(allowed){
        if(allowed) 
        {
          var User = models.User;
          var loggedUser = req.user.username;
          if (req.body.username != "") updateUsername(User, req.body.username, loggedUser);
          if (req.body.password != "") updatePassword(User, req.body.password, loggedUser);
          if (req.body.firstName != "") updateFirstName(User, req.body.firstName, loggedUser);
          if (req.body.lastName != "") updateLastName(User, req.body.lastName, loggedUser);
          if (req.body.image != "") updateImage(User, req.body.image, loggedUser);
          logger.info("Editing user " + loggedUser);
          res.redirect('/profile');
        }
        else {
          logger.warn("Can't access, no permissions");
          res.redirect('/');
        }
      })
      
    })

  app.post('/user/create', function(req, res){
    if(req.user == null) res.redirect('/');
    acl.isAllowed(req.user.username, 'profile', 'edit').then(function(allowed){
      if(allowed) 
      {
        models.User.create(
        {
          username: req.username,
          email: req.email,
          password_digest: req.password_digest,
          firstName: req.firstName,
          lastName: req.lastName,
          image: req.image
        }
        ).then(function(user){ return user; });
      }
      else res.redirect('/');
    })
    
  })

  function updateUsername(User, newValue, username){
    User.update( { username: newValue} , { where: { username: username} });
  }

  function updatePassword(User, newValue, username){
    User.update( { password_digest: newValue} , { where: { username: username} });
  }

  function updateFirstName(User, newValue, username){
    User.update( { firstName: newValue} , { where: { username: username} });
  }

  function updateLastName(User, newValue, username){
    User.update( { lastName: newValue} , { where: { username: username} });
  }

  function updateImage(User, newValue, username){
    User.update( { image: newValue} , { where: { username: username} });
  }

  app.route('/profile')
   .get(function(req, res) {
    if(req.user == null) {
      logger.warn("User is not logged in, can't view profile");
      res.redirect('/');
    }
    else acl.isAllowed(req.user.username, 'profile', 'view').then(function(allowed){
        if(allowed) {
          models.User.findOne({ where: {username: req.user.username} })
          .then(function(profile){
            //finding adopted dogs
            models.Dog.findAll({where: { UserId: profile.id }})
            .then(function(dogs){
              if(dogs == null) 
              {
                res.render('profile/profile', { 
                  title: 'Profile', 
                  userProfile: profile
                })
              }else {
                res.render('profile/profile', { 
                  title: 'Profile', 
                  userProfile: profile,
                  dogs: dogs
                })
              }              
            })
          })
          .catch(function(errors) {
            console.log("Error", errors);
            res.render('dashboard', {successFlash: successFlash, errors: errors});
          })
        }
        else {
          res.redirect('/');
          logger.warn("No permissions to see profile");
        }
    });     
  });
}