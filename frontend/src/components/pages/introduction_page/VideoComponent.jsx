import React, { useEffect, useState } from "react";
import { Lock, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const VideoComponent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // Delayed fade-in for smoother effect
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-center h-full w-full p-2"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col bg-[#3c3c3c] bg-opacity-100 border-[#828282] rounded-[10px] mb-20 h-full w-full shadow-lg"
      >
        {/* Fake Browser Header */}
        <div className="bg-[rgb(40,39,39)] h-10 rounded-tl-[10px] flex items-center justify-between pl-5 rounded-tr-[10px] w-full">
          {/* Browser Buttons */}
          <div className="flex relative items-start justify-start gap-2">
            {["#ff0000", "#ffcc00", "#00ff00"].map((color, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="h-3 w-3 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Fake URL Bar */}
          <div className="flex flex-row bg-[#3c3c3c] bg-opacity-100 items-center justify-center border-[#828282] shadow-black rounded-[8px] md:h-[70%] sm:w-[30%] md:w-[38%] lg:w-[30%] xl:w-[25%] h-[70%] w-[60%]">
            <div className="inset-y-0 flex-row justify-evenly h-full w-full left-0 pl-3 flex items-center pointer-events-none">
              <div className="flex flex-row items-center justify-start gap-3">
                <Lock className="size-4 text-[#828282] hover:text-gray-300 transition-colors duration-300" />
                <p className="text-gray-300 text-sm sm:text-sm md:text-sm font-medium text-[10px] text-center">
                  www.aihubx.com
                </p>
              </div>

              {/* Refresh Button with Rotation */}
              <motion.button
                whileTap={{ rotate: 360 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                aria-label="Reload"
                className="relative justify-items-end inline-flex items-center w-10 h-10 rounded-full text-[#828282] shadow-md hover:scale-105 transform transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <RefreshCcw className="w-5 h-4 md:w-6 md:h-5" />
              </motion.button>
            </div>
          </div>
          <div></div>
        </div>

        {/* Video */}
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src="/video.mp4"
          muted
          playsInline
          autoPlay
          loop
          className="rounded-md object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default VideoComponent;
