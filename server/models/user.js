const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const UserSchema = new Schema({
    model: { type: String, default: 'User' },
    name: { type: String },
    role: { type: String },
    team: { type: String }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

module.exports = { User };