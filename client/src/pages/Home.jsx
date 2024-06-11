// Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:1338/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('There was an error fetching user data!', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="navbar flex justify-between items-center bg-custom-201A31 text-white h-24 px-20">
        <div className="welcome">
          <h1 className="text-[42px] font-bold" style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 600 }}>WELCOME</h1>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <p className="mr-4">{userData ? userData.email : 'Loading...'}</p>
          <button className="bg-black text-white px-4 py-1.5 rounded-md" onClick={handleLogout}>Log out</button>
        </div>
      </div>
      <div className="row">
        <div className="start-col">
          <a href="/todo">
            <img src="https://i.pinimg.com/originals/44/e7/8d/44e78d1f020b30e73ba169510dd6460e.jpg" alt="oops" />
          </a>
        </div>
        <div className="start-col">
          <a href="/random">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMo-FB6puAGXXzxk4qQJ55GsujQYxo1IT2w&usqp=CAU" alt="oops" />
          </a>
        </div>
        <div className="start-col">
          <a href="/venture">
            <img src="https://media.licdn.com/dms/image/C560BAQEEIT13hQAv-g/company-logo_200_200/0/1630641488754?e=2147483647&v=beta&t=lDoaN0NJYCdGGG1ldpnMlAow6iDkkqtyvFLlcty0MiI" alt="oops" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
