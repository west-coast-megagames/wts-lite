const mongoose = require('mongoose'); // Mongo DB object modeling module

// Global Constants
const Schema = mongoose.Schema; // Destructure of Schema

const RegionSchema = new Schema({
    model: { type: String, default: 'Region' },
    name: { type: String },
    code: { type: String },
    terror: { type: Number },
    status: { type: String, enum: ['Calm', 'Anxious', 'Alarmed', 'Agitated', 'Panic', 'Hysteria'] },
    type: { type: String, enum: ['Ground', 'Space'] },
}, { timestamps: true });

const Region = mongoose.model('Region', RegionSchema);

module.exports = { Region };