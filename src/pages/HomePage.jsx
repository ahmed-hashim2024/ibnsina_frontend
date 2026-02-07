import React from "react";
import Hero from "../components/Hero";
import SliderInfo from "../components/SliderInfo";
import FeaturesSection from "../components/FeaturesSection";
import MainAboutUs from "../components/MainAboutUs";
import AboutOurServices from "../components/AboutOurServices";

const HomePage = () => {
  return (
    <>
      <Hero />
      <MainAboutUs />
      <FeaturesSection />
      <SliderInfo />
      <AboutOurServices />
    </>
  );
};

export default HomePage;
