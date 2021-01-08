var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/', async function (req, res, next) {
    const media = await db.Medium.findAll();
    res.status(200).send(media);
})

router.get('/:id', async function (req, res, next) {
    const medium = await db.Medium.findByPk(req.params.id);
    res.status(200).send(medium);
})

router.post('/', async function (req, res, next) {
    console.log(req)
    await db.Medium.create({
        title: req.body.title,
        mediaType: req.body.type,
        description: req.body.description,
        imageUrl: req.body.imgUrl
    });
    res.status(200).send({message: 'Medium created.'});
})

router.put('/:id', async function (req, res, next) {
    let fieldName = req.body.fieldName; //Set to the fieldname from db you want to change
    let newInfo = req.body.newInfo;     //Set to the new value for the given db-field
    await db.Medium.update({
            [fieldName]: newInfo    //Set db-field [fieldvalue] to content of newInfo
        },
        { where: {
                id: req.params.id
            }
        }).catch(error => res.status(500).send({message: error.message}));
    res.status(200).send({message: 'MediaData edited.'})
})

router.delete('/:id', async function (req, res, next) {
    await db.Medium.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).send({message: 'Media deleted.'})
})

module.exports = router;