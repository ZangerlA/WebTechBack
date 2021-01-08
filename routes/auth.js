const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const createAccessJwtCookie = require('../middlewares/createAccessJwtCookie')
const createRefreshJwtCookie = require('../middlewares/createRefreshJwtCookie')
const createUserIdCookie = require('../middlewares/createUserIdCookie')

router.post('/login', async function (req, res, next) {
    let username = req.body.username;
    let pw = req.body.password;
    let user;

    try {
        user = await db.User.findOne({where: {username: username}})
    }catch (error) {
        res.status(500).send({error: error.message, message: 'Error finding User while logging in.'});
        return;
    }

    if(user === null) {
        res.status(403).send({ message: "An account with this username does not exist" });
        return;
    }
    else if(!bcrypt.compareSync(pw,user.dataValues.pwHash)){
        res.status(403).send({ message: "Wrong Password." });
        return;
    }
    else {
        res = await createAccessJwtCookie(res, user.dataValues.id);
        res = await createRefreshJwtCookie(res, user.dataValues.id);
        res = await createUserIdCookie(res, user.dataValues.id);
        res.status(200).send({ id: user.dataValues.id });
    }
})

router.get('/logout', async function (req, res, next) {
    let httpOnly = (process.env.HTTPONLY === 'true'? true:false)
    let secure = (process.env.SECURE === 'true'? true:false)

    try {
        await db.User.update({ refreshToken: null }, {
                where: {
                    id: req.cookies.u_id
                }
        });
    }catch (error) {
        console.log(error)
        res.status(500).send({error: error, message: 'Error deleting token while logging out.'});
        return;
    }

    res.cookie(
        'access_token',
        'invalid',
        {
            maxAge: 0,
            httpOnly:httpOnly,
            secure:secure
        });

    res.cookie(
        'refresh_token',
        'invalid',
        {
            maxAge: 0,
            httpOnly:httpOnly,
            secure: secure
        });

    res.cookie(
        'u_id',
        'invalid',
        {
            maxAge: 0,
            httpOnly:httpOnly,
            secure: secure
        });

    res.status(200).send({ message: "Successfully logged out" });
});

router.get('/validateSession', function (req, res, next) {
    res.status(200).send({ message: "logged in" });
})

module.exports = router;
