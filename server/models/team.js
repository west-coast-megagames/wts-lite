const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const TeamSchema = new Schema({
    model: { type: String, default: 'Team' },
    name: { type: String },
    shortName: { type: String },
    code: { type: String },
    roles: [{ type: String }],
    users: [{ type: ObjectId, ref: 'User' }]
}, { timestamps: true });


const Team = mongoose.model('Team', TeamSchema);

module.exports = { Team };