const jwt = require('jsonwebtoken');
const db = require('../models')

async function createRefreshJwtCookie(res, id) {
	let refresh_token = jwt.sign(
		{
			id: id
		},
		process.env.TOKEN_SECRET_REFRESH,
		{
			expiresIn: '2592000s',
			audience: 'http://teamkill.at/api'
		});
	console.log(refresh_token)

	try {
		await db.User.update({
				refreshToken: refresh_token    //Set db-field [fieldvalue] to content of newInfo
			},
			{
				where: {
					id: id
				}
			})
	} catch (error) {
		res.status(500).send({error: error.message, message: 'Error setting your refreshToken'});
		return;
	}

	let httpOnly = (process.env.COOKIE_HTTPONLY === 'true' ? true : false)
	let secure = (process.env.COOKIE_SECURE === 'true' ? true : false)

	res.cookie(
		'refresh_token',
		refresh_token,
		{
			maxAge: 2592000000,
			httpOnly: httpOnly,
			secure: secure
		});

	return res;
}

module.exports = createRefreshJwtCookie;
