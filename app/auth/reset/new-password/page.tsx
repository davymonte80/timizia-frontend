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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Eye, EyeOff } from "lucide-react";

// --- Zod Schema with rules ---
const passwordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

export default function NewPasswordPage() {
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (data: PasswordForm) => {
    console.log("New password:", data.password);
    window.location.href = "/auth/reset/success";
  };

  // --- Password rules ---
  const hasUpperLower =
    /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);
  const hasNumberOrSymbol =
    /\d/.test(passwordValue) || /[^A-Za-z0-9]/.test(passwordValue);
  const hasMinLength = passwordValue.length >= 8;

  return (
    <div className="flex flex-col justify-center min-h-screen px-4 bg-white">
      <div className="w-full max-w-md mx-auto">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-semibold">Create a new password</h1>
        <p className="mb-6 text-sm text-gray-600">
          To ensure your password remains secure please choose a new password
          with at least 8 characters
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPasswordValue(e.target.value);
                        }}
                        className={
                          form.formState.errors.password
                            ? "border-red-500 pr-10"
                            : "pr-10"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
                        tabIndex={-1}
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className={
                          form.formState.errors.confirmPassword
                            ? "border-red-500 pr-10"
                            : "pr-10"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showConfirm ? (
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

            {/* Password strength checklist */}
            <AnimatePresence>
              {passwordValue.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <p className="text-sm font-medium text-red-600">
                    Please enter your new Password
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      {hasUpperLower ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      Include both lower case and upper case letters
                    </li>
                    <li className="flex items-center gap-2">
                      {hasNumberOrSymbol ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      Include at least one number or symbol
                    </li>
                    <li className="flex items-center gap-2">
                      {hasMinLength ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      Be at least 8 characters long
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
