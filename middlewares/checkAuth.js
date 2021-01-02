var jwt_auth = require('express-jwt');
var db = require('../models');
var jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    const refreshToken = req.cookies.refresh_token;
    jwt.verify(
        refreshToken,
        process.env.TOKEN_SECRET_REFRESH,
        {
            algorithms: ['HS256'],
            audience: 'http://teamkill.at/api',
            credentialsRequired: true,
        },
        async function (err, decoded) {
            if (err) {
                res.status("400").send({message: "refresh_token_invalid"});
                return;
            }
            if (refreshToken === user.dataValues.refreshToken && decoded.id === user.dataValues.id) {
                let user = await db.User.findByPk(decoded.id);
                let access_token = jwt.sign(
                    {
                        id: user.dataValues.id
                    },
                    process.env.TOKEN_SECRET_ACCESS,
                    {
                        expiresIn: '600s',
                        audience: 'http://teamkill.at/api'
                    });
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
                next();
            }
        })
}

module.exports = checkAuth;