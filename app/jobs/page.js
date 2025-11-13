// app/jobs/page.js
"use client";
import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";

export default function JobsPage() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
  });

  const { data, loading, error } = useJobs(filters);
  console.log(data, "daya");

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error loading jobs: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Job
          </h1>
          <p className="text-gray-600">
            Discover opportunities that match your skills and interests
          </p>
        </div>

        <JobFilters onFiltersChange={handleFiltersChange} />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : data && data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {data.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(data.currentPage - 1)}
                  disabled={data.currentPage <= 1}
                  className="px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-700">
                  Page {data.currentPage} of {data.pages}
                </span>

                <button
                  onClick={() => handlePageChange(data.currentPage + 1)}
                  disabled={data.currentPage >= data.pages}
                  className="px-3 py-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jobs found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
