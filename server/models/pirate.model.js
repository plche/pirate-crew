const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    },
    treasure: {
        type: Number,
        required: [true, 'Treasures is required']
    },
    phrase: {
        type: String,
        required: [true, 'Phrase is required']
    },
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    leg: {
        type: Boolean,
        required: [true, 'Leg is required']
    },
    patch: {
        type: Boolean,
        required: [true, 'Patch is required']
    },
    hook: {
        type: Boolean,
        required: [true, 'Hook is required']
    },
}, {timestamps: true});

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports = Pirate;
