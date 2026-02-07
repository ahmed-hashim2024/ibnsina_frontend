import React from "react";
import AboutUsHero from "../components/AboutUsHero";
import AboutWhyChooseUs from "../components/AboutWhyChooseUs";
import AboutOurProjects from "../components/AboutOurProjects";
import AboutAsks from "../components/AboutAsks";
import AboutVision from "../components/AboutVision";
import AboutMission from "../components/AboutMission";

const AboutPage = () => {
  return (
    <div>
      <AboutUsHero />
      <AboutVision />
      <AboutMission />
      <AboutWhyChooseUs />
      <AboutAsks />
    </div>
  );
};

export default AboutPage;
