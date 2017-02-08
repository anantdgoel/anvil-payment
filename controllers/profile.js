var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

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
        user = user.toObject();
        // Keep salt and hash only on server side
        delete user['salt'];
        delete user['hash'];
        res.status(200).json(user);
      });
  }

};

module.exports.profileVerify = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        user = user.toObject();
        // Keep salt and hash only on server side
        if (req.payload._id === user['_id'])
        user['verified'] = true;
        res.status(200).json({"status" : "success"});
      });
  }
};
