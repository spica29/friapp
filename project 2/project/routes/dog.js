'use strict'

var models  = require('../models');
var express = require('express');
var router = express.Router();
var acl = require('../authentication/acl');

module.exports = function(app, logger) {
  app.get('/ourdogs', function(req, res) {
    models.Dog.findAll().then(function(dogs) {
      if (dogs == null) logger.error("No dogs in database");
      else logger.info("GET all dogs request")
      res.render('ourdogs/ourdogs', { 
        title: 'Our dogs', 
        dogs: dogs 
      });
    })
  });

  app.get('/dog/find/:id', function(req, res){
    models.Dog.find({ where: { id: req.body.nameOfDog } }).then(function(dog){
        if(dog == null) logger.error("No dog in db");
        else logger.info("Find dog by id: " + req.body.nameOfDog + " route");
        return dog;
    });
  })

  app.get('/dog/:id?', function(req, res){
    models.Dog.findOne({ where: { id: req.params.id }})
      .then(function(dog){
        if(dog == null) logger.error("No dog with " + req.params.id + " in database");
        logger.info("Get dog by id " + req.params.id + " route");
        res.render('dog/dogadopt', {
          title: dog.name,
          dog: dog
        })
      })
  })

  app.post('/dog/:id?', function(req, res){
    //check user
    if(req.user == null) res.redirect('/');
      acl.isAllowed(req.user.username, 'profile', 'view').then(function(allowed){
        if(allowed) 
        {
          models.User.findOne({ where: { username: app.locals.username} })
            .then(function(user){
              models.Dog.findOne({ where: { id: req.params.id} })
                .then(function(dog){
                  dog.updateAttributes({ UserId: user.id });
                })
            })
            .then(function(user){
              logger.info("User " + req.user.username + " has adopter a dog with id " + req.params.id);
              res.redirect('/profile');
            })
        }
        else {
          logger.warn("User " + req.user.username + " is not allowed to adopt dog, no permissions.");
          res.redirect('/');
        }
      })
  })
}