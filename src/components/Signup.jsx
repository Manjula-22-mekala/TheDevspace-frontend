import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signup = async () => {
    try {
      await axios.post(`${BASE_URL}/signup`, form, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Curtains */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-black/80 animate-curtain-left z-20"></div>
      <div className="absolute inset-y-0 right-0 w-1/2 bg-black/80 animate-curtain-right z-20"></div>

      {/* SIGNUP CARD */}
      <div className="relative z-30 w-[420px] p-8 rounded-2xl
        bg-white/10 backdrop-blur-xl
        border border-white/20 shadow-2xl
        animate-login">

        <h1 className="text-2xl font-semibold text-white text-center">
          Join TheDevSpace
        </h1>

        <p className="text-sm text-gray-300 text-center mb-6">
          Create your developer profile
        </p>

        <div className="flex gap-3 mb-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-1/2 bg-white/10 text-white border-white/30"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-1/2 bg-white/10 text-white border-white/30"
            onChange={handleChange}
          />
        </div>

        <input
          name="emailId"
          placeholder="Email"
          className="input input-bordered w-full mb-4 bg-white/10 text-white border-white/30"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Strong Password"
          className="input input-bordered w-full mb-3 bg-white/10 text-white border-white/30"
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={signup}
          className="w-full py-2 rounded-lg font-medium text-white
            bg-gradient-to-r from-indigo-500 to-violet-500
            hover:from-indigo-400 hover:to-violet-400
            active:scale-95 transition-all"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-300 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
