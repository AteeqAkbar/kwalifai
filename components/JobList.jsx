"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import JobCard from "@/components/JobCard";
import { fetchAPI } from "@/lib/api";

function Skeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-24 bg-gray-200 rounded mb-4" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function JobList() {
  const sp = useSearchParams();
  const router = useRouter();
  const [localQ, setLocalQ] = useState(sp.get("q") || "");
  const [localLocation, setLocalLocation] = useState(sp.get("location") || "");
  const query = useMemo(() => {
    const p = new URLSearchParams();
    const entries = [
      ["page", sp.get("page")],
      ["limit", sp.get("limit")],
      ["q", sp.get("q")],
      ["location", sp.get("location")],
      ["jobType", sp.get("jobType")],
      ["workMode", sp.get("workMode")],
      ["experienceLevel", sp.get("experienceLevel")],
      ["minSalary", sp.get("minSalary")],
      ["maxSalary", sp.get("maxSalary")],
      ["status", sp.get("status")],
    ];
    for (const [k, v] of entries) {
      if (v && String(v).trim().length > 0) p.set(k, v);
    }
    return p.toString();
  }, [sp]);

  const { data, error, isLoading } = useSWR(
    ["jobs", query],
    async () => {
      const path = query ? `/api/jobs?${query}` : "/api/jobs";
      const json = await fetchAPI(path);
      return json;
    },
    { revalidateOnFocus: false }
  );

  if (isLoading) return <Skeleton />;
  if (error) return (
    <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
      {error.message || "Failed to load jobs"}
    </div>
  );

  const jobs = data?.jobs ?? [];
  const pages = Number(data?.pages || 1);
  const currentPage = Number(data?.currentPage || 1);

  if (!jobs.length) {
    return (
      <div className="text-center text-gray-600 py-20">
        No jobs found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar
        q={localQ}
        location={localLocation}
        onSubmit={(vals) => {
          const p = new URLSearchParams(query);
          if (vals.q) p.set("q", vals.q); else p.delete("q");
          if (vals.location) p.set("location", vals.location); else p.delete("location");
          p.delete("page"); // reset to first page on filter change
          router.push(`/jobs?${p.toString()}`);
        }}
        onChangeQ={setLocalQ}
        onChangeLocation={setLocalLocation}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={normalizeJob(job)} />
        ))}
      </div>

      {pages > 1 && (
        <Pager
          pages={pages}
          currentPage={currentPage}
          onChange={(page) => {
            const p = new URLSearchParams(query);
            p.set("page", String(page));
            router.push(`/jobs?${p.toString()}`);
          }}
        />
      )}
    </div>
  );
}

function normalizeJob(job) {
  const salary = job.salaryRangeMin || job.salaryRangeMax
    ? `${job.salaryRangeMin ? `$${job.salaryRangeMin.toLocaleString()}` : ""}${
        job.salaryRangeMin && job.salaryRangeMax ? " - " : ""
      }${job.salaryRangeMax ? `$${job.salaryRangeMax.toLocaleString()}` : ""}`
    : undefined;
  return {
    id: job.id,
    title: job.title,
    company: job.company || job.metadata?.company || "Company",
    type: job.jobType,
    location: job.location || job.workMode,
    salary,
    posted: job.postedDate ? new Date(job.postedDate).toLocaleDateString() : "",
  };
}

function FilterBar({ q, location, onSubmit, onChangeQ, onChangeLocation }) {
  return (
    <form
      className="flex flex-col md:flex-row gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ q, location });
      }}
    >
      <input
        className="input"
        placeholder="Search keywords (e.g. react, node)"
        value={q}
        onChange={(e) => onChangeQ(e.target.value)}
      />
      <input
        className="input"
        placeholder="Location (e.g. Remote, SF)"
        value={location}
        onChange={(e) => onChangeLocation(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}

function Pager({ pages, currentPage, onChange }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        className="btn"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
      >
        Previous
      </button>
      <span className="text-sm text-gray-600">Page {currentPage} of {pages}</span>
      <button
        className="btn"
        disabled={currentPage >= pages}
        onClick={() => onChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}