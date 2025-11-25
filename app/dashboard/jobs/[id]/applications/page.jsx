"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { jobsService } from "@/services/jobs-service";

function StatusBadge({ status }) {
  const map = {
    submitted: "bg-gray-100 text-gray-800",
    viewed: "bg-blue-100 text-blue-800",
    shortlisted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    hired: "bg-purple-100 text-purple-800",
  };
  const cls = map[status] || "bg-gray-100 text-gray-800";
  return <span className={`px-2 py-1 text-xs rounded ${cls}`}>{status}</span>;
}

export default function JobApplicantsPage() {
  const params = useParams();
  const jobId = Number(params.id);
  const { getToken } = useAuth();
  const [apps, setApps] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getToken();
        const data = await jobsService.getJobApplications(jobId, token);
        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
            )
          : [];
        setApps(sorted);
      } catch (err) {
        setError(err?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    if (jobId) load();
  }, [jobId, getToken]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-600">Applications submitted for this job</p>
        </div>
        <Link href={`/dashboard/jobs`} className="text-blue-600 hover:text-blue-800">
          ← Back to My Jobs
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">Error: {error}</div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : Array.isArray(apps) && apps.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {apps.map((app) => (
              <li key={app.id}>
                <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-medium text-blue-600 truncate">
                          {app?.applicant?.email || `Application #${app.id}`}
                        </p>
                        <StatusBadge status={app.status} />
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(app.submittedAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {app?.applicant?.userType} • job #{app.jobListingId}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {app?.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-700 hover:text-gray-900"
                      >
                        Resume
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center text-gray-600">
          No applications yet.
        </div>
      )}
    </div>
  );
}