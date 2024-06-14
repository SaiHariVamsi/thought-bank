const express = require('express');
const router = express.Router();
const {updateTask, updateThought, updateIdea} = require('../controllers/updateController.js');

router.put('/tasks/:id', updateTask);
router.put('/thoughts/:id', updateThought);
router.put('/ideas/:id', updateIdea);

module.exports = router;