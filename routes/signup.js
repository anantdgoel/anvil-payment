var express = require('express');
var admin = require("firebase-admin");
var router = express.Router();
var serviceAccount = require("./../firebase-admin-keys.json");

//initialize firebase-admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anvil-97cbe.firebaseio.com"
});

/* GET singup page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign Up Page' });
});

/* POST process signup */
router.post('/', function(req, res, next){
  console.log(req.query.email)
  admin.auth().createUser({
  email: req.query.email,
  emailVerified: false,
  password: req.query.password,
  displayName: "John Doe",
  photoURL: "http://www.example.com/12345678/photo.png",
  disabled: false
})
  .then(function(userRecord) {
    // A UserRecord representation of the newly created user is returned
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
  res.end("Sucesss")
});

module.exports = router;
