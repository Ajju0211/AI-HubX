import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const Navigate = useNavigate();


  const handleLogin = () => {
    Navigate('/login');
  }

  const handleSignUp = () => {
    Navigate('/signup');
  }
  return (
    <header className={`w-full py-4 px-6 flex justify-between items-center bg-black text-[#e5e4e4] shadow-md`}>
      {/* Logo */}
      <h1 className="text-2xl font-bold">Inevo AI</h1>
      
      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button onClick={handleLogin} className="px-4 py-2 text-sm font-medium rounded-3xl transition duration-300 hover:bg-opacity-80  hover:text-[#333]">
          Login
        </button>
        <button onClick={handleSignUp} className="px-5 py-2 text-sm font-semibold rounded-3xl bg-white text-black  hover:bg-[#333] hover:text-white transition">
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
