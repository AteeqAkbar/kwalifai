"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetchAPI } from "@/lib/api";

export default function JobDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    id ? ["job", id] : null,
    async () => {
      const json = await fetchAPI(`/api/jobs/${id}`);
      return json;
    }
  );

  if (isLoading) return <div className="h-64 animate-pulse bg-gray-100 rounded" />;
  if (error) return (
    <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
      {error.message || "Failed to load job"}
    </div>
  );
  if (!data) return null;

  const job = data;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{job.title}</h1>
          <p className="text-gray-600">{job.metadata?.company || job.company || "Company"}</p>
          <p className="text-sm text-gray-500">
            {job.location} • {job.jobType} • {job.workMode}
          </p>
        </div>
        {job.applicationUrl && (
          <a
            href={job.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Apply
          </a>
        )}
      </div>

      <section>
        <h2 className="font-medium mb-2">Description</h2>
        <p className="prose text-gray-800 whitespace-pre-line">{job.description}</p>
      </section>

      <section>
        <h2 className="font-medium mb-2">Requirements</h2>
        <p className="prose text-gray-800 whitespace-pre-line">{job.requirements}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Experience</div>
          <div className="font-medium">{job.experienceLevel}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Salary Range</div>
          <div className="font-medium">
            {job.salaryRangeMin || job.salaryRangeMax
              ? `${job.salaryRangeMin ? `$${job.salaryRangeMin.toLocaleString()}` : ""}${
                  job.salaryRangeMin && job.salaryRangeMax ? " - " : ""
                }${job.salaryRangeMax ? `$${job.salaryRangeMax.toLocaleString()}` : ""}`
              : "Not specified"}
          </div>
        </div>
      </section>
    </div>
  );
}