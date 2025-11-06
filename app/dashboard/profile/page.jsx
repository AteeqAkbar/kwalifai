"use client";

import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import ProfileForm from "@/components/ProfileForm";
import { fetchAPI } from "@/lib/api";

export default function ProfilePage() {
  const { getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // includes profile if exists
  const [savedMessage, setSavedMessage] = useState("");

  async function loadProfile() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI("/api/users/me", { getToken });
      setUser(data || null);
    } catch (err) {
      setError(err?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(payload) {
    setSavedMessage("");
    try {
      // Resolve user's email (primary first, then fallbacks)
      const primaryEmail = clerkUser?.primaryEmailAddress?.emailAddress;
      const fallbackEmail = Array.isArray(clerkUser?.emailAddresses)
        ? clerkUser.emailAddresses[0]?.emailAddress
        : undefined;
      const emailResolved = (primaryEmail || fallbackEmail || "").trim();
      if (!emailResolved) {
        throw new Error(
          "No email found for this account. Please ensure your Clerk user has an email."
        );
      }

      const isUpdate = !!user?.profile;
      const finalPayload = { ...payload, email: emailResolved };

      // Use PUT to update if a profile already exists, otherwise POST to create
      const method = isUpdate ? "PUT" : "POST";
      const endpoint = isUpdate ? "/api/users/me" : "/api/users";

      await fetchAPI(endpoint, { method, body: finalPayload, getToken });
      setSavedMessage("Profile saved successfully");
      await loadProfile();
    } catch (err) {
      throw err; // handled inside ProfileForm
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <SignedOut>
        <div className="rounded-md bg-yellow-50 p-4 mb-4 text-sm text-yellow-800">
          You need to sign in to access your profile.
        </div>
        <SignInButton mode="modal">
          <button className="px-4 py-2 rounded bg-blue-600 text-white">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        {loading && <div className="text-gray-600">Loading profile...</div>}
        {!loading && error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            {savedMessage && (
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 mb-4">
                {savedMessage}
              </div>
            )}
            <ProfileForm
              initialValues={{
                ...user?.profile,
                userType: user?.userType || "",
                languages: Array.isArray(user?.profile?.languages)
                  ? user.profile.languages
                  : String(user?.profile?.languages || "")
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
              }}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </SignedIn>
    </div>
  );
}
