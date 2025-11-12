"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { fetchAPI } from "@/lib/api";
import { useToast } from "@/components/Toast";

const jobTypes = ["full_time", "part_time", "contract", "freelance"];
const workModes = ["remote", "hybrid", "onsite"];
const levels = ["entry", "mid", "senior", "lead"];

export default function JobForm({ job, mode = "create" }) {
  const router = useRouter();
  const { getToken, isSignedIn } = useAuth();
  const { show } = useToast();

  const [form, setForm] = useState({
    title: job?.title || "",
    description: job?.description || "",
    requirements: job?.requirements || "",
    jobType: job?.jobType || "full_time",
    workMode: job?.workMode || "remote",
    experienceLevel: job?.experienceLevel || "entry",
    location: job?.location || "",
    salaryRangeMin: job?.salaryRangeMin ?? "",
    salaryRangeMax: job?.salaryRangeMax ?? "",
    applicationUrl: job?.applicationUrl || "",
    status: job?.status || "active",
    applicationDeadline: job?.applicationDeadline || "",
    techStack: job?.techStack ? toCSV(job.techStack) : "",
    benefits: job?.benefits ? toCSV(job.benefits) : "",
  });

  const submitting = useMemo(() => false, []);

  function toCSV(val) {
    if (!val) return "";
    return Array.isArray(val) ? val.join(", ") : String(val);
  }

  function toArray(val) {
    if (!val) return undefined;
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      show("Please sign in to continue", { type: "error" });
      return;
    }
    try {
      const token = await getToken();
      if (!token) throw new Error("Missing auth token. Please sign in again.");
      const payload = {
        ...form,
        salaryRangeMin: form.salaryRangeMin ? Number(form.salaryRangeMin) : undefined,
        salaryRangeMax: form.salaryRangeMax ? Number(form.salaryRangeMax) : undefined,
        techStack: toArray(form.techStack),
        benefits: toArray(form.benefits),
      };

      const method = mode === "edit" ? "PUT" : "POST";
      const url = mode === "edit" ? `/api/jobs/${job.id}` : "/api/jobs";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");

      show(mode === "edit" ? "Job updated" : "Job created", { type: "success" });
      router.push("/dashboard/jobs");
    } catch (err) {
      show(err.message || "Something went wrong", { type: "error" });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Title" name="title" value={form.title} onChange={update} required />
        <Input label="Location" name="location" value={form.location} onChange={update} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Select label="Job Type" name="jobType" value={form.jobType} onChange={update} options={jobTypes} />
        <Select label="Work Mode" name="workMode" value={form.workMode} onChange={update} options={workModes} />
        <Select label="Experience" name="experienceLevel" value={form.experienceLevel} onChange={update} options={levels} />
      </div>

      <TextArea label="Description" name="description" value={form.description} onChange={update} required minLength={10} />
      <TextArea label="Requirements" name="requirements" value={form.requirements} onChange={update} required minLength={10} />

      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Salary Min" name="salaryRangeMin" type="number" value={form.salaryRangeMin} onChange={update} />
        <Input label="Salary Max" name="salaryRangeMax" type="number" value={form.salaryRangeMax} onChange={update} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Application URL" name="applicationUrl" type="url" value={form.applicationUrl} onChange={update} />
        <Input label="Deadline" name="applicationDeadline" type="date" value={form.applicationDeadline} onChange={update} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Tech Stack (comma separated)" name="techStack" value={form.techStack} onChange={update} />
        <Input label="Benefits (comma separated)" name="benefits" value={form.benefits} onChange={update} />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="btn btn-primary">
          {mode === "edit" ? "Save Changes" : "Create Job"}
        </button>
      </div>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <input className="input mt-1" {...props} />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <textarea className="textarea mt-1" rows={6} {...props} />
    </label>
  );
}

function Select({ label, options, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-700">{label}</span>
      <select className="select mt-1" {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}