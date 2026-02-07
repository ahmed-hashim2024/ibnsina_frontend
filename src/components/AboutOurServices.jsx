import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import translations from "../translations";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

// Images
import AboutservicesImage1 from "../assets/image/AboutProjectImage 1.png";
import AboutservicesImage2 from "../assets/image/AboutProjectImage 2.jpg";
import AboutservicesImage3 from "../assets/image/AboutProjectImage 3.jpg";

const AboutOurServices = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  const services = [
    {
      id: 1,
      image: AboutservicesImage1,
      title: t.project1Title,
      description: t.project1Desc,
      category: "residential",
      location: lang === "ar" ? "القاهرة الجديدة" : "New Cairo",
      area: "50,000 m²",
      year: "2024",
    },
    {
      id: 2,
      image: AboutservicesImage2,
      title: t.project2Title,
      description: t.project2Desc,
      category: "infrastructure",
      location: lang === "ar" ? "طريق الإسكندرية" : "Alex Desert Rd",
      area: "120 km",
      year: "2022",
    },
    {
      id: 3,
      image: AboutservicesImage3,
      title: t.project3Title,
      description: t.project3Desc,
      category: "commercial",
      location: lang === "ar" ? "العاصمة الإدارية" : "New Capital",
      area: "35,000 m²",
      year: "2025",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-end">
          {/* Left: Title */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              {t.projectsTitle1} <br />
              <span className="text-gray-400">{t.projectsTitle2}</span>
            </h2>
            <div className="h-1.5 w-24 bg-sky-500 rounded-full mt-6"></div>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {t.projectsDescription}
            </p>
          </div>
        </div>

        {/* servicess Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutOurServices;
