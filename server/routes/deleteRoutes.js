const express = require('express');
const router = express.Router();
const {deleteTask, deleteThought, deleteIdea} = require('../controllers/deleteController.js');

router.delete('/tasks/:id', deleteTask);
router.delete('/thoughts/:id', deleteThought);
router.delete('/ideas/:id', deleteIdea);

module.exports = router;