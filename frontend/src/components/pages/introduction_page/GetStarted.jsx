import React from 'react';
import { useNavigate } from 'react-router-dom';



const GetStarted = () => {
  const Navigate = useNavigate();

  const handleGetStarted = () => {
    Navigate('/signup');
  }
  return (
    <div className="w-full  mb-8 min-h-[300px] bg-black text-[#e5e4e4] flex flex-col items-center justify-center  py-16">
      <div className=' border-[1px] min-h-[300px] p-4 w-[80%] rounded-md ml-4 mr-4 relative'>
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          What are you waiting for??
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Join us now!
        </h2>
        <p className="text-base md:text-lg max-w-3xl mx-auto opacity-90 px-4">
          Don't miss out on the chance to access cutting-edge AI tools for free. From generating stunning visuals to crafting compelling text, everything you need is just a click away.
        </p>
        <button onClick={handleGetStarted} className="mt-8 bg-[#d4d3d3] text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
          Get Started for free
        </button>
      </div>
    </div>
    </div>
  );
};

export default GetStarted;