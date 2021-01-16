function createUserIdCookie(res, id) {
	let httpOnly = (process.env.HTTPONLY === 'true' ? true : false)
	let secure = (process.env.SECURE === 'true' ? true : false)

	res.cookie(
		'u_id',
		id,
		{
			maxAge: 2592000000,
			httpOnly: httpOnly,
			secure: secure
		});

	return res;
}

module.exports = createUserIdCookie;