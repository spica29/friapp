module.exports = function(app, passport) {
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
  });

  app.route('/ourdogs')
  	.get(function(req, res, next) {
    		res.render('ourdogs/ourdogs', { title: 'Our dogs' })})
  	.post(function(req, res) { 
  		res.send('POST handler for /dogs route.');
  		console.log("ISPIS" + req.body)})

  app.route('/login')
    .get(function(req, res, next) {
        res.render('login/login', { title: 'Login', email1:'EMAIL' })})
    .post(function(req, res, next) { 
      passport.authenticate('local-login', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })(req, res, next); 
    });

  app.route('/register')
    .get(function(req, res, next) {
        res.render('login/register', { title: 'Register' })})
    .post(function(req, res, next) { 
      passport.authenticate('local-signup', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })(req, res, next); 
    });

  app.get('/foster', function(req, res, next) {
    res.render('howtohelp/foster', { title: 'Foster' });
  });

  app.get('/donate', function(req, res, next) {
    res.render('howtohelp/donate', { title: 'Donate' });
  });

  app.get('/volunteer', function(req, res, next) {
    res.render('howtohelp/volunteer', { title: 'Volunteer' });
  });

  app.get('/stories', function(req, res, next) {
    res.render('stories/stories', { title: 'Stories' });
  });

  app.get('/contact', function(req, res, next) {
    res.render('contact/contact', { title: 'Contact' });
  });


}

