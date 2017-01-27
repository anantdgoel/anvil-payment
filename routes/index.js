var express = require('express');
var router = express.Router();

/* GET singup page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Anvil' });
});

router.post('/', function(req, res){

});


module.exports = router;
