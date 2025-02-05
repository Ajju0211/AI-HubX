import { ArrowUp, GlobeIcon, Plus } from 'lucide-react'
import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../../context/context";
import { useAuthStore } from '../../store/authStore';
const Input = () => {
    const [message, setMessage] = useState("");
    const [inputMessage, setInputMessage] = useState("");
    const { onSent, setInput,setMessageId,messageId,resultData } = useContext(Context);
    const { setErrorMessage, user,getChat } = useAuthStore();

    const newFeatures = () => {
        setErrorMessage("feature is not available comming soon...");
    };

    useEffect(() => {
        getChat(user._id);
    },[resultData]);

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
        <div className='relative input flex md:w-[60%] flex-row justify-between h-[120px] w-[80%] sm:w-[90%] lg:w-[40%] rounded-[25px] mb-4 bg-[#2f2f2f]  shadow-md'>
            <div className='flex bg-transparent flex-col w-full overflow-hidden default-scrollbar items-center justify-between p-4'>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className=" w-full min-h-[40px] max-h-[150px] p-2 bg-transparent border-none text-[#d4d4d4]  bg-[#2f2f2f] resize-none focus:outline-none"
                    rows={Math.min(4, message.split("\n").length + 1)} // Adjust height
                />
                <div className='flex bg-transparent p-2 items-center bg- justify-between w-full '>
                    <div className='flex bg-transparent gap-2'>
                        <button onClick={newFeatures} className='text-gray-100 border-[1px] h-[40px] rounded-full border-[#3f3f3f] bg-transparent hover:bg-[#3f3f3f] hover:rounded-[100%] pr-2 pl-2'><Plus className='size-5' /></button>
                        <button onClick={newFeatures} className='text-gray-100 border-[1px]  rounded-[30px] border-[#3f3f3f] pr-3 pl-3   bg-transparent flex p-2 hover:bg-[#3f3f3f] hover:rounded-2xl items-center gap-2'><GlobeIcon className='size-5'  />
                            <span>Search</span></button>
                    </div>
                    <button onClick={()=> handler()} className='text-gray-100 border-[1px] rounded-full p-2 border-[#3f3f3f] '><ArrowUp /></button>
                </div>
            </div>
        </div>
    )
}

export default Input
