import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validate from "../components/validationSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();

    // Validate form data
    const validationData = {
      email,
      createPassword,
      password,
    };

    const validationErrors = validate(validationData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (password !== createPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await fetch("http://localhost:1338/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validationData),
        });

        const data = await response.json();
        console.log(data);

        if (data.message === "Email already exists") {
          alert("Email already exists");
          navigate('/signup');
        } else if (response.ok) {
          navigate('/login');
        } else {
          console.error('Error in response:', data.message);
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    }
  }

  return (
    <section>
      <form className="flex flex-col justify-center items-center" onSubmit={registerUser}>
        <div className="middle p-10 shadow-right-bottom rounded-lg">
          <div className="mt-6 grid grid-cols-1 gap-8">
            <div>
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
            <div>
              <input
                type="password"
                name="createPassword"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                className="block w-full px-0 py-1 text-sm text-black border-b-2 border-gray-300 focus:border-black focus:outline-none"
                placeholder="Create Password"
                required
              />
              {errors.createPassword && <span className="text-red-500 text-[12px]">{errors.createPassword}</span>}
            </div>
            <div>
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
            Signup
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-500 mt-6">
          Terms and Condition privacy policy
        </p>
      </form>
    </section>
  );
}

export default Signup;
