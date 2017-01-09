var models  = require('../models');

module.exports = function(app) {
  app.get('/user/all', function(req, res) {
    models.User.findAll().then(function(users) {
      return users;
    })
  });

  app.post('/user/create', function(req, res){
    models.User.create(
      {
        username: req.username,
        email: req.email,
        password_digest: req.password_digest,
        firstName: req.firstName,
        lastName: req.lastName,
        image: req.image
      }
      ).then(user){
      return user;
    }
  })
}