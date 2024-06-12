// VentureList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VentureList = () => {
  const navigate = useNavigate();
  const [ventures, setVentures] = useState([]);

  useEffect(() => {
    const fetchVentures = async () => {
      try {
        const res = await axios.get('http://localhost:1338/api/ideas');
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
        await axios.delete(`http://localhost:1338/api/ideas/${id}`);
        setVentures(ventures.filter(venture => venture._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
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
                    <td>{venture.title}</td>
                    <td>{venture.domain}</td>
                    <td>{venture.ideas}</td>
                    <td>{venture.requirements}</td>
                    <td>{venture.description}</td>
                    <td>{venture.how}</td>
                    <td>
                      <button onClick={() => handleDelete(venture._id)}>Delete</button>
                    </td>
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
