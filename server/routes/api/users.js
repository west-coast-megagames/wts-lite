const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateDocument'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/throwHTTPError'); // Middleware that parses errors and status for Express responses

// Mongoose Model Import
const { User } = require('../../models/user');

// @route   GET api/users
// @Desc    Get all users
// @access  Public
router.get('/', async function (req, res) {
	logger.info('GET Route: api/users requested...');

	try {
		const users = await User.find()
			.populate('role')
			.populate({ path: "role", populate: { path: 'team' }})
		res.status(200).json(users);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/user/:key/:value
// @Desc    Get by property
// @access  Public
router.get('/:key/:value', async (req, res) => {
	logger.info('GET Route: api/user key value requested...');
	const query = {};
	query[req.params.key] = req.params.value;

	try {
		const user = await User.find(query).sort({ user: 1 });
		res.status(200).json(user);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});

// @route   GET api/user/:id
// @Desc    Get all single user
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
	logger.info('GET Route: api/user/:id requested...');
	const id = req.params.id;

	try {
		const user = await User.findById(id);
		if (user != null) {
			res.status(200).json(user);
		}
		else {
			nexusError(`The user with the ID ${id} was not found!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   POST api/user
// @Desc    Post a new user
// @access  Public
router.post('/', async (req, res) => {
	logger.info('POST Route: api/user call made...');

	try {
		console.log(req.body);

		let newUser = {...req.body};
		delete newUser._id;
		newUser = new User(newUser);
		
		newUser = await newUser.save();
		await newUser.populate("role");
		logger.info(`user ${newUser.name} created...`);
		res.status(200).json(newUser);
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   DELETE api/user/:id
// @Desc    Delete a user
// @access  Public
router.delete('/:id', validateObjectId, async (req, res) => {
	logger.info('DEL Route: api/user/:id call made...');
	const id = req.params.id;

	try {
		const user = await User.findByIdAndRemove(id);

		if (user != null) {
			logger.info(`user ${User.name} with the id ${id} was deleted!`);
			res.status(200).json(user).send(`user ${User.name} with the id ${id} was deleted!`);
		}
		else {
			nexusError(`No user with the id ${id} exists!`, 404);
		}
	}
	catch (err) {
		httpErrorHandler(res, err);
	}
});

// @route   PATCH api/user/deleteAll
// @desc    Delete All users
// @access  Public
router.patch('/deleteAll', async function (req, res) {
	const data = await User.deleteMany();
	// console.log(data);
	return res.status(200).send(`We wiped out ${data.deletedCount} users!`);
});

module.exports = router;