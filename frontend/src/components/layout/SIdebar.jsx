import React, { useState } from "react";
import {
  Plus,
  Settings,
  HelpCircle,
  Menu,
  PanelRightClose,
  PanelLeftClose,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { Context } from "../../context/context";

const Sidebar = () => {
  const { setChatIndex, chates } = useAuthStore();
  const { setResult, setMessageId,showResult, setMessageList } = useContext(Context);
  const chat =  [...(chates?.data || [])].reverse();

  const [isOpen, setIsOpen] = useState(true); // State to handle menu toggle on mobile

  const createNewChat = () => {
    const id = uuid()
    setMessageId(id)
    setResult();
    setMessageList([]);
  }
  
  const chatHandeler = (messageId, index) => {
    setResult(true); //  this is clearing or resetting some state
    setMessageId(messageId); // Set the current messageId
    setChatIndex(index); // Set the current chat index
    // Extract the chat messages based on the provided index and messageId
    setMessageList("");
    for (let i = 0; i < chates?.data?.[index].chats.length; i++) {
      const message = chates?.data?.[index]?.chats[i];
      setMessageList((prevItems) => [...prevItems, message]);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`h-[100vh]  flex flex-col justify-evenly   z-50 bg-[#212121] ${
        isOpen ? "" : "w-0"
      } `}
    >
      {/* Mobile Menu Toggle Button */}
      <button
        className=" absolute top-[21px] left-4 p-2 text-gray-400 hover:bg-gray-800 rounded-md"
        onClick={toggleMenu}
      >
        <PanelRightClose className="h-5 w-5" />
      </button>

      <div
        className={`absolute md:relative h-full w-64 overflow-hidden flex-col justify-between border-r border-gray-700 p-4 bg-[#171717] transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0 opacity-100 "
            : "-translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 ">
          <h1 className="text-xl font-semibold text-gray-100">AI-HubX</h1>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-400 hover:bg-gray-800 rounded-md"
          >
            <PanelLeftClose className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <button onClick={createNewChat} className="w-full flex items-center justify-start px-4 py-2 mb-4 text-gray-100 rounded-md border border-gray-700 hover:bg-gray-800">
          <Plus className="h-5 w-5 mr-2" />
          New Chat
        </button>
        <div className="z-50 h-full overflow-y-auto">
          <div className="max-h-[80%] pb-12 overflow-y-auto">
            {!chates ? (
              <div className="text-gray-100">All Chats</div>
            ) : (
              chat?.map((chat, index) => (
                <div key={chat._id} className="h-auto">
                  <button
                    onClick={() => {
                      chatHandeler(chat.messageId, index);
                    }}
                    className="w-full flex h-auto items-center px-2 py-2 hover:bg-[#2f2f2f] rounded-[10px]"
                  >
                    <span className="text-[#eae7e7] text-[1em] font-medium font-sans truncate max-w-xs">
                      {chat.chats?.[0]?.chat.split(" ").slice(0, 6).join(" ") +
                        (chat.chats?.[0]?.chat.split(" ").length > 6
                          ? "..."
                          : "")}
                    </span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className=" absolute  bg-inherit bottom-0">
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
