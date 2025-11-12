"use client";

import useSWR from "swr";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { fetchAPI } from "@/lib/api";
import RequireEmployer from "@/components/RequireEmployer";
import { useToast } from "@/components/Toast";

export default function EmployerJobsPage() {
  return (
    <RequireEmployer>
      <Content />
    </RequireEmployer>
  );
}

function Content() {
  const { getToken, isSignedIn } = useAuth();
  const { show } = useToast();
  const { data, error, mutate, isLoading } = useSWR(
    isSignedIn ? ["my-jobs"] : null,
    async () => {
      const token = await getToken();
      if (!token) throw new Error("Missing auth token. Please sign in again.");
      const res = await fetch("/api/jobs/employer/my-jobs?page=1&limit=20", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load");
      return json?.data || json;
    }
  );

  async function closeJob(id) {
    try {
      const token = await getToken();
      if (!token) throw new Error("Missing auth token. Please sign in again.");
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Unable to close job");
      show("Job closed", { type: "success" });
      mutate();
    } catch (err) {
      show(err.message, { type: "error" });
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Jobs</h1>
        <Link href="/dashboard/jobs/new" className="btn btn-primary">New Job</Link>
      </div>

      {isLoading ? (
        <div className="h-64 animate-pulse bg-gray-100 rounded" />
      ) : error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error.message}
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-2">Title</th>
              <th className="py-2">Status</th>
              <th className="py-2">Posted</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(data?.jobs || []).map((job) => (
              <tr key={job.id} className="border-t">
                <td className="py-2">{job.title}</td>
                <td className="py-2 capitalize">{job.status || "active"}</td>
                <td className="py-2">{job.postedDate ? new Date(job.postedDate).toLocaleDateString() : ""}</td>
                <td className="py-2 space-x-3">
                  <Link href={`/dashboard/jobs/${job.id}/edit`} className="text-blue-600">Edit</Link>
                  <Link href={`/dashboard/jobs/${job.id}/applicants`} className="text-gray-700">Applicants</Link>
                  <button onClick={() => closeJob(job.id)} className="text-red-600">Close</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}