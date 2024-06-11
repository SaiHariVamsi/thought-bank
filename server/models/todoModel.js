const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    user: { type: String, required: true }
});

const Todo = mongoose.model('Todo', todoSchema, 'todo');

module.exports = Todo;
