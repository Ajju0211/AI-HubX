import { createContext, useState } from "react";
import run from "../config/modelResponse.js";
import { useAuthStore } from "../store/authStore.js";
import { v4 as uuid } from "uuid";

export const Context = createContext();

const ContextProvider = (props) => {
    const { chatResponse, user, getChat } = useAuthStore();
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [oldChat, setOldChat] = useState("");
    const [messageId, setMessageId] = useState("");
    const [oldPrompt, setOldPrompt] = useState("")
    const [messageList, setMessageList] = useState([]);
    const [resLoader, setResLoader] = useState(false);
    const [selectedModel, setSelectedModel] = useState('Gemini');

    const formatResponse = (text) => {
        return text
            .replace(/## (.+?)\n/g, '<h1 class="text-2xl text-[#e5e4e4] w-full font-bold mb-2">$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong className="w-full text-[#e5e4e4]">$1</strong>')
            .replace(/^\* (.+)$/gm, '<li className="w-full text-[#cfcece]">$1</li>')
            .replace(
                /```([\s\S]+?)```/g,
                '<pre class="bg-gray-900 text-green-400 p-4 w-[50%] rounded-md overflow-x-auto"><code class="font-mono w-[50vh]">$1</code></pre>'
            )
            .replace(
                /(\[(.*?)\]\((.*?)\))/g,
                '<a href="$3" target="_blank" rel="noopener noreferrer" class="text-green-500 w-full underline">$2</a>'
            )
            .replace(/\n/g, '<br />')
            .replace(/<\/li><br \/>/g, '</li>');
    };

    const onSent = async (prompt) => {

        setLoading(true);
        setShowResult(true);
        setRecentPrompt(prompt);
        const chat = {
            chat: prompt,
            response: '',
        }
        setMessageList((prevItems) => [...prevItems, chat]);
        try {
            const responses = await run(prompt,selectedModel);
            setResultData(responses);
            console.log("messageId", messageId);
            const id = uuid();
            if (!messageId) {
                chatResponse(user._id, id, prompt, responses);
                setMessageId(id);
                getChat(user._id);
                setMessageList((prevItems) => prevItems.map((item, index) =>
                    index === prevItems.length - 1 ? { ...item, response: responses } : item
                ));
                return
            }
            chatResponse(user._id, messageId, prompt, responses);

            getChat(user._id);
            const res = await formatResponse(responses);
            setMessageList((prevItems) => prevItems.map((item, index) =>
                index === prevItems.length - 1 ? { ...item, response: res } : item
            ));
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const setResult = () => {
        setShowResult(true);
    }

    const contextValue = {
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setResult,
        formatResponse,
        oldChat,
        setOldChat,
        oldPrompt,
        setOldPrompt,
        messageId,
        setMessageId,
        messageList,
        setMessageList,
        resLoader,
        setResLoader,
        selectedModel,
        setSelectedModel

    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
