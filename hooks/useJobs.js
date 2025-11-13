// hooks/useJobs.js
import { useState, useEffect } from "react";
import { jobsService } from "@/services/jobs-service";
import { useAuth } from "@clerk/nextjs";

export function useJobs(filters = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobsService.getJobs(filters);
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [JSON.stringify(filters)]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsService.getJobs(filters);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useJob(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobsService.getJobById(id);
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const refetch = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await jobsService.getJobById(id);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export function useMyJobs(filters = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getToken();
        const response = await jobsService.getMyJobs(filters, token);
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [JSON.stringify(filters), getToken]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const response = await jobsService.getMyJobs(filters, token);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Hook for job mutations (create, update, delete)
export function useJobMutations() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createJob = async (jobData) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const response = await jobsService.createJob(jobData, token);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id, jobData) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const response = await jobsService.updateJob(id, jobData, token);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const response = await jobsService.deleteJob(id, token);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getJobApplications = async (jobId) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();
      const response = await jobsService.getJobApplications(jobId, token);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    createJob,
    updateJob,
    deleteJob,
    getJobApplications,
    loading,
    error,
    clearError,
  };
}
