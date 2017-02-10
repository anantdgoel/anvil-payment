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
        user.card = req.body.card;
        user.cvc = req.body.cvc;
        user.exp = req.body.exp;
        user.bzip = req.body.bzip;
        user.save(function(err) {
          if(!err)
            res.status(200);
          else
            res.status(400);
        });
      });
  }

};
