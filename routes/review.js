var express = require('express');
var router = express.Router();
const db = require('../models');
const setNewMediaScore = require("../middlewares/setNewMediaScore");
const addMediaToWatched = require("../middlewares/addMediaToWatched");

router.get('/:MediumId?', async function (req, res, next) {
	let reviews;
	try {
		if (req.query.MediumId) {
			reviews = await db.Review.findAll({where: {MediumId: req.query.MediumId}})
		} else {
			reviews = await db.Review.findAll();
		}
	} catch (error) {
		res.status(500).send({error: error, message: 'Error retrieving bulk media.'});
	}
	res.status(200).send(reviews);
})

router.get('/:id', async function (req, res, next) {
	const review = await db.Review.findByPk(req.params.id)
	res.status(200).send(review);
})

router.post('/', async function (req, res, next) {
	try{
		const user = await db.User.findByPk(req.cookies.u_id)
		await db.Review.create({
			reviewText: req.body.reviewText,
			reviewPoints: req.body.reviewPoints,
			MediumId: req.body.MediumId,
			UserId: req.cookies.u_id,
			Author: user.dataValues.username
		});
		next();
	}catch (error) {
		res.status(500).send({error: error, message: 'Error creating review.'});
	}

}, setNewMediaScore, addMediaToWatched)

router.put('/:id', async function (req, res, next) {
	let fieldName = req.body.fieldName; //Set to the fieldname from db you want to change
	let newInfo = req.body.newInfo;     //Set to the new value for the given db-field
	await db.Review.update({
			[fieldName]: newInfo    //Set db-field [fieldvalue] to content of newInfo
		},
		{
			where: {
				id: req.params.id
			}
		}).catch(error => res.status(500).send({message: error.message}));
	res.status(200).send({message: 'ReviewData edited.'})
})

router.delete('/:id', async function (req, res, next) {
	await db.Review.destroy({
		where: {
			id: req.params.id
		}
	})
	res.status(200).send({message: "Review deleted"});
})

module.exports = router;