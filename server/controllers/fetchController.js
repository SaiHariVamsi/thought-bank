const Todo = require('../models/todoModel');
const Random = require('../models/randomModel');
const Venture = require('../models/ventureModel');

const fetchTasks = async (req, res) => {
    try {
        const tasks = await Todo.find({});
        res.json(tasks);
    } catch (err) {
        console.error('Fetch tasks error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch tasks' });
    }
};

const fetchThoughts = async (req, res) => {
    try {
        const thoughts = await Random.find({});
        res.json(thoughts);
    } catch (err) {
        console.error('Fetch thoughts error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch thoughts' });
    }
};

const fetchIdeas = async (req, res) => {
    try {
        const ideas = await Venture.find({});
        res.json(ideas);
    } catch (err) {
        console.error('Fetch ideas error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch ideas' });
    }
};

module.exports = { fetchIdeas, fetchTasks, fetchThoughts };
