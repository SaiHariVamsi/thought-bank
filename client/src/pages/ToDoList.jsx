import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ task: '', description: '', deadline: '' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:1338/api/tasks');
        setTasks(res.data);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    fetchTasks();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:1338/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (task) => {
    setEditTask(true);
    setTaskForm({ task: task.task, description: task.description, deadline: task.deadline });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...taskForm };
      const res = await axios.put(`http://localhost:1338/api/tasks/${editTask._id}`, updatedTask);
      setTasks(tasks.map(task => task._id === editTask._id ? res.data : task));
      setEditTask(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div>
        {tasks.length === 0 ? (
          <div className="no-customer">
            <h4>No tasks found</h4>
          </div>
        ) : (
          <div className="table-container overflow-x-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="relative bg-slate-400">
                {tasks.map(task => (
                  <tr key={task._id} className="bg-white">
                    <td>{task.task}</td>
                    <td>{task.description}</td>
                    <td>{task.deadline}</td>
                    <td>
                      <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: 14 }).map((_, index) => (
                  <tr key={`placeholder-${index}`} className={`h-10 text-center ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'}`}>
                    <td colSpan="4" className="py-2"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default TodoList;
