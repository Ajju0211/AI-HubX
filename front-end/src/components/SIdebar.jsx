import React, { useState } from 'react';
import {
  Plus,
  Settings,
  HelpCircle,
  Menu
} from "lucide-react";
import { useAuthStore } from '../store/authStore';
import { useContext } from 'react';
import { Context } from "../context/context";

const Sidebar = () => {
  const { setChatIndex, chates } = useAuthStore();
  const { setResult, setMessageId , messageList,setMessageList} = useContext(Context);
  const chat = chates ? chates?.data : [];
  // console.log(chat?.[0]?.chats[0]);


  const [isOpen, setIsOpen] = useState(false); // State to handle menu toggle on mobile

  const chatHandeler = (messageId, index) => {
    setResult(); // Assuming this is clearing or resetting some state
    setMessageId(messageId); // Set the current messageId
    setChatIndex(index); // Set the current chat index
    // Extract the chat messages based on the provided index and messageId
    setMessageList("");
    for(let i=0; i < chates?.data?.[index].chats.length; i++){
      const message = chates?.data?.[index]?.chats[i];
    setMessageList((prevItems) => [...prevItems, message]);
    console.log(message);
    }
    
    
  };
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className="h-full z-50 bg-[#212121] ">
      {/* Mobile Menu Toggle Button */}
      <button
        className=" absolute top-[10px] left-4 sm:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-md"
        onClick={toggleMenu}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div className={`sm:flex ${isOpen ? 'block' : 'hidden'} sm:block absolute bg-[#171717] sm:relative h-screen w-64 flex-col justify-between border-r border-gray-700 p-4`}>
        {/* Top section */}
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-100">Inevo AI</h1>
            <button onClick={toggleMenu} className="p-2 text-gray-400 hover:bg-gray-800 rounded-md">
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <button className="w-full flex items-center justify-start px-4 py-2 mb-4 text-gray-100 rounded-md border border-gray-700 hover:bg-gray-800">
            <Plus className="h-5 w-5 mr-2" />
            New Chat
          </button>
        <div className='h-full overflow-y-auto'>
          {
            !chates ? (
              <div className='text-gray-100'>All Chates</div>
            ) : (
              chat?.map((chat, index) => (
                <div key={chat._id} className="">
                  <button
                    onClick={() => { chatHandeler(chat.messageId,index); }}
                    className="w-full flex h-[70%] items-center px-2 py-2 hover:bg-[#2f2f2f] rounded-[10px]"
                  >
                    <span className="text-[#eae7e7] text-sm font-light truncate max-w-xs">{chat.chats?.[0]?.chat.split(" ")
                      .slice(0, 6)  // Take the first 3 words
                      .join(" ") + (chat?.[index]?.chats?.[index]?.chat.split(" ").length > 6 ? "..." : "")}</span>
                  </button>
                </div>
              ))
            )}
        </div>

        {/* Bottom section */}
        <div className="space-y-2">
          <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-md">
            <HelpCircle className="h-5 w-5 mr-2" />
            Help & FAQ
          </button>
          <button className="w-full flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-md">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
