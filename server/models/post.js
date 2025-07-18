const mongoose = require('mongoose'); // Mongo DB object modeling module
const { Team } = require('./team');
const { User } = require('./user');

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const PostSchema = new Schema({
	model: { type: String, default: 'Post' },
	user: { type: ObjectId, ref: 'User' },
	headline: { type: String, required: true, minlength: 1, maxlength: 100 },
	body: { type: String, minlength: 1, maxlength: 1000 },
	tags: [{ type: String }],
	reactions: [{
		user: { type: ObjectId, ref: 'User' },
		emoji: { type: String }
	}],
	comments: [{ type: ObjectId, ref: 'Comment' }],
	status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' }
}, { timestamps: true });

PostSchema.static({
	postToDB: async (client, data) => { 
		console.log('Adding post to Database');
		const Post = mongoose.model('Post');
		let newPost = {...data, status: "Draft" };
		console.log(data);
		delete newPost._id
		console.log(newPost);
		newPost = new Post(newPost);

		let myTeam = await Team.findById(data.publisher);
		newPost.publisher = myTeam._id;

		let me = await User.findById(data.author);
		newPost.author = me._id;

		newPost = await newPost.save().then((doc) => {
			console.log(doc);
			client.emit(('alert', { type: 'Success', message: `${client.username} updated ${doc.headline} post` }))
        }).catch((err) => {
			console.log(err);
			client.emit(('alert', { type: 'Error', title: 'Server Error', message: `${err.message}` }))
		});

		console.log(newPost);

		return newPost;
	},
	edit: async (data) => { console.log('Editing post to Database') },
	publish: async (data) => { console.log('Publishing post to Database') },
	addReaction: async (data) => { console.log('Adding a reaction to post') },
	hydrateRefs: async (data) => { console.log('Hydrating data refrences') },
})


const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };