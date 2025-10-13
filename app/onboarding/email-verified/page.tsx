// ============================================
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function EmailVerifiedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white dark:bg-black">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full sm:w-24 sm:h-24 dark:bg-green-900/30">
            <CheckCircle2 className="w-12 h-12 text-green-600 sm:w-14 sm:h-14 dark:text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Email Verified
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Your email has been successfully verified
        </p>

        {/* Continue Button */}
        <Button
          onClick={() => router.push("/onboarding/career-interest")}
          className="w-full h-12 text-base font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg sm:h-13 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-lg hover:shadow-xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
