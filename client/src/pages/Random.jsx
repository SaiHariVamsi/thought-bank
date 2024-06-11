import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Random() {
  const [what, setWhat] = useState("");
  const [why, setWhy] = useState("");
  const [when, setWhen] = useState("");
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
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
        setErrors({ submit: "Failed to load user data. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleAddThought = async (event) => {
    event.preventDefault();

    if (!userData.email) {
      setErrors({ submit: "User data not loaded. Please try again later." });
      return;
    }

    const thoughtData = {
      what,
      why,
      when,
      user: userData.email,
    };

    console.log("Sending thought data:", thoughtData);

    try {
      const response = await fetch("http://localhost:1338/api/random", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thoughtData),
      });

      const data = await response.json();
      console.log("Server response:", data);
      if (data.status === "ok") {
        navigate("/random", { replace: true });
      } else {
        setErrors({ submit: "Error occurred while adding the thought." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An error occurred. Please try again later." });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-row">
      <form className="flex flex-col justify-center items-center" onSubmit={handleAddThought}>
        <div className="middle p-10 shadow-right-bottom rounded-lg">
          <div className="mt-6 grid grid-cols-1 gap-8">
            <div className="">
              <input
                type="text"
                name="what"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="What"
                required
              />
              {errors.what && <span className="text-red-500 text-[12px]">{errors.what}</span>}
            </div>
            <div className="">
              <input
                type="text"
                name="why"
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Why"
                required
              />
              {errors.why && <span className="text-red-500 text-[12px]">{errors.why}</span>}
            </div>
            <div className="">
              <input
                type="time"
                name="when"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="When"
                required
              />
              {errors.when && <span className="text-red-500 text-[12px]">{errors.when}</span>}
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
            Add Thought
          </button>
        </div>
      </form>
    </section>
  );
}

export default Random;
