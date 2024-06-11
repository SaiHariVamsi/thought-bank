const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Todo = require('../models/todoModel');
const Random = require('../models/randomModel');
const Venture = require('../models/ventureModel');

const todo = async (req, res) => {
    try {
        const { task, description, deadline, user } = req.body;

        if (!user) {
            return res.status(400).json({ message: 'User is required' });
        }

        const existingTask = await Todo.findOne({ task });
        if (existingTask) {
            return res.status(400).json({ message: 'Task already exists' });
        }

        const newTask = new Todo({
            task,
            description,
            deadline,
            user
        });

        await newTask.save();
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to register task' });
    }
};

const random = async (req, res) => {
    try {
        const {
            what,
            why,
            when,
            user
        } = req.body;

        const existingThought = await Random.findOne({ $or: [{ what }] });
        if (existingThought) {
            return res.status(400).json({ message: 'Thought already exists' });
        }

        const newThought = new Random({
            what,
            why,
            when,
            user
        });

        await newThought.save();
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to register thought' });
    }
};

const venture = async (req, res) => {
    try {
        const {
            title,
            domain,
            ideas,
            requirements,
            description,
            how,
            user
        } = req.body;

        const existingIdea = await Venture.findOne({ $or: [{ title }] });
        if (existingIdea) {
            return res.status(400).json({ message: 'Idea already exists' });
        }

        const newIdea = new Venture({
            title,
            domain,
            ideas,
            requirements,
            description,
            how,
            user
        });

        await newIdea.save();
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to register idea' });
    }
};

module.exports = { todo, random, venture };
