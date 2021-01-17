const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/',async function (req, res, next){
	try{
		let result = [];
		let users = await db.User.findAll();
		users = JSON.parse(JSON.stringify(users));
		for (let user of users) {
			let userWantToWatch = await db.UserMediaWantToWatch.findAll({where: {userId: user.id}})
			userWantToWatch = JSON.parse(JSON.stringify(userWantToWatch));
			//userWantToWatch.forEach((res) => delete res.userId)
			userWantToWatch = userWantToWatch.map(result => result.mediumId);
			let userWatchList = {[user.username]: userWantToWatch};
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
		let userWantToWatch = await db.UserMediaWantToWatch.findAll({
				where: {
					userId: req.cookies.u_id
				}
		});
		for (let WTW of userWantToWatch) {
			result.push(WTW.mediumId)
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

router.delete('/:mediumId', async function (req, res, next) {
	try{
		await db.UserMediaWantToWatch.destroy({
			where: {
				userId: req.cookies.u_id,
				mediumId: req.params.mediumId
			}
		})
		res.status(200).send({message: 'Success deleting from wantToWatch List.'})
	}catch (error) {
		res.status(500).send({error: error, message: 'Error Deleting from WantToWatch List.'})
	}
})

module.exports = router;