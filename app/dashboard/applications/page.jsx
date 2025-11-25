"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useMyApplications,
  useApplicationMutations,
} from "@/hooks/useApplications";

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

export default function MyApplicationsPage() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data, loading, error, refetch } = useMyApplications(filters);
  console.log(data, "heloo");
  const { withdrawApplication, loading: mutLoading } =
    useApplicationMutations();

  const handleWithdraw = async (id) => {
    if (!confirm("Withdraw this application?")) return;
    try {
      await withdrawApplication(id);
      await refetch();
      alert("Application withdrawn");
    } catch (err) {
      alert(err.message || "Failed to withdraw");
    }
  };

  const total = data?.total ?? 0;
  const page = data?.page ?? filters.page;
  const limit = data?.limit ?? filters.limit;
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600">Track applications you’ve submitted</p>
        </div>
        <Link href="/jobs" className="text-blue-600 hover:text-blue-800">
          Browse Jobs
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
      ) : (data?.length ?? 0) > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {data.map((app) => (
              <li key={app.id}>
                <div className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-medium text-blue-600 truncate">
                          {app?.jobListing?.title || `Application #${app.id}`}
                        </p>
                        <StatusBadge status={app.status} />
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Submitted {new Date(app.submittedAt).toLocaleString()} •{" "}
                      {app?.jobListing?.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {app?.jobListing?.id && (
                      <Link
                        href={`/jobs/${app.jobListing.id}`}
                        className="text-sm text-gray-700 hover:text-gray-900"
                      >
                        View Job
                      </Link>
                    )}
                    <button
                      onClick={() => handleWithdraw(app.id)}
                      disabled={mutLoading}
                      className="text-sm px-3 py-1.5 rounded border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center text-gray-600">
          No applications yet. Start by browsing jobs.
        </div>
      )}

      {/* Pager */}
      {pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() =>
              setFilters((f) => ({ ...f, page: Math.max(1, page - 1) }))
            }
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {pages}
          </span>
          <button
            className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-50"
            disabled={page >= pages}
            onClick={() =>
              setFilters((f) => ({ ...f, page: Math.min(pages, page + 1) }))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
