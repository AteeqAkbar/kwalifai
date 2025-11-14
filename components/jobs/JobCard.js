// components/jobs/JobCard.js
import Link from "next/link";

export default function JobCard({ job }) {
  const formatSalary = (min, max) => {
    if (!min && !max) return "Salary not specified";
    if (!min) return `Up to $${max?.toLocaleString()}`;
    if (!max) return `From $${min?.toLocaleString()}`;
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      closed: "bg-red-100 text-red-800",
      draft: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900">
          <Link href={`/jobs/${job.id}`} className="hover:text-blue-600">
            {job?.title}
          </Link>
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            job?.status
          )}`}
        >
          {job?.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {job.jobType?.replace("_", " ")}
        </span>
        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
          {job?.workMode}
        </span>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
          {job?.experienceLevel}
        </span>
        {job.location && (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {job?.location}
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {job?.description}
      </p>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {formatSalary(job?.salaryRangeMin, job?.salaryRangeMax)}
        </div>
        <div className="text-xs text-gray-400">
          Posted {new Date(job?.postedDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
