const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const { Schema, ObjectId } = mongoose; // Destructure of Mongoose

const TeamSchema = new Schema({
    model: { type: String, default: 'Team' },
    name: { type: String },
    shortName: { type: String },
    code: { type: String },
    roles: [{ type: ObjectId, ref: 'Role' }],
    users: [{ type: ObjectId, ref: 'User' }]
}, { timestamps: true });


const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team };