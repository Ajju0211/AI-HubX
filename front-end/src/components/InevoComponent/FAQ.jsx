import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What models do you provide?",
      answer: "We offer access to a comprehensive range of AI models including language models (GPT series, Claude, LLaMA), image generation models (DALL-E, Stable Diffusion, Midjourney), speech recognition models (Whisper), and specialized models for code generation (CodeLlama) and scientific research. All models are regularly updated to their latest versions."
    },
    {
      question: "Are there any limits?",
      answer: "Free tier users have access to basic features with monthly usage caps. Premium subscribers get higher usage limits, priority access to new models, and advanced features. Enterprise clients receive custom limits based on their needs. All plans are subject to fair use policies to ensure platform stability."
    },
    {
      question: "Is the platform really free?",
      answer: "We offer a free tier that gives you access to basic features and popular models with reasonable usage limits. Premium features, higher usage limits, and enterprise solutions are available through paid subscriptions. Our pricing is transparent with no hidden fees."
    },
    {
      question: "Can I use these AI models for commercial purposes?",
      answer: "Yes, commercial use is permitted on paid plans. Each model has specific licensing terms which are clearly displayed. Enterprise users get additional rights and dedicated support for commercial applications. We recommend reviewing the specific terms for your intended use case."
    },
    {
      question: "Do I need an account to use the platform?",
      answer: "Yes, a free account is required to access the platform. This helps us maintain security, track usage, and provide personalized experiences. Registration takes less than a minute and only requires basic information."
    },
    {
      question: "How do you ensure responsible AI usage?",
      answer: "We implement strict content filters, usage monitoring, and ethical guidelines. All models are tested for bias and safety. Users must agree to our responsible AI usage policy, and we provide transparent documentation about model capabilities and limitations."
    },
    {
      question: "What kind of support do you offer?",
      answer: "Free users have access to community forums and documentation. Premium users get email support with 24-hour response time. Enterprise clients receive dedicated support managers and priority assistance. We also provide extensive tutorials and API documentation."
    },
    {
      question: "Can I integrate these models with my existing applications?",
      answer: "Yes, we provide comprehensive REST APIs and SDKs for popular programming languages. Our documentation includes integration guides, code samples, and best practices. Custom integration support is available for enterprise clients."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full  relative max-w-3xl mt-0 mx-auto p-6 bg-black min-h-full">
      <h1 className="text-4xl font-bold mb-12 text-center  bg-gradient-to-r from-gray-200 to-slate-500 bg-clip-text text-transparent">
        Frequently asked questions
      </h1>
      <div className="space-y-4 h-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden bg-black hover:border-gray-700 transition-colors duration-300"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#151515] transition-all duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-gray-100 font-medium">{faq.question}</span>
              <div className="transform transition-transform duration-300">
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                )}
              </div>
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index 
                  ? 'grid-rows-[1fr] opacity-100' 
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 py-4 text-gray-300 bg-black">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;