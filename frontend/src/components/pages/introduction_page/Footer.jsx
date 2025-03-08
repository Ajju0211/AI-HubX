import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, url: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="w-6 h-6" />, url: "https://twitter.com" },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-black text-[#b7b7b7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row justify-between">
          <p className="text-sm text-center md:text-left">&copy; 2025 Inevo AI. All rights reserved.</p>
          <ul className="flex space-x-6 mt-4 md:mt-0">
            <li>
              <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-[#b7b7b7]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-sm text-gray-400 hover:text-[#b7b7b7]">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        <div className="flex justify-center space-x-6 mt-6">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
