'use strict'

var models  = require('../models');
var express = require('express');
var router = express.Router();
var acl = require('../authentication/acl');

module.exports = function(app, logger) {
	app.get('/admin', function(req, res, next){
		if(req.user == null) {
      logger.warn("User not allowed on admin route");
      res.redirect('/');
    }
    acl.isAllowed(req.user.username, 'admin', 'view').then(function(allowed){
      if(allowed) 
      {
      	models.User.findAll().then(function(users){
          if(users == null) logger.error("No users in database");
          logger.info("Request GET admin panel");
          res.render('admin/admin', { title: 'Admin', users: users });
		    })
      }
      else {
        logger.warn("User not allowed on admin route");
        res.redirect('/');
      }
    })
	})

	app.delete('/admin/:id', function(req, res, next){
		console.log("DELETE BUTTON");
	})

	app.post('/admin/delete/:id', function(req, res, next){
		if(req.user == null) {
      logger.warn("User not allowed on admin route");
      res.redirect('/');
    }
    acl.isAllowed(req.user.username, 'admin', 'view').then(function(allowed){
      if(allowed) 
      {
      	models.User.destroy({where: { id: req.params.id }}).then(function(){
          logger.info("Deleting user from database");
          res.redirect('/admin');
        });
      }
      else {
        logger.warn("User not allowed on admin route");
        res.redirect('/');
      }
    })
	})
}