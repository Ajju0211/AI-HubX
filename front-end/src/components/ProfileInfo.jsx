import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAuthStore } from "../store/authStore";

const Profile = () => {

    const { user,logout } = useAuthStore();
  // State for profile details
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    username: "johndoe123",
    membership: "Premium",
    profilePicture: assets.user_icon, // Default profile picture
  });

  // Function to simulate changing the profile picture
  const changeProfilePicture = () => {
    setProfile({
      ...profile,
      profilePicture: assets.user_icon, // Example of another picture from assets
    });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="absolute z-30 top-[90px] right-[10px] bg-gradient-to-br rounded-[40px] from-gray-900 via-gray-900 to-green-800 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-[40px] shadow-xl w-96">
        {/* Profile Picture */}
        <div className="flex flex-col gap-2 items-center">
        <p className="text-gray-100 text-sm">{user.email}</p>
          <img
            src={profile.profilePicture}
            alt="User Icon"
            className="w-28 h-28 rounded-full border-4  hover:border-green-900  border-gray-500 shadow-lg"
          />
          <h2 className="text-2xl font-semibold mt-4 font-sans space-x-1">Hi, {profile.name.toUpperCase()}!</h2>
        </div>

        {/* User Details */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-3">
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Membership:</span>
            <span className="text-blue-400">{profile.membership}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col space-y-4">
          <button onClick={handleLogout} className="w-full py-2 rounded-md bg-gray-500 hover:bg-green-900 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
