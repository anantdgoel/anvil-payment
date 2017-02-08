var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlPay = require('../controllers/payment');

//payment
router.post('/pay', auth, ctrlPay.payCard);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/verify', auth, ctrlProfile.profileVerify);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router
