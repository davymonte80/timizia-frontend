"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, X, FileText } from "lucide-react";

export default function MiniProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    router.push(`/dashboard/project/${params.id}/feedback`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 text-white bg-blue-600 dark:bg-blue-700">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-1 transition-colors rounded hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-sm font-semibold sm:text-base">
                Project: Defining Goals and Themes
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl px-4 py-6 pb-24 mx-auto sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Mini Project
        </h2>
        <p className="mb-8 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Now it's time to apply what you've learned throughout Module 1.
        </p>

        {/* Project Brief */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Project Brief</h3>
          <p className="mb-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            A local cafe wants to grow its online community and increase foot traffic through
            social media
          </p>
          <p className="mb-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            As a Digital Marketer, your job is to create a 1-month social media content plan that's
            clear, consistent, and engaging.
          </p>
        </div>

        {/* Tasks */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Tasks</h3>
          <ol className="space-y-3">
            {[
              "Define a clear campaign goal using the SMART framework.",
              "Choose 3-4 content pillars that support this goal and audience.",
              "Craft a compelling campaign message with supporting points and a strong call-to-action.",
            ].map((task, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-600 sm:text-base dark:text-gray-400"
              >
                <span className="font-bold text-gray-900 dark:text-white">{idx + 1}.</span>
                <span>{task}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Deliverable */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Deliverable</h3>
          <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Upload a single .docx or .pdf document titled
            Module1_CampaignStrategy_[YourName].docx
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Submission</h3>
          <div className="p-8 text-center border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-700">
            {uploadedFile ? (
              <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
                <p className="mb-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                  Upload your project document for review. You can submit a docx or pdf file.
                </p>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-500">
                  Choose files
                </p>
                                                <input
                                                  type="file"
                                                  accept=".docx,.pdf"
                                                  onChange={handleFileUpload}
                                                  className="hidden"
                                                />
                                              </label>
                                                        )}
                      </div>
                    </div>
            
                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmit}
                        disabled={!uploadedFile}
                        className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      >
                        Submit
                      </Button>
                    </div>
                  </main>
                </div>