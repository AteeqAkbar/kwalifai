// app/dashboard/jobs/page.js
"use client";
import { useState } from "react";
import { useMyJobs } from "@/hooks/useJobs";
import { useJobMutations } from "@/hooks/useJobs";
import Link from "next/link";

export default function EmployerJobsPage() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data, loading, error, refetch } = useMyJobs(filters);
  console.log(data, "ddd");
  const { deleteJob, loading: deleteLoading } = useJobMutations();

  const handleDeleteJob = async (jobId) => {
    if (!confirm("Are you sure you want to close this job?")) return;

    try {
      await deleteJob(jobId);
      alert("Job closed successfully");
      refetch();
    } catch (error) {
      alert("Error closing job: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Job Listings</h1>
          <p className="text-gray-600">Manage your job postings</p>
        </div>
        <Link
          href="/dashboard/jobs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Post New Job
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : data && data.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {data.map((job) => (
              <li key={job.id}>
                <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-blue-600 truncate">
                        {job.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === "active"
                              ? "bg-green-100 text-green-800"
                              : job.status === "paused"
                              ? "bg-yellow-100 text-yellow-800"
                              : job.status === "closed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {job.jobType} • {job.workMode} • {job.experienceLevel}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </Link>
                    <Link
                      href={`/dashboard/jobs/${job.id}/edit`}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      disabled={deleteLoading}
                      className="px-3 py-1 border border-red-300 rounded text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deleteLoading ? "Closing..." : "Close"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't posted any jobs yet.
          </p>
          <Link
            href="/dashboard/jobs/create"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Post Your First Job
          </Link>
        </div>
      )}
    </div>
  );
}
