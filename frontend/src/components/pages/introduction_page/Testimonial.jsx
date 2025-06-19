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
    <section className="bg-black text-white py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold"
        >
          What Our Users Say
        </motion.h2>
        <p className="text-gray-400 mt-3 text-base md:text-lg">
          Real experiences from AI professionals
        </p>
      </div>

      {/* Testimonial Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#121212] border-2 border-dashed border-gray-700 p-6 rounded-2xl backdrop-blur-md bg-opacity-60 hover:scale-[1.03] transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center space-x-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full border border-gray-600"
              />
              <div>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300 italic leading-relaxed">
              "{testimonial.message}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
