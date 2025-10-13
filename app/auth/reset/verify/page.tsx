"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || " ";
  const [code, setCode] = useState("");
  const [resending, setResending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: verify code logic
    router.push("/auth/reset/new-password");
  };

  const handleResend = async () => {
    setResending(true);
    // TODO: resend code logic
    setTimeout(() => setResending(false), 1000);
  };

  // Mask email for display
  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    if (user.length <= 2) return email;
    return `${user.slice(0, 2)}${".".repeat(user.length - 2)}@${domain}`;
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen px-4 bg-white sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Stepper */}
        <motion.div
          className="flex items-center justify-center mb-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex w-3/4 sm:w-2/3">
            <div className="flex-1 h-1 bg-gray-200 rounded-l" />
            <div className="flex-1 h-1 bg-blue-600" />
            <div className="flex-1 h-1 bg-gray-200 rounded-r" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-3 text-2xl font-semibold text-center sm:text-3xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Verify your email address
        </motion.h1>

        {/* Instructions */}
        <motion.p
          className="mb-8 text-sm leading-6 text-center text-gray-600 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          We’ve sent a verification code to{" "}
          <span className="font-medium">{maskEmail(email)}</span>.<br />
          Please enter the code below
        </motion.p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* OTP Input */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.1 * idx,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <InputOTPSlot index={idx} />
                  </motion.div>
                ))}
              </InputOTPGroup>
            </InputOTP>
          </motion.div>

          {/* Resend link */}
          <motion.div
            className="flex justify-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            Didn&apos;t receive a code?
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="ml-1 font-medium text-blue-600 hover:underline disabled:opacity-50"
            >
              {resending ? "Resending..." : "Resend"}
            </button>
          </motion.div>

          {/* Verify button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Button
              type="submit"
              className="w-full py-3 text-base font-medium text-white transition-all bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={code.length !== 6}
            >
              <span
                className={`${
                  code.length === 6 ? "animate-pulse" : ""
                } transition-all`}
              >
                Verify
              </span>
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
