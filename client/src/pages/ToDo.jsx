import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/todoStyles.css'; // Ensure the CSS file path is correct

const Todo = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [deadlineDay, setDeadlineDay] = useState('');
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:1338/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrors({ ...errors, userData: 'Failed to load user data. Please try again later.' });
      }
    }

    fetchUserData();
  }, [token]);

  async function handleAddTask(event) {
    event.preventDefault();

    if (!userData.email) {
      setErrors({ submit: 'User data not loaded. Please try again later.' });
      return;
    }

    const deadline = `${deadlineDay}T${deadlineTime}`;
    const todoData = {
      task,
      description,
      deadline,
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
        setDeadlineDay('');
        setDeadlineTime('');
        navigate('/todo', { replace: true });
      } else {
        setErrors({ submit: 'Error occurred while adding the task.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'An error occurred. Please try again later.' });
    }
  }

  function displayTasks() {
    navigate('/tasks');
    return;
  }

  return (
    <div className="contact-container">
      <div className="contact-left">
        <div className="contact-left-title">
          <h2>ToDo</h2>
          <hr />
        </div>
        <form className="contact-left1" onSubmit={displayTasks}>
          <button type="submit">View Task</button>
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
          <label className="labels" htmlFor="deadlineDay">
            Deadline Date:
          </label>
          <input
            className="inputs"
            type="date"
            name="deadlineDay"
            id="deadlineDay"
            value={deadlineDay}
            onChange={(e) => setDeadlineDay(e.target.value)}
            required
          />
          <label className="labels" htmlFor="deadlineTime">
            Deadline Time:
          </label>
          <input
            className="inputs"
            type="time"
            name="deadlineTime"
            id="deadlineTime"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
            required
          />
          <button type="submit">Add Task</button>
        </form>
        {errors.submit && <div className="error">{errors.submit}</div>}
      </div>
      <div className="contact-right">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/businessman-with-to-do-list-4723389-3928044.png"
          alt="ToDo Illustration"
        />
      </div>
    </div>
  );
};

export default Todo;
