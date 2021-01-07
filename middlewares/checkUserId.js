const db = require('../models');

async function checkUserId(res, req, id) {
    let user;
    const cookieId = req.cookies.u_id;

    try{
        user = await db.User.findByPk(cookieId);
    }catch (error) {
        res.status(500).send({error: error.message, message: 'Error finding User by Id while checking Id.'});
        return;
    }

    if (user && (user.dataValues.id !== id)) {
        res.status(500).send({error: error.message, message: 'Error provided Id does not match your account.'});
        return;
    }
}

module.exports = checkUserId;