const express = require('express');
const http = require('http');
const { logger } = require('./middleware/log/winston'); // Import of winston for error logging
const { default: mongoose } = require('mongoose');
const { loadDB } = require('./scripts/loadProgram');

logger.info('Booting Watch the Skies - lite server...');
mongoose.set('strictQuery', false);

// Boot Processes
const app = express(); // Initialize Express Application
logger.info('Application Initilized...');
const server = http.createServer(app);
logger.info('web-server established...');
require('./middleware/log/exceptions')(); // Bootup for uncaught error handling
require('./routes/routing')(app); // Bootup for Express routes
require('./routes/sockets')(server); // Bootup for Socket.io server
require('./middleware/mongoDB/db')(); // Bootup of MongoDB through Mongoose
require('./middleware/production/prod')(app); // Production compression and middleware

// loadDB();

const port = process.env.PORT || 5000; // Server entry point - Node Server
server.listen(port, () => console.log(`Folly initialized on port ${port}, Server online!`));