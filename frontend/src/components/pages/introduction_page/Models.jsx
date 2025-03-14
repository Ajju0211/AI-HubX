import React from "react";
import { FaBrain, FaRobot, FaCode, FaImage, FaMicrochip } from "react-icons/fa";
import { MdMemory } from "react-icons/md";
import { motion } from "framer-motion";

const models = [
  { id: "Gemini", description: "Google's powerful AI model for reasoning and creativity.", icon: <FaBrain className="text-gray-100 hover:text-blue-500" size={50} /> },
  { id: "EdenAi", description: "A multi-functional AI API platform for developers.", icon: <FaRobot className="hover:text-green-500 text-gray-100" size={50} /> },
  { id: "Qwen: QwQ 32B", description: "High-performance language model for advanced tasks.", icon: <FaMicrochip className="hover:text-purple-500 text-gray-100" size={50} /> },
  { id: "Llama 30B", description: "Meta's large-scale AI model for diverse applications.", icon: <MdMemory className="hover:text-orange-500 text-gray-100" size={50} /> },
  { id: "Deepseek r1", description: "Efficient AI model specialized in deep analysis.", icon: <FaMicrochip className="hover:text-red-500 text-gray-100" size={50} /> },
  { id: "Flux 1.1 (Image)", description: "Image generation AI with advanced creative capabilities.", icon: <FaImage className="hover:text-pink-500 text-gray-100" size={50} /> },
];

const AIModels = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-full m-6 bg-transparent flex items-center justify-center p-8"
    >
      <div className="max-w-5xl place-items-center w-full">
        <h2 className="text-2xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-wide  bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Ai Models
        </h2>
        <p className="text-gray-300 text-lg text-center max-w-2xl mb-12">
        Experience the next generation of AI models designed for creativity, automation, and intelligence.
      </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {models.map((model, index) => (
            <div
              key={model.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-transparent p-8 rounded-3xl flex flex-col items-center justify-center shadow-2xl transition transform hover:shadow-xl border border-gray-700 hover:border-white hover:bg-gray-700"
            >
              
                {model.icon}
              <motion.p 
                className="text-white mt-4 font-semibold text-center text-lg"
                whileHover={{ scale: 1.05, color: "#ffffff" }}
              >
                {model.id}
              </motion.p>
              <p className="text-gray-400 text-sm text-center mt-2">{model.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AIModels;
