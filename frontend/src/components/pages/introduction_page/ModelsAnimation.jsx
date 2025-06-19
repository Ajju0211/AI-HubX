import React, { useState, useEffect } from "react";

const aiModels = [
  { name: "Flux 1.1 Pro" },
  { name: "GPT-4 Turbo" },
  { name: "Claude 3.5 Sonnet" },
  { name: "Gemini Ultra" },
  { name: "Llama 3.1" },
  { name: "Mistral Large" },
  { name: "Qwen 2.5" }
];

const ModelsAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      // Wait for blur-out before changing text
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % aiModels.length);
        setIsAnimating(false);
      }, 500); // Match with CSS duration
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentModel = aiModels[currentIndex];

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className={`text-6xl font-semibold text-white transition-all duration-500 ease-in-out ${
          isAnimating
            ? "opacity-0 blur-sm scale-95"
            : "opacity-100 blur-0 scale-100"
        }`}
      >
        {currentModel.name}
      </div>
    </div>
  );
};

export default ModelsAnimation;
