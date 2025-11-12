"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import RequireEmployer from "@/components/RequireEmployer";
import { useToast } from "@/components/Toast";

export default function ApplicantsPage() {
  return (
    <RequireEmployer>
      <Content />
    </RequireEmployer>
  );
}

function Content() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { show } = useToast();

  const { data, error, isLoading } = useSWR(
    id ? ["apps", id] : null,
    async () => {
      const token = await getToken({ template: "default" });
      const res = await fetch(`/api/jobs/${id}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load applications");
      return json?.data || json;
    }
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Applicants</h1>
      {isLoading ? (
        <div className="h-64 animate-pulse bg-gray-100 rounded" />
      ) : error ? (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error.message}</div>
      ) : (
        <div className="space-y-3">
          {(data || []).length === 0 && (
            <div className="text-gray-600">No applications yet.</div>
          )}
          {(data || []).map((app) => (
            <div key={app.id} className="card p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{app.applicantId}</div>
                  <div className="text-sm text-gray-600">{app.status}</div>
                </div>
                {app.resumeUrl && (
                  <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Resume</a>
                )}
              </div>
              {app.coverLetter && (
                <p className="mt-3 whitespace-pre-line text-gray-800">{app.coverLetter}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}