import React from 'react';
import { ChatgptLogo, CloudLogo, GeminiLogo, MidjounrLogo } from '../../../assets/logos';
import { motion } from 'framer-motion';

const clients = [
  { id: 'Gpt-3', logo: ChatgptLogo },
  { id: 'Gemini', logo: GeminiLogo },
  { id: 'Cloud', logo: CloudLogo },
];

const ModelsDisplay = () => {
  return (
    <div className="relative w-full py-10 bg-black flex items-center justify-center scrollbar-hide overflow-hidden">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      
      {/* Scrollable Models List */}
      <div className="flex space-x-6 md:space-x-10 overflow-x-auto scrollbar-hide px-4 sm:px-10 justify-center">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            className="flex items-center space-x-3 min-w-max"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={client.logo} alt={client.id} className="h-12 sm:h-14 w-12 sm:w-14 object-contain grayscale hover:grayscale-0 transition duration-300" />
            <span className="text-white text-lg sm:text-xl font-medium opacity-80 hover:opacity-100 transition duration-300">{client.id}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default ModelsDisplay;
