const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const userExists = require('../middlewares/userExists');
const checkUserId = require('../middlewares/checkUserId');

//Route for retrieving data of user. Check username and pw, then return token, userinfo
router.get('/', async function (req, res, next) {
	try {
		const user = await db.User.findByPk(req.cookies.u_id);
		delete user.dataValues.pwHash;
		delete user.dataValues.refreshToken;
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({error: error.message, message: 'Error finding User by Id getting UserInfo.'});
	}
});

router.get('/:id', async function (req, res, next) {
	checkUserId(res, req, req.params.id)
	let user;

	try {
		user = await db.User.findByPk(req.params.id);
	} catch (error) {
		res.status(500).send({error: error.message, message: 'Error finding User by Id getting UserInfo.'});
		return;
	}

	delete user.dataValues.pwHash;
	delete user.dataValues.refreshToken;

	res.status(200).send(user);
});

//Route for user creation.
router.post('/', userExists, async function (req, res, next) {
	let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));

	if (req.body.secret_code !== process.env.SECRET_CODE) { // Only let TMKL users create an account
		res.status(400).send({message: "Gotta do some TMKLs first."});
		return;
	}

	try {
		await db.User.create({
			username: req.body.username,
			contact_email: req.body.contact_email,
			pwHash: hash
		});
	} catch (error) {
		res.status(500).send({error: error.message, message: 'Error creating user while creating new user.'});
		return;
	}

	res.status(200).send({message: "User created!"});
})

//Route for making changes to userdata
router.put('/', userExists, async function (req, res, next) {
	let fieldName = req.body.fieldName; //Set to the fieldname from db you want to change
	let newInfo = req.body.newInfo;     //Set to the new value for the given db-field

	if (newInfo === '') {
		return;
	}
	if (fieldName === "pwHash") {
		newInfo = bcrypt.hashSync(req.body.newInfo, bcrypt.genSaltSync(12));
	}

	try {
		await db.User.update({
				[fieldName]: newInfo    //Set db-field [fieldvalue] to content of newInfo
			},
			{
				where: {
					id: req.cookies.u_id
				}
			});
		res.status(200).send({message: "Userdata edited"});
	} catch (error) {
		res.status(500).send({error: error.message, message: 'Error updating user while updating user.'});
	}


})

//Route for deleting a user
router.delete('/:id', async function (req, res, next) {
	await checkUserId(res, req, req.params.id);

	try {
		await db.User.destroy({
			where: {
				id: req.params.id
			}
		})
	} catch (error) {
		res.status(500).send({error: error.message, message: 'Error deleting user while delete user.'});
		return;
	}

	res.status(200).send({message: "User deleted"});
})

module.exports = router;
