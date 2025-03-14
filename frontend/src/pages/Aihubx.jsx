import React, { useEffect } from "react";
import HeroHeader from "../components/pages/introduction_page/HeroHeader";
import Main from "../components/pages/introduction_page/Main";
import SubscriptionPlans from "../components/pages/introduction_page/SubscriptionPlans";
import FAQ from "../components/pages/introduction_page/FAQ";
import Footer from "../components/pages/introduction_page/Footer";
import GetStarted from "../components/pages/introduction_page/GetStarted";
import { Outlet } from "react-router-dom";
import AIModels from "../components/pages/introduction_page/Models";
import VideoComponent from "../components/pages/introduction_page/VideoComponent";
import Testimonial from "../components/pages/introduction_page/Testimonial";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// 🎨 Background Animation (Floating Particles)
const BackgroundAnimation = () => {
  const particles = Array.from({ length: 20 }); // Generate 20 floating particles

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full bg-[#b9b4d9] opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "100%", "0%"],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// ✨ Animated Wrapper for Sections
const AnimatedSection = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const AihubX = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative flex flex-col gap-2 items-center justify-normal scroll-smooth min-h-screen bg-black">
      {/* Background Animation */}
      <BackgroundAnimation />
      <BackgroundAnimation />
      <BackgroundAnimation />
      


      {/* Hero Section */}
      <HeroHeader className="absolute top-0" />

      <div className="flex flex-col gap-10 w-[90%] md:w-[80%] xl:w-[60%] mt-12 items-center justify-normal md:mr-36 md:ml-36 scroll-smooth relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col mt-24 items-center justify-center gap-0"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm sm:text-base lg:text-lg font-medium text-[#b9b4d9] ring-1 ring-inset ring-[#333]">
            <Sparkles className="mr-2 h-4 w-4 text-gray-200" />
            Interact with top AI models in one platform
            <Sparkles className="ml-2 h-4 w-4 text-gray-300" />
          </div>
        </motion.div>

        {/* Sections with Scroll Animation */}
        <AnimatedSection>
          <Main />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <VideoComponent />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <AIModels />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <SubscriptionPlans />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Testimonial />
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <FAQ />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <GetStarted />
        </AnimatedSection>

        <hr className="h-[1px] w-full bg-gray-400 my-6" />

        <Footer />
        <Outlet />
      </div>
    </div>
  );
};

export default AihubX;
