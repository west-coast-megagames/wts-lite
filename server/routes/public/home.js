const express = require('express');
const { logger } = require('../../middleware/log/winston'); // Import of winston for error logging
const router = express.Router();

// @route   GET /
// @Desc    Welcome
// @access  Public
router.get('/', async function(req, res) {
	logger.info('Someone is visiting the Watch the Skies - Lite Application!');
	res.send('Welcome to a West Coast Megagames | Project Nexus server, you will need to know your endpoints to get anything. Contact John T. Cleveland for more information!');
});

module.exports = router;