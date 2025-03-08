import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/layout/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const { signup, error, isLoading, setScrollHide } = useAuthStore();

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("absolute")) {
      setScrollHide(false);
      navigate("/");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    setScrollHide(true);
    return () => {
      setScrollHide(false);
    };
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex absolute items-center justify-center h-screen w-screen bg-black bg-opacity-90">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-black bg-opacity-70  border-[1px] border-[#444242] backdrop-blur-md rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Form Content */}
        <div className="p-8 bg-black">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Full Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-black text-white border border-white rounded-lg focus:ring-0 focus:border-white placeholder-white text-sm sm:text-base"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-black text-white border border-white rounded-lg focus:ring-0 focus:border-white placeholder-white text-sm sm:text-base"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-12 pr-4 bg-black text-white border border-white rounded-lg focus:ring-0 focus:border-white placeholder-white text-sm sm:text-base"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 font-semibold text-sm">{error}</p>}

            {/* Password Strength Meter */}
            <PasswordStrengthMeter password={password} />

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin mx-auto w-6 h-6" />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-black bg-opacity-50 flex justify-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
