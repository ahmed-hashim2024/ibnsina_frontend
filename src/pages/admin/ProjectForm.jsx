import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { createProject, updateProject, getProject } from "../../services/api";
import { FaSave, FaArrowLeft } from "react-icons/fa";

const ProjectForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("en");

  const [formData, setFormData] = useState({
    // English fields
    title_en: "",
    description_en: "",
    location_en: "",
    challenge_en: "",
    solution_en: "",
    result_en: "",
    // Arabic fields
    title_ar: "",
    description_ar: "",
    location_ar: "",
    challenge_ar: "",
    solution_ar: "",
    result_ar: "",
    // French fields
    title_fr: "",
    description_fr: "",
    location_fr: "",
    challenge_fr: "",
    solution_fr: "",
    result_fr: "",
    // Common fields
    client: "",
    area: "",
    year: new Date().getFullYear().toString(),
    duration: "",
    category: "residential",
    small_image: null,
  });

  // Gallery images state (5-15 images)
  const [galleryImages, setGalleryImages] = useState([]);

  // Load project data if editing
  useEffect(() => {
    if (isEditMode) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const data = await getProject(id);
          setFormData({
            ...data,
            small_image: null, // File input doesn't have initial value
          });
        } catch (err) {
          console.error("Error fetching project:", err);
          setError("Failed to load project data.");
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle gallery images selection
  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // Check max limit
    if (galleryImages.length + files.length > 15) {
      alert(
        lang === "ar" ? "الحد الأقصى 15 صورة" : "Maximum 15 images allowed",
      );
      return;
    }

    setGalleryImages([...galleryImages, ...files]);
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validate gallery images count
    if (galleryImages.length < 5 || galleryImages.length > 15) {
      setError(
        lang === "ar"
          ? "يجب إضافة من 5 إلى 15 صورة للمعرض"
          : "Please add between 5 to 15 gallery images",
      );
      setLoading(false);
      return;
    }

    try {
      // Create FormData for multipart upload
      const data = new FormData();

      // Append all fields except image first
      Object.keys(formData).forEach((key) => {
        if (key === "small_image") {
          // Only append image if it's a File object (new upload)
          if (formData[key] instanceof File) {
            data.append(key, formData[key]);
          }
          // Skip if it's just a URL string (existing image)
        } else if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      // Append gallery images
      galleryImages.forEach((img, index) => {
        data.append(`gallery_image_${index}`, img);
      });

      if (isEditMode) {
        await updateProject(id, data);
        alert(
          lang === "ar"
            ? "تم تحديث المشروع بنجاح!"
            : "Project updated successfully!",
        );
      } else {
        await createProject(data);
        alert(
          lang === "ar"
            ? "تم إضافة المشروع بنجاح!"
            : "Project created successfully!",
        );
      }

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Error saving project:", err);
      setError(
        err.response?.data?.error ||
          "Failed to save project. Please check all fields and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "en", label: "English" },
    { id: "ar", label: "العربية" },
    { id: "fr", label: "Français" },
  ];

  const categories = [
    { value: "residential", label: lang === "ar" ? "سكني" : "Residential" },
    { value: "commercial", label: lang === "ar" ? "تجاري" : "Commercial" },
    { value: "medical", label: lang === "ar" ? "طبي" : "Medical" },
    {
      value: "infrastructure",
      label: lang === "ar" ? "بنية تحتية" : "Infrastructure",
    },
  ];

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-xl text-gray-500">
            {lang === "ar" ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode
                ? lang === "ar"
                  ? "تعديل المشروع"
                  : "Edit Project"
                : lang === "ar"
                  ? "إضافة مشروع جديد"
                  : "Add New Project"}
            </h1>
            <p className="text-gray-500 mt-1">
              {lang === "ar"
                ? "املأ جميع الحقول في اللغات الثلاث"
                : "Fill in all fields for all three languages"}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft />
            {lang === "ar" ? "العودة" : "Back"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-8"
        >
          {/* Language Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Multilingual Fields */}
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={activeTab === tab.id ? "space-y-6" : "hidden"}
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === "ar" ? "العنوان" : "Title"} ({tab.label})
                  </label>
                  <input
                    type="text"
                    name={`title_${tab.id}`}
                    value={formData[`title_${tab.id}`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === "ar" ? "الوصف المختصر" : "Short Description"} (
                    {tab.label})
                  </label>
                  <textarea
                    name={`description_${tab.id}`}
                    value={formData[`description_${tab.id}`]}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === "ar" ? "الموقع" : "Location"} ({tab.label})
                  </label>
                  <input
                    type="text"
                    name={`location_${tab.id}`}
                    value={formData[`location_${tab.id}`]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === "ar" ? "التحدي" : "Challenge"} ({tab.label})
                  </label>
                  <textarea
                    name={`challenge_${tab.id}`}
                    value={formData[`challenge_${tab.id}`]}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === "ar" ? "الحل" : "Solution"} ({tab.label})
                  </label>
                  <textarea
                    name={`solution_${tab.id}`}
                    value={formData[`solution_${tab.id}`]}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {lang === "ar" ? "النتيجة" : "Result"} ({tab.label})
                  </label>
                  <textarea
                    name={`result_${tab.id}`}
                    value={formData[`result_${tab.id}`]}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Common Fields */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {lang === "ar" ? "معلومات المشروع" : "Project Information"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ar" ? "العميل" : "Client"}
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ar" ? "الفئة" : "Category"}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ar" ? "المساحة" : "Area"}
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 50,000 m²"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ar" ? "السنة" : "Year"}
                </label>
                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  placeholder="2024"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ar" ? "المدة" : "Duration"}
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 24 Months"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {lang === "ar" ? "الصورة المصغرة" : "Thumbnail Image"}
                  {isEditMode && " (optional - leave empty to keep current)"}
                </label>
                <input
                  type="file"
                  name="small_image"
                  onChange={handleChange}
                  accept="image/*"
                  required={!isEditMode}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
            </div>

            {/* Gallery Images Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === "ar"
                  ? "صور المعرض (5-15 صورة)"
                  : "Gallery Images (5-15 images)"}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-3">
                {lang === "ar"
                  ? `الصور الحالية: ${galleryImages.length} (الحد الأدنى: 5، الحد الأقصى: 15)`
                  : `Current images: ${galleryImages.length} (Min: 5, Max: 15)`}
              </p>

              {/* File Input */}
              <input
                type="file"
                multiple
                onChange={handleGalleryImagesChange}
                accept="image/*"
                disabled={galleryImages.length >= 15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-gray-100 disabled:cursor-not-allowed mb-4"
              />

              {/* Image Previews Grid */}
              {galleryImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {galleryImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title={lang === "ar" ? "حذف" : "Remove"}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Validation Messages */}
              {galleryImages.length < 5 && (
                <p className="text-red-500 text-sm mt-2">
                  {lang === "ar"
                    ? `يجب إضافة ${5 - galleryImages.length} صورة على الأقل`
                    : `Please add at least ${5 - galleryImages.length} more image(s)`}
                </p>
              )}
              {galleryImages.length >= 15 && (
                <p className="text-amber-600 text-sm mt-2">
                  {lang === "ar"
                    ? "تم الوصول للحد الأقصى من الصور"
                    : "Maximum number of images reached"}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave />
              {loading
                ? lang === "ar"
                  ? "جاري الحفظ..."
                  : "Saving..."
                : lang === "ar"
                  ? "حفظ المشروع"
                  : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
