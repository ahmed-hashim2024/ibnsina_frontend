import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import ProjectsHero from "../components/ProjectsHero";
import ProjectCard from "../components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { getProjects } from "../services/api";

const ProjectsPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();

        // Handle paginated response from DRF
        const projectsList = data.results || data;

        // Map backend data to frontend format
        const mappedProjects = projectsList.map((project) => ({
          id: project.id,
          title: project[`title_${lang}`] || project.title_en,
          category: project.category,
          categoryLabel:
            t[
              `filter${project.category.charAt(0).toUpperCase() + project.category.slice(1)}`
            ],
          location: project[`location_${lang}`] || project.location_en,
          area: project.area,
          year: project.year,
          image: project.small_image,
          description: project[`description_${lang}`] || project.description_en,
        }));

        setProjects(mappedProjects);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [lang]);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const categories = [
    { id: "all", label: t.filterAll },
    { id: "residential", label: t.filterResidential },
    { id: "commercial", label: t.filterCommercial },
    { id: "medical", label: t.filterMedical },
    { id: "infrastructure", label: t.filterInfrastructure },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <ProjectsHero />

      {/* === Filter Section === */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                filter === cat.id
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="text-xl text-gray-500 mt-4">Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-xl text-red-500">{error}</p>
          </div>
        )}

        {/* === Projects Grid === */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No projects found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectsPage;
