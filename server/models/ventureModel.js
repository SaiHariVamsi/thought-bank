const mongoose = require('mongoose');

const ventureSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    domain: { type: String, required: true },
    ideas: { type: String, required: true },
    requirements: { type: String, required: true },
    description: { type: String, required: true },
    how: { type: String, required: true },
    user: { type: String, required: true },
});

const Venture = mongoose.model('Venture', ventureSchema, 'venture');

module.exports = Venture;
