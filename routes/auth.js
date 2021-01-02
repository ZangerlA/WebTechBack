var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const db = require('../models');
var bcrypt = require('bcrypt');

router.post('/login', async function (req, res, next) {
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
        let access_token = jwt.sign(
            {
                id: user.dataValues.id
            },
            process.env.TOKEN_SECRET_ACCESS,
            {
                expiresIn: '600s',
                audience: 'http://teamkill.at/api'
            });
        let refresh_token = jwt.sign(
            {
                id: user.dataValues.id
            },
            process.env.TOKEN_SECRET_REFRESH,
            {
                expiresIn: '2592000s',
                audience: 'http://teamkill.at/api'
            });
        await db.User.update({
                refreshToken: refresh_token    //Set db-field [fieldvalue] to content of newInfo
            },
            { where: {
                    id: user.dataValues.id
                }
            }).catch(error => res.status(500).send({message: error.message}));

        let httpOnly = (process.env.HTTPONLY === 'true'? true:false)
        let secure = (process.env.SECURE === 'true'? true:false)
        res.cookie(
            'access_token',
            access_token,
            {
                maxAge: 600000,
                httpOnly:httpOnly,
                secure: secure
            });

        res.cookie(
            'refresh_token',
            refresh_token,
            {
                maxAge: 2592000000,
                httpOnly:httpOnly,
                secure: secure
            });

        res.status(200).send({
            id: user.dataValues.id
        });
    }
})

router.get('/logout', function (req, res, next) {
    const cookie = req.cookies.access_token
    const now = Date.now()/1000
    let httpOnly = (process.env.HTTPONLY === 'true'? true:false)
    let secure = (process.env.SECURE === 'true'? true:false)
    res.cookie(
        'access_token',
        'invalid',
        {
            expires: now,
            httpOnly:httpOnly,
            secure:secure
        });

    res.cookie(
        'refresh_token',
        refresh_token,
        {
            expires: now,
            httpOnly:httpOnly,
            secure: secure
        });

    res.status(200).send({
        message: "Successfully logged out"
    });
});

router.get('/validateSession', function (req, res, next) {
    res.status(200).send({ message: "logged in"});
})

module.exports = router;
