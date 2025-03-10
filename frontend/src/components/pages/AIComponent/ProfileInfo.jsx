import React, { useState } from "react";
import { User, Settings, ArrowUpRight, LogOut } from "lucide-react";
import { assets } from "../../../assets/assets";
import { useAuthStore } from "../../../store/authStore";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user, logout } = useAuthStore();
  
  const [profile] = useState({
    name: user?.name,
    email: user?.email,
    username: "johndoe123",
    membership: "Premium",
    profilePicture: assets.user_icon, // Default profile picture
  });

  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="absolute z-30 top-[60px] right-[10px] bg-[#313131] text-white rounded-xl shadow-lg w-64">
      <ul className="p-3 space-y-2">
        {/* Profile Section */}
        <li className="flex items-center gap-3 px-4 py-2">
        <FaUserCircle className="text-3xl hover:border-[2px] hover:border-[#908e8e] hover:rounded-2xl text-white" />
          <div>
            <p className="text-sm font-semibold">{profile?.name}</p>
            <p className="text-xs text-gray-400">{profile?.email}</p>
          </div>
        </li>

        <hr className="border-gray-700" />

        {/* Settings */}
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </li>

        {/* Membership */}
        <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer">
          <ArrowUpRight className="w-5 h-5" />
          <span>Upgrade Plan</span>
        </li>

        {/* Logout */}
        <li
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer border-t border-gray-700 mt-1"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          <span className="text-red-400">Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
