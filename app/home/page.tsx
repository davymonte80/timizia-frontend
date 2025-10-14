"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/onboarding");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Hi, XXXXX</h1>
      <Input placeholder="Search..." className="mt-4" />
      <h2 className="mt-8 text-xl font-semibold">Suggestions</h2>
      <div className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Analyst</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Learn Python, SQL, and data visualization to uncover insights from
              complex datasets.
            </p>
            <Button className="mt-4 bg-primary">View Project</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
