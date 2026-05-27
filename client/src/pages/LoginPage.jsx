import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-sm border">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Login to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-black font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;