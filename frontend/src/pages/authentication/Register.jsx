import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { Link, useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { ShopContext } from "../../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, loading, setLoading, url } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${url}/api/users/register`,
        { name, email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        if (res.data.token) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        }

        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    setName("");
    setEmail("");
    setPassword("");
    toast.dismiss();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10 sm:mt-40">
      <div className="w-full max-w-xl border border-gray-300 p-6 sm:p-10">
        <div className="text-3xl text-center">
          <Title text1={"SIGN"} text2={"UP"} />
        </div>
        <div className="w-full mt-8">
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-8">
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b border-black p-2 outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-8">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-black p-2 outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-black p-2 outline-none focus:border-blue-500 transition-colors pr-10"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <VscEyeClosed className="w-5 h-5 text-gray-500" />
                  ) : (
                    <VscEye className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-10 py-3 mt-8 text-white font-medium rounded transition-colors ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
