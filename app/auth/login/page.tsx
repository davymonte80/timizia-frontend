"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Mail, CircleUserRound, Loader2, Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/lib/api/auth";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"choose" | "form">("choose");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setError("");

    try {
      await loginUser(data);
      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message || "Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen px-4 py-8 bg-white dark:bg-black sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-900 dark:text-white">
          Log in
        </h1>

        {/* Step 1 → Choose method */}
        {step === "choose" && (
          <div className="space-y-3">
            <Button
              variant="outline"
              className="flex items-center justify-center w-full h-12 rounded-full"
              onClick={() => setStep("form")}
            >
              <Mail className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" />
              Continue with Email
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center w-full h-12 rounded-full"
            >
              <CircleUserRound className="w-5 h-5 mr-2 text-red-500" />
              Continue with Google
            </Button>
          </div>
        )}

        {/* Step 2 → Form */}
        {step === "form" && (
          <>
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="h-12 text-gray-900 bg-white border-gray-300 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100"
                          disabled={isLoading}
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
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            {...field}
                            className="h-12 pr-12 text-gray-900 bg-white border-gray-300 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute text-gray-400 transition-colors -translate-y-1/2 right-3 top-1/2 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Forgot password */}
                <div className="flex justify-end">
                  <Link
                    href="/auth/reset"
                    className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                {/* Login button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800" />
              <span className="mx-2 text-sm text-gray-500 dark:text-gray-500">
                Or
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-800" />
            </div>

            {/* Social login */}
            <Button
              variant="outline"
              className="flex items-center justify-center w-full h-12 rounded-lg"
            >
              <CircleUserRound className="w-5 h-5 mr-2 text-red-500" />
              Log in with Google
            </Button>
          </>
        )}

        {/* Signup link */}
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
