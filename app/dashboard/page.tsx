"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Search, Home, BookOpen, Briefcase, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName"); // Make sure you set this at login/registration
    setUserName(storedName || "there");
  }, []);
  const suggestions = [
    {
      id: 1,
      title: "Digital Marketing",
      description:
        "Learn how to build and execute a digital content strategy from scratch",
      level: "Beginner",
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Data Analyst",
      description:
        "Learn Python, SQL and data visualization to uncover insights from complex datasets",
      level: "Beginner",
      color: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
              Hi, {userName}
            </h1>
            <button className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-900">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-900 border-none rounded-lg text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-4 py-6 mx-auto sm:px-6">
        {/* Suggestions Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                Suggestions
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Based on your career goals and interests we recommend these
                projects
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {suggestions.map((project) => (
              <Card
                key={project.id}
                className="transition-shadow bg-white border-none shadow-sm cursor-pointer hover:shadow-md dark:bg-gray-950"
                onClick={() => router.push(`/dashboard/project/${project.id}`)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-300">
                          {project.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/project/${project.id}`);
                    }}
                    className="w-full mt-4 font-medium text-white transition-colors bg-blue-600 rounded-lg h-11 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-950 dark:border-gray-800 lg:hidden">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === "home"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("learn")}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === "learn"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Learn</span>
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeTab === "portfolio"
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Briefcase className="w-6 h-6" />
            <span className="text-xs font-medium">Portfolio</span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex flex-col items-center gap-1 px-4 py-2 ${
                  activeTab === "profile"
                    ? "text-blue-600 dark:text-blue-500"
                    : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={() => setActiveTab("profile")}
              >
                <User className="w-6 h-6" />
                <span className="text-xs font-medium">Profile</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuItem
                onClick={() => router.push("/profile/logout")}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Logout
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/profile/settings")}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
