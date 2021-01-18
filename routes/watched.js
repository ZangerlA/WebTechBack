const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/',async function (req, res, next){
	try{
		let result = [];
		let users = await db.User.findAll();
		users = JSON.parse(JSON.stringify(users));
		for (let user of users) {
			let userWatched = await db.userMediaWatched.findAll({where: {userId: user.id}})
			userWatched = JSON.parse(JSON.stringify(userWatched));
			//userWatched.forEach((res) => delete res.userId)
			userWatched = userWatched.map(result => result.mediumId);
			let userWatchList = {[user.username]: userWatched};
			result.push(userWatchList)
		}

		res.status(200).send(result)
	}catch (error) {
		res.status(500).send({error: error, message: 'Error getting watchlist.'})
	}
});

router.get('/currentUser',async function (req, res, next){
	try{
		let result = [];
		let userWatched = await db.userMediaWatched.findAll({
			where: {
				userId: req.cookies.u_id
			}
		});
		for (let WT of userWatched) {
			result.push(WT.mediumId)
		}
		res.status(200).send(result)
	}catch (error) {
		res.status(500).send({error: error, message: 'Error getting watchlist.'})
	}
});

module.exports = router;