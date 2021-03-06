var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/', async function (req, res, next) {
	let media;
	try {
		if (req.query.type) {
			media = await db.Medium.findAll({where: {mediaType: req.query.type}})
		} else {
			media = await db.Medium.findAll();
		}

		res.status(200).send(media);
	} catch (error) {
		res.status(500).send({error: error, message: 'Error retrieving bulk media.'});
	}
})

router.get('/:id', async function (req, res, next) {
	try {
		const medium = await db.Medium.findByPk(req.params.id);

		res.status(200).send(medium);
	} catch (error) {
		res.status(500).send({error: error, message: 'Error retrieving media by id.'});
	}
})

router.post('/', async function (req, res, next) {
	try {
		if(await db.Medium.findOne({where: {title: req.body.title}})) {
			res.status(200).send({message: 'Medium already in database.'});
			return;
		}

		await db.Medium.create({
			title: req.body.title,
			mediaType: req.body.mediaType,
			description: req.body.description,
			imageUrl: req.body.imageUrl,
			mediaScore: req.body.mediaScore,
			genres: req.body.genres,
			actors: req.body.actors,
			premiered: req.body.premiered
		});

		res.status(200).send({message: 'Medium created.'});
	} catch (error) {
		res.status(500).send({error: error, message: 'Error creating new media'});
	}

})

router.put('/:id', async function (req, res, next) {
	let fieldName = req.body.fieldName; //Set to the fieldname from db you want to change
	let newInfo = req.body.newInfo;     //Set to the new value for the given db-field
	try {
		await db.Medium.update({
				[fieldName]: newInfo    //Set db-field [fieldvalue] to content of newInfo
			},
			{
				where: {
					id: req.params.id
				}
			});

		res.status(200).send({message: 'MediaData edited.'})
	} catch (error) {
		res.status(500).send({error: error, message: 'Error editing media'});
	}

})

router.delete('/:id', async function (req, res, next) {
	try {
		await db.Medium.destroy({
			where: {
				id: req.params.id
			}
		});

		res.status(200).send({message: 'Media deleted.'})
	} catch (error) {
		res.status(500).send({error: error, message: 'Error deleting media'});
	}
})

module.exports = router;