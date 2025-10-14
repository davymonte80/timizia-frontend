"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "1.1 Identifying Campaign Goals",
    subLesson: "Lesson 1 of 3",
    videoPlaceholder: true,
    transcript: {
      intro:
        "In this lesson learners are introduced to the importance of setting clear, measurable campaign goals that align with business objectives.",
      framework:
        "It covers the SMART goals framework and explains how goals inform content themes, target audiences, and platform choices.",
      concepts: [
        "Why goals setting matters in Digital Marketing",
        "Examples of goals vs action goals",
        "SMART framework applied to marketing campaigns",
        "Linking goals to content themes",
      ],
      resources: [
        {
          title: "S is for Digital Marketing Goals Explained – [Buy blue lime]",
          type: "video",
        },
        {
          title: "SMART Goals in Digital Marketing – Hubspot Blog",
          type: "article",
        },
      ],
    },
  },
  {
    id: 2,
    title: "1.2 Choosing Content Pillars",
    subLesson: "Lesson 2 of 3",
    videoPlaceholder: true,
    transcript: {
      intro:
        "This lesson introduces learners to content pillars, the core themes that guide your marketing content.",
      framework:
        "It explains the 80/20 rule of content creation and how to establish consistent, value-driven brand identity across campaigns.",
      concepts: [
        "Definition and purpose of content pillars",
        "The content pillars align with campaign goals",
        "Examples of strong content pillars for different brands",
        "How to pick 3-4 content pillars that match campaign goals",
      ],
      resources: [
        {
          title: "What are Social Media Content Pillars and Its Types",
          type: "video",
        },
        {
          title: "How To Define Your Content Pillars – Later Blog",
          type: "article",
        },
      ],
    },
  },
  {
    id: 3,
    title: "1.3 Crafting Campaign Messages",
    subLesson: "Lesson 3 of 3",
    videoPlaceholder: true,
    transcript: {
      intro:
        "In this lesson, learners explore how to translate campaign pillars into clear, compelling messages.",
      framework:
        "It covers the role of messaging in driving audience action, ensuring our brand feels consistent in a crowded digital space.",
      concepts: [
        "What makes a strong campaign message",
        "Aligning messages with brand voice and insights",
        "Examples of strong vs weak messaging",
        "Adapting core messages across different platforms",
      ],
      resources: [
        { title: "Crafting Your Marketing Message Strategy", type: "video" },
        { title: "Building a Messaging Framework", type: "article" },
      ],
    },
  },
];

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);

  const lesson = lessons[currentLesson];

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else {
      // Navigate to mini project
      router.push(`/dashboard/project/${params.id}/mini-project`);
    }
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
                Module 1: Digital Marketing Strategy
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-4 py-6 pb-24 mx-auto sm:px-6 lg:px-8">
        {/* Lesson Title */}
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            {lesson.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {lesson.subLesson}
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="relative flex items-center justify-center mb-8 overflow-hidden rounded-lg bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 aspect-video">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm">
              <div className="w-0 h-0 ml-1 border-t-8 border-b-8 border-t-transparent border-l-12 border-l-white border-b-transparent"></div>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Transcript
          </h3>
          <div className="space-y-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            <p>{lesson.transcript.intro}</p>
            <p>{lesson.transcript.framework}</p>
          </div>
        </div>

        {/* Key Concepts */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Key concepts covered
          </h3>
          <ul className="space-y-2">
            {lesson.transcript.concepts.map((concept, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-gray-600 sm:text-base dark:text-gray-400"
              >
                <span className="mt-1 text-blue-600 dark:text-blue-500">•</span>
                <span>{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Resources
          </h3>
          <div className="space-y-3">
            {lesson.transcript.resources.map((resource, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center justify-between p-4 transition-colors border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 group"
              >
                <span className="text-sm text-gray-900 sm:text-base dark:text-white">
                  📺 {resource.title}
                </span>
                <span className="text-blue-600 transition-opacity opacity-0 dark:text-blue-500 group-hover:opacity-100">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentLesson === 0}
            variant="outline"
            className="flex items-center gap-2 px-6 py-2.5 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next Lesson
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </main>

      {/* Help Button */}
      <button className="fixed z-50 flex items-center justify-center text-white transition-all bg-blue-600 rounded-full shadow-lg bottom-6 right-6 w-14 h-14 hover:bg-blue-700 hover:scale-110">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
