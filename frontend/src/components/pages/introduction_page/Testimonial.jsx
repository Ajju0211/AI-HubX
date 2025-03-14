import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    position: "CEO, TechCorp",
    message: "Inevo AI completely transformed how we integrate AI into our business. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    position: "AI Researcher",
    message: "This platform is a game-changer for AI development. The UX is seamless and powerful!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Johnson",
    position: "CTO, InnovateX",
    message: "An absolute must for tech professionals looking to leverage AI effortlessly!",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Emily Carter",
    position: "Software Engineer",
    message: "Best AI platform I've used. Intuitive, sleek, and incredibly fast!",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-black text-white py-20 m-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-4xl font-bold text-white"
        >
          What Our Users Say
        </motion.h2>
        <p className="text-gray-400 mt-3 text-lg">Real experiences from AI professionals</p>
      </div>

      {/* Grid Layout */}
      <div className="mt-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#121212] border border-gray-800 shadow-lg p-6 rounded-xl backdrop-blur-lg bg-opacity-60 hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-14 h-14 rounded-full border-2 border-gray-700"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300 italic">"{testimonial.message}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
