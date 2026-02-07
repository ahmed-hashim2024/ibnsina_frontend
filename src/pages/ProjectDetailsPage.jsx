import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaCalendarAlt,
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import ProjectGallery from "../components/ProjectGallery";
import { getProject } from "../services/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top and fetch project data
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await getProject(id);

        // Map backend data to frontend format
        const mappedProject = {
          id: data.id,
          title: data[`title_${lang}`] || data.title_en,
          desc: data[`description_${lang}`] || data.description_en,
          category: data.category,
          location: data[`location_${lang}`] || data.location_en,
          area: data.area,
          year: data.year,
          duration: data.duration,
          client: data.client,
          challenge: data[`challenge_${lang}`] || data.challenge_en,
          solution: data[`solution_${lang}`] || data.solution_en,
          result: data[`result_${lang}`] || data.result_en,
          image: data.small_image,
          images: data.images || [], // For ProjectGallery component
          gallery: data.images?.map((img) => img.image) || [],
        };

        setProject(mappedProject);
        setError(null);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, lang]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-xl text-gray-500">Loading project...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">
            {error || "Project not found"}
          </p>
          <Link
            to="/projects"
            className="text-gray-500 hover:text-black font-bold transition-colors"
          >
            {lang === "ar" ? (
              <FaArrowRight className="inline mr-2" />
            ) : (
              <FaArrowLeft className="inline mr-2" />
            )}
            {t.projectBack}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* === Hero Section === */}
      <section className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover fixed-background"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-sky-500/10" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 text-sky-400 mb-4 font-bold uppercase tracking-widest text-sm">
                <span className="bg-sky-500/20 px-3 py-1 rounded-full backdrop-blur-md border border-sky-500/30">
                  {project.category}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt /> {project.location}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === Stats Bar === */}
      <section className="bg-white relative z-10 -mt-8 mx-4 md:mx-auto max-w-6xl shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          <div className="p-6 text-center group hover:bg-sky-50 transition-colors">
            <FaUserTie className="text-3xl text-sky-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">
              {t.projectClient}
            </p>
            <p className="text-gray-900 font-bold text-sm md:text-base">
              {project.client}
            </p>
          </div>
          <div className="p-6 text-center group hover:bg-sky-50 transition-colors">
            <FaRulerCombined className="text-3xl text-sky-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">
              {t.projectArea}
            </p>
            <p className="text-gray-900 font-bold text-sm md:text-base">
              {project.area}
            </p>
          </div>
          <div className="p-6 text-center group hover:bg-sky-50 transition-colors">
            <FaClock className="text-3xl text-sky-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">
              {t.projectDuration}
            </p>
            <p className="text-gray-900 font-bold text-sm md:text-base">
              {project.duration}
            </p>
          </div>
          <div className="p-6 text-center group hover:bg-sky-50 transition-colors">
            <FaCalendarAlt className="text-3xl text-sky-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">
              {t.projectYear}
            </p>
            <p className="text-gray-900 font-bold text-sm md:text-base">
              {project.year}
            </p>
          </div>
        </div>
      </section>

      {/* === Story Section (Challenge / Solution / Result) === */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-24">
        {/* Challenge & Solution */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-sky-500 pl-4 py-1">
              {t.projectChallenge}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.challenge}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-sky-50 p-10 rounded-4xl relative"
          >
            <div className="absolute top-0 right-0 bg-sky-500 text-white px-6 py-2 rounded-bl-2xl rounded-tr-4xl font-bold">
              {t.projectSolution}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-2">
              {t.projectSolutionTitle}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {project.solution}
            </p>
          </motion.div>
        </div>

        {/* Results Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-primary text-white rounded-4xl p-8 md:p-16 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <FaCheckCircle className="text-5xl text-sky-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.projectResult}
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
              "{project.result}"
            </p>
          </div>
        </motion.div>
      </section>

      {/* === Gallery Slider === */}
      <ProjectGallery images={project.images} />

      {/* === Navigation Footer === */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 flex justify-between items-center z-50 lg:hidden">
        <span className="font-bold text-gray-900">
          {project.projectStatus || "Completed"}
        </span>
        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold">
          Contact Us
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 flex justify-between items-center">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-gray-500 hover:text-black font-bold transition-colors"
        >
          {lang === "ar" ? <FaArrowRight /> : <FaArrowLeft />} {t.projectBack}
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
