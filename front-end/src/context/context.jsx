import { createContext, useState } from "react";
import run from "../config/gemini.js";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevprompts] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // Function to format response text
    const formatResponse = (text) => {
        return text;
    };
    

    // Function to add typing effect
    const delayPara = (index, nextChunk) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextChunk);
        }, 75 * index);
    };
    
    const displayTextWithDelay = (formattedText) => {
        const words = formattedText.match(/<.*?>|[\w\W]+?(?=<|$)/g); // Match tags and text separately
        setResultData(""); // Clear previous result data
        words.forEach((word, index) => {
            delayPara(index, word); // Preserve spaces and formatting
        });
    };
    
    const onSent = async (prompt) => {
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);

        try {
            const responses = await run(input);
            const formattedResponse = formatResponse(responses);
            displayTextWithDelay(formattedResponse);
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompt,
        setPrevprompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
