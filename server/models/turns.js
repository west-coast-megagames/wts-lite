const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const TurnSchema = new Schema({
    model: { type: String, default: 'Turn' },
    number: { type: String },
    turnDuration: { type: Number },
    startTime: {type: Date},
    endTime: {type: Date},
}, { timestamps: true });


const Turn = mongoose.model('Turn', TurnSchema);

module.exports = { Turn };