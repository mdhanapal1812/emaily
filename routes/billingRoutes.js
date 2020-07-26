const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middleware/requireLogin");

/**
 * This file contains the route handlers responsible for billing.
 */
module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {

    /**
     * Refer stripe npm documentation for details on format.
     * To instruct stripe that we want to bill for 500 cents / 5$
     */
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
