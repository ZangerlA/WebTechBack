const jwt = require('jsonwebtoken');

function createAccessJwtCookie(res, id) {
	let access_token = jwt.sign(
		{
			id: id
		},
		process.env.TOKEN_SECRET_ACCESS,
		{
			expiresIn: '600s',
			audience: 'http://teamkill.at/api'
		});
	let httpOnly = (process.env.COOKIE_HTTPONLY === 'true' ? true : false)
	let secure = (process.env.COOKIE_SECURE === 'true' ? true : false)

	res.cookie(
		'access_token',
		access_token,
		{
			maxAge: 600000,
			httpOnly: httpOnly,
			secure: secure
		});

	return res;
}

module.exports = createAccessJwtCookie;
