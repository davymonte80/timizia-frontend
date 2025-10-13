"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Mail, Facebook, Phone, CircleUserRound } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    if (data.password !== "correct") {
      setError("Please enter your password and try again");
      return;
    }
    setError("");
    // Redirect here
  };

  return (
    <div className="flex flex-col justify-center min-h-screen px-4 py-8 bg-background sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-semibold text-center text-foreground">
          Log in
        </h1>

        {/* Step 1 → Choose method */}
        {step === "choose" && (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="flex items-center justify-center w-full rounded-full"
              onClick={() => setStep("form")}
            >
              <Mail className="w-5 h-5 mr-2 text-primary" />
              Continue with Email
            </Button>
            {/* <Button
              variant="outline"
              className="flex items-center justify-center w-full rounded-full"
            >
              <Phone className="w-5 h-5 mr-2 text-primary" />
              Continue with Phone
            </Button> */}
            <Button
              variant="outline"
              className="flex items-center justify-center w-full rounded-full"
            >
              <CircleUserRound className="w-5 h-5 mr-2 text-red-500" />
              Continue with Google
            </Button>
          </div>
        )}

        {/* Step 2 → Form */}
        {step === "form" && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
            >
              {/* Email */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className={`rounded-md ${
                          error ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                    </FormControl>
                    {error && (
                      <p className="mt-1 text-sm text-red-600">{error}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/auth/reset"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Login button */}
              <Button
                type="submit"
                className="w-full text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Log in
              </Button>
            </form>
          </Form>
        )}

        {/* Divider */}
        {step === "form" && (
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-muted" />
            <span className="mx-2 text-sm text-muted-foreground">Or</span>
            <div className="flex-grow border-t border-muted" />
          </div>
        )}

        {/* Social logins below form */}
        {step === "form" && (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="flex items-center justify-center w-full rounded-md"
            >
              <CircleUserRound className="w-5 h-5 mr-2 text-red-500" />
              Log in with Google
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center w-full rounded-md"
            >
              <Facebook className="w-5 h-5 mr-2 text-blue-600" />
              Log in with Facebook
            </Button>
          </div>
        )}

        {/* Signup link */}
        <p className="mt-6 text-sm text-center text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
