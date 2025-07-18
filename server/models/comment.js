const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const ReplySchema = new Schema({
    model: { type: String, default: 'Reply' },
    user: { type: ObjectId, ref: 'User' },
    body: { type: String, minlength: 1, maxlength: 1000 },
    reactions: [{
        user: { type: ObjectId, ref: 'User' },
        emoji: { type: String }
    }],
})

const CommentSchema = new Schema({
    model: { type: String, default: 'Comment' },
    user: { type: ObjectId, ref: 'User' },
    body: { type: String, minlength: 1, maxlength: 1000 },
    reactions: [{
        user: { type: ObjectId, ref: 'User' },
        emoji: { type: String }
    }],
    comments: [ReplySchema],
}, { timestamps: true });


const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };