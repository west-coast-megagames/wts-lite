const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const RoleSchema = new Schema({
    model: { type: String, default: 'Role' },
    title: { type: String },
    type: { type: String },
    team: { type: ObjectId, ref: 'Team' },
    user: { type: ObjectId, ref: 'User' }
}, { timestamps: true });

const Role = mongoose.model('Role', RoleSchema);

module.exports = { Role };