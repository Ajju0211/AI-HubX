import { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [oldChat, setOldChat] = useState("");
    const [oldPrompt, setOldPrompt] = useState("");
    
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

    const onSent = async (prompt) => {
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);

        try {
            const responses = await run(input);
            setResultData(responses);
            
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
        setOldPrompt

    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
