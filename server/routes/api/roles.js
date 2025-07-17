const express = require('express'); // Import of Express web framework
const router = express.Router(); // Destructure of HTTP router for server

const { logger } = require('../../middleware/log/winston'); // Import of winston for error/info logging
const validateObjectId = require('../../middleware/util/validateDocument'); // Middleware that validates object ID's in HTTP perameters
const httpErrorHandler = require('../../middleware/util/throwHTTPError'); // Middleware that parses errors and status for Express responses

// Mongoose Model Import
const { Role } = require('../../models/role');

// @route   GET api/role
// @Desc    Get all roles
// @access  Public
router.get('/', async function (req, res) {
	logger.info('GET Route: api/role requested...');

	try {
		const role = await Role.find()
			.populate('team')
			.populate('user');
		res.status(200).json(role);
	}
	catch (err) {
		logger.error(err.message, { meta: err.stack });
		res.status(500).send(err.message);
	}
});
module.exports = router;