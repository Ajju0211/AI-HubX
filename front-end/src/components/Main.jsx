import React, { useContext, useState, useEffect } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { Context } from "../context/context";
import { useAuthStore } from "../store/authStore";
import ProfileInfo from "./ProfileInfo";

const Main = () => {
  const { user, chatResponse, getChat } = useAuthStore();
  const { onSent, recentPrompt, oldPrompt, oldChat, formatResponse, showResult, loading, resultData, setInput, input } = useContext(Context);
  const [profile, setProfile] = useState(false);



  useEffect(() => {
    //Becouse its personal project so I used setInterval to get chat data every 1 second
    const interval = setInterval(() => {

      getChat(user._id);
    }, 4000);

    return () => clearInterval(interval);
  }, [getChat, user._id]);

  const handler = async (input, resultData) => {
    await onSent(input);
    if(resultData){
    chatResponse(user._id, input, resultData);}
  }

  const result = formatResponse(resultData);
  const oldchat = formatResponse(oldChat);

  return (
    <div className="main min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 flex flex-col items-center">
      {profile && <ProfileInfo />}
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 bg-black opacity-50 ${profile ? "block" : "hidden"
          }`}
        onClick={() => setProfile(false)}
      ></div>

      {/* Navbar */}
      <div className="nav w-full flex justify-between items-center p-6 text-white bg-opacity-70 backdrop-blur-md">
        <h1 className="text-xl font-bold">Gemini AI</h1>
        <button
          onClick={() => setProfile((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800"
        >
          <FaUserCircle className="text-2xl text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow flex flex-col items-center w-full max-w-4xl px-4 py-6">
        {!showResult ? (
          <div className="greeting text-white text-center mt-8">
            <h2 className="text-3xl font-semibold">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[#7460d6] animate-gradient-flash bg-[length:400%_200%]" >{user.name.toUpperCase()}</span>
            </h2>
            <p className="text-lg mt-2">How can I help you today?</p>
          </div>
        ) : (
          <div className="result-container w-full bg-gray-800 text-white p-4 rounded-lg shadow-md mt-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
            <div className="prompt flex items-center mb-4">
              <FaUserCircle className="text-xl mr-2" />
              <span className="font-semibold">{recentPrompt ? recentPrompt : oldPrompt}</span>
            </div>
            {loading ? (
              <div className="loading text-center">Loading...</div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: result ? result : oldchat }} />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center w-full p-4">
        <div className="w-full xl:w-[600px] max-w-4xl border border-gray-700 bg-gray-900 p-2 rounded-lg flex justify-center items-center">
          <input
            type="text"
            placeholder="Message Gemini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-3 py-2 bg-transparent text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />

          <button className="ml-2 p-2 text-gray-400 hover:bg-gray-800 rounded-md" onClick={() => handler(input, resultData)}>
            <FaPaperPlane className="h-4 w-4 xl:h-6 xl:w-6" />
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">Gemini always aims to be helpful and accurate.</p>
      </div>
    </div>
  );
};

export default Main;
