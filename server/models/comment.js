const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const CommentSchema = new Schema({
    model: { type: String, default: 'Comment' },
    user: {
        name: { type: String },
        role: { type: String },
        team: { type: String }
    },
    body: { type: String, minlength: 1, maxlength: 1000 },
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
}, { timestamps: true });


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };