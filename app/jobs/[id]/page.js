// app/jobs/[id]/page.js
"use client";
import { useParams } from "next/navigation";
import { useJobs } from "@/hooks/useJobs";
import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useApplicationMutations } from "@/hooks/useApplications";

export default function JobDetailPage() {
  const params = useParams();
  const { data: jobs, loading, error } = useJobs(params.id);
  const job1 = jobs?.filter((job) => job.id == params.id);
  const job = job1?.length ? job1?.[0] : job1;
  console.log(job, "job");
  const { applyToJob, loading: applying } = useApplicationMutations();
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [applyError, setApplyError] = useState(null);
  const [applySuccess, setApplySuccess] = useState("");

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
              {/* Apply CTA (internal applications) */}
              <SignedIn>
                <div className="flex items-center gap-3">
                  <a
                    href="#apply"
                    className="bg-white text-blue-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
              </SignedIn>
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

                {/* Apply Panel */}
                <div id="apply" className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Apply to this job</h3>
                  {applyError && (
                    <div className="text-sm text-red-700 bg-red-50 rounded p-2 mb-2">
                      {applyError}
                    </div>
                  )}
                  {applySuccess && (
                    <div className="text-sm text-green-700 bg-green-50 rounded p-2 mb-2">
                      {applySuccess}
                    </div>
                  )}
                  <SignedOut>
                    <p className="text-sm text-gray-600 mb-2">
                      Please sign in to apply.
                    </p>
                    <SignInButton mode="modal">
                      <button className="px-4 py-2 rounded bg-blue-600 text-white">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setApplyError(null);
                        setApplySuccess("");
                        try {
                          await applyToJob({
                            jobListingId: job.id,
                            resumeUrl: resumeUrl || undefined,
                            coverLetter: coverLetter || undefined,
                            metadata: undefined,
                          });
                          setApplySuccess("Application submitted successfully");
                          setResumeUrl("");
                          setCoverLetter("");
                        } catch (err) {
                          setApplyError(
                            err?.message || "Failed to submit application"
                          );
                        }
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Resume URL (optional)
                        </label>
                        <input
                          type="url"
                          value={resumeUrl}
                          onChange={(e) => setResumeUrl(e.target.value)}
                          placeholder="https://..."
                          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900">
                          Cover Letter (optional)
                        </label>
                        <textarea
                          value={coverLetter}
                          onChange={(e) =>
                            setCoverLetter(e.target.value.slice(0, 5000))
                          }
                          rows={4}
                          placeholder="Write a brief cover letter..."
                          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Max 5000 characters.
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={applying}
                        className="w-full px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                      >
                        {applying ? "Submitting…" : "Submit Application"}
                      </button>
                    </form>
                  </SignedIn>
                </div>

                {/* Tech Stack */}
                {/* {job.techStack && job.techStack.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1">
                      {job.techStack.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
