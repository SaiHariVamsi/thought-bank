const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const saltRounds = 10;

const signUp = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ status: 'error', message: 'Failed to register user' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = jwt.sign({ email: user.email}, "jwt-key", { expiresIn: '1h' });
                res.json({ token, status: 'ok' });
            } else {
                return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
            }
        } else {
            return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = { signUp, login };
