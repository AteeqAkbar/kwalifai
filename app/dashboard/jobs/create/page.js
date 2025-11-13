// app/dashboard/jobs/create/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJobMutations } from "@/hooks/useJobs";

export default function CreateJobPage() {
  const router = useRouter();
  const { createJob, loading, error } = useJobMutations();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    jobType: "full_time",
    workMode: "remote",
    experienceLevel: "mid",
    salaryRangeMin: "",
    salaryRangeMax: "",
    location: "",
    applicationUrl: "",
    applicationDeadline: "",
    techStack: "",
    benefits: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobData = {
        ...formData,
        salaryRangeMin: formData.salaryRangeMin
          ? parseInt(formData.salaryRangeMin)
          : undefined,
        salaryRangeMax: formData.salaryRangeMax
          ? parseInt(formData.salaryRangeMax)
          : undefined,
        techStack: formData.techStack
          ? formData.techStack.split(",").map((t) => t.trim())
          : undefined,
      };

      await createJob(jobData);
      alert("Job created successfully!");
      router.push("/dashboard/jobs");
    } catch (error) {
      // Error is handled by the hook
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Job</h1>
        <p className="text-gray-600">
          Fill in the details for your new job posting
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Job Title */}
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Job Title *
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  minLength="3"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description *
              </label>
              <div className="mt-2">
                <textarea
                  name="description"
                  id="description"
                  required
                  minLength="10"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Requirements */}
            <div className="sm:col-span-6">
              <label
                htmlFor="requirements"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Requirements *
              </label>
              <div className="mt-2">
                <textarea
                  name="requirements"
                  id="requirements"
                  required
                  minLength="10"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Job Details */}
            <div className="sm:col-span-2">
              <label
                htmlFor="jobType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Job Type *
              </label>
              <div className="mt-2">
                <select
                  name="jobType"
                  id="jobType"
                  required
                  value={formData.jobType}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="workMode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Work Mode *
              </label>
              <div className="mt-2">
                <select
                  name="workMode"
                  id="workMode"
                  required
                  value={formData.workMode}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="experienceLevel"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Experience Level *
              </label>
              <div className="mt-2">
                <select
                  name="experienceLevel"
                  id="experienceLevel"
                  required
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="entry">Entry</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                </select>
              </div>
            </div>

            {/* Salary Range */}
            <div className="sm:col-span-3">
              <label
                htmlFor="salaryRangeMin"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Minimum Salary
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="salaryRangeMin"
                  id="salaryRangeMin"
                  value={formData.salaryRangeMin}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="salaryRangeMax"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Maximum Salary
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="salaryRangeMax"
                  id="salaryRangeMax"
                  value={formData.salaryRangeMax}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="sm:col-span-3">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="applicationDeadline"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Application Deadline
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="applicationDeadline"
                  id="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="applicationUrl"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Application URL
              </label>
              <div className="mt-2">
                <input
                  type="url"
                  name="applicationUrl"
                  id="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="techStack"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tech Stack (comma separated)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="techStack"
                  id="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="benefits"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Benefits
              </label>
              <div className="mt-2">
                <textarea
                  name="benefits"
                  id="benefits"
                  rows={3}
                  value={formData.benefits}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
