"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth(); // Use the new logout method

  useEffect(() => {
    // Simulate logout process
    setTimeout(() => {
      logout(); // Call the logout method
      router.push("/onboarding");
    }, 1000);
  }, [router, logout]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Logging Out
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please wait while we log you out and redirect you to the onboarding
          screen.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => {
              logout();
              router.push("/onboarding/email-verified");
            }}
            className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          ></Button>
        </div>
      </div>
    </div>
  );
}
