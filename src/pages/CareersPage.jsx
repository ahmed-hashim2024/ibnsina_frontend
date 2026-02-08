import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import PageHero from "../components/common/PageHero";
import heroImage from "../assets/image/abouthero3.png";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaPaperPlane,
  FaClock,
} from "react-icons/fa";
import { getJobs, submitCareerApplication } from "../services/api";

const CareersPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  // Jobs from database
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phone: "",
    cv: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitCareerApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cv: formData.cv,
        position: "General Application", // Or add a field for this
      });
      alert(
        lang === "ar"
          ? "تم الإرسال بنجاح"
          : "Application submitted successfully!",
      );
      setFormData({ name: "", email: "", phone: "", cv: "" });
    } catch (err) {
      console.error(err);
      alert(lang === "ar" ? "حدث خطأ" : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const values = [
    {
      title: t.careersValue1Title,
      desc: t.careersValue1Desc,
      icon: <FaChartLine className="text-4xl text-sky-500" />,
    },
    {
      title: t.careersValue2Title,
      desc: t.careersValue2Desc,
      icon: <FaUsers className="text-4xl text-sky-500" />,
    },
    {
      title: t.careersValue3Title,
      desc: t.careersValue3Desc,
      icon: <FaBriefcase className="text-4xl text-sky-500" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={t.careersHeroTitle}
        description={t.careersHeroDesc}
        backgroundImage={heroImage}
      />

      {/* === Values Section === */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.careersValuesTitle}
          </h2>
          <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-sky-50 p-8 rounded-4xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-sky-100 group"
            >
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors">
                {val.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === Openings & Form Section === */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Openings List */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FaBriefcase className="text-sky-500" />
              {t.careersOpeningsTitle}
            </h2>

            {loadingJobs ? (
              <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {lang === "ar" ? "جاري التحميل..." : "Loading jobs..."}
                </p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 text-center py-16">
                <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-6 text-sky-500 text-3xl">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t.careersNoOpenings}
                </h3>
                <p className="text-gray-500">
                  {lang === "ar"
                    ? "على الرغم من عدم وجود وظائف شاغرة حالياً، نحن دائماً نبحث عن المبدعين."
                    : "While there are no specific openings right now, we are always looking for creative talent."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium text-sky-600 mb-3 flex items-center gap-2">
                          <FaClock />
                          {job.experience}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-1 mb-4">
                          {job.description}
                        </p>
                        <button
                          onClick={() =>
                            (window.location.href = `/jobs/${job.id}`)
                          }
                          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold transition-colors"
                        >
                          {lang === "ar"
                            ? "عرض المزيد"
                            : lang === "fr"
                              ? "Voir plus"
                              : "View More"}
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>
                      </div>
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 group-hover:bg-sky-100 transition-colors">
                          <FaBriefcase className="text-xl" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
