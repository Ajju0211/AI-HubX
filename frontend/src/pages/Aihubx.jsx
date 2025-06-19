import React, { useEffect } from "react";
import HeroHeader from "../components/pages/introduction_page/HeroHeader";


import FAQ from "../components/pages/introduction_page/FAQ";
import Footer from "../components/pages/introduction_page/Footer";
import GetStarted from "../components/pages/introduction_page/GetStarted";
import { Outlet } from "react-router-dom";
import AIModels from "../components/pages/introduction_page/Models";

import Testimonial from "../components/pages/introduction_page/Testimonial";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HeroSectionOne } from "../components/pages/introduction_page/HeroSectionOne";
import { FeatureSection } from "../components/pages/introduction_page/FeaturesSection";

// ✨ Animated Wrapper for Sections
const AnimatedSection = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
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
    <div className="relative w-full flex flex-col gap-2 items-center justify-normal scroll-smooth min-h-screen bg-black">
      {/* Background Animation */}

      {/* Hero Section */}

      <div className="flex relative flex-col gap-10 max-w-7xl items-center justify-normal  scroll-smooth  z-10">
        <HeroHeader />

        {/* Sections with Scroll Animation */}
        <AnimatedSection>
          <HeroSectionOne />

        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <AIModels />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <FeatureSection />
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
