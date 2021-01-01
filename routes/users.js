var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const db = require('../models');
var userExists = require('../middlewares/userExists');
var jwt = require('jsonwebtoken');


//Route for retrieving data of user. Check username and pw, then return token, userinfo
router.get('/:id', async function(req, res, next) {
    let user = await db.User.findByPk(req.params.id);
    delete user.dataValues.pwHash;
    res.status(200).send(user);
});

//Route for user creation.
router.post('/', userExists, async function (req, res, next) {
    let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));

    if (req.body.secret_code !== process.env.SECRET_CODE) { // Only let TMKL users create an account
        res.status(400).send({message: "Gotta do some TMKLs first."});
        return;
    }

    await db.User.create({
        username: req.body.username,
        contact_email: req.body.contact_email,
        pwHash: hash
    });
    res.status(200).send({message: "User created!"});
})

//Route for making changes to userdata
router.put('/:id',userExists, async function (req,res,next) {
    let fieldName = req.body.fieldName; //Set to the fieldname from db you want to change
    let newInfo = req.body.newInfo;     //Set to the new value for the given db-field
    if(fieldName === "pwHash") {
        newInfo = bcrypt.hashSync(req.body.newInfo, bcrypt.genSaltSync(12));
    }
    await db.User.update({
        [fieldName]: newInfo    //Set db-field [fieldvalue] to content of newInfo
    },
        { where: {
            id: req.params.id
        }
    }).catch(error => res.status(500).send({message: error.message}));
    res.status(200).send({message: "Userdata edited"});
})

//Route for deleting a user
router.delete('/:id',async function (req,res,next) {
    await db.User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).send({message: "User deleted"});
})

router.post('/login', async function (req,res) {
    let username = req.body.username;
    let pw = req.body.password;
    let user = await db.User.findOne({where: {username: username}})
    if(user === null) {
        res.status(403).send({ message: "An account with this username does not exist" });
        return;
    }
    else if(!bcrypt.compareSync(pw,user.dataValues.pwHash)){
        res.status(403).send({ message: "Wrong Password." });
        return;
    }
    else {
        let token = jwt.sign(
            {
                id: user.dataValues.id
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '3600s',
                audience: 'http://teamkill.at/api'
            });

        res.status(200).cookie('token', token, {httpOnly:true, secure:false}).send({
            id: user.dataValues.id
        })
    }
})

module.exports = router;
