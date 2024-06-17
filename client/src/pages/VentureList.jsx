import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VentureList = () => {
  const navigate = useNavigate();
  const [ventures, setVentures] = useState([]);
  const [editVentureId, setEditVentureId] = useState(null);
  const [ventureForm, setVentureForm] = useState({
    title: '',
    domain: '',
    ideas: '',
    requirements: '',
    description: '',
    how: ''
  });

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const res = await axios.get('http://localhost:1338/api/ideas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVentures(res.data);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    fetchVentures();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this idea?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        await axios.delete(`http://localhost:1338/api/ideas/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVentures(ventures.filter(venture => venture._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (venture) => {
    setEditVentureId(venture._id);
    setVentureForm({
      title: venture.title,
      domain: venture.domain,
      ideas: venture.ideas,
      requirements: venture.requirements,
      description: venture.description,
      how: venture.how
    });
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const updatedVenture = { ...ventureForm };
      const res = await axios.put(`http://localhost:1338/api/ideas/${id}`, updatedVenture, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVentures(ventures.map(venture => venture._id === id ? res.data : venture));
      setEditVentureId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setVentureForm({ ...ventureForm, [e.target.name]: e.target.value });
  };

  return (
    <section>
      <div>
        {ventures.length === 0 ? (
          <div className="no-customer">
            <h4>No ventures found</h4>
          </div>
        ) : (
          <div className="table-container overflow-x-scroll">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Domain</th>
                  <th>Ideas</th>
                  <th>Requirements</th>
                  <th>Description</th>
                  <th>How</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="relative bg-slate-400">
                {ventures.map(venture => (
                  <tr key={venture._id} className="bg-white">
                    {editVentureId === venture._id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="title"
                            value={ventureForm.title}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="domain"
                            value={ventureForm.domain}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="ideas"
                            value={ventureForm.ideas}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="requirements"
                            value={ventureForm.requirements}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="description"
                            value={ventureForm.description}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="how"
                            value={ventureForm.how}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <button onClick={(e) => handleUpdate(e, venture._id)}>Save</button>
                          <br />
                          <button onClick={() => setEditVentureId(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{venture.title}</td>
                        <td>{venture.domain}</td>
                        <td>{venture.ideas}</td>
                        <td>{venture.requirements}</td>
                        <td>{venture.description}</td>
                        <td>{venture.how}</td>
                        <td>
                          <button onClick={() => handleEdit(venture)}>Update</button>
                          <br />
                          <button onClick={() => handleDelete(venture._id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {Array.from({ length: 14 }).map((_, index) => (
                  <tr key={`placeholder-${index}`} className={`h-10 text-center ${index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'}`}>
                    <td colSpan="7" className="py-2"></td>
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

export default VentureList;
