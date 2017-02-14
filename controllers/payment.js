var mongoose = require('mongoose');
var User = mongoose.model('User');
var stripe = require("stripe")(
  process.env.STRIPE_KEY
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
        user.card = req.body.card;
        user.bzip = req.body.bzip;
        user.cvc = req.body.cvc;
        user.exp = req.body.exp;
        user.save(function(err) {
          if(err)
            res.status(400).json('{Error: Payment error}');
        });
        res.status(200).json(user)
      });
  }

};
