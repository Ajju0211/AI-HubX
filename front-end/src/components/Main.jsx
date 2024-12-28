import React, { useContext, useState, useEffect } from "react";
import { FaPaperPlane,  FaUserCircle } from "react-icons/fa";
import { Context } from "../context/context";
import { useAuthStore } from "../store/authStore";
import ProfileInfo from "./ProfileInfo";

const Main = () => {
  const { user,chatResponse,getChat,chates } = useAuthStore();
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const [profile, setProfile] = useState(false);

  const formatResponse = (text) => {
    return text
      .replace(/## (.+?)\n/g, '<h1 class="text-2xl font-bold mb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(
        /```([\s\S]+?)```/g,
        '<pre class="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto"><code class="font-mono">$1</code></pre>'
      )
      .replace(
        /(\[(.*?)\]\((.*?)\))/g,
        '<a href="$3" target="_blank" rel="noopener noreferrer" class="text-green-500 underline">$2</a>'
      )
      .replace(/\n/g, '<br />')
      .replace(/<\/li><br \/>/g, '</li>');
  };

  useEffect(() => {
    getChat(user.email);
   
  }, [getChat]);
  console.log(chates);


  const result = formatResponse(resultData);

  const handler = async() => {
    await onSent(input);
    chatResponse(user.email,input,resultData);
  }

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
              Hello, <span>{user.name.toUpperCase()}</span>
            </h2>
            <p className="text-lg mt-2">How can I help you today?</p>
          </div>
        ) : (
          <div className="result-container w-full bg-gray-800 text-white p-4 rounded-lg shadow-md mt-6 max-h-[60vh] overflow-y-auto">
            <div className="prompt flex items-center mb-4">
              <FaUserCircle className="text-xl mr-2" />
              <span className="font-semibold">{recentPrompt}</span>
            </div>
            {loading ? (
              <div className="loading text-center">Loading...</div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: result }} />
            )}
          </div>
        )}
      </div>

      <div>
        <div className="w-full max-w-4xl border border-gray-700 bg-gray-900 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Message Claude"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-3 py-2 bg-transparent text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />

          <button className="ml-2 p-2 text-gray-400 hover:bg-gray-800 rounded-md" onClick={() => handler(input)}>
            <FaPaperPlane className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">Claude always aims to be helpful and accurate.</p>
      </div>
    </div>
  );
};

export default Main;
