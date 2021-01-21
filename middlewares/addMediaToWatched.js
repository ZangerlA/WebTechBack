const db = require("../models");

async function addMediaToWatched(req, res) {
	try {
		await db.userMediaWatched.findOrCreate({
			where: {
				userId: req.cookies.u_id,
				mediumId: req.body.MediumId,
			}
		})
		res.status(200).send({message: 'Added media to watched.'});
	} catch (error) {
		res.status(500).send({error: error, message: 'Error adding media to watched.'});
		return;
	}
}

module.exports = addMediaToWatched;