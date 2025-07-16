const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const PostSchema = new Schema({
	model: { type: String, default: 'Post' },
	user: { type: ObjectId, ref: 'User' },
	headline: { type: String, required: true, minlength: 1, maxlength: 100 },
	body: { type: String, minlength: 1, maxlength: 1000 },
	tags: [{ type: String }],
    timestamp: {
		turn: { type: String },
		phase: { type: String },
		turnNum: { type: Number },
		clock: { type: String }
	},
	reactions: [{
		user: { type: String },
		emoji: { type: String }
	}],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' }
}, { timestamps: true });

PostSchema.static({
	postToDB: async (data) => { 
		console.log('Adding post to Database');
		const Post = mongoose.model('post');
		let newPost = new Post(data);

		newPost = await newPost.save();

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