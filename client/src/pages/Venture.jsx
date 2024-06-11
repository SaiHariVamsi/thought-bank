import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Venture() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [ideas, setIdeas] = useState("");
  const [requirements, setRequirements] = useState("");
  const [how, setHow] = useState("");
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

  const handleAddIdea = async (event) => {
    event.preventDefault();

    if (!userData.email) {
      setErrors({ submit: "User data not loaded. Please try again later." });
      return;
    }

    const ideaData = {
      title,
      domain,
      ideas,
      requirements,
      description,
      how,
      user: userData.email,
    };

    console.log("Sending idea data:", ideaData);

    try {
      const response = await fetch("http://localhost:1338/api/venture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
      });

      const data = await response.json();
      console.log("Server response:", data);
      if (data.status === "ok") {
        navigate("/venture", { replace: true });
      } else {
        setErrors({ submit: "Error occurred while adding the idea." });
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
      <form className="flex flex-col justify-center items-center" onSubmit={handleAddIdea}>
        <div className="middle p-10 shadow-right-bottom rounded-lg">
          <div className="mt-6 grid grid-cols-1 gap-8">
            <div className="">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Title"
                required
              />
              {errors.title && <span className="text-red-500 text-[12px]">{errors.title}</span>}
            </div>
            <div className="">
              <input
                type="text"
                name="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Domain"
                required
              />
              {errors.domain && <span className="text-red-500 text-[12px]">{errors.domain}</span>}
            </div>
            <div className="">
              <input
                type="text"
                name="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Requirements"
                required
              />
              {errors.requirements && <span className="text-red-500 text-[12px]">{errors.requirements}</span>}
            </div>
            <div className="">
              <input
                type="text"
                name="ideas"
                value={ideas}
                onChange={(e) => setIdeas(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Ideas"
                required
              />
              {errors.ideas && <span className="text-red-500 text-[12px]">{errors.ideas}</span>}
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
                type="text"
                name="how"
                value={how}
                onChange={(e) => setHow(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="How"
                required
              />
              {errors.how && <span className="text-red-500 text-[12px]">{errors.how}</span>}
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
            Add Idea
          </button>
        </div>
      </form>
    </section>
  );
}

export default Venture;
