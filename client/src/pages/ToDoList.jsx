// TodoList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

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
                </tr>
              </thead>
              <tbody className="relative bg-slate-400">
                {tasks.map(task => (
                  <tr key={task._id.$oid} className="bg-white">
                    <td>{task.task}</td>
                    <td>{task.description}</td>
                    <td>{task.deadline}</td>
                  </tr>
                ))}
                {Array.from({ length: 14 }).map((_, index) => (
                  <tr key={`placeholder-${index}`} className={`h-10 text-center ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'}`}>
                    <td colSpan="3" className="py-2"></td>
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
