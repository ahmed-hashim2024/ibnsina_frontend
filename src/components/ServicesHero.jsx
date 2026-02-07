import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import serviceHeroImage from "../assets/image/serviceHero.png";

const ServicesHero = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  // Determine alignment based on language
  const isRtl = lang === "ar";

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={serviceHeroImage}
          alt="Services Hero"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-3xl text-white space-y-6 text-center mx-auto animate-in fade-in zoom-in-95 duration-1000">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight drop-shadow-2xl">
            {t.servicesHeroTitle}
          </h1>

          {/* Divider */}
          <div className="h-1.5 w-24 bg-sky-500 rounded-full mx-auto"></div>

          {/* Description */}
          <p className="text-lg md:text-xl md:leading-relaxed font-light text-gray-100 drop-shadow-md max-w-2xl mx-auto">
            {t.servicesHeroDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
