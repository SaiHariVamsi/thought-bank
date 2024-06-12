const Random = require('../models/randomModel');
const Todo = require('../models/todoModel'); 
const Venture = require('../models/ventureModel');

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Todo.findByIdAndDelete(id);
    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteThought = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedThought = await Random.findByIdAndDelete(id);
    if (deletedThought) {
      res.status(200).json({ message: 'Thought deleted successfully' });
    } else {
      res.status(404).json({ message: 'Thought not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIdea = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIdea = await Venture.findByIdAndDelete(id);
    if (deletedIdea) {
      res.status(200).json({ message: 'Idea deleted successfully' });
    } else {
      res.status(404).json({ message: 'Idea not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {deleteTask, deleteThought, deleteIdea};