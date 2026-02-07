import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations";
import { getJob, submitCareerApplication } from "../services/api";
import CareersHero from "../components/CareersHero";
import {
  FaBriefcase,
  FaClock,
  FaArrowLeft,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang] || translations["en"];

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    phone: "",
    cv: "",
    coverLetter: "",
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const data = await getJob(id);
      setJob(data);
    } catch (err) {
      console.error("Error fetching job:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cv) {
      alert(
        lang === "ar"
          ? "يرجى إدخال رابط السيرة الذاتية"
          : "Please enter your CV link",
      );
      return;
    }

    try {
      setSubmitting(true);

      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        position: job.title,
        cv: formData.cv,
        cover_letter: formData.coverLetter,
      };

      await submitCareerApplication(data);

      alert(
        lang === "ar"
          ? "تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً."
          : "Application submitted successfully! We will contact you soon.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        phone: "",
        cv: "",
        coverLetter: "",
      });
    } catch (err) {
      console.error("Error submitting application:", err);
      alert(
        lang === "ar"
          ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
          : "Error submitting application. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {lang === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {lang === "ar" ? "الوظيفة غير موجودة" : "Job not found"}
          </h2>
          <button
            onClick={() => navigate("/careers")}
            className="text-sky-600 hover:text-sky-700"
          >
            {lang === "ar" ? "العودة للوظائف" : "Back to Jobs"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white mt-10
    "
    >
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Job Description */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-4xl shadow-lg border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-sky-100 rounded-xl">
                  <FaBriefcase className="text-xl sm:text-2xl text-sky-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {lang === "ar"
                    ? "تفاصيل الوظيفة"
                    : lang === "fr"
                      ? "Détails du poste"
                      : "Job Details"}
                </h2>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-base sm:text-lg text-gray-600 mb-4">
                  <FaClock />
                  <span>{job.experience}</span>
                </div>
              </div>

              <div className="prose prose-sm sm:prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {job.description}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/careers")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mt-6"
            >
              <FaArrowLeft />
              {lang === "ar" ? "العودة للوظائف" : "Back to Jobs"}
            </button>
          </div>

          {/* Application Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-4xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:sticky lg:top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-sky-100 rounded-xl">
                  <FaPaperPlane className="text-xl sm:text-2xl text-sky-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {lang === "ar"
                    ? "قدم الآن"
                    : lang === "fr"
                      ? "Postuler maintenant"
                      : "Apply Now"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                    {t.careersFormName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                    placeholder="..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                    {t.careersFormEmail}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                    placeholder="..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                    {t.careersFormPhone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                    placeholder="..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                    {t.careersFormCV} (Link)
                  </label>
                  <input
                    type="url"
                    name="cv"
                    value={formData.cv}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all placeholder-gray-400"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm">
                    {lang === "ar"
                      ? "رسالة تغطية (اختياري)"
                      : lang === "fr"
                        ? "Lettre de motivation (optionnel)"
                        : "Cover Letter (Optional)"}
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all resize-none"
                    placeholder="..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {lang === "ar" ? "جاري الإرسال..." : "Sending..."}
                    </>
                  ) : (
                    t.careersFormSubmit
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
