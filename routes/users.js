var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
const db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a hello world');
});

router.post('/', function (req, res, next) {
    console.log(req.body)
    db.User.create({
        username: req.body.client_username,
        contact_email: req.body.client_email,
        pwHash: req.body.client_password
    });
    res.send("User created!")
})

module.exports = router;
