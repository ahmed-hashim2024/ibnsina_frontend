import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { motion } from "framer-motion";
import visionImage from "../assets/image/vision.png";

const AboutVision = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  // Mimicking ServicesData layout (isEven=true style for Image Left, Text Right)
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* === Image Section === */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative overflow-hidden h-full min-h-64 md:min-h-80 lg:min-h-96 rounded-tl-[3rem] md:rounded-tl-[5rem] lg:rounded-tl-[6rem]">
              <img
                src={visionImage}
                alt={t.aboutVisionPageTitle}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* === Text Section === */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="bg-sky-50 h-full p-6 md:p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-black rounded"></div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
                  {t.aboutVisionPageTitle}
                </h2>
              </div>

              <div className="space-y-3 lg:space-y-4">
                <p className="text-black leading-relaxed text-sm lg:text-base font-medium">
                  {t.aboutVisionPageDesc}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;
