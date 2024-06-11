const mongoose = require('mongoose');

const randomSchema = new mongoose.Schema({
    what: { type: String, required: true, unique: true },
    why: { type: String, required: true },
    when: { type: String, required: true },
    user: { type: String, required: true }
});

const Random = mongoose.model('Random', randomSchema, 'random');

module.exports = Random;
