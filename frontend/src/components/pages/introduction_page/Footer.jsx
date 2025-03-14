import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-6 h-6" />, url: "https://facebook.com" },
    { name: "Twitter", icon: <Twitter className="w-6 h-6" />, url: "https://twitter.com" },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand & Description */}
          <div>
            <h2 className="text-2xl font-bold text-white">Inevo AI</h2>
            <p className="mt-2 text-sm text-gray-400">
              Unlocking AI-driven possibilities. Elevate your future with our advanced models.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/services" className="hover:text-white transition">Our Services</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="mt-2 text-sm text-gray-400">Subscribe for the latest AI trends.</p>
            
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400">&copy; 2025 Inevo AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
