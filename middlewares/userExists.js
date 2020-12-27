var db = require('../models')

function userExists(req, res, next) {
    if(req.body.fieldName === "username") {
        req.body.username = req.body.newInfo;
    }
    if(req.body.fieldName && req.body.fieldName !== "username") {
        next();
        return;
    }

    db.User.count({ where: { username: req.body.username}})
        .then(count  => {
            console.log(count)
            if(count === 0) {
                next();
            }
            else {
                res.status(400).send({ message: "Username already taken." });
            }
        })
}

module.exports = userExists;