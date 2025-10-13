"use client";

import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";

export function Splash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000); // Show for 2s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#005BFF] text-white z-50">
      {/* Grad Cap Icon */}
      <GraduationCap size={80} strokeWidth={2} className="mb-4" />

      <h1 className="text-4xl font-bold tracking-wide">Timizia</h1>
    </div>
  );
}
