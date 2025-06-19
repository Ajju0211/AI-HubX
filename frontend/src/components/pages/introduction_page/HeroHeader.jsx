import { BrainCircuit, ComputerIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  }

  return (
    <header className="max-w-7xl  mx-auto w-full backdrop-blur-md sticky bg-slate-950/30  flex justify-between h-16 z-50 items-center text-[#e5e4e4] shadow-md">
      {/* Logo */}
      <div className='flex cursor-pointer items-center justify-center gap-2'>
      <BrainCircuit size={24} />
      <h1 className="text-2xl font-bold">AI-HubX</h1></div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSignUp}
          className="px-5 py-2 text-sm font-semibold rounded-3xl bg-white text-black hover:bg-[#333] hover:text-white transition"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
