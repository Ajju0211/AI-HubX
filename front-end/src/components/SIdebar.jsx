import React from 'react';
import { 
  Plus,
  MessageSquare,
  Settings,
  HelpCircle,
  Menu
} from "lucide-react";
import { useAuthStore } from '../store/authStore';
import { useContext } from 'react';
import { Context } from "../context/context";




const SIdebar = () => {
   const { setShowResult} = useContext(Context);
  const { chates } = useAuthStore();

  const chatHandeler = () => {
    setShowResult(true);
    
  }

  return (
    <div className="flex absolute sm:relative  h-screen w-64 flex-col justify-between border-r border-gray-700 bg-gray-900 p-4">
      {/* Top section */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-100">Gemini AI</h1>
          <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-md">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <button className="w-full flex items-center justify-start px-4 py-2 mb-4 text-gray-100 rounded-md border border-gray-700 hover:bg-gray-800">
          <Plus className="h-5 w-5 mr-2" />
          New Chat
        </button>
        {!chates? (<div></div>):(
          chates.data.map((chat) => (
            <div key={chat._id} className="space-y-2">
          <button onClick={chatHandeler} className="w-full flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 rounded-md">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span className='text-gray-100' >
            {chat.chat}</span>
          </button>
        </div>
          ))
          
        )}
        {/* Chat History */}
        
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
  );
};

export default SIdebar;