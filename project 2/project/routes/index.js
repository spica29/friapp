'use strict'


module.exports = function(app, passport, flash) {
  //logging
  var winston = require('winston');
  var fs = require('fs');
  var logDir = 'log';
  var env = process.env.NODE_ENV || 'development';

  // Create the log directory if it does not exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  var tsFormat = () => (new Date()).toLocaleTimeString();
  var logger = new (winston.Logger)({
    transports: [
      // colorize the output to the console
      new (winston.transports.Console)({
        timestamp: tsFormat,
        colorize: true,
        level: 'info'
      }),
      new (winston.transports.File)({
        filename: `${logDir}/results.log`,
        timestamp: tsFormat,
        level: env === 'development' ? 'debug' : 'info'
      })
    ]
  });
  /*logger.info('Hello world');
  logger.warn('Warning message');
  logger.debug('Debugging info');*/

  //routes
  var username = null;
  var dogRoute = require('./dog.js')(app, logger);
  var storiesRoute = require('./story.js')(app, logger);
  var userRoute = require('./user.js')(app, logger);
  var adminRoute = require('./admin.js')(app, logger);


  var logged = false;

  app.get('*', function(req, res, next){
    req.user = req.user || null;
    if(req.user != null){
      logged = true; 
      username = req.user;
      app.locals.username = req.user.username;
    } else {
      username = null;
      app.locals.username = null;
    }
    next();
  })

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' , username: username });
  });

  app.route('/login')
    .get(function(req, res, next) {
        if(req.user != null)  {
          logger.warn("User already logged in, can't do login again");
          res.redirect('/');
        }
        logger.info('GET request login');
        res.render('login/login', { title: 'Login' })})
    .post(function(req, res, next) { 
      if(req.user != null) {
        logger.warn("User already logged in, can't do POST login");
        res.render('profile/profile', { title: user.username });
      }
      passport.authenticate('local-login', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true,
                                     session: true })(req, res, next); 
    });

  app.route('/register')
    .get(function(req, res, next) {
        if(req.user != null) {
          logger.warn("User already logged in, can't do register again");
          res.redirect('/'); 
        }
        logger.info("GET request REGISTER");
        res.render('login/register', { title: 'Register', message: req.flash('message') })})
    .post(function(req, res, next) { 
      if(req.user != null) {
        logger.warn("User already logged in, can't do POST register")
        res.redirect('/');
      }
      else passport.authenticate('local-signup', { successRedirect: '/',
                                     failureRedirect: '/register',
                                     failureFlash: true})
      (req, res, next)
    });

  app.get('/logout', function(req, res){
    if(req.user == null) {
      logger.warn("User is not logged in, can't do logout");
      res.redirect('/');
    }
    req.logout();
    logger.info("Request GET logout");
    res.redirect('/');
  });

  app.get('/foster', function(req, res, next) {
    logger.info("Request GET foster");
    res.render('howtohelp/foster', { title: 'Foster' });
  });

  app.get('/donate', function(req, res, next) {
    logger.info("Request GET donate");
    res.render('howtohelp/donate', { title: 'Donate' });
  });

  app.get('/volunteer', function(req, res, next) {
    logger.info("Request GET volunteer");
    res.render('howtohelp/volunteer', { title: 'Volunteer' });
  });

  app.get('/contact', function(req, res, next) {
    logger.info("Request GET contact");
    res.render('contact/contact', { title: 'Contact' });
  });
}

