"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const isFormValid =
    user.name.trim().length > 0 &&
    user.email.trim().length > 0 &&
    user.password.length >= 6;

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user.name.trim() || !user.email.trim() || !user.password) {
      setErrorMessage("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    if (user.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.post("/api/user/signup", user);
      console.log("Signup success", response.data);

      toast.success("Account created successfully! Redirecting...");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-[120px]" />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25 mb-4">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Sign up to get started with AuthFlow
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-950/40 p-3.5 text-sm text-red-300">
            <svg
              className="h-5 w-5 shrink-0 text-red-400 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={onSignUp} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={user.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-zinc-750 bg-zinc-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 transition-colors duration-200 focus:border-indigo-500 focus:bg-zinc-800/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Email Address Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={user.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-750 bg-zinc-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 transition-colors duration-200 focus:border-indigo-500 focus:bg-zinc-800/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-wider text-zinc-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={user.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-750 bg-zinc-800/60 py-2.5 pl-10 pr-10 text-sm text-white placeholder-zinc-500 transition-colors duration-200 focus:border-indigo-500 focus:bg-zinc-800/90 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-200 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500">
              Must be at least 6 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 py-3 px-4 font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        {/* Footer / Login Link */}
        <div className="mt-8 text-center border-t border-zinc-800/80 pt-6">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

