import React, { useEffect } from "react";
import HeroHeader from "../components/pages/introduction_page/HeroHeader";
import Main from "../components/pages/introduction_page/Main";
import SubscriptionPlans from "../components/pages/introduction_page/SubscriptionPlans";
import FAQ from "../components/pages/introduction_page/FAQ";
import Footer from "../components/pages/introduction_page/Footer";
import GetStarted from "../components/pages/introduction_page/GetStarted";
import { Outlet } from "react-router-dom";

import {
  Sparkles,
} from "lucide-react";
const AihubX = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-normal md:mr-36 md:ml-36 scroll-smooth">
      <HeroHeader className = "absolute top-0" />
      <div className="flex flex-col gap-2 w-[80%] mt-12 items-center justify-normal md:mr-36 md:ml-36 scroll-smooth">
      {/* Hero Section */}
      <div className="flex flex-col mt-24 items-center justify-center gap-0">
        <div className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm sm:text-base lg:text-lg font-medium text-[#b9b4d9] ring-1 ring-inset ring-[#333]">
          <Sparkles className="mr-2 h-4 w-4 text-gray-200" />
          Interact with top AI models in one platform
          <Sparkles className="ml-2 h-4 w-4 text-gray-300" />
        </div>
        {/* Main Section */}
        <Main />\
      </div>

      {/* Subscription Plans Section */}
      <SubscriptionPlans />

      {/* FAQ Section */}
      <FAQ />

      {/* Get Started Section */}
      <GetStarted />

      <hr className="h-[1px] w-full bg-gray-400 my-6" />

      {/* Footer Section */}
      <Footer />
      <Outlet />
      </div>
    </div>
  );
};

export default AihubX;
