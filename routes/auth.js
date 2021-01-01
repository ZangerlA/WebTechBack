var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/refresh', function (req,res,next) {
    jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, { algorithms: ['HS256'] }, function (err, decoded) {
        const currentTime = Math.floor(Date.now()/1000);
        const dif = decoded.exp - currentTime
        console.log("refreshing...")
        if (dif <= 120) {
            let token = jwt.sign(
                {
                    id: decoded.id
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '600s',
                    audience: 'http://teamkill.at/api'
                });

            let httpOnly = (process.env.HTTPONLY === 'true'? true:false)
            let secure = (process.env.SECURE === 'true'? true:false)
            res.status(200).cookie(
                'token',
                token,
                {httpOnly:httpOnly, secure:secure})
                .send({
                id: decoded.id
            })
        }
        else {
            res.status(200).send();
            return;
        }
    })
});

module.exports = router;