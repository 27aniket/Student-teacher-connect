import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("http://localhost:8000/api/auth/register", {
      name,
      email,
      password,
      role,
    });
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        <div className="flex items-center border rounded-lg p-2 mb-4">
          <FaUserPlus className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded-lg p-2 mb-4">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded-lg p-2 mb-4">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <select
          className="w-full border rounded-lg p-2 mb-4"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
        >
          Register
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-600 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
