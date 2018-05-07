const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback', // callback when user approves to sign in
    passport.authenticate('google'), // takexs code which google returns fetches user
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // Attached automatically to req object by passport
    //kills the cookie
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
