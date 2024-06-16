import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/todoStyles.css'; // Import your CSS file

const Todo = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function fetchUserData() {
    try {
      const response = await axios.get('http://localhost:1338/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function handleAddTask(event) {
    event.preventDefault();

    if (!userData.email) {
      setErrors({ submit: 'User data not loaded. Please try again later.' });
      return;
    }

    const todoData = {
      task: task,
      description: description,
      deadline: deadline,
      user: userData.email,
    };

    try {
      const response = await fetch('http://localhost:1338/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();
      if (data.status === 'ok') {
        setTask('');
        setDescription('');
        setDeadline('');
        navigate('/todo', { replace: true });
      } else {
        setErrors({ submit: 'Error occurred while adding the task.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'An error occurred. Please try again later.' });
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-left">
        <div className="contact-left-title">
          <h2>ToDo</h2>
          <hr />
        </div>
        <form className="contact-left1" onSubmit={handleAddTask}>
          <button type="submit">Add Task</button>
        </form>
        <form className="contact-left2" onSubmit={handleAddTask}>
          <input
            className="inputs"
            type="text"
            name="task"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Task'
            required
          />
          <textarea
            className="inputs"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            required
          ></textarea>
          <label className="labels" htmlFor="deadline">
            Deadline :
          </label>
          <input
            className="inputs"
            type="time"
            name="deadline"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="contact-right">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-with-to-do-list-4723389-3928044.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Todo;
