// components/jobs/JobFilters.js
import { useState } from "react";

export default function JobFilters({ onFiltersChange, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    q: "",
    location: "",
    jobType: "",
    workMode: "",
    experienceLevel: "",
    minSalary: "",
    maxSalary: "",
    ...initialFilters,
  });

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      q: "",
      location: "",
      jobType: "",
      workMode: "",
      experienceLevel: "",
      minSalary: "",
      maxSalary: "",
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.q}
            onChange={(e) => handleChange("q", e.target.value)}
            placeholder="Search jobs..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Location..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            value={filters.jobType}
            onChange={(e) => handleChange("jobType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Work Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Mode
          </label>
          <select
            value={filters.workMode}
            onChange={(e) => handleChange("workMode", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Modes</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <select
            value={filters.experienceLevel}
            onChange={(e) => handleChange("experienceLevel", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>

        {/* Salary Range */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Salary
            </label>
            <input
              type="number"
              value={filters.minSalary}
              onChange={(e) => handleChange("minSalary", e.target.value)}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Salary
            </label>
            <input
              type="number"
              value={filters.maxSalary}
              onChange={(e) => handleChange("maxSalary", e.target.value)}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
