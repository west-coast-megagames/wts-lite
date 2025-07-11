const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const PostSchema = new Schema({
	model: { type: String, default: 'Post' },
	user: {
        name: { type: String },
        role: { type: String },
        team: { type: String }
    },
	headline: { type: String, required: true, minlength: 1, maxlength: 100 },
	body: { type: String, minlength: 1, maxlength: 1000 },
	tags: [{ type: String }],
	imageSrc: { type: String },
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


const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };