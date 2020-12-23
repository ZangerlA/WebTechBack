var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a hello world');
});

router.post('/create', function (req, res, next) {
  let user; //TODO

})

module.exports = router;
