import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  getProjects,
  deleteProject,
  getJobs,
  deleteJob,
} from "../../services/api";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEye } from "react-icons/fa";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch projects and jobs
  useEffect(() => {
    fetchProjects();
    fetchJobs();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      // Handle paginated response from DRF
      const projectsList = data.results || data;
      setProjects(projectsList);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const data = await getJobs();
      const jobsList = Array.isArray(data) ? data : data.results || [];
      setJobs(jobsList);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        lang === "ar"
          ? "هل أنت متأكد من حذف هذا المشروع?"
          : "Are you sure you want to delete this project?",
      )
    ) {
      return;
    }

    try {
      await deleteProject(id);
      // Ensure projects is an array before filtering
      setProjects((prevProjects) =>
        Array.isArray(prevProjects)
          ? prevProjects.filter((p) => p.id !== id)
          : [],
      );
      alert(
        lang === "ar"
          ? "تم حذف المشروع بنجاح!"
          : "Project deleted successfully!",
      );
    } catch (err) {
      console.error("Error deleting project:", err);
      alert(lang === "ar" ? "فشل حذف المشروع" : "Failed to delete project");
    }
  };

  const handleDeleteJob = async (id) => {
    if (
      !window.confirm(
        lang === "ar"
          ? "هل أنت متأكد من حذف هذه الوظيفة؟"
          : "Are you sure you want to delete this job?",
      )
    ) {
      return;
    }

    try {
      await deleteJob(id);
      setJobs((prevJobs) => prevJobs.filter((j) => j.id !== id));
      alert(
        lang === "ar" ? "تم حذف الوظيفة بنجاح!" : "Job deleted successfully!",
      );
    } catch (err) {
      console.error("Error deleting job:", err);
      alert(lang === "ar" ? "فشل حذف الوظيفة" : "Failed to delete job");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const getCategoryLabel = (category) => {
    const labels = {
      residential: lang === "ar" ? "سكني" : "Residential",
      commercial: lang === "ar" ? "تجاري" : "Commercial",
      medical: lang === "ar" ? "طبي" : "Medical",
      infrastructure: lang === "ar" ? "بنية تحتية" : "Infrastructure",
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {lang === "ar" ? "لوحة التحكم" : "Admin Dashboard"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {lang === "ar"
                  ? `مرحباً، ${user?.username}`
                  : `Welcome, ${user?.username}`}
              </p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt />
                {lang === "ar" ? "تسجيل الخروج" : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Jobs Section */}
        <section className="mb-12">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {lang === "ar" ? "الوظائف" : "Jobs"} ({jobs.length})
            </h2>
            <Link
              to="/admin/jobs/new"
              className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus />
              {lang === "ar" ? "إضافة وظيفة جديدة" : "Add New Job"}
            </Link>
          </div>

          {loadingJobs ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">
                {lang === "ar" ? "جاري تحميل الوظائف..." : "Loading jobs..."}
              </p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <p className="text-gray-500">
                {lang === "ar" ? "لا توجد وظائف" : "No jobs available"}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "العنوان" : "Title"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "الخبرة" : "Experience"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      {lang === "ar" ? "الوصف" : "Description"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "الإجراءات" : "Actions"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {job.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800">
                          {job.experience}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate hidden md:table-cell">
                        {job.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/jobs/edit/${job.id}`}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                            title={lang === "ar" ? "تعديل" : "Edit"}
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                            title={lang === "ar" ? "حذف" : "Delete"}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section>
          {/* Action Bar */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {lang === "ar" ? "جميع المشاريع" : "All Projects"} (
              {projects.length})
            </h2>
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
            >
              <FaPlus />
              {lang === "ar" ? "إضافة مشروع جديد" : "Add New Project"}
            </Link>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="text-gray-500 mt-4">
                {lang === "ar" ? "جاري التحميل..." : "Loading..."}
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Projects Table */}
          {!loading && !error && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "الصورة" : "Image"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "العنوان" : "Title"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "الفئة" : "Category"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "العميل" : "Client"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "السنة" : "Year"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {lang === "ar" ? "الإجراءات" : "Actions"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={project.small_image}
                          alt={project.title_en}
                          className="h-12 w-16 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {project[`title_${lang}`] || project.title_en}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800">
                          {getCategoryLabel(project.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/projects/${project.id}`}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                            title={lang === "ar" ? "عرض" : "View"}
                          >
                            <FaEye />
                          </Link>
                          <Link
                            to={`/admin/projects/${project.id}/edit`}
                            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                            title={lang === "ar" ? "تعديل" : "Edit"}
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                            title={lang === "ar" ? "حذف" : "Delete"}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {projects.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">
                    {lang === "ar" ? "لا توجد مشاريع بعد" : "No projects yet"}
                  </p>
                  <Link
                    to="/admin/projects/new"
                    className="text-sky-600 hover:text-sky-700 mt-2 inline-block"
                  >
                    {lang === "ar"
                      ? "إضافة أول مشروع"
                      : "Add your first project"}
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
