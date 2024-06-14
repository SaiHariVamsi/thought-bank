const Random = require('../models/randomModel');
const Todo = require('../models/todoModel'); 
const Venture = require('../models/ventureModel');

const updateTask = async (req, res) => {
    try {
        const task = await Todo.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
    
        task.task = req.body.task || task.task;
        task.description = req.body.description || task.description;
        task.deadline = req.body.deadline || task.deadline;
    
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  };
  
  const updateThought = async (req, res) => {
    try {
        const thought = await Random.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'Thought not found' });
    
        thought.what = req.body.what || thought.what;
        thought.why = req.body.why || thought.why;
        thought.when = req.body.when || thought.when;
    
        const updatedThought = await thought.save();
        res.status(200).json(updatedThought);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  };
  
  const updateIdea = async (req, res) => {
    try {
        const idea = await Venture.findById(req.params.id);
        if (!idea) return res.status(404).json({ message: 'Idea not found' });
    
        idea.title = req.body.title || idea.title;
        idea.domain = req.body.domain || idea.domain;
        idea.ideas = req.body.ideas || idea.ideas;
        idea.requirements = req.body.requirements || idea.requirements;
        idea.description = req.body.description || idea.description;
        idea.how = req.body.how || idea.how;
    
        const updatedIdea = await idea.save();
        res.status(200).json(updatedIdea);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  };
  
  module.exports = {updateTask, updateThought, updateIdea};