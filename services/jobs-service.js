// services/jobs-service.js
import { fetchAPI } from "@/lib/api-client";

export const jobsService = {
  // Get all jobs with filters
  async getJobs(filters = {}) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const path = queryString ? `/api/jobs?${queryString}` : "/api/jobs";

    return fetchAPI(path);
  },

  // Get job by ID
  async getJobById(id) {
    return fetchAPI(`/api/jobs/${id}`);
  },

  // Create new job
  async createJob(jobData, token) {
    return fetchAPI("/api/jobs", {
      method: "POST",
      body: jobData,
      getToken: () => Promise.resolve(token),
    });
  },

  // Update job
  async updateJob(id, jobData, token) {
    return fetchAPI(`/api/jobs/${id}`, {
      method: "PUT",
      body: jobData,
      getToken: () => Promise.resolve(token),
    });
  },

  // Delete job (soft delete)
  async deleteJob(id, token) {
    return fetchAPI(`/api/jobs/${id}`, {
      method: "DELETE",
      getToken: () => Promise.resolve(token),
    });
  },

  // Get job applications
  async getJobApplications(jobId, token) {
    return fetchAPI(`/api/jobs/${jobId}/applications`, {
      getToken: () => Promise.resolve(token),
    });
  },

  // Get employer's jobs
  async getMyJobs(filters = {}, token) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    const path = queryString
      ? `/api/jobs/employer/my-jobs?${queryString}`
      : "/api/jobs/employer/my-jobs";

    return fetchAPI(path, {
      getToken: () => Promise.resolve(token),
    });
  },

  // Advanced search
  async searchJobs(searchCriteria) {
    return fetchAPI("/api/jobs/search", {
      method: "POST",
      body: searchCriteria,
    });
  },
};
