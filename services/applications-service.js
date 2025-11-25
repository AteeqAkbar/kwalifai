// services/applications-service.js
import { fetchAPI } from "@/lib/api-client";

export const applicationsService = {
  // Apply to a job
  async apply(payload, token) {
    return fetchAPI("/api/applications", {
      method: "POST",
      body: payload,
      getToken: () => Promise.resolve(token),
    });
  },

  // List my applications
  async listMine({ page = 1, limit = 10 } = {}, token) {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    const path = `/api/applications/me?${params.toString()}`;
    return fetchAPI(path, {
      getToken: () => Promise.resolve(token),
    });
  },

  // Get application by ID
  async getById(id, token) {
    return fetchAPI(`/api/applications/${id}`, {
      getToken: () => Promise.resolve(token),
    });
  },

  // Update application status (employer)
  async updateStatus(id, status, token) {
    return fetchAPI(`/api/applications/${id}/status`, {
      method: "PATCH",
      body: { status },
      getToken: () => Promise.resolve(token),
    });
  },

  // Withdraw/Delete application (applicant)
  async withdraw(id, token) {
    return fetchAPI(`/api/applications/${id}`, {
      method: "DELETE",
      getToken: () => Promise.resolve(token),
    });
  },
};