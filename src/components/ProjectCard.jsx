import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRulerCombined, FaCalendarAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
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
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-sky-500 via-sky-500/20 to-transparent opacity-40" />

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-10">
            {project.category}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-5 right-5 text-white z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-1 leading-tight drop-shadow-md">
              {project.title}
            </h3>
            <div className="flex items-center text-gray-200 text-sm gap-2 drop-shadow-md">
              <FaMapMarkerAlt className="text-sky-400" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-50 rounded-lg text-sky-500">
              <FaRulerCombined />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold">
                {t.projectArea}
              </p>
              <p className="text-sm font-bold text-gray-800">{project.area}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-50 rounded-lg text-sky-500">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-semibold">
                {t.projectYear}
              </p>
              <p className="text-sm font-bold text-gray-800">{project.year}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="relative grow">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <Link
            to={`/projects/${project.id || 1}`} // Fallback ID for compatibility
            className="mt-4 inline-flex items-center text-sky-500 text-sm font-bold hover:underline"
            onClick={() => window.scrollTo(0, 0)}
          >
            {lang === "ar" ? "عرض التفاصيل" : "View Details"}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
