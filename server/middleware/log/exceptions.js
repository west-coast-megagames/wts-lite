	// Error handling and Logging
module.exports = function() {
	const error = require('../log/winston'); // winston for error handling
	// require('express-async-errors'); // FIXME: Evaluated if this is still needed: [npm] express-async-errors, used to do try/catch error handling

	error.logger.info('Loading Logger Module...');
	// Add in Error handling for uncaught exceptions
	process.on('uncaughtException', (err) => {
		error.logger.error(`${err.message}`, { meta: err.stack });
		// process.exit(1);
	});

	// Add in Error handling for unhandled Promise rejections
	process.on('unhandledRejection', (err) => {
		error.logger.error(`${err.message}`, { meta: err.stack });
		// process.exit(1);
	});
};