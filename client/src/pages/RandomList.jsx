// TodoList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RandomList = () => {
  const navigate = useNavigate();
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const res = await axios.get('http://localhost:1338/api/thoughts');
        setThoughts(res.data);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    fetchThoughts();
  }, [navigate]);

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
                  <th>How</th>
                </tr>
              </thead>
              <tbody className="relative bg-slate-400">
                {thoughts.map(thought => (
                  <tr key={thought._id.$oid} className="bg-white">
                    <td>{thought.what}</td>
                    <td>{thought.why}</td>
                    <td>{thought.when}</td>
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

export default RandomList;
