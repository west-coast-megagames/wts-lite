
const { logger } = require('../middleware/log/winston'); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware
const cors = require('cors');

// Routes - Using Express
const home = require('./public/home');

// API Routes - Using Express.js
// Desc - API routes are the raw HTTP GET/POST/DEL access to our models
const teams = require('./api/teams');

logger.info('API routes initiated...');

// Route Function
module.exports = function(app) {
	logger.info('API routes initiated...');
	app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON

	app.use(cors());
	app.use('/', home);

	app.use('/api/teams', teams); // Route for inputing TEAMS


	logger.info('Routes Primed...');
};