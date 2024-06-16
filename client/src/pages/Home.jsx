/*import React, { useEffect, useState } from 'react';
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

export default Home;*/


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TB from '../assets/TB.png';
import '../styles/homeStyles.css';

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
    <div className="home-container">
      <header className="header">
        <nav>
          <a href={TB}><img src={TB} alt="Thought Bank Logo" className="logo" /></a>
          <div className="nav-links">
            <ul>
              <li>{userData ? userData.email : 'Loading...'}</li>
              <li><a href="/login" onClick={handleLogout}>LOGOUT</a></li>
            </ul>
          </div>
        </nav>
        <div className="text-box">
          <h1>THOUGHT BANK</h1>
          <h6>A place to dump your ideas.</h6>
          <p>
            The number of thoughts a person can have is a complex and dynamic aspect of human cognition.
            Thoughts are the result of neural activity in the brain, and the brain is an immensely intricate organ
            with around 86 billion neurons, each forming thousands of connections. The actual number of thoughts
            a person has in a day is challenging to quantify accurately, as thoughts can from fleeting and subconscious
            to deliberate and focused. We are here to provide some assistance for you to organize all these thoughts and also to complete this project.
          </p>
        </div>
        <a href="#utility">
          <div className="scroll-down"></div>
        </a>
      </header>
      <section className="start">
        <h1>Let's Start</h1>
        <div className="row">
          <div className="start-col">
            <a href="/todo">
              <img src="https://i.pinimg.com/originals/44/e7/8d/44e78d1f020b30e73ba169510dd6460e.jpg" alt="Todo" />
            </a>
          </div>
          <div className="start-col">
            <a href="/random">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJMo-FB6puAGXXzxk4qQJ55GsujQYxo1IT2w&usqp=CAU" alt="Random" />
            </a>
          </div>
          <div className="start-col">
            <a href="/venture">
              <img src="https://media.licdn.com/dms/image/C560BAQEEIT13hQAv-g/company-logo_200_200/0/1630641488754?e=2147483647&v=beta&t=lDoaN0NJYCdGGG1ldpnMlAow6iDkkqtyvFLlcty0MiI" alt="Venture" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
