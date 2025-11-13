// app/jobs/[id]/page.js
"use client";
import { useParams } from "next/navigation";
import { useJobs } from "@/hooks/useJobs";
import Link from "next/link";

export default function JobDetailPage() {
  const params = useParams();
  const { data: jobs, loading, error } = useJobs(params.id);
  const job = jobs?.[0];
  console.log(jobs, "job");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "Job not found"}
          </div>
          <Link
            href="/jobs"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800"
          >
            ← Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/jobs"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Jobs
        </Link>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {job.jobType?.replace("_", " ")}
                  </span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {job.workMode}
                  </span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    {job.experienceLevel}
                  </span>
                  {job.location && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      {job.location}
                    </span>
                  )}
                </div>
              </div>
              {job.applicationUrl && (
                <a
                  href={job.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </a>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">
                    Job Description
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.requirements}
                    </p>
                  </div>
                </div>

                {job.benefits && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">
                        {job.benefits}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Salary */}
                {(job.salaryRangeMin || job.salaryRangeMax) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Salary Range</h3>
                    <p className="text-lg text-gray-900">
                      ${job.salaryRangeMin?.toLocaleString()} - $
                      {job.salaryRangeMax?.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Application Deadline */}
                {job.applicationDeadline && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Application Deadline</h3>
                    <p className="text-gray-700">
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* Posted Date */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Posted</h3>
                  <p className="text-gray-700">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Tech Stack */}
                {job.techStack && job.techStack.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1">
                      {/* {job.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
