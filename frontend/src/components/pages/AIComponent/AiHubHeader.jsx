import React, { useContext, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { FaUserCircle } from "react-icons/fa";
import { ChevronDown, Share2 } from "lucide-react";
import ErrorMessages from "../../layout/ErrorMessage";
import { useAuthStore } from "../../../store/authStore";
import { Context } from "../../../context/context";
// Array of model options
const models = [
  { id: "Gemini" },
  { id: "EdenAi" },
  { id: "Qwen: QwQ 32B" },
  { id: "Llama 30B" },
  { id: "Deepseek r1" },
  { id: "Flux 1.1 (Image)" },
];

const AiHubHeader = () => {

  const { ErrorMessage, setErrorMessage } = useAuthStore();

  const Error = () => {
    const String = "feature is not available coming soon...";
    console.log(String);
    setErrorMessage(String);
  };

  // State for profile dropdown, selected model, and model dropdown visibility
  const [isProfileVisible, setProfileVisibility] = useState(false);
  const { selectedModel, setSelectedModel} = useContext(Context);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);


  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setDropdownVisibility((prev) => !prev);
  };

  // Handle model selection
  const handleModelSelect = (modelId) => {
    setSelectedModel(modelId);
    setDropdownVisibility(false);
  };

  return (
    <div className="relative w-full z-999  border-gray-600  h-7">
      {ErrorMessage && <ErrorMessages /> }

      {/* Navbar */}
      <div className=" top-0 z-999  left-0 w-full  flex justify-between items-center pr-5 py-4 text-white  border-gray-600  backdrop-blur-md">
        {/* Model Dropdown Section */}
        <div className="relative flex flex-col items-center gap-2 justify-around rounded-md w-58 pl-6">
          <div
            className="flex items-center mt-2 ml-7 justify-center gap-2 cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <p className="text-center text-[#d4d4d4] sm:text-xl font-sans font-extrabold">
              {selectedModel}
            </p>
            <ChevronDown />
          </div>

          { isDropdownVisible && (
        
            <div className="absolute z-999 top-full left-8 w-[200px] sm:w-[250px] p-2 mt-2 bg-[#292828] rounded-md shadow-lg border border-gray-700">
              {models.map((model) => (
                <button
                  key={model.id}
                  className="block w-full px-4 py-2 text-left text-white border border-zinc-500 hover:bg-gray-700 focus:outline-none"
                  onClick={() => handleModelSelect(model.id)}
                >
                  <span className="text-sm sm:text-xl">{model.id}</span>
                </button>
              ))}
            </div>

          )}
        </div>

    
        {/* Profile Button */}
        <div   className="flex items-center gap-4">
          <button onClick={Error}  className="flex items-center  border-[1px] border-[#444444] hover:bg-[#444444] pr-4  pl-4 h-[36px] justify-center gap-2 rounded-full">
            <Share2 className="text-[#d4d4d4]" size={18} />
            <span className="text-[#d4d4d4]">Share</span>
          </button>
          <button
            onClick={() => setProfileVisibility((prev) => !prev)}
            className="flex items-center justify-center w-10 h-10 rounded-full"
            aria-label="User Profile"
          >
            <FaUserCircle className="text-3xl hover:border-[2px] hover:border-[#908e8e] hover:rounded-2xl text-white" />
           
          </button>
         
        </div>
      </div>
    

      {/* Profile Info */}
      {isProfileVisible && <ProfileInfo />}
    </div>
  );
};

export default AiHubHeader;
