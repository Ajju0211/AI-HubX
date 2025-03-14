import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Code,
  ArrowRight,
  Sparkles,
  Command,
  Globe,
  Shield,
} from 'lucide-react';

const Main = () => {

  const Navigate = useNavigate();

  // Animated typewriter text for the hero section
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Experience the Future of AI Interaction';

  // State for tracking when elements should fade in
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Implements a typewriter effect by incrementally revealing the text.
   */

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [fullText]);

  /**
   * Uses the Intersection Observer API to trigger fade-in animations
   * when elements with the 'fade-in-section' class enter the viewport.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Data for feature cards
  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Universal Access',
      description:
        'Connect with multiple AI models through a single, elegant interface',
    },
    {
      icon: <Command className="h-6 w-6" />,
      title: 'Smart Integration',
      description:
        'Seamlessly switch between different AI assistants based on your needs',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description:
        'Bank-grade encryption and privacy protection for all conversations',
    },
    {
      icon: <Code className="w-6 h-6 text-black" />,
      title: "User Friendly",
      description: "User friendly design , simple and clean.",
      
    }
  ];

  const handleLogin = () => {
    Navigate('/login');
  }

  const handleSignUp = () => {
    Navigate('/signup');
  }

  return (
    <div className="min-h-scree xl:ml-40 xl:mr-40 bg-gradient-to-b from-[#000] to-[#000]">


      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-14">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 animate-gradient-x" />
          </div>

          {/* Hero Content */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-[#d6d5d5] sm:text-7xl mb-6">
              {displayText}
              <span className="inline-block animate-blink">|</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Unlock the power of multiple AI assistants in one unified platform.
              Enterprise-grade capabilities with consumer-level simplicity.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button onClick={handleSignUp} className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-white transition-all hover:bg-gray-800">
                <span  className="relative ">Get Started</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
              </button>
              <button className="text-sm font-semibold leading-6 text-white hover:text-gray-700">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

     
      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6  p-8 rounded-[10px]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 ">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`fade-in-section rounded-2xl bg-[#171717] p-8 shadow-sm transition-all duration-500 hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-5 inline-flex rounded-lg bg-white p-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-4 text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

       {/* Models  */}
      
    </div>
  );
};

export default Main;
