"use client";

import { Suspense } from "react";
import JobDetail from "@/components/JobDetail";

export default function JobDetailPage() {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded" />}> 
        <JobDetail />
      </Suspense>
    </div>
  );
}