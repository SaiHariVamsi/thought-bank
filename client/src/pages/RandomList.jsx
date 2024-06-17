import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RandomList = () => {
  const navigate = useNavigate();
  const [thoughts, setThoughts] = useState([]);
  const [editThoughtId, setEditThoughtId] = useState(null);
  const [thoughtForm, setThoughtForm] = useState({ what: '', why: '', when: '' });

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const res = await axios.get('http://localhost:1338/api/thoughts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setThoughts(res.data);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    fetchThoughts();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this thought?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        await axios.delete(`http://localhost:1338/api/thoughts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setThoughts(thoughts.filter(thought => thought._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (thought) => {
    setEditThoughtId(thought._id);
    setThoughtForm({ what: thought.what, why: thought.why, when: thought.when });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const updatedThought = { ...thoughtForm };
      const res = await axios.put(`http://localhost:1338/api/thoughts/${id}`, updatedThought, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setThoughts(thoughts.map(thought => thought._id === id ? res.data : thought));
      setEditThoughtId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setThoughtForm({ ...thoughtForm, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div>
        {thoughts.length === 0 ? (
          <div className="no-customer">
            <h4>No thoughts found</h4>
          </div>
        ) : (
          <div className="table-container overflow-x-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>What</th>
                  <th>Why</th>
                  <th>When</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="relative bg-slate-400">
                {thoughts.map(thought => (
                  <tr key={thought._id} className="bg-white">
                    {editThoughtId === thought._id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="what"
                            value={thoughtForm.what}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="why"
                            value={thoughtForm.why}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="when"
                            value={thoughtForm.when}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <button onClick={(e) => handleUpdate(e, thought._id)}>Save</button>
                          <br />
                          <button onClick={() => setEditThoughtId(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{thought.what}</td>
                        <td>{thought.why}</td>
                        <td>{thought.when}</td>
                        <td>
                          <button onClick={() => handleEdit(thought)}>Update</button>
                          <br />
                          <button onClick={() => handleDelete(thought._id)}>Delete</button>
                        </td>
                      </>
                    )}
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

export default RandomList;
