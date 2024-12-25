
import { useAuthStore } from "../store/authStore";
import Main from "../components/main/Main";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};
	return (
		< >
		<Main/>
	  </>
	);
};
export default DashboardPage;