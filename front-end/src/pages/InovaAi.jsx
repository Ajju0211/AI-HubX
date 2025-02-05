import React, { useEffect } from "react";
import HeroHeader from "../components/InevoComponent/HeroHeader";
import Main from "../components/InevoComponent/Main";
import SubscriptionPlans from "../components/InevoComponent/SubscriptionPlans";
import FAQ from "../components/InevoComponent/FAQ";
import Footer from "../components/InevoComponent/Footer";
import GetStarted from "../components/InevoComponent/GetStarted";
import { Outlet } from "react-router-dom";


const InovaAi = () => {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);



  return (
    <div className="flex flex-col gap-2 items-center justify-normal md:mr-36 md:ml-36 scroll-smooth">
      {/* Hero Section */}
      <HeroHeader />

      {/* Main Section */}
      <Main />

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
  );
};

export default InovaAi;
