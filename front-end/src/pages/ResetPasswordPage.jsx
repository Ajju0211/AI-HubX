import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import FloatingShape from '../components/FloatingShape';

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="absolute inset-0 flex items-center justify-center bg-[#0b0b0b] bg-opacity-80 backdrop-blur-md"
		>
			<FloatingShape />
			<FloatingShape top="20%"/>
			<FloatingShape left="50%"/>
			<FloatingShape left="80%" top="50%" />
			<FloatingShape left="70%" top="80%" />
			<FloatingShape left="20%" top="0%" />
			<div className="max-w-md w-full bg-[#202021] border-[1px] border-[#6b6b6b] bg-opacity-90 rounded-2xl shadow-lg overflow-hidden p-8">
				<h2 className="text-3xl font-semibold mb-6 text-center text-white">
					Reset Password
				</h2>
				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
				{message && <p className="text-green-500 text-sm mb-4">{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type="password"
						placeholder="New Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-gray-500 focus:ring-1 focus:ring-gray-600 rounded-lg w-full p-3 mb-4"
					/>

					<Input
						icon={Lock}
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-gray-500 focus:ring-1 focus:ring-gray-600 rounded-lg w-full p-3 mb-6"
					/>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="w-full py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Resetting..." : "Set New Password"}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};

export default ResetPasswordPage;
