const { logger } = require("../middleware/log/winston");
const config = require("config");
const { Server } = require("socket.io");
const { Post } = require("../models/post");

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
        client.on('logoff', (callback) => {
            const name = `${client.handshake.auth.username} | ${client.handshake.auth.role}`
			logger.info(`${name} sent log-off request (${client.id}), ${io.of('/').sockets.size} clients connected.`);
            client.broadcast.emit('alert', { type: 'info', message: `${client.username} Logged out...` });
            callback(
                { status: 'ok', type: 'success', description: 'Log-off Successfull' }
            )
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

        client.on('media', async (payload, callback) => {
            const { action, data: payloadData } = payload;
            const { username } = client.handshake.auth;
			console.log(`Attempting media route with ${action} action`);
            let data
            let description

            switch(action) {
                case ("post"): {
                    try {
                        console.log('Adding post to Database');
                       
                        let newPost = {...payloadData, status: "Draft" };
                        delete newPost._id;
                        console.log(newPost);
                        newPost = new Post(newPost);

                        data = await newPost.save();
			            await data.populate('team');
                        description = `Post ${data.headline} saved`;
			            client.broadcast.emit('alert', { type: 'success', message: `${username} posted ${newPost.headline} post` });
                    }
                    catch (err) {
			            console.log(err);
			            client.emit('alert', { type: 'error', title: 'Server Error [media/post]', message: `${err.message}` })
		            };
                    break;
                }
                case ("publish"): {
                    data = await Post.findOneAndUpdate({ headline: payloadData.headline }, { status: "Published" })
                        .populate('team')
                        .populate('author');

                    console.log(`Author populeted: ${data.populated('author')}`);
                    console.log(`Team populeted: ${data.populated('team')}`);
                    console.log(data)
                    client.broadcast.emit('newsflash', { type: 'info', description: `${username} has published ${data.headline}`, data })
                    description = 'We did it!'
                    break;
                }
                default: {
                    io.emit('alert', { type: 'error', title: "Server Error", message: `${client.username} send invalid media request for ${action}` })
                }
            }
            callback({ status: 'success', description, data: data });
        })
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