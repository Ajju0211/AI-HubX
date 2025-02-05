import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//This is for encrypting the email and password

	const publicKey = `
`;


	const { login, isLoading, error, setScrollHide } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();

		await login(email, password);
	};

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

	return (
		<div className="flex absolute items-center  z-auto bg-black bg-opacity-90  justify-center  h-screen w-screen ">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md absolute w-screen border-[1px] border-[#444242] bg-gray-800 bg-opacity-50  backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
				<div className='p-8 bg-black'>
					<h2 className='text-3xl font-bold mb-6 text-center text-[#929292] text-transparent bg-clip-text'>
						<p className="text-[#929292]">Welcome Back</p>
					</h2>

					<form onSubmit={handleLogin} className="space-y-6 w-full max-w-sm mx-auto">
						{/* Email Input with Icon */}
						<div className="relative">
							<input
								type="email"
								placeholder="Email Address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full py-3 pl-12 pr-4 bg-black text-white border border-white rounded-lg focus:ring-0 focus:border-white placeholder-white text-sm sm:text-base"
							/>
							<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
						</div>

						{/* Password Input with Icon */}
						<div className="relative">
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full py-3 pl-12 pr-4 bg-black text-white border border-white rounded-lg focus:ring-0 focus:border-white placeholder-white text-sm sm:text-base"
							/>
							<Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
						</div>

						{/* Forgot Password Link */}
						<div className="flex items-center justify-between mb-6">
							<Link to="/forgot-password" className="text-sm text-white hover:underline">
								Forgot password?
							</Link>
						</div>

						{/* Error Message */}
						{error && <p className="text-red-500 font-semibold mb-2 text-sm">{`Error: ${error}`}</p>}

						{/* Submit Button */}
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full py-3 px-4 bg-[#b7b7b8] text-black font-serif rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black transition duration-200"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
						</motion.button>
					</form>

				</div>
				<div className='px-8 py-4 bg-black bg-opacity-50 flex justify-center'>
					<p className='text-sm text-gray-400'>
						Don't have an account?{" "}
						<Link to='/signup' className='text-blue-400 hover:underline'>
							Sign up
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default LoginPage;