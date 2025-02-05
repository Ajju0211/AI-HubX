import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword,setScrollHide } = useAuthStore();

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
		}
	}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="flex absolute items-center z-auto bg-black bg-opacity-90 justify-center h-screen w-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md absolute w-screen border-[1px] border-[#444242] bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 bg-black">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#bebdbd] text-transparent bg-clip-text">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
              <p className="text-gray-300 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                type="submit"
              >
                {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-300 mb-6">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-black bg-opacity-50 flex justify-center">
          <Link to={"/login"} className="text-sm text-gray-400 hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
