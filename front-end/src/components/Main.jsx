import React, { useContext, useEffect,useRef } from "react";
import { Context } from "../context/context";
import { useAuthStore } from "../store/authStore";
import InevoHeader from "./AIComponent/InevoHeader";
import Input from "./AIComponent/Input";

import ChatResponse from "./AIComponent/ChatResponse";

const Main = () => {
  const { user } = useAuthStore();
  const chatContainerRef = useRef(null);

  // Auto-scroll to the latest message
  

  const { oldChat, formatResponse, showResult, messageList } = useContext(Context);
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  const oldchat = formatResponse(oldChat);

  return (
    <div className="main h-[100%] w-[100%] bg-[#212121] flex flex-col items-center">
      {/* Header */}
      <InevoHeader />
      
      {/* Main Content */}
      <div className="flex flex-col items-center h-full justify-between flex-grow w-full  px-4 py-6">
        <div className="main-content bg-transparent w-full h-full max-w-4xl 2xl:max-w-[60vw] flex-grow overflow-auto px-4 py-2 rounded-lg">
          
          {/* Greeting or Chat UI */}
          {!showResult ? (
            <div className="greeting text-white text-center mt-8">
              <h2 className="text-3xl font-semibold">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[#7460d6] animate-gradient-flash bg-[length:400%_200%]">{user.name.toUpperCase()}</span>
              </h2>
              <p className="text-lg mt-2">How can I help you today?</p>
            </div>
          ) : (
            <div
            ref={chatContainerRef}
            className="result-container flex flex-col h-full m-4   sm:w-[430px] md:w-[100%] lg:w-[100%] xl:w-full text-sm md:text-lg overflow-y-auto w-full text-white p-4 rounded-lg bg-transparent scroll-smooth"
          >
            {/* Loop through messages */}
            {messageList.map((item, index) => (
              <div key={index} className="chat-item flex flex-col w-full space-y-2 mb-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#343434] text-white font-light p-3 px-6 rounded-2xl shadow-lg">
                    {item.chat}
                  </div>
                </div>
                {/* AI Response */}
                <div className="flex font-sans text-md justify-start">
                <ChatResponse response={item.response} />
                </div>
              </div>
            ))}
          </div>
          )}
        </div>

        {/* Input Section */}
        <Input />
      </div>

      <p className="text-[#939191] text-[10px] md:text-md mb-2">InevoAi can make mistakes. Check important info</p>
    </div>
  );
};

export default Main;
