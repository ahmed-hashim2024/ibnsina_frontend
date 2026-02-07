import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { motion } from "framer-motion";
import { FaSquareFull } from "react-icons/fa";

const MainAboutUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  return (
    <section className="bg-sky-50 my-10 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
          {/* 1. Titles Section (Visual Right in RTL) */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 flex flex-col items-start space-y-4"
          >
            {/* Subtitle with Icon */}
            <div className="flex items-center gap-3">
              <FaSquareFull className="text-sky-500 text-xs" />
              <span className="text-lg font-bold text-gray-900">
                {t.mainAboutSubtitle}
              </span>
            </div>

            {/* Main Title - Split Colors */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              <span className="text-gray-900 block">
                {t.mainAboutTitlePart1}
              </span>
              <span className="text-sky-500 block mt-1">
                {t.mainAboutTitlePart2}
              </span>
            </h2>
          </motion.div>

          {/* 2. Description & Button Section (Visual Left in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col space-y-8"
          >
            <p className="text-gray-600 text-lg leading-loose text-justify">
              {t.mainAboutBody}
            </p>

            {/* Centered Button */}
            <div className="flex justify-center w-full">
              <Link
                to="/services"
                className="bg-sky-500 text-white px-10 py-3 rounded-full text-lg font-bold hover:bg-sky-600 transition-all duration-300 shadow-lg hover:shadow-sky-500/30"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {t.mainAboutBtn}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MainAboutUs;
