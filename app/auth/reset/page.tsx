"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const resetSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ResetPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: z.infer<typeof resetSchema>) => {
    setIsLoading(true);
    console.log("Send reset code to:", data.email);

    // simulate API delay before redirect
    setTimeout(() => {
      router.push(`/auth/reset/verify?email=${encodeURIComponent(data.email)}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/auth/login" className="flex items-center text-sm">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Log in
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto">
        {/* Title + Subtitle */}
        <h1 className="mb-2 text-xl font-bold">Forgot Password</h1>
        <p className="mb-6 text-sm text-gray-600">
          Please enter your email to reset your password
        </p>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="h-12"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-white bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
