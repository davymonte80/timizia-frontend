"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Check } from "lucide-react";

const careerInterests = [
  {
    category: "Software Development",
    options: [
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "Mobile App Development",
      "Game Development",
    ],
  },
  {
    category: "DevOps & Cloud",
    options: [
      "DevOps Engineering",
      "Cloud Architecture",
      "Site Reliability Engineering",
      "Infrastructure Engineering",
      "Platform Engineering",
    ],
  },
  {
    category: "Data & AI",
    options: [
      "Data Science",
      "Machine Learning Engineering",
      "Artificial Intelligence",
      "Data Engineering",
      "Business Intelligence",
    ],
  },
  {
    category: "Cybersecurity",
    options: [
      "Security Engineering",
      "Penetration Testing",
      "Security Operations",
      "Application Security",
      "Network Security",
    ],
  },
  {
    category: "Digital Marketing",
    options: [
      "SEO Specialist",
      "Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "Growth Marketing",
    ],
  },
  {
    category: "Programming Languages",
    options: [
      "Python Development",
      "JavaScript/TypeScript",
      "Go Programming",
      "Rust Programming",
      "Java Development",
      "C++ Development",
    ],
  },
  {
    category: "Blockchain & Web3",
    options: [
      "Smart Contract Development",
      "Blockchain Engineering",
      "DeFi Development",
      "NFT Development",
      "Web3 Development",
    ],
  },
  {
    category: "Product & Design",
    options: [
      "Product Management",
      "UI/UX Design",
      "Product Design",
      "Design Systems",
      "User Research",
    ],
  },
];

const careerLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "senior", label: "Senior" },
];

export default function CareerInterestPage() {
  const router = useRouter();
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleContinue = () => {
    if (selectedInterest && selectedLevel) {
      router.push("/onboarding/job-input");
    }
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
          {/* Progress bar - 3/4 (75%) */}
          <div className="flex-1 mx-4">
            <div className="h-1 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-800">
              <div className="w-3/4 h-full transition-all duration-300 bg-blue-600 rounded-full dark:bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl px-4 py-6 mx-auto sm:px-6 md:px-8 lg:px-12">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Welcome to Timizia
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          Let&apos;s personalize your journey so we can recommend the right
          projects
        </p>

        {/* Career Interest Section */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Career Interest
          </label>
          <Accordion type="single" collapsible className="space-y-2">
            {careerInterests.map((category, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="px-4 bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-950"
              >
                <AccordionTrigger className="py-4 text-sm font-medium text-gray-900 hover:no-underline sm:text-base dark:text-gray-100">
                  {category.category}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-2">
                    {category.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => setSelectedInterest(option)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedInterest === option
                            ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400"
                            : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm sm:text-base">{option}</span>
                          {selectedInterest === option && (
                            <Check className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Career Level Section */}
        <div className="mb-8">
          <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Career Level
          </label>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="h-12 text-gray-900 bg-white border-gray-300 sm:h-13 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300 dark:bg-gray-950 dark:border-gray-700">
              {careerLevels.map((level) => (
                <SelectItem
                  key={level.value}
                  value={level.value}
                  className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800"
                >
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleContinue}
          disabled={!selectedInterest || !selectedLevel}
          className="w-full h-12 text-base font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg shadow-lg sm:h-13 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 sm:text-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate learning path
        </Button>
      </div>
    </div>
  );
}
