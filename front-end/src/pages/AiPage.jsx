
import { useAuthStore } from "../store/authStore";
import Main from "../components/Main";
import  SIdebar  from "../components/SIdebar";

const DashboardPage = () => {
	const {logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};
	return (
		<div className="flex w-screen items-center justify-center overflow-hidden h-screen">
		<SIdebar/>
		<div className="h-[100%] w-[100%]">
		<Main/>
		</div>
	  </div>
	);
};
export default DashboardPage;