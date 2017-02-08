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
        if(!user.stripe_cus_id){
          var customer = stripe.customers.create({
            email: "jenny.rosen@example.com",
          }, function(err, customer) {
            if(err){
              res.status(401).json({"message" : "Error creating customer"})
            }

            user.stripe_cus_id = customer.id;
          });
        }

        stripe.subscriptions.create({
        customer: user.stripe_cus_id,
        plan: "basic",
        coupon: "callout",
      }, function(err, subscription) {
        if(err)
          res.status(401).json({"message" : "Payment error"})
        user.stripe_sub_id = subscription.id
        res.status(200).json({"message" : "Payment sucess"})
      });
        res.status(200).json();
      });
  }

};
