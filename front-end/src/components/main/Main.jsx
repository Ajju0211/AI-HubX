import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

import { useAuthStore } from "../../store/authStore";

const Main = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  // Function to process the resultData
  const formatResponse = (text) => {
    return text
      .replace(/## (.+?)\n/g, '<h1>$1</h1>') // Main title
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/^\* (.+)$/gm, '<li>$1</li>') // List items
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/(\[(.*?)\]\((.*?)\))/g, '<a href="$3" target="_blank" rel="noopener noreferrer">$2</a>') // Markdown-style links
      .replace(/\n/g, '<br />') // Line breaks
      .replace(/<\/li><br \/>/g, '</li>')
  };
  

  // Process the formatted result data
  const result = formatResponse(resultData);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini AI</p>
        <p className="logout" onClick={handleLogout}>Logout</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {/* Card components go here */}
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  loading...
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div>
                  <div className="text-size-14 font-familly-a=" dangerouslySetInnerHTML={{ __html: result }} />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-botton">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Message GeminiAI"
            />
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            <img
              onClick={() => onSent(input)}
              src={assets.send_icon}
              alt="Send Icon"
            />
          </div>
          <p className="bottom-info">
            GeminiAI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
