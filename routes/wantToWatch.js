const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/:id?',async function (req, res, next){
	try{
		let result;
		if (req.params.id){
			result = await db.UserMediaWantToWatch.findAll({
				where: {
					userId: req.params.id
				}
			})
		}
		else {
			result = [];
			let users = await db.User.findAll();
			users = JSON.parse(JSON.stringify(users));

			for (let user of users) {
				let userWantToWatch = await db.UserMediaWantToWatch.findAll({where: {userId: user.id}})
				userWantToWatch = JSON.parse(JSON.stringify(userWantToWatch));
				userWantToWatch = userWantToWatch.map(result => result.mediumId);
				let userWatchList = {[user.username]: userWantToWatch};
				result.push(userWatchList)
			}
		}
		res.status(200).send(result)
	}catch (error) {
		res.status(500).send({error: error, message: 'Error getting watchlist.'})
	}
});

router.post('/',async function (req, res, next){
	try{
		await db.UserMediaWantToWatch.create({
			userId: req.cookies.u_id,
			mediumId: req.body.MediumId
		})
		res.status(200).send({message: 'Success adding media to watchlist.'})
	}catch (error) {
		res.status(500).send({error: error, message: 'Error adding media to watchlist.'})
	}
});

module.exports = router;