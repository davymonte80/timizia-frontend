"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectBlueprintPage() {
  const router = useRouter();
  const params = useParams();
  const [selectedModule, setSelectedModule] = useState("");

  const projectData = {
    title: "Digital Marketing",
    subtitle: "Problem Statement",
    description:
      "A local cafe wants to grow its online community and increase foot traffic through social media\n\nAs a Digital Marketer, your job is to create a 1-month social media content plan that's clear, consistent, and engaging.",
    sections: [
      {
        title: "What you'll learn",
        items: [
          "How to define marketing goals and content pillars",
          "How to research and understand a target audience",
          "How to plan a content calendar",
          "How to write effective goal captions and create strong CTAs",
          "How to summarize and present a content plan",
        ],
      },
    ],
    milestones: [
      "Digital Marketing Strategy",
      "Building A Content Calendar",
      "Review & Refine",
    ],
    deliverables: [
      "Monthly content calendar (4 weeks)",
      "7 sample social media posts",
      "Final project presentation",
    ],
    tools: ["Instagram", "Canva", "Google Sheets"],
    level: "Beginner",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
        <div className="px-4 py-4 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-900 transition-colors dark:text-white hover:text-blue-600 dark:hover:text-blue-500"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-4 py-6 pb-24 mx-auto sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Project Blueprint
        </h1>
        <h2 className="mb-6 text-lg font-semibold text-blue-600 sm:text-xl dark:text-blue-500">
          {projectData.subtitle}
        </h2>

        {/* Description */}
        <div className="mb-8">
          <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line sm:text-base dark:text-gray-400">
            {projectData.description}
          </p>
        </div>

        {/* What you'll learn */}
        {projectData.sections.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="flex items-start gap-3 text-sm text-gray-600 sm:text-base dark:text-gray-400"
                >
                  <span className="mt-1 text-blue-600 dark:text-blue-500">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Milestones */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Milestones
          </h3>
          <div className="space-y-3">
            {projectData.milestones.map((milestone, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedModule(milestone)}
                className="w-full p-4 text-left transition-colors border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                  {milestone}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Expected Deliverables */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Expected Deliverables
          </h3>
          <ul className="space-y-2">
            {projectData.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-600 sm:text-base dark:text-gray-400"
              >
                <span className="mt-1 text-blue-600 dark:text-blue-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Tools
          </h3>
          <div className="flex flex-wrap gap-3">
            {projectData.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-900 dark:text-gray-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Start Project Button */}
        <Button
          onClick={() =>
            router.push(`/dashboard/project/${params.id}/module/1`)
          }
          className="w-full h-12 text-base font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg sm:h-13 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-lg hover:shadow-xl"
        >
          Start Project
        </Button>
      </main>
    </div>
  );
}
