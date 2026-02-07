import React from "react";
import imageSection2 from "../assets/image/image_section2.png";
import { FaGem, FaMicrochip, FaTasks, FaRulerCombined } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";

import { motion } from "framer-motion";

const FeaturesSection = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* === Left Side: Sliced Images === */}
          {/* === Left Side: Image === */}
          <motion.div
            className="flex-1 z-20"
            animate={{ y: [0, -25, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={imageSection2}
              alt="Modern Home"
              className="w-full h-auto"
            />
          </motion.div>
          {/* === Right Side: Content === */}
          <div className="space-y-10">
            {/* Title & Description */}
            <div className={`text-start space-y-4`}>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                {t.featuresTitle} <br className="hidden md:block" />
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                {t.featuresDesc}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
              {/* Card 1: Premium Materials - Gem icon */}
              <FeatureCard
                icon={<FaGem />}
                title={t.feature1Title}
                desc={t.feature1Desc}
                variant="blue"
              />

              {/* Card 2: Smart Engineering - Microchip icon */}
              <FeatureCard
                icon={<FaMicrochip />}
                title={t.feature2Title}
                desc={t.feature2Desc}
                variant="white"
              />

              {/* Card 3: Integrated Management - Tasks icon */}
              <FeatureCard
                icon={<FaTasks />}
                title={t.feature3Title}
                desc={t.feature3Desc}
                variant="white"
              />

              {/* Card 4: Architectural Precision - Ruler icon */}
              <FeatureCard
                icon={<FaRulerCombined />}
                title={t.feature4Title}
                desc={t.feature4Desc}
                variant="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Feature Card
const FeatureCard = ({ icon, title, desc, variant }) => {
  const isBlue = variant === "blue";
  return (
    <div
      className={`flex flex-col items-start p-6 rounded-3xl transition-all duration-300 shadow-sm border ${
        isBlue
          ? "bg-sky-500 text-white border-sky-500"
          : "bg-white text-gray-900 border-gray-100 hover:shadow-md"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-4 ${
          isBlue
            ? "bg-white/20 text-white"
            : "bg-sky-50 text-sky-500 border border-sky-100"
        }`}
      >
        {icon}
      </div>
      <h3
        className={`text-lg font-bold mb-2 ${
          isBlue ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          isBlue ? "text-sky-50" : "text-gray-500"
        }`}
      >
        {desc}
      </p>
    </div>
  );
};

export default FeaturesSection;
