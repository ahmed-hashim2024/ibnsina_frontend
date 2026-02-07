import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import contactImage from "../assets/image/contact.png";

const HeroContactUs = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  return (
    <div className="relative w-full h-[60vh] min-h-125 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${contactImage})` }}
      ></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            {t.contactHeroTitle}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t.contactHeroDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroContactUs;
