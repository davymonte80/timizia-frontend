"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AnalyzingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen text-gray-900 bg-white dark:bg-black dark:text-gray-100">
      {/* Mobile View */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 lg:hidden">
        <div className="w-full max-w-md mx-auto text-center">
          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Analyzing your input
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Generating your personalized project...
          </p>

          {/* Animated Orb */}
          <div className="relative w-48 h-48 mx-auto mb-16 sm:w-64 sm:h-64">
            {/* Outer glow rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse"></div>
            <div
              className="absolute rounded-full inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-2xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>

            {/* Main orb */}
            <div className="absolute rounded-full shadow-2xl inset-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-spin-slow">
              <div className="absolute bg-white rounded-full inset-2 dark:bg-black opacity-90"></div>
              <div className="absolute rounded-full inset-6 bg-gradient-to-br from-blue-300 via-purple-400 to-pink-400"></div>
            </div>

            {/* Inner core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full shadow-lg sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"></div>
            </div>
          </div>

          {/* Next Button */}
          {progress === 100 && (
            <Button
              onClick={handleNext}
              className="w-full h-12 text-base font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg sm:h-13 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-lg hover:shadow-xl"
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="items-center justify-center hidden min-h-screen px-8 lg:flex">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid items-center grid-cols-2 gap-12">
            {/* Left: Text Content */}
            <div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900 xl:text-5xl dark:text-white">
                Analyzing your input
              </h1>
              <p className="mb-8 text-lg text-gray-600 xl:text-xl dark:text-gray-400">
                Generating your personalized project...
              </p>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-800">
                  <div
                    className="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  {progress}% complete
                </p>
              </div>

              {progress === 100 && (
                <Button
                  onClick={handleNext}
                  className="px-8 text-lg font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg h-14 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-xl"
                >
                  View Your Learning Path
                </Button>
              )}
            </div>

            {/* Right: Animated Visualization */}
            <div className="relative">
              <div className="relative w-96 h-96 xl:w-[28rem] xl:h-[28rem] mx-auto">
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-3xl animate-pulse"></div>
                <div
                  className="absolute rounded-full inset-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-2xl animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>

                {/* Main orb */}
                <div className="absolute rounded-full shadow-2xl inset-12 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-spin-slow">
                  <div className="absolute bg-white rounded-full inset-3 dark:bg-black opacity-90"></div>
                  <div className="absolute rounded-full inset-8 bg-gradient-to-br from-blue-300 via-purple-400 to-pink-400"></div>
                </div>

                {/* Inner core */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse"></div>
                </div>

                {/* Orbiting particles */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute top-0 w-3 h-3 bg-blue-500 rounded-full shadow-lg left-1/2"></div>
                  <div className="absolute bottom-0 w-3 h-3 bg-purple-500 rounded-full shadow-lg left-1/2"></div>
                  <div className="absolute left-0 w-3 h-3 bg-pink-500 rounded-full shadow-lg top-1/2"></div>
                  <div className="absolute right-0 w-3 h-3 bg-blue-400 rounded-full shadow-lg top-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
