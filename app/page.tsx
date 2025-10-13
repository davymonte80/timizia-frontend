"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/auth-provider";
import { Splash } from "@/components/splash";

export default function RootPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.push("/home");
      } else {
        router.push("/onboarding");
      }
    }, 4000); // Show splash for 4 seconds
    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  return <Splash />;
}
