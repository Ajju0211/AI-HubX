import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../../context/context";
import { useAuthStore } from "../../../store/authStore";
import AiHubHeader from "../AIComponent/AiHubHeader";
import Input from "../AIComponent/Input";
import ChatResponse from "../AIComponent/ChatResponse";

const Main = () => {
  const { user } = useAuthStore();
  const chatContainerRef = useRef(null);

  // Auto-scroll to the latest message
  const { showResult, messageList } = useContext(Context);

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }, 100); // Small delay to let DOM render fully
    }
  }, [messageList]); // Scroll when messageList changes

  return (
    <div className="main h-[100%] w-[100%] bg-[#212121] flex flex-col justify-center items-center">
      {/* Header */}
      <AiHubHeader />

      {/* Main Content */}
      <div className="flex flex-col items-center h-[90%] justify-center font-sans antialiased text-base leading-relaxed tracking-normal  flex-grow w-full xl:w-[60%] sm:w-[80%] md:w-[80%]  2xl:w-[40%] px-4 py-6">
        <div className="main- content flex flex-col items-center justify-center bg-transparent  font-sans antialiased text-base leading-relaxed tracking-normal w-full h-full flex-grow overflow-auto py-2 rounded-lg">
          {/* Greeting or Chat UI */}
          {!showResult ? (
            <div className="greeting text-white text-center mt-8">
              <h2 className="text-3xl font-sans">
                Hello,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[#7460d6] animate-gradient-flash bg-[length:400%_200%]">
                  {user?.name.toUpperCase()}
                </span>
              </h2>
              <p className="text-lg mt-2">How can I help you today?</p>
            </div>
          ) : (
            <div
              ref={chatContainerRef}
              className="result-container flex flex-col h-full pt-6  xl:w-full text-sm md:text-lg overflow-y-auto w-full text-white rounded-lg bg-transparent scroll-smooth"
            >
              {/* Loop through messages */}
              {messageList.map((item, index) => (
                <div
                  key={index}
                  className="chat-item  font-sans antialiased text-md leading-relaxed tracking-normal flex flex-col w-full "
                >
                  {/* User Message */}
                  <div className="flex h-[80%] justify-end">
                    <div className="bg-[#343434] text-white font-light text-md p-3 px-6 rounded-2xl">
                      {<p className="text-md">{item.chat}</p>}
                    </div>
                  </div>
                  {/* AI Response */}
                  <div className="flex font-sans text-xl justify-start items-start">
                    <ChatResponse response={item.response} />
                  </div>
                </div>
              ))}
            </div>
          )}
          <Input />
        </div>

        {/* Input Section */}
        
      </div>

      <p className="text-[#939191] absolute bottom-2 text-[10px] md:text-md mb-2">
        InevoAi can make mistakes. Check important info
      </p>
    </div>
  );
};

export default Main;
