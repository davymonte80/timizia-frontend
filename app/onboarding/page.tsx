"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function OnboardingPage() {
  const slides = [
    {
      imageSrc: "/images/job-rejections.png",
      alt: "Rejected Application",
      title: "Break free from endless job rejections",
      description:
        "Tired of submitting endless applications? Build real-world projects that showcase your skills and stand out from other candidates.",
    },
    {
      imageSrc: "/images/skill-training.png",
      alt: "Skill Training",
      title: "Learn by doing",
      description:
        "Practice and grow your skills with the help of our AI tutor guiding you through every stage of your project.",
    },
    {
      imageSrc: "/images/portfolio-showcase.png",
      alt: "Portfolio Showcase",
      title: "Showcase your portfolio",
      description:
        "Turn every project into proof of skill. Share it with employers and stand out.",
    },
    {
      imageSrc: "/images/career-launch.png",
      alt: "Career Launch",
      title: "Ready to launch your career?",
      description:
        "Join Timizia and start building your future today. Gain access to micro-gigs from real businesses and use your completed projects as proof of your skills.",
      isLast: true,
    },
  ];

  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToLast = useCallback(() => {
    if (emblaApi) emblaApi.scrollTo(slides.length - 1);
  }, [emblaApi, slides.length]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const isLastSlide = selectedIndex === slides.length - 1;

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      {/* Embla carousel container */}
      <div className="w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] h-screen flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="relative bg-gray-100 h-1/2 sm:h-3/5 md:h-full md:w-1/2">
                <Image
                  src={slide.imageSrc}
                  alt={slide.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col items-center justify-center px-4 py-6 text-center sm:px-6 md:px-8 lg:px-12 md:w-1/2 h-1/2 sm:h-2/5 md:h-full sm:py-8 md:py-12">
                {/* Navigation Dots */}
                <div className="flex justify-center mb-6 space-x-2 sm:mb-8">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        idx === selectedIndex
                          ? "bg-[#005BFF] scale-110"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      onClick={() => emblaApi?.scrollTo(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Title */}
                <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#005BFF] max-w-lg leading-tight">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="max-w-md px-2 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                  {slide.description}
                </p>

                {/* Last Slide CTA */}
                {slide.isLast && (
                  <div className="w-full max-w-sm px-4 mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                    <Button
                      className="w-full bg-[#005BFF] text-white hover:bg-blue-700 transition-colors duration-200 h-11 sm:h-12 text-base sm:text-lg font-medium shadow-lg hover:shadow-xl"
                      onClick={() => router.push("/auth/signup")}
                    >
                      Sign up
                    </Button>
                    <p className="text-sm text-gray-600 sm:text-base">
                      Have an account?{" "}
                      <button
                        onClick={() => router.push("/auth/login")}
                        className="text-[#005BFF] font-medium hover:underline transition-all duration-200"
                      >
                        Login
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      {!isLastSlide && (
        <div className="absolute left-0 right-0 flex items-center justify-between px-6 bottom-4 sm:px-8 md:px-12">
          <button
            onClick={scrollToLast}
            className="text-sm sm:text-base font-medium text-gray-600 hover:text-[#005BFF] transition-colors duration-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100"
          >
            Skip
          </button>
          <button
            onClick={scrollNext}
            className="group relative bg-[#005BFF] hover:bg-blue-700 text-white rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
            {/* Swipe hint animation */}
            <span className="absolute text-xs text-gray-500 transition-all duration-300 -translate-y-1/2 opacity-0 pointer-events-none -left-8 sm:-left-10 top-1/2 sm:text-sm group-hover:opacity-100 group-hover:-translate-x-1">
              swipe
            </span>
          </button>
        </div>
      )}
    </div>
  );
}