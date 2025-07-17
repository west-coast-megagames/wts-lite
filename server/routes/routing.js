
const { logger } = require('../middleware/log/winston'); // Import of winston for error logging
const bodyParser = require('body-parser'); // Body Parser Middleware
const cors = require('cors');

// Routes - Using Express
const home = require('./public/home');

// API Routes - Using Express.js
// Desc - API routes are the raw HTTP GET/POST/DEL access to our models
const teams = require('./api/teams');
const roles = require('./api/roles');
const posts = require('./api/posts');

logger.info('API routes initiated...');

// Route Function
module.exports = function(app) {
	logger.info('API routes initiated...');
	app.use(bodyParser.json()); // Tells Express to use Body Parser for JSON

	app.use(cors());
	app.use('/', home);

	app.use('/api/teams', teams); // Route for inputing TEAMS
	app.use('/api/roles', roles); // Route for inputing ROLES
	app.use('/api/posts', posts); // Route for inputing POSTS

	logger.info('Routes Primed...');
};