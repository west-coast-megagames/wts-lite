const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const PostSchema = new Schema({
	model: { type: String, default: 'Post' },
	author: { type: ObjectId, ref: 'User' },
	team: { type: ObjectId, ref: 'Team' },
	headline: { type: String, required: true, minlength: 1, maxlength: 100 },
	body: { type: String, minlength: 1, maxlength: 1000 },
	tags: [{ type: String }],
	comments: [{ type: ObjectId, ref: 'Comment' }],
	status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' }
}, { timestamps: true });

PostSchema.static({
	postToDB: async (client, data) => { 
		try {
		console.log('Adding post to Database');
		const Post = mongoose.model('Post');
		let newPost = {...data, status: "Draft" };
		delete newPost._id;
		console.log(newPost);
		newPost = new Post(newPost);

		newPost = await newPost.save();
			console.log(newPost);
			client.emit(('alert', { type: 'Success', message: `${client.username} updated ${newPost.headline} post` }))
			return newPost;
		}
		catch (err) {
			console.log(err);
			client.emit(('alert', { type: 'Error', title: 'Server Error', message: `${err.message}` }))
		}
	},
	edit: async (data) => { console.log('Editing post to Database') },
	publish: async (data) => { console.log('Publishing post to Database') },
	addReaction: async (data) => { console.log('Adding a reaction to post') },
	hydrateRefs: async (data) => { console.log('Hydrating data refrences') },
})


const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };