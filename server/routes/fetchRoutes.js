const express = require('express');
const router = express.Router();
const {fetchTasks, fetchThoughts, fetchIdeas} = require('../controllers/fetchController.js');

router.get('/tasks', fetchTasks);
router.get('/thoughts', fetchThoughts);
router.get('/ideas', fetchIdeas);

module.exports = router;
