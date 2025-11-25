// hooks/useApplications.js
import { useEffect, useState } from "react";
import { applicationsService } from "@/services/applications-service";
import { useAuth } from "@clerk/nextjs";

export function useMyApplications(filters = { page: 1, limit: 10 }) {
  const [data, setData] = useState(null); // { total, page, limit, data: [] }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getToken();
        const response = await applicationsService.listMine(filters, token);
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, [JSON.stringify(filters), getToken]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const response = await applicationsService.listMine(filters, token);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useApplicationMutations() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const applyToJob = async ({ jobListingId, resumeUrl, coverLetter, metadata }) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      return await applicationsService.apply(
        { jobListingId, resumeUrl, coverLetter, metadata },
        token
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      return await applicationsService.withdraw(id, token);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      return await applicationsService.updateStatus(id, status, token);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { applyToJob, withdrawApplication, updateApplicationStatus, loading, error, clearError };
}