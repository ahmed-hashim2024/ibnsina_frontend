import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import translations from "../translations";
import { FaBuilding, FaCogs, FaClock, FaMoneyBillWave } from "react-icons/fa";

const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  const features = [
    {
      icon: <FaBuilding className="w-8 h-8" />,
      title: t.whyFeature1Title,
      description: t.whyFeature1Desc,
    },
    {
      icon: <FaCogs className="w-8 h-8" />,
      title: t.whyFeature2Title,
      description: t.whyFeature2Desc,
    },
    {
      icon: <FaClock className="w-8 h-8" />,
      title: t.whyFeature3Title,
      description: t.whyFeature3Desc,
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8" />,
      title: t.whyFeature4Title,
      description: t.whyFeature4Desc,
    },
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          {/* Title */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t.whyChooseTitle}{" "}
              <span className="text-gray-400">{t.whyChooseTitleHighlight}</span>
            </h2>
          </div>

          {/* Description + Button */}
          <div className="lg:max-w-xl">
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">
              {t.whyChooseDescription}
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="inline-block bg-sky-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
