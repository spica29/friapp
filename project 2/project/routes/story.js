'use strict'

var models  = require('../models');

module.exports = function(app, logger) {
  app.get('/stories', function(req, res) {
    models.Story.findAll().then(function(stories){
      res.render('stories/stories', { 
        title: 'Stories',
        stories: stories 
      });
    })    
  });
}