"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center min-h-screen px-4 bg-white">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Success Icon with animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-2 text-2xl font-semibold"
        >
          Password Reset Successful
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-6 text-sm text-gray-600 sm:text-base"
        >
          You can now log in with your new password.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link href="/auth/login">
            <Button className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Back to Login
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
