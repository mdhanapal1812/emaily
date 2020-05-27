const keys = require('../config/keys');
//this is installed and check documentation of why its like this.
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');
module.exports = app =>{
    //requireLogin is a function but it should be called after a request is coming into this application
  app.post('/api/stripe',requireLogin,async (req,res)=>{
   const charge = await stripe.charges.create({
      amount:500,
      currency:'usd',
      description:'$5 for 5 credits',
      source:req.body.id
                          });

   //We are able to directly get the user from req because of passport , passport deserializes the
    // user
   req.user.credits += 5;
   const user = await req.user.save();
   res.send(user);
  })
};