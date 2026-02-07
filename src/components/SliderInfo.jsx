import React from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SliderInfo = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  const stats = [
    { number: "240", label: t.statsProjects },
    { number: "450", label: t.statsBuildings },
    { number: "3200", label: t.statsUnits },
    { number: "979,369", label: t.statsBuildArea },
  ];

  return (
    <section className="bg-blue-50/50 py-12 my-10 overflow-hidden relative w-full">
      {/* Section Title */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-600">
          {t.statsTitle}
        </h2>
      </div>

      <Swiper
        key={lang}
        modules={[Autoplay]}
        spaceBetween={32}
        slidesPerView={3}
        loop={true}
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        freeMode={false}
        allowTouchMove={false}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 32,
          },
        }}
      >
        {/* Repeat stats multiple times for smooth infinite scroll */}
        {[...Array(8)].map((_, setIndex) =>
          stats.map((stat, idx) => (
            <SwiperSlide key={`stat-${setIndex}-${idx}`}>
              <StatCard number={stat.number} label={stat.label} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};

const StatCard = ({ number, label }) => (
  <div className="bg-white px-4 sm:px-6 py-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow duration-300 h-full">
    <div className="text-center">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-500 mb-2">
        {number}+
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  </div>
);

export default SliderInfo;
