"use client";

import { Suspense } from "react";
import RequireEmployer from "@/components/RequireEmployer";
import JobForm from "@/components/JobForm";

export default function NewJobPage() {
  return (
    <RequireEmployer>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-semibold mb-6">Create Job</h1>
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded" />}> 
          <JobForm mode="create" />
        </Suspense>
      </div>
    </RequireEmployer>
  );
}