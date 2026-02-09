import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://52.233.182.39/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            "http://localhost:8000/api/auth/refresh/",
            { refresh: refreshToken },
          );

          const { access } = response.data;
          localStorage.setItem("accessToken", access);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// ==================== AUTH ENDPOINTS ====================

/**
 * Login admin user
 * @param {string} username
 * @param {string} password
 * @returns {Promise} User data and tokens
 */
export const login = async (username, password) => {
  const response = await api.post("/auth/login/", { username, password });
  const { access, refresh, user } = response.data;

  // Store tokens and user info
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("user", JSON.stringify(user));

  return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

/**
 * Get current user from localStorage
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// ==================== PROJECT ENDPOINTS ====================

/**
 * Get all projects or filter by category
 * @param {string} category - Optional category filter
 * @returns {Promise} List of projects
 */
export const getProjects = async (category = null) => {
  const params = category ? { category } : {};
  const response = await api.get("/projects/", { params });
  return response.data;
};

/**
 * Get single project by ID
 * @param {number} id - Project ID
 * @returns {Promise} Project details
 */
export const getProject = async (id) => {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
};

/**
 * Create new project
 * @param {FormData} projectData - Form data with project fields and image
 * @returns {Promise} Created project
 */
export const createProject = async (projectData) => {
  const response = await api.post("/projects/", projectData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Update existing project
 * @param {number} id - Project ID
 * @param {FormData} projectData - Form data with updated fields
 * @returns {Promise} Updated project
 */
export const updateProject = async (id, projectData) => {
  const response = await api.patch(`/projects/${id}/`, projectData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Delete project
 * @param {number} id - Project ID
 * @returns {Promise}
 */
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}/`);
  return response.data;
};

/**
 * Add gallery image to project
 * @param {number} projectId - Project ID
 * @param {FormData} imageData - Form data with image and order
 * @returns {Promise} Created image
 */
export const addProjectImage = async (projectId, imageData) => {
  const response = await api.post(
    `/projects/${projectId}/add_image/`,
    imageData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

/**
 * Remove gallery image from project
 * @param {number} projectId - Project ID
 * @param {number} imageId - Image ID
 * @returns {Promise}
 */
export const removeProjectImage = async (projectId, imageId) => {
  const response = await api.delete(`/projects/${projectId}/remove_image/`, {
    params: { image_id: imageId },
  });
  return response.data;
};

// ==================== JOBS ENDPOINTS ====================

/**
 * Get all jobs
 * @returns {Promise} List of jobs
 */
export const getJobs = async () => {
  const response = await api.get("/jobs/");
  return response.data;
};

/**
 * Get single job by ID
 * @param {number} id - Job ID
 * @returns {Promise} Job details
 */
export const getJob = async (id) => {
  const response = await api.get(`/jobs/${id}/`);
  return response.data;
};

/**
 * Create new job
 * @param {object} jobData - Job data (multilingual fields)
 * @returns {Promise} Created job
 */
export const createJob = async (jobData) => {
  const response = await api.post("/jobs/", jobData);
  return response.data;
};

/**
 * Update existing job
 * @param {number} id - Job ID
 * @param {object} jobData - Updated job data
 * @returns {Promise} Updated job
 */
export const updateJob = async (id, jobData) => {
  const response = await api.patch(`/jobs/${id}/`, jobData);
  return response.data;
};

/**
 * Delete job
 * @param {number} id - Job ID
 * @returns {Promise}
 */
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}/`);
  return response.data;
};

// ==================== CONTACT/CAREER ENDPOINTS ====================

/**
 * Send contact message
 * @param {object} messageData - Contact form data
 * @returns {Promise} Submission response
 */
export const sendContactMessage = (data) => {
  return api.post("/contact/message/", data);
};

/**
 * Submit career application
 * @param {FormData} applicationData - Form data with CV file
 * @returns {Promise} Submission response
 */
export const submitCareerApplication = (data) => {
  return api.post("/contact/career/", data);
};
export default api;
