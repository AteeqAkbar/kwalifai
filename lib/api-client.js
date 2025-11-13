// lib/api-client.js

// Simple client-side and server-side API helper
// Always returns the `data` field from backend responses shaped as { data: ... }

/**
 * Fetch from backend API, optionally adding Clerk token.
 * @param {string} path - API path starting with '/api/...'
 * @param {{ method?: string, headers?: Record<string,string>, body?: any, getToken?: (()=>Promise<string|null>) }} [options]
 * @returns {Promise<any|null>} Resolves to json.data, or null when 404
 */
export async function fetchAPI(path, options = {}) {
  const { method = "GET", headers = {}, body, getToken } = options;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const url = `${baseUrl}${path}`;

  const computedHeaders = { ...headers };

  if (body && !computedHeaders["Content-Type"]) {
    computedHeaders["Content-Type"] = "application/json";
  }

  if (typeof getToken === "function") {
    try {
      const token = await getToken();
      if (token) {
        computedHeaders["Authorization"] = `Bearer ${token}`;
      }
    } catch (_) {
      // ignore token retrieval errors; request will be unauthenticated
    }
  }

  const res = await fetch(url, {
    method,
    headers: computedHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 404) {
    return null;
  }

  let json;
  try {
    json = await res.json();
  } catch (err) {
    throw new Error(`Invalid JSON from API at ${path}`);
  }

  if (!res.ok) {
    const message =
      json?.message || json?.error || `Request failed with ${res.status}`;
    const err = new Error(message);
    err.name = "ApiError";
    err.status = res.status;
    if (Array.isArray(json?.errors)) {
      err.errors = json.errors;
    }
    err.raw = json;
    throw err;
  }

  return json?.data ?? null;
}

// Convenience methods for common HTTP verbs
export const api = {
  get: (path, options) => fetchAPI(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    fetchAPI(path, { ...options, method: "POST", body }),
  put: (path, body, options) =>
    fetchAPI(path, { ...options, method: "PUT", body }),
  delete: (path, options) => fetchAPI(path, { ...options, method: "DELETE" }),
};
