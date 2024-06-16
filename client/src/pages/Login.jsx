/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validate from "../components/validationLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleLoginUser(event) {
    event.preventDefault();

    // Create the validation data object
    const validationData = {
      email: email,
      password: password,
    };

    // Validate the form data
    const validationErrors = validate(validationData);
    setErrors(validationErrors);

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {

      return; // If there are errors, prevent the form from submitting
    }

    try {
      const response = await fetch("http://localhost:1338/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationData),
      });

      const data = await response.json();
      if (data.status === "ok") {
        localStorage.setItem('token', data.token); //set token to local storage
        navigate("/");
      } else {
      setErrors({ submit: "please enter valid email and password" });

      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An error occurred. Please try again later." });
    }
  }

  return (
    <section className="flex flex-row">
        <form className=" flex flex-col justify-center items-center" onSubmit={handleLoginUser}>
          <div className="middle p-10 shadow-right-bottom rounded-lg">
            <div className="mt-6 grid grid-cols-1 gap-8">
              <div className="">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  placeholder="Email ID"
                  required
                />
                {errors.email && <span className="text-red-500 text-[12px]">{errors.email}</span>}
              </div>
              <div className="">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                  placeholder="Password"
                  required
                />
                {errors.password && <span className="text-red-500 text-[12px]">{errors.password}</span>}
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
              Login
            </button>
            <p>No account?<a href="/signup">Click here</a></p>
          </div>
          <p className="text-[10px] text-center text-gray-500 mt-6">
            Terms and Condition privacy policy
          </p>
        </form>
    </section>
  );
}

export default Login;*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validate from "../components/validationLogin";
import '../styles/loginStyles.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleLoginUser(event) {
    event.preventDefault();

    const validationData = { email, password };
    const validationErrors = validate(validationData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:1338/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validationData),
      });

      const data = await response.json();
      if (data.status === "ok") {
        localStorage.setItem('token', data.token);
        navigate("/");
      } else {
        setErrors({ submit: "Please enter valid email and password" });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ submit: "An error occurred. Please try again later." });
    }
  }

  return (
    <div className="wrapper">
      <form onSubmit={handleLoginUser}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className='bx bxs-user'></i>
          {errors.email && <span className="errors">{errors.email}</span>}
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className='bx bxs-lock-alt'></i>
          {errors.password && <span className="errors">{errors.password}</span>}
        </div>
        <button type="submit" className="btn">Log In</button>
        {errors.submit && <span className="errors">{errors.submit}</span>}
        <div className="register-link">
          <p>Don't have an account? <Link to="/signup">Click here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
