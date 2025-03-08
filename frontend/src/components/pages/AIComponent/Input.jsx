import { ArrowUp, GlobeIcon, Plus } from "lucide-react";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../context/context";
import { useAuthStore } from "../../../store/authStore";
import "animate.css";
import {
  FileText,
  BarChart,
  Eye,
  Pencil,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

const buttons = [
  { label: "Analyze data", icon: BarChart, color: "text-blue-500" },
  { label: "Analyze images", icon: Eye, color: "text-indigo-500" },
  { label: "Summarize text", icon: FileText, color: "text-orange-500" },
 
  { label: "Help me write", icon: Pencil, color: "text-purple-500" },
  { label: "Get advice", icon: GraduationCap, color: "text-blue-600" },
  { label: "Brainstorm", icon: Lightbulb, color: "text-yellow-500" },
];

const Input = () => {
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const { onSent, setInput, setMessageId, messageId, resultData } =
    useContext(Context);
  const { setErrorMessage, user, getChat } = useAuthStore();

  const newFeatures = () => {
    setErrorMessage("feature is not available comming soon...");
  };

  useEffect(() => {
    getChat(user?._id);
  }, [resultData]);

  const handler = async () => {
    setInput(message);
    setInputMessage(message);
    await onSent(message);
    setMessage(" ");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handler(message);
    }
  };

  return (
    <div className="relative input flex flex-col  w-full max-w-4xl 2xl:max-w-[60vw]  justify-center h-[120px]  rounded-[25px] mb-4 bg-[#2f2f2f]  shadow-md">
      <div className="flex bg-transparent flex-col w-full overflow-hidden default-scrollbar items-center justify-between p-2 sm:p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className=" w-full min-h-[40px] sm:min-h-[50px] h-7 max-h-[150px] p-2 bg-transparent border-none text-[#d4d4d4]  bg-[#2f2f2f] resize-none focus:outline-none"
          rows={Math.min(4, message.split("\n").length + 1)} // Adjust height
        />
        <div className="flex bg-transparent p-1 sm:p-2 items-center bg- justify-between w-full ">
          <div className="flex bg-transparent gap-2">
            <button
              onClick={newFeatures}
              className="text-gray-100 border-[1px] h-[34px] sm:h-[40px]  rounded-full border-[#3f3f3f] bg-transparent hover:bg-[#3f3f3f] hover:rounded-[100%] pr-2 pl-2"
            >
              <Plus className="sm:size-5 size-3" />
            </button>
            <button
              onClick={newFeatures}
              className="text-gray-100 border-[1px] h-[34px] sm:h-[40px] rounded-[30px] border-[#3f3f3f] pr-3 pl-3   bg-transparent flex p-2 hover:bg-[#3f3f3f] hover:rounded-2xl items-center gap-2"
            >
              <GlobeIcon className="sm:size-5 size-3" />
              <span>Search</span>
            </button>
          </div>
          <button
            onClick={() => handler()}
            className="text-gray-100 border-[1px] rounded-full p-2 border-[#3f3f3f] "
          >
            <ArrowUp className="sm:size-5 size-3" />
          </button>
        </div>
      </div>
      <div className="">
        {!messageId && (
          <div className="flex absolute  flex-wrap  justify-center items-center gap-4 bg-transparent p-4 rounded-lg animate__animated animate__fadeIn animate__faster">
            {buttons.map((btn, index) => (
              <button
                onClick={() => setMessage(btn.label)}
                key={index}
                className="flex   items-center gap-2 px-4 py-2 text-[#c4c3c3] bg-[#2f2f2f] rounded-[30px] shadow-md hover:bg-[#3f3f3f] transition"
              >
                <btn.icon className={`w-2 h-2 sm:h-5 sm:w-3 ${btn.color}`} />
                <span className="sm:text-sm text-[0.8rem]">{btn.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
