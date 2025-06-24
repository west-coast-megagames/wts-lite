
const { logger } = require('../middleware/log/winston'); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware
const cors = require('cors');

// Routes - Using Express
const home = require('./public/home');

// Route Function
module.exports = function(app) {
	logger.info('Routes Primed...');
	app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON

	app.use(cors());
	app.use('/', home);
};