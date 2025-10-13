"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

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
              <div className="relative h-2/3 md:h-full md:w-1/2">
                <Image
                  src={slide.imageSrc}
                  alt={slide.alt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col items-center justify-center px-6 text-center md:w-1/2 h-1/3 md:h-full">
                {/* Navigation Dots */}
                <div className="flex justify-center mb-4 space-x-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-3 h-3 rounded-full transition ${
                        idx === selectedIndex ? "bg-[#005BFF]" : "bg-gray-300"
                      }`}
                      onClick={() => emblaApi?.scrollTo(idx)}
                    />
                  ))}
                </div>

                {/* Title */}
                <h2 className="mb-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#005BFF]">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="max-w-md text-sm text-gray-600 sm:text-base md:text-lg">
                  {slide.description}
                </p>

                {/* Last Slide CTA */}
                {slide.isLast && (
                  <div className="w-full max-w-sm mt-8 space-y-4">
                    <Button
                      className="w-full bg-[#005BFF] text-white hover:bg-blue-700"
                      onClick={() => router.push("/auth/signup")}
                    >
                      Sign up
                    </Button>
                    <p className="text-sm text-gray-600">
                      Have an account?{" "}
                      <button
                        onClick={() => router.push("/auth/login")}
                        className="text-[#005BFF] font-medium"
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

      {/* Prev/Next Buttons (desktop only) */}
      <Button
        variant="ghost"
        className="absolute hidden -translate-y-1/2 md:flex left-4 top-1/2"
        onClick={scrollPrev}
        disabled={selectedIndex === 0}
      >
        <ChevronLeft className="w-8 h-8 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        className="absolute hidden -translate-y-1/2 md:flex right-4 top-1/2"
        onClick={scrollNext}
        disabled={selectedIndex === slides.length - 1}
      >
        <ChevronRight className="w-8 h-8 text-gray-600" />
      </Button>
    </div>
  );
}
