import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import heroImage from "../assets/image/hero.png";
import hero2Image from "../assets/image/hero2.png";
import { motion } from "framer-motion";
import logo from "../assets/image/logo.svg";
import presentationPdf from "../assets/Presentation.pdf";

const Hero = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-start overflow-hidden rounded-b-[100px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Image */}
        <img
          src={hero2Image}
          alt="Innovative Modern Building"
          className={`w-full h-full object-cover lg:hidden ${
            lang === "ar" ? "scale-x-[-1]" : ""
          }`}
        />
        {/* Desktop Image */}
        <img
          src={heroImage}
          alt="Innovative Modern Building"
          className={`w-full h-full object-cover hidden lg:block ${
            lang === "ar" ? "scale-x-[-1]" : ""
          }`}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-312.5 mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-between py-20 ">
        {/* Text Section */}
        <div
          className={`flex w-full justify-center lg:justify-start items-start lg:items-center flex-1 transition-all duration-500 mt-20 lg:mt-0`}
        >
          <div
            className={`max-w-xl text-center lg:text-start ${
              lang === "ar" ? "lg:border-r-4 lg:pr-8" : "lg:border-l-4 lg:pl-6"
            } border-sky-400`}
          >
            <h1 className="flex flex-col gap-2 drop-shadow-sm">
              {/* Logo - Floating Animation */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-4 flex justify-center lg:justify-start"
              >
                <img src={logo} alt="Ibn Sina Logo" className="h-20 md:h-28" />
              </motion.div>

              {/* Blue Text - Pulsating Glow Animation */}
              <motion.span
                animate={{
                  textShadow: [
                    "0px 0px 0px rgba(255, 255, 255, 0)",
                    "0px 0px 10px rgba(255, 255, 255, 0.8)",
                    "0px 0px 0px rgba(255, 255, 255, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`text-2xl md:text-3xl font-bold text-gray-600 leading-tight `}
              >
                {t.heroTitleMiddle}
              </motion.span>

              <motion.span
                animate={{
                  textShadow: [
                    "0px 0px 0px rgba(255, 255, 255, 0)",
                    "0px 0px 10px rgba(255, 255, 255, 0.8)",
                    "0px 0px 0px rgba(255, 255, 255, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2, // Slight delay for second line
                }}
                className={`text-2xl md:text-3xl font-bold text-gray-600 leading-tight`}
              >
                {t.heroTitleEnd}
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <a
                href={presentationPdf}
                download="IbnSina_Presentation.pdf"
                className="group relative bg-black/10 backdrop-blur-md border border-white/20 hover:bg-black/50 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-3"
              >
                <span>{t.heroButton}</span>
                <span
                  className={`bg-white/20 rounded-full p-1 transition-transform duration-300 ${
                    lang === "ar"
                      ? "group-hover:-translate-x-1"
                      : "group-hover:translate-x-1"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${lang === "ar" ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
