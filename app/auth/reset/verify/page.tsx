"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;

    setVerifying(true);
    setError("");

    try {
      // TODO: verify code logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      router.push("/onboarding/career-interest");
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      // TODO: resend code logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // Mask email for display
  const maskEmail = (email: string) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    if (user.length <= 2) return email;
    return `${user.slice(0, 2)}${"•".repeat(
      Math.min(user.length - 2, 4)
    )}@${domain}`;
  };

  return (
    <div className="min-h-screen text-gray-900 bg-white dark:bg-black dark:text-gray-100">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800">
        <div className="flex items-center px-4 py-4 sm:px-6 md:px-8">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-900"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6 dark:text-gray-300" />
          </button>
          {/* Progress bar - 2/4 (50%) */}
          <div className="flex-1 mx-4">
            <div className="h-1 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-800">
              <div className="w-1/2 h-full transition-all duration-300 bg-blue-600 rounded-full dark:bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md px-4 py-6 mx-auto sm:px-6 md:px-8 lg:px-12">
        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white sm:mb-4">
          Verify your email address
        </h1>

        {/* Instructions */}
        <p className="mb-8 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
          We've sent a verification code to{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {maskEmail(email)}
          </span>
          . Please enter the code below
        </p>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* OTP Input */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              className="gap-2 sm:gap-3"
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <InputOTPSlot
                    key={idx}
                    index={idx}
                    className="w-10 h-12 text-lg font-semibold text-gray-900 transition-all duration-200 bg-white border-gray-300 rounded-lg sm:w-12 sm:h-14 sm:text-xl dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Resend link */}
          <div className="flex items-center justify-center text-sm text-gray-600 sm:text-base dark:text-gray-400">
            <span>Didn't receive a code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="ml-1.5 font-medium text-blue-600 dark:text-blue-500 hover:underline disabled:opacity-50 transition-all"
            >
              {resending ? "Resending..." : "Resend"}
            </button>
          </div>

          {/* Verify button */}
          <Button
            type="submit"
            disabled={code.length !== 6 || verifying}
            className="w-full h-12 mt-8 text-base font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg sm:h-13 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {verifying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
