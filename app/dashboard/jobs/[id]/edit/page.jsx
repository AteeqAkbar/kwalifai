"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import RequireEmployer from "@/components/RequireEmployer";
import JobForm from "@/components/JobForm";
import { fetchAPI } from "@/lib/api";

export default function EditJobPage() {
  return (
    <RequireEmployer>
      <Content />
    </RequireEmployer>
  );
}

function Content() {
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Job</h1>
      <JobForm mode="edit" job={data} />
    </div>
  );
}