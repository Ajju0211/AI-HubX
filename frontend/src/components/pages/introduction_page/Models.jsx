
import { Brain, Bot, Cpu, Image, Zap, Layers, Sparkles, MessageSquare } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/utils";
import { Spotlight } from "../../layout/Spotlight";


const models = [
  { 
    id: "Gemini", 
    icon: Sparkles
  },
  { 
    id: "ChatGPT", 
    icon: MessageSquare
  },
  { 
    id: "Claude", 
    icon: Brain
  },
  { 
    id: "Llama", 
    icon: Layers
  },
  { 
    id: "Midjourney", 
    icon: Image
  },
  { 
    id: "Qwen", 
    icon: Cpu
  },
  { 
    id: "Deepseek", 
    icon: Zap
  },
  { 
    id: "Flux", 
    icon: Bot
  }
];

const AIModels = () => {
  return (
    <div className="w-full py-6 px-4 ">
      <div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
 
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          ALL THE MODELS <br/> YOU WILL EVER NEED
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Leveraging cutting-edge artificial intelligence from industry leaders to deliver exceptional performance, creativity, and intelligent automation across all your projects.
          copy.
        </p>
      </div>
    </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {models.map((model) => {
            const IconComponent = model.icon;
            return (
              <div
                key={model.id}
                className="group flex items-center space-x-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                <IconComponent 
                  size={28} 
                  className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300"
                />
                <span className="text-white text-sm font-medium whitespace-nowrap group-hover:text-gray-200 transition-colors duration-300">
                  {model.id}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIModels;