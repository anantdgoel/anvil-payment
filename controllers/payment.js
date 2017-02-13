var mongoose = require('mongoose');
var User = mongoose.model('User');
var stripe = require("stripe")(
  "sk_test_DbjvWl9HFaIuuIcF9QMz6RMJ"
);

module.exports.payCard = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        //user = user.toObject();
        user.stripe_token = req.body.stripe_token;
        var stripe = require("stripe")(
          "sk_test_DbjvWl9HFaIuuIcF9QMz6RMJ"
        );

        stripe.customers.create({
          email: user.email,
          source: user.stripe_token // obtained with Stripe.js
        }, function(err, customer) {
            if(err)
              res.status(400).json('{Error: Stripe could not create customer}')
            else {
              stripe.subscriptions.create({
                customer: customer.id,
                plan: "basic",
              }, function(err, subscription) {
                if(err)
                  res.status(400).json('{Error: Stripe could not subscribe customer}')
              });
            }
        });

        user.save(function(err) {
          if(err)
            res.status(400).json('{Error: Payment error}');
        });
        res.status(200).json(user)
      });
  }

};
