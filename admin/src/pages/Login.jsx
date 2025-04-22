import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Title from "../components/Title";
import axios from "axios";
import backendURL from "../components/allURL";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${backendURL}/api/users/admin/login`, {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        navigate("/");
        console.log(res.data);
        toast.success(res.data.message);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10 sm:mt-40">
      <div className="w-full max-w-xl border border-gray-300 p-6 sm:p-10">
        <div className="text-3xl text-center">
          <Title text1={"ADMIN PANEL"} text2={"SIGN IN"} />
        </div>
        <div className="w-full mt-8">
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-black p-2 outline-none mb-8"
              disabled={loading}
              required
            />

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-black p-2 outline-none pr-10"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? (
                  <VscEyeClosed className="w-5 h-5 text-gray-500" />
                ) : (
                  <VscEye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <span className="flex justify-end mt-2 font-medium text-gray-600 hover:text-gray-700 hover:underline transition duration-150 text-xs">
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center mt-4">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white px-10 py-3 mt-8 cursor-pointer transition-all duration-300 ease-out ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
