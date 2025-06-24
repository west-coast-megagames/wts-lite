const winston = require('winston');

const { createLogger, format, transports } = winston;

require('winston-mongodb');
const dbURI = require('../mongoDB/keys').mongoURI;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'Default Log:' },
  transports: [
    // - Write to all logs with level `info` and below to `nexus-combined.log`.
    // - Write all logs error (and below) to `nexus-error.log`.
    // Errors only File
    new transports.File({ filename: 'nexus-error.log', level: 'error' }),
    // Info / Warnings / Errors combined
    new transports.File({ filename: 'nexus-combined.log', level: 'info' }),
    // Debug / Verbose/ Http / Info / Warnings / Errors combined
    new transports.File({
      filename: 'nexus-debug-combined.log',
      level: 'debug'
    }),
    // Error DB to log collection
    new transports.MongoDB({
      db: dbURI,
      level: 'error',
      metaKey: 'meta',
      collection: 'errors',
      options: {}
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.simple())
		})
	);
}
else {
  // FIXME: Remove if you don't want deployed logger messages....
  logger.add(
		new transports.Console({
			format: format.combine(format.colorize(), format.simple())
		})
	);
}

function routeError(err, req, res) {
	logger.error(`${err.message}`, { meta: err.stack, req });

	errorDebugger('Error:', err.message);
	res.status(500).send(`Error: ${err.message}`);
}

module.exports = { routeError, logger };