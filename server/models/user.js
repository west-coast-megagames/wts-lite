const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const UserSchema = new Schema({
    model: { type: String, default: 'User' },
    name: { type: String },
    role: { type: ObjectId, ref: 'Role' },
    pin: [{ type: Number }]
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = { User };