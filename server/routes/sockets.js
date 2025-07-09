const { logger } = require("../middleware/log/winston");
const config = require("config");
const { Server } = require("socket.io");

module.exports = function(httpServer) {
    logger.info('Socket.io server initialized...');

    const io = new Server(httpServer, {
        cors: {
			origin: config.get('socketCORS')
		}
    }); // Creation of websocket Server

    io.on("connection", (client) => {
        // console.log(client);
        logger.info(`${client.handshake.auth.username} connected (${client.id}), ${io.of('/').sockets.size} clients connected.`);
        currentUsers();

        // Logout Client event
        client.on('logoff', () => {
			logger.info(`${client.username} disconnected (${client.id}), ${io.of('/').sockets.size} clients connected.`);
			client.broadcast.emit('alert', { type: 'info', message: `${client.username} Logged out...` });
			client.disconnect(true);
			currentUsers();
		});

        // Disconnecting Client event
        client.on('disconnecting', reason => {
			console.log(client.rooms);
			console.log(reason);
		});

        client.on('disconnect', (reason) => {
			logger.info(`${client.handshake.auth.username} disconnected (${client.id}) because ${reason}, ${io.of('/').sockets.size} clients connected.`);
			client.broadcast.emit('alert', { type: 'info', message: `${client.handshake.auth.username} signed out Nexus...` });
			currentUsers();
		});
    });



    function currentUsers() {
		const users = [];
            for (const [id, socket] of io.of('/').sockets) {
                users.push({
                    userID: id,
                    username: socket.handshake.auth.username,
                    team: socket.handshake.auth.team,
                    role: socket.handshake.auth.role
			    });
		    }
		io.emit('clients', users);
	}
	
    logger.info('Socket.io servers online...');
};