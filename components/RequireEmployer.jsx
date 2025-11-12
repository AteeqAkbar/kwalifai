"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { fetchAPI } from "@/lib/api";

export default function RequireEmployer({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function run() {
      if (!isLoaded) return; // wait for Clerk to hydrate
      if (!isSignedIn) {
        const next = encodeURIComponent(pathname || "/");
        router.replace(`/sign-in?redirect_url=${next}`);
        return;
      }
      try {
        const user = await fetchAPI("/api/users/me", { getToken });
        const type = user?.userType;
        const ok = type === "employer" || type === "both";
        if (mounted) {
          setAllowed(!!ok);
          setChecking(false);
          if (!ok) {
            router.replace("/");
          }
        }
      } catch (err) {
        if (mounted) {
          setAllowed(false);
          setChecking(false);
          router.replace("/");
        }
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [isLoaded, isSignedIn, getToken, router, pathname]);

  if (!isLoaded || checking) {
    return <div className="h-24 animate-pulse bg-gray-100 rounded" />;
  }

  if (!allowed) return null;
  return children;
}