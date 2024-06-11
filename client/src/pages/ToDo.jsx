import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Ensure axios is imported

function Todo() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  async function fetchUserData() {
    try {
      console.log('Fetching user data...');
      const response = await axios.get('http://localhost:1338/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('User data fetched:', response.data);
      setUserData(response.data.user);
    } catch (error) {
      console.error('There was an error fetching user data!', error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleAddTask(event) {
    event.preventDefault();

    if (!userData.email) {
      setErrors({ submit: "User data not loaded. Please try again later." });
      return;
    }

    const todoData = {
      task: task,
      description: description,
      deadline: deadline,
      user: userData.email,
    };

    console.log("Sending task data:", todoData);

    try {
      const response = await fetch("http://localhost:1338/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      const data = await response.json();
      console.log("Server response:", data);
      if (data.status === "ok") {
        navigate("/todo", { replace: true });
      } else {
        setErrors({ submit: "Error occurred while adding the task." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An error occurred. Please try again later." });
    }
  }
  
  function displayTasks() {
    navigate('/tasks');
    return;
  }

  return (
    <section className="flex flex-row">
      <button onClick={displayTasks}
            className="w-full sm:w-auto px-9 py-1.5 text-[12px] text-center text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg"
          >
            View Tasks
          </button>
      <form className="flex flex-col justify-center items-center" onSubmit={handleAddTask}>
        <div className="middle p-10 shadow-right-bottom rounded-lg">
          <div className="mt-6 grid grid-cols-1 gap-8">
            <div className="">
              <input
                type="text"
                name="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Task"
                required
              />
              {errors.task && <span className="text-red-500 text-[12px]">{errors.task}</span>}
            </div>
            <div className="">
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Description"
                required
              />
              {errors.description && <span className="text-red-500 text-[12px]">{errors.description}</span>}
            </div>
            <div className="">
              <input
                type="time"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Deadline"
                required
              />
              {errors.deadline && <span className="text-red-500 text-[12px]">{errors.deadline}</span>}
            </div>
          </div>
        </div>
        <span className="mt-2">
          {errors.submit && <span className="text-red-500 text-[12px]">{errors.submit}</span>}
        </span>
        <div className="text-center mt-8">
          <button
            type="submit"
            className="w-full sm:w-auto px-9 py-1.5 text-[12px] text-center text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg"
          >
            Add Task
          </button>
        </div>
      </form>
    </section>
  );
}

export default Todo;
