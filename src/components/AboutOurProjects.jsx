import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import translations from "../translations";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

// Images
import AboutProjectImage1 from "../assets/image/AboutProjectImage 1.png";
import AboutProjectImage2 from "../assets/image/AboutProjectImage 2.jpg";
import AboutProjectImage3 from "../assets/image/AboutProjectImage 3.jpg";

const AboutOurProjects = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  const projects = [
    {
      id: 1,
      image: AboutProjectImage1,
      title: t.project1Title,
      description: t.project1Desc,
      category: "residential",
      location: lang === "ar" ? "القاهرة الجديدة" : "New Cairo",
      area: "50,000 m²",
      year: "2024",
    },
    {
      id: 2,
      image: AboutProjectImage2,
      title: t.project2Title,
      description: t.project2Desc,
      category: "infrastructure",
      location: lang === "ar" ? "طريق الإسكندرية" : "Alex Desert Rd",
      area: "120 km",
      year: "2022",
    },
    {
      id: 3,
      image: AboutProjectImage3,
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom See More Button */}
        <div className="text-center">
          <Link
            to="/projects"
            className="inline-block bg-black text-white px-10 py-4 rounded-full text-base font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {t.projectsSeeMore}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutOurProjects;
