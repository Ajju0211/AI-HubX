import parse from "html-react-parser";
import DOMPurify from "dompurify";

import { Check, Copy } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { motion } from "framer-motion";

import hljs from "highlight.js"; // Import highlight.js for language detection
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";
import { useContext } from "react";
import { Context } from "../../../context/context";

// Function to format text into HTML (handles Markdown-like syntax)
const formatResponse = (text) => {
  return text
    .replace(
      /## (.+?)\n/g,
      '<h1 class="text-2xl font-semibold text-[#e5e4e4] w-full mb">$1</h1>'
    )
    .replace(/\*\*(.+?)\*\*/g, '<p class="text-[#e5e4e4] font-bold">$1</p>')
    .replace(/^\* (.+)$/gm, '<li class="ml-6 list-disc text-[#cfcece]">$1</li>')
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$3" target="_blank" rel="noopener noreferrer" class="text-green-500 underline">$2</a>'
    )
    .replace(/\n/g, "<br />")
    .replace(/<\/li><br  \/>/g, "</li>")
    .replace(/```([\s\S]+?)```/g, "<pre ><code>$1</code></pre>")
    .replace(
      /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/gi,
      '<img src="$1" alt="Generated Image" class="w-96 rounded-lg mt-2" />'
    ); // Image support
};

// Code Block Component with Copy Button and Syntax Highlighting
const CodeBlocks = ({ children }) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(children);
  };
  // Ensure code content is passed as a string
  const codeContent = children && typeof children === "string" ? children : "";

  // Use highlight.js for auto language detection
  const detectedLanguage = hljs.highlightAuto(codeContent).language;

  return (
    <CodeBlock code={children} language={detectedLanguage} lines={["4:6"]}>
      <div className="relative flex flex-col h-full w-full z-[1] bg-black border-[1px] border-[#2b2b2b] rounded-xl overflow-hidden shadow-lg">
        {/* Filename */}
        <div className="text-sm text-gray-400 px-6 py-4 bg-[#2c2b2b]">
          {detectedLanguage}
        </div>

        <CodeBlock.Code className="flex flex-col overflow-auto sm:w-[40vw] max-h-[60vh] bg-[#000000] text-[#e5e4e4] p-4 rounded-md ">
          {({ isLineHighlighted }) => (
            <div
              className={`table-row ${
                isLineHighlighted ? "bg-emerald-400/25" : ""
              } w-full`}
            >
              {/* Plus Sign */}
              <div
                className={`table-cell px-4 text-emerald-400 select-none ${
                  isLineHighlighted ? "opacity-100" : "opacity-0"
                }`}
              >
                +
              </div>
              {/* Line Number */}
              <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
              {/* Code Content */}
              <CodeBlock.LineContent className="table-cell w-full pr-6 break-words whitespace-pre-wrap">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          )}
        </CodeBlock.Code>

        {/* Language being used */}
        <div className="text-sm text-gray-400 px-6 pb-4 text-right uppercase select-none">
          {detectedLanguage}
        </div>

        {/* Copy Button */}
        <button
          className="bg-[#212121]  px-3 py-1.5 text-sm text-[#e5e4e4] font-light bg-transparent absolute top-2 right-2 transition-all hover:bg-[#383737] hover:rounded-[10px] flex items-center justify-center gap-2"
          onClick={copyCode}
        >
          {state.value ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {state.value ? "Copied!" : "Copy"}
        </button>
      </div>
    </CodeBlock>
  );
};

// Chat Response Component
const ChatResponse = ({ response }) => {
  const { selectedModel } = useContext(Context);
  const sanitizedHTML = DOMPurify.sanitize(formatResponse(response));
  if (sanitizedHTML === "") {
    return (
      <div className="flex w-full flex-row gap-5 items-start justify-start p-4">
        <div className="flex  text-md animate-pulse justify-items-start w-72 ">
          <p className="mt-2 text-gray-500 w-96 text-sm sm:text-">
            {selectedModel} is thinking<span className=" text-md animate-pulse">......</span>
          </p>

          <div className="flex">
            <motion.span
            className="relative top-2 right-16"
              style={{ filter: "grayscale(100%)" }} // Makes the emoji gray
              animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            >
              🤔
            </motion.span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="chat-response flex flex-col bg-[#212121] text-white p-3 rounded-2xl w-full
        font-sans antialiased text-base leading-relaxed tracking-normal"
    >
      {parse(sanitizedHTML, {
        replace: (domNode) => {
          if (domNode.name === "pre" && domNode.children.length > 0) {
            const codeContent = domNode.children[0]; // Get the <code> element
            // Extract the text content from the <code> element
            const codeText = codeContent.children
              .map((child) => (child?.data !== undefined ? child.data : "")) // Ensure no undefined values
              .filter((line) => line.trim() !== "") // Remove empty lines
              .join("\n"); // Preserve formatting
            return <CodeBlocks>{codeText}</CodeBlocks>; // Render with CodeBlock component
          }
          return domNode; // Return other elements as they are
        },
      })}
    </div>
  );
};

export default ChatResponse;
