const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/userController.js');
const verifyUser = require('../middlewares/verifyUser.js');
const userError = require('../middlewares/userError.js');

router.post('/signup',userError, signUp);
router.post('/login',userError, login);
router.get('/user', verifyUser, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
