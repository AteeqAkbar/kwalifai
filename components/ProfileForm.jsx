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
    userType: "",
    ...initialValues,
  }));

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const languagesText = useMemo(() => {
    if (Array.isArray(values.languages)) {
      return values.languages.join(", ");
    } else if (typeof values.languages === "string") {
      return values.languages;
    }
    return "";
  }, [values.languages]);

  useEffect(() => {
    setValues((v) => ({
      ...v,
      ...initialValues,
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

  function isValidPhone(phone) {
    if (!phone) return true; // optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
  }

  function isValidDate(date) {
    if (!date) return true; // optional
    return !isNaN(Date.parse(date));
  }

  function setField(name, val) {
    setValues((prev) => ({ ...prev, [name]: val }));
  }

  function validate() {
    const e = {};

    // Name validations (optional but with length constraints)
    if (values.firstName && values.firstName.length > 100) {
      e.firstName = "First name must be less than 100 characters";
    }
    if (values.lastName && values.lastName.length > 100) {
      e.lastName = "Last name must be less than 100 characters";
    }

    // Headline validation
    if (values.headline && values.headline.length > 255) {
      e.headline = "Headline must be less than 255 characters";
    }

    // Summary validation
    if (values.summary && values.summary.length > 2000) {
      e.summary = "Summary must be less than 2000 characters";
    }

    // URL validations
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

    // Number validations
    if (values.salaryMin) {
      const num = Number(values.salaryMin);
      if (isNaN(num) || !Number.isInteger(num) || num < 0) {
        e.salaryMin = "Must be a positive integer";
      }
    }
    if (values.salaryMax) {
      const num = Number(values.salaryMax);
      if (isNaN(num) || !Number.isInteger(num) || num < 0) {
        e.salaryMax = "Must be a positive integer";
      }
    }
    if (values.yearsOfExperience) {
      const num = Number(values.yearsOfExperience);
      if (isNaN(num) || !Number.isInteger(num) || num < 0 || num > 100) {
        e.yearsOfExperience = "Must be an integer between 0 and 100";
      }
    }

    // Currency validation
    if (values.currency && values.currency.length !== 3) {
      e.currency = "Currency must be 3 characters";
    }

    // Experience level validation
    const validExperienceLevels = [
      "entry",
      "mid",
      "senior",
      "lead",
      "executive",
    ];
    if (
      values.experienceLevel &&
      !validExperienceLevels.includes(values.experienceLevel)
    ) {
      e.experienceLevel = "Select a valid experience level";
    }

    // Education level validation
    const validEducationLevels = [
      "high_school",
      "bachelor",
      "master",
      "phd",
      "other",
    ];
    if (
      values.educationLevel &&
      !validEducationLevels.includes(values.educationLevel)
    ) {
      e.educationLevel = "Select a valid education level";
    }

    // Availability validation
    const validAvailability = [
      "immediate",
      "1_month",
      "2_months",
      "3_months",
      "not_available",
    ];
    if (
      values.availability &&
      !validAvailability.includes(values.availability)
    ) {
      e.availability = "Select a valid availability";
    }

    // Preferred work type validation
    const validWorkTypes = [
      "full_time",
      "part_time",
      "contract",
      "freelance",
      "internship",
    ];
    if (
      values.preferredWorkType &&
      !validWorkTypes.includes(values.preferredWorkType)
    ) {
      e.preferredWorkType = "Select a valid work type";
    }

    // Phone validation
    if (values.phone && !isValidPhone(values.phone)) {
      e.phone = "Enter a valid phone number";
    }

    // Date validation
    if (values.dateOfBirth && !isValidDate(values.dateOfBirth)) {
      e.dateOfBirth = "Enter a valid date";
    }

    // Gender validation
    const validGenders = ["male", "female", "other", "prefer_not_to_say"];
    if (values.gender && !validGenders.includes(values.gender)) {
      e.gender = "Select a valid gender";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // Normalize payload according to backend expectations
      // Note: email is not included here as it's managed by Clerk
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
        "userType", // userType is included here
      ];
      const numKeys = ["salaryMin", "salaryMax", "yearsOfExperience"];

      const payload = {};

      // strings: include only when non-empty, but ALWAYS include userType
      for (const k of strKeys) {
        const val = values[k];
        const s = typeof val === "string" ? val.trim() : val;

        // For userType, always include it even if empty
        if (k === "userType") {
          payload[k] = s || ""; // Always include userType, even if empty
        }
        // For other strings, only include when non-empty
        else if (typeof s === "string" && s.length > 0) {
          payload[k] = s;
        }
      }

      // numbers: include only when valid number
      for (const k of numKeys) {
        const v = values[k];
        if (v !== undefined && v !== null && String(v).trim() !== "") {
          const n = Number(v);
          if (!Number.isNaN(n) && Number.isInteger(n)) {
            payload[k] = n;
          }
        }
      }

      // booleans
      payload.openToWork = Boolean(values.openToWork);
      payload.openToRemote = Boolean(values.openToRemote);
      payload.isPublic = Boolean(values.isPublic);

      // languages - ensure it's an array
      const langs = Array.isArray(values.languages)
        ? values.languages
        : String(values.languages || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
      if (langs.length > 0) payload.languages = langs;

      console.log("Payload being sent:", payload); // Check if userType is here

      await onSubmit(payload);
    } catch (err) {
      // ... error handling code remains the same
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
          <div>
            <label className="block text-sm font-medium">Headline</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.headline}
              onChange={(e) => setField("headline", e.target.value)}
            />
            {errors.headline && (
              <p className="mt-1 text-xs text-red-600">{errors.headline}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Position</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.currentPosition}
              onChange={(e) => setField("currentPosition", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.currentCompany}
              onChange={(e) => setField("currentCompany", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.location}
              onChange={(e) => setField("location", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.country}
              onChange={(e) => setField("country", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              className="mt-1 w-full border rounded p-2"
              value={values.city}
              onChange={(e) => setField("city", e.target.value)}
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
          {errors.summary && (
            <p className="mt-1 text-xs text-red-600">{errors.summary}</p>
          )}
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
              type="number"
              min="0"
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
              type="number"
              min="0"
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
            {errors.currency && (
              <p className="mt-1 text-xs text-red-600">{errors.currency}</p>
            )}
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
              <option value="entry">Entry</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="executive">Executive</option>
            </select>
            {errors.experienceLevel && (
              <p className="mt-1 text-xs text-red-600">
                {errors.experienceLevel}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Years of experience
            </label>
            <input
              type="number"
              min="0"
              max="100"
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
            {errors.educationLevel && (
              <p className="mt-1 text-xs text-red-600">
                {errors.educationLevel}
              </p>
            )}
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
              <option value="1_month">1 month</option>
              <option value="2_months">2 months</option>
              <option value="3_months">3 months</option>
              <option value="not_available">Not available</option>
            </select>
            {errors.availability && (
              <p className="mt-1 text-xs text-red-600">{errors.availability}</p>
            )}
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
            </select>
            {errors.preferredWorkType && (
              <p className="mt-1 text-xs text-red-600">
                {errors.preferredWorkType}
              </p>
            )}
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
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
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
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
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
            {errors.dateOfBirth && (
              <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth}</p>
            )}
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
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-xs text-red-600">{errors.gender}</p>
            )}
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
