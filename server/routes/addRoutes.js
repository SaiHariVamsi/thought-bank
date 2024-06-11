const express = require('express');
const router = express.Router();
const {todo, random, venture} = require('../controllers/addController.js');

router.post('/todo', todo);
router.post('/random', random);
router.post('/venture', venture);

module.exports = router;
