import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";
import hljs from "highlight.js";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";
import { useContext, useMemo } from "react";
import { Context } from "../../../context/context";

// Enhanced formatting function with responsive text sizes
const formatResponse = (text) => {
  if (!text) return "";
  
  try {
    // Process code blocks first to prevent interference with other markdown
    let formattedText = text
      // Handle code blocks with optional language
      .replace(/```(\w*)\n?([\s\S]+?)```/g, '<pre data-language="$1"><code>$2</code></pre>')
      .replace(
        /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/gi,
        '<img src="$1" alt="Generated Image" class="w-full max-w-md rounded-lg mt-2" />'
      )
      // Headers with responsive sizing
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl md:text-3xl font-bold text-white mt-6 mb-4">$1</h1>')
      // .replace(/#(.*$)/g, '<h1 class="text-2xl md:text-3xl font-bold text-white mt-6 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl md:text-2xl font-bold text-white mt-5 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg md:text-xl font-semibold text-white mt-4 mb-2">$1</h3>')
      
      // Bold and italic with base responsive size
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white text-base md:text-[0.9375em] lg:text-[1em]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-white text-base md:text-[0.9375em] lg:text-[1em]">$1</em>')
      .replace(/_(.*?)_/g, '<em class="italic text-white text-base md:text-[0.9375em] lg:text-[1em]">$1</em>')
      
      // Links with base responsive size
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-base md:text-[0.9375em] lg:text-[1em]">$1</a>')
      
      // Images with responsive sizing
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4 border border-gray-600" />')
      
      // Lists with base responsive size
      .replace(/^\s*\*\s(.*$)/gm, '<li class="text-white text-base md:text-[0.9375em] lg:text-[1em] ml-4 list-disc">$1</li>')
      .replace(/^\s*-\s(.*$)/gm, '<li class="text-white text-base md:text-[0.9375em] lg:text-[1em] ml-4 list-disc">$1</li>')
      .replace(/^\s*\d+\.\s(.*$)/gm, '<li class="text-white text-base md:text-[0.9375em] lg:text-[1em] ml-4 list-decimal">$1</li>')
      
      // Blockquotes with base responsive size
      .replace(/^>\s(.*$)/gm, '<blockquote class="border-l-4 border-gray-500 pl-4 my-2 text-gray-200 text-base md:text-[0.9375em] lg:text-[0.9em]">$1</blockquote>')
      
      // Horizontal rule
      .replace(/^\-\-\-$/gm, '<hr class="border-t border-gray-600 my-4" />')
      
      // Inline code with responsive sizing
      .replace(/`([^`]+)`/g, '<code class="bg-gray-700 text-gray-100 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono">$1</code>')
      
      // Paragraphs and line breaks with base responsive size
      .replace(/\n\n/g, '</p><p class="my-3 text-white text-base text-ellipsis md:text-[0.8375em] lg:text-[0.9em]">')
      .replace(/\n/g, '<br/>');

    // Wrap loose list items in proper list tags
    formattedText = formattedText.replace(
      /(<li.*?>.*?<\/li>)+/g, 
      (match) => {
        if (match.match(/list-decimal/)) {
          return `<ol class="my-3 pl-6 space-y-1">${match}</ol>`;
        }
        return `<ul class="my-3 pl-6 space-y-1">${match}</ul>`;
      }
    );

    // Ensure paragraphs are properly wrapped with base responsive size
    if (!formattedText.startsWith('<p') && !formattedText.startsWith('<h') && 
        !formattedText.startsWith('<ul') && !formattedText.startsWith('<ol') && 
        !formattedText.startsWith('<pre')) {
      formattedText = `<p class="my-3 text-gray-100 text-base md:text-[0.8375em] lg:text-[1\0.9em]">${formattedText}</p>`;
    }

    return formattedText;
  } catch (error) {
    console.error("Error formatting response:", error);
    return `<p class="text-gray-300  md:text-[0.8375em] lg:text-[0.9em]">${text}</p>`;
  }
};

// Enhanced Code Block Component with responsive text
const CodeBlocks = ({ children, language }) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  // Memoize the code content to prevent unnecessary re-renders
  const { codeContent, detectedLanguage } = useMemo(() => {
    try {
      const content = typeof children === "string" ? children.trim() : String(children).trim();
      const lang = language || hljs.highlightAuto(content).language || 'plaintext';
      return { codeContent: content, detectedLanguage: lang };
    } catch (error) {
      console.error("Error processing code block:", error);
      return { codeContent: String(children), detectedLanguage: 'plaintext' };
    }
  }, [children, language]);

  const copyCode = () => {
    copyToClipboard(codeContent);
  };

  try {
    return (
      <CodeBlock className='w-full' style={{ zIndex: -9 }}  code={codeContent} language={detectedLanguage} lines={["4:6"]}>
        <div className="relative overflow-auto rounded-lg bg-[#1e1e1e] border border-gray-700 shadow-lg">
          {/* Header with language indicator */}
          <div className="flex relative justify-between items-center px-4 py-2 bg-[#252526] border-b border-gray-700">
            <span className="text-xs sm:text-sm font-mono text-gray-400">
              {detectedLanguage}
            </span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
              aria-label="Copy code"
            >
              {state.value ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code content with responsive text */}
          <div className=" relative overflow-auto max-h-[40vh]">
            <CodeBlock.Code className=" relative overflow-auto mt-2 mb-2 md:max-w-[58vw] lg:max-w-[65vw]  w-full">
              {({ isLineHighlighted, lineNumber }) => (
                <div
                  className={`flex items-start px-4 relative font-mono text-xs w-full sm:text-sm ${isLineHighlighted ? 'bg-blue-900/20' : ''}`}
                  data-line-number={lineNumber}
                >
                  <CodeBlock.LineNumber className="select-none text-gray-500 w-8 text-right pr-3" />
                  <CodeBlock.LineContent className="flex-1">
                    <CodeBlock.Token />
                  </CodeBlock.LineContent>
                </div>
              )}
            </CodeBlock.Code>
          </div>
        </div>
      </CodeBlock>
    );
  } catch (error) {
    console.error("Error rendering code block:", error);
    // Fallback rendering if react-code-block fails
    return (
      <div className="relative my-4 w-full rounded-lg overflow-hidden bg-[#1e1e1e] border border-gray-700 shadow-lg">
        <div className="flex justify-between w-full items-center px-4 py-2 bg-[#252526] border-b border-gray-700">
          <span className="text-xs sm:text-sm font-mono text-gray-400">
            {detectedLanguage}
          </span>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-3 py-1 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
        </div>
        <pre className="overflow-auto max-h-[60vh] p-4 text-xs sm:text-sm font-mono whitespace-pre-wrap">
          <code>{codeContent}</code>
        </pre>
      </div>
    );
  }
};

// Chat Response Component with responsive text
const ChatResponse = ({ response }) => {
  const { selectedModel } = useContext(Context);
  
  // Memoize the formatted response to prevent unnecessary re-renders
  const sanitizedHTML = useMemo(() => {
    try {
      return DOMPurify.sanitize(formatResponse(response));
    } catch (error) {
      console.error("Error sanitizing response:", error);
      return DOMPurify.sanitize(`<p class="text-gray-300 text-base md:text-[0.9375em] lg:text-[1em]">${response}</p>`);
    }
  }, [response]);

  if (!response || response.trim() === "") {
    return (
      <div className="w-full p-4 rounded-lg">
        <div className="flex items-center gap-3 text-gray-400">
          <motion.div
          
            animate={{ 
              rotate: [0, 10, -10, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="text-2xl z-10"
          >
            🤔
          </motion.div>
          <div className="text-sm">
            <p className="font-medium text-base md:text-[0.9375em] lg:text-[1em]">{selectedModel} is thinking</p>
            <p className="text-xs opacity-80">Generating response...</p>
          </div>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="chat-response w-full text-ellipsis  leading-relaxed font-[Arial] items-start rounded-lg  p-4 text-gray-100 overflow-hidden">
        {parse(sanitizedHTML, {
          replace: (domNode) => {
            try {
              if (domNode.name === "pre" && domNode.children.length > 0) {
                const codeContent = domNode.children[0];
                const language = domNode.attribs?.['data-language'] || '';
                
                // Filter out empty lines and join with newlines
                const codeText = codeContent.children
                  .map(child => child?.data || '')
                  .filter(line => line.trim() !== '') // Remove empty lines
                  .join('\n');
                
                return <CodeBlocks language={language}>{codeText}</CodeBlocks>;
              }
              return domNode;
            } catch (error) {
              console.error("Error processing DOM node:", error);
              return null;
            }
          },
        })}
      </div>
    );
  } catch (error) {
    console.error("Error rendering chat response:", error);
    return (
      <div className="w-full p-4 rounded-lg border border-red-900/50">
        <p className="text-red-400 text-base md:text-[0.9375em] lg:text-[1em]">Error displaying response</p>
        <pre className="text-xs sm:text-sm text-gray-400 overflow-auto max-h-40">
          {String(response).slice(0, 1000)}
        </pre>
      </div>
    );
  }
};

export default ChatResponse;