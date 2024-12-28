
import { useAuthStore } from "../store/authStore";
import Main from "../components/Main";
import  SIdebar  from "../components/SIdebar";

const DashboardPage = () => {
	const {logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};
	return (
		<div className="flex w-screen items-center justify-center h-screen">
		<SIdebar/>
		<Main/>
		
	  </div>
	);
};
export default DashboardPage;