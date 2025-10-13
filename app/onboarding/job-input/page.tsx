"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function JobInputPage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) return;

    setIsGenerating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/onboarding/analyzing");
  };

  const handleSkip = () => {
    router.push("/dashboard");
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
          {/* Progress bar - 4/4 (100%) */}
          <div className="flex-1 mx-4">
            <div className="h-1 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-800">
              <div className="w-full h-full transition-all duration-300 bg-blue-600 rounded-full dark:bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl px-4 py-6 mx-auto sm:px-6 md:px-8 lg:px-12">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Have a job in mind?
        </h1>

        {/* Subtitle */}
        <p className="mb-6 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Paste a real job description to create a project aligned with it
        </p>

        {/* Textarea */}
        <div className="mb-4">
          <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Your message
          </label>
          <Textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[200px] sm:min-h-[250px] bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-blue-600 dark:focus:ring-blue-500 resize-none"
          />
          <p className="mt-2 text-xs text-gray-500 sm:text-sm dark:text-gray-500">
            Like postings from LinkedIn, Glassdoor, or company websites
          </p>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={!jobDescription.trim() || isGenerating}
          className="w-full h-12 mb-4 text-base font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg sm:h-13 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate learning path"
          )}
        </Button>

        {/* Skip Link */}
        <button
          onClick={handleSkip}
          className="w-full text-sm font-medium text-center text-gray-600 transition-colors sm:text-base dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
