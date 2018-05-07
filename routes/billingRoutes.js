const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
// Billing the user actually through stripe
module.exports = app => {
  // Assuming user is logged in other no usermodel
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd', // On front end we just authorize charge.
      // Here we are actually amking charge
      description: '$5 for 5 credits',
      source: req.body.id //Identifies current charge token
    });

    req.user.credits += 5; // Accessing user model automatially
    // through passport
    const user = await req.user.save();

    res.send(user); //send back updated user with credits in rsponse
  });
};
// to handle the promise we use async await syntax
// By default express derver doesnt parse request object
// req contains token so have to use body parser to access it.
// async has to be dealt with await or by returning a promise
