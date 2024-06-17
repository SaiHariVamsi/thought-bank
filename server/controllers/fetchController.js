const Todo = require('../models/todoModel');
const Random = require('../models/randomModel');
const Venture = require('../models/ventureModel');
const jwt = require('jsonwebtoken');

const fetchTasks = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Authorization header missing or invalid' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'jwt-key');
        const userEmail = decodedToken.email;

        const tasks = await Todo.find({ user: userEmail });
        res.json(tasks);
    } catch (err) {
        console.error('Fetch tasks error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch tasks' });
    }
};

const fetchThoughts = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Authorization header missing or invalid' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'jwt-key');
        const userEmail = decodedToken.email;

        const thoughts = await Random.find({ user: userEmail });
        res.json(thoughts);
    } catch (err) {
        console.error('Fetch thoughts error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch thoughts' });
    }
};

const fetchIdeas = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'error', message: 'Authorization header missing or invalid' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, 'jwt-key');
        const userEmail = decodedToken.email;

        const ideas = await Venture.find({ user: userEmail });
        res.json(ideas);
    } catch (err) {
        console.error('Fetch ideas error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to fetch ideas' });
    }
};

module.exports = { fetchIdeas, fetchTasks, fetchThoughts };
