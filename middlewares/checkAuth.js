const db = require('../models');
const jwt = require('jsonwebtoken');
const createAccessJwtCookie = require('../middlewares/createAccessJwtCookie')

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

            let user;
            try {
                user = await db.User.findByPk(decoded.id);
            }catch (error) {
                res.status(500).send({error: error.message, message: 'Error finding User while checking authentication.'});
            }
            if (refreshToken === user.dataValues.refreshToken && decoded.id === user.dataValues.id) {
                res = createAccessJwtCookie(res, user.dataValues.id);
                next();
            }
            else {
                res.status(500).send({ message: 'Shit went wrong. Please try logging in again.' });
            }
        })
}

module.exports = checkAuth;