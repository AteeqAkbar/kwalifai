"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * @param {{ initialValues?: any, onSubmit: (payload:any)=>Promise<void> }} props
 */
export default function ProfileForm({ initialValues = {}, onSubmit }) {
  const [values, setValues] = useState(() => ({
    firstName: "",
    lastName: "",
    headline: "",
    summary: "",
    currentPosition: "",
    currentCompany: "",
    location: "",
    country: "",
    city: "",
    websiteUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    portfolioUrl: "",
    avatarUrl: "",
    bannerUrl: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    openToWork: false,
    openToRemote: false,
    experienceLevel: "",
    yearsOfExperience: "",
    educationLevel: "",
    availability: "",
    preferredWorkType: "",
    languages: [],
    timezone: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    isPublic: true,
    userType: "", // Add userType to state
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const languagesText = useMemo(() => {
    // Ensure values.languages is always an array for display
    if (Array.isArray(values.languages)) {
      return values.languages.join(", ");
    } else if (typeof values.languages === "string") {
      // If it's a string (e.g., from initialValues before useEffect updates state),
      // parse it for display, but the state should ideally be an array.
      return values.languages;
    }
    return "";
  }, [values.languages]);

  useEffect(() => {
    setValues((v) => ({
      ...v,
      ...initialValues,
      // Ensure languages in state is always an array after initialValues are loaded
      languages: Array.isArray(initialValues.languages)
        ? initialValues.languages
        : String(initialValues.languages || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
    }));
  }, [initialValues]);

  function isValidUrl(u) {
    if (!u) return true; // optional
    try {
      const _ = new URL(u);
      return true;
    } catch {
      return false;
    }
  }

  function setField(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }));
  }

  function validate() {
    const e = {};
    if (!values.firstName?.trim()) e.firstName = "First name is required";
    if (!values.lastName?.trim()) e.lastName = "Last name is required";
    [
      "websiteUrl",
      "githubUrl",
      "linkedinUrl",
      "twitterUrl",
      "portfolioUrl",
      "avatarUrl",
      "bannerUrl",
    ].forEach((k) => {
      if (!isValidUrl(values[k])) e[k] = "Enter a valid URL";
    });

    if (values.salaryMin && isNaN(Number(values.salaryMin)))
      e.salaryMin = "Must be a number";
    if (values.salaryMax && isNaN(Number(values.salaryMax)))
      e.salaryMax = "Must be a number";
    if (values.yearsOfExperience && isNaN(Number(values.yearsOfExperience)))
      e.yearsOfExperience = "Must be a number";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Normalize payload: omit empty strings/nulls, convert numbers, parse arrays
      const strKeys = [
        "firstName",
        "lastName",
        "headline",
        "summary",
        "currentPosition",
        "currentCompany",
        "location",
        "country",
        "city",
        "websiteUrl",
        "githubUrl",
        "linkedinUrl",
        "twitterUrl",
        "portfolioUrl",
        "avatarUrl",
        "bannerUrl",
        "experienceLevel",
        "educationLevel",
        "availability",
        "preferredWorkType",
        "timezone",
        "phone",
        "dateOfBirth",
        "gender",
        "currency",
        "userType",
      ];
      const numKeys = ["salaryMin", "salaryMax", "yearsOfExperience"];

      const payload = {};
      // strings: include only when non-empty
      for (const k of strKeys) {
        const val = values[k];
        const s = typeof val === "string" ? val.trim() : val;
        if (typeof s === "string" && s.length > 0) {
          payload[k] = s;
        }
      }
      // numbers: include only when valid number
      for (const k of numKeys) {
        const v = values[k];
        if (v !== undefined && v !== null && String(v).trim() !== "") {
          const n = Number(v);
          if (!Number.isNaN(n)) {
            payload[k] = n;
          }
        }
      }
      // booleans
      payload.openToWork = Boolean(values.openToWork);
      payload.openToRemote = Boolean(values.openToRemote);
      payload.isPublic = Boolean(values.isPublic);
      // languages
      const langs = Array.isArray(values.languages)
        ? values.languages
        : String(values.languages || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
      if (langs.length > 0) payload.languages = langs;

      await onSubmit(payload);
    } catch (err) {
      // If backend returned field-level errors, show them inline
      if (Array.isArray(err?.errors)) {
        const fieldErrors = {};
        for (const e of err.errors) {
          if (e?.path && e?.msg) fieldErrors[e.path] = e.msg;
        }
        setErrors((prev) => ({
          ...prev,
          ...fieldErrors,
          form: err.message || "Failed to save",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          form: err?.message || "Failed to save",
        }));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {errors.form}
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold mb-3">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Last name</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">User Type</label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.userType}
              onChange={(e) => setField("userType", e.target.value)}
            >
              <option value="">Select user type</option>
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employer</option>
              <option value="both">Both</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Headline</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.headline}
              onChange={(e) => setField("headline", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Position</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.currentPosition}
              onChange={(e) => setField("currentPosition", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.currentCompany}
              onChange={(e) => setField("currentCompany", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Summary</label>
          <textarea
            className="mt-1 w-full border rounded p-2"
            rows={4}
            value={values.summary}
            onChange={(e) => setField("summary", e.target.value)}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Links</h2>
        {[
          ["websiteUrl", "Website"],
          ["githubUrl", "GitHub"],
          ["linkedinUrl", "LinkedIn"],
          ["twitterUrl", "Twitter"],
          ["portfolioUrl", "Portfolio"],
          ["avatarUrl", "Avatar URL"],
          ["bannerUrl", "Banner URL"],
        ].map(([key, label]) => (
          <div key={key} className="mt-3">
            <label className="block text-sm font-medium">{label}</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values[key] || ""}
              onChange={(e) => setField(key, e.target.value)}
            />
            {errors[key] && (
              <p className="mt-1 text-xs text-red-600">{errors[key]}</p>
            )}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Salary Min</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.salaryMin}
              onChange={(e) => setField("salaryMin", e.target.value)}
            />
            {errors.salaryMin && (
              <p className="mt-1 text-xs text-red-600">{errors.salaryMin}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Salary Max</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.salaryMax}
              onChange={(e) => setField("salaryMax", e.target.value)}
            />
            {errors.salaryMax && (
              <p className="mt-1 text-xs text-red-600">{errors.salaryMax}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.currency}
              onChange={(e) => setField("currency", e.target.value)}
            >
              <option value="">Select currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
              <option value="NGN">NGN</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.openToWork}
              onChange={(e) => setField("openToWork", e.target.checked)}
            />
            Open to work
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.openToRemote}
              onChange={(e) => setField("openToRemote", e.target.checked)}
            />
            Open to remote
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={values.isPublic}
              onChange={(e) => setField("isPublic", e.target.checked)}
            />
            Public profile
          </label>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Experience & More</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Experience level
            </label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.experienceLevel}
              onChange={(e) => setField("experienceLevel", e.target.value)}
            >
              <option value="">Select experience</option>
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="principal">Principal</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Years of experience
            </label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.yearsOfExperience}
              onChange={(e) => setField("yearsOfExperience", e.target.value)}
            />
            {errors.yearsOfExperience && (
              <p className="mt-1 text-xs text-red-600">
                {errors.yearsOfExperience}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Education level</label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.educationLevel}
              onChange={(e) => setField("educationLevel", e.target.value)}
            >
              <option value="">Select education</option>
              <option value="high_school">High School</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Availability</label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.availability}
              onChange={(e) => setField("availability", e.target.value)}
            >
              <option value="">Select availability</option>
              <option value="immediate">Immediate</option>
              <option value="1_week">1 week</option>
              <option value="2_weeks">2 weeks</option>
              <option value="1_month">1 month</option>
              <option value="3_months">3 months</option>
              <option value="notice_period">On notice</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">
              Preferred work type
            </label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.preferredWorkType}
              onChange={(e) => setField("preferredWorkType", e.target.value)}
            >
              <option value="">Select work type</option>
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Languages (comma-separated)
            </label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={languagesText}
              onChange={(e) =>
                setField(
                  "languages",
                  e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                )
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Timezone</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.timezone}
              onChange={(e) => setField("timezone", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Date of birth</label>
            <input
              type="date"
              className="mt-1 w-full border rounded p-2"
              value={values.dateOfBirth || ""}
              onChange={(e) => setField("dateOfBirth", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              className="mt-1 w-full border rounded p-2"
              value={values.gender}
              onChange={(e) => setField("gender", e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </section>

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
