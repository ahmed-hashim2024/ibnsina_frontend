import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRulerCombined, FaCalendarAlt } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden flex items-center justify-center">
        <div className="relative w-[95%] h-[95%] rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-sky-500 via-sky-500/20 to-transparent opacity-60" />

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-5 right-5 text-white z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-1 leading-tight drop-shadow-md">
              {service.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        {/* Description */}
        <div className="relative grow">
          <p className="text-gray-600 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
