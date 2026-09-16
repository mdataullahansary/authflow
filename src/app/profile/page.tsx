"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface UserProfile {
  _id: string;
  name?: string;
  username?: string;
  email: string;
  isVerified?: boolean;
  isAdmin?: boolean;
}

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch user details from API
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/me");
      console.log("User details:", res.data);
      // handles common API response patterns: res.data.data or res.data.user or res.data
      const userData = res.data.data || res.data.user || res.data;
      setData(userData);
      toast.success("User details fetched!");
    } catch (error: any) {
      console.error("Failed to fetch user details:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Could not load user details.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Attempt automatic fetch on load
  useEffect(() => {
    getUserDetails();
  }, []);

  // Logout handler
  const logout = async () => {
    try {
      setLoggingOut(true);
      await axios.get("/api/user/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Logout failed. Please try again.";
      toast.error(message);
    } finally {
      setLoggingOut(false);
    }
  };

  const copyUserId = () => {
    if (data?._id) {
      navigator.clipboard.writeText(data._id);
      setCopied(true);
      toast.success("User ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayName = data?.name || data?.username || "Authenticated User";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-purple-600/20 blur-[130px]" />

      {/* Profile Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
        {/* Header with Avatar */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-zinc-800/80 pb-6 mb-6">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-2xl font-bold text-white shadow-lg shadow-indigo-500/25">
            {initials || "AU"}
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-zinc-900">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-white truncate">
                {displayName}
              </h1>
              {data?.isAdmin && (
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
                  Admin
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-400 mt-1 truncate">
              {data?.email || "Signed in"}
            </p>

            {data?.isVerified !== undefined && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                <span
                  className={`h-2 w-2 rounded-full ${
                    data.isVerified ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <span>{data.isVerified ? "Verified Account" : "Unverified Account"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="space-y-4 mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Account Details
          </h2>

          {/* User ID Field */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span>Account ID</span>
              <button
                onClick={copyUserId}
                disabled={!data?._id}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {copied ? "Copied!" : "Copy ID"}
              </button>
            </div>
            <div className="font-mono text-sm text-zinc-200 break-all">
              {data?._id ? (
                <Link
                  href={`/profile/${data._id}`}
                  className="hover:text-indigo-400 underline decoration-zinc-600 hover:decoration-indigo-400 transition-colors"
                  title="View Dynamic Route Profile"
                >
                  {data._id}
                </Link>
              ) : (
                <span className="text-zinc-500 italic">
                  {loading ? "Fetching account ID..." : "No ID loaded"}
                </span>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4">
            <span className="text-xs text-zinc-400 block mb-1">Registered Email</span>
            <span className="text-sm text-zinc-200 break-all">
              {data?.email || (
                <span className="text-zinc-500 italic">
                  {loading ? "Fetching email..." : "Not available"}
                </span>
              )}
            </span>
          </div>

          {/* Dynamic Link Banner (if ID available) */}
          {data?._id && (
            <div className="flex items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3.5 text-xs text-indigo-300">
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-indigo-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <span>Dynamic Profile Route</span>
              </span>
              <Link
                href={`/profile/${data._id}`}
                className="font-semibold text-indigo-400 hover:text-indigo-200 underline decoration-indigo-500/50 hover:decoration-indigo-300 transition-colors"
              >
                /profile/{data._id.slice(0, 6)}...
              </Link>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Refresh Details Button */}
          <button
            onClick={getUserDetails}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 py-2.5 px-4 text-sm font-medium text-zinc-200 hover:bg-zinc-750 hover:border-zinc-600 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-zinc-400"
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
                <span>Loading...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Refresh Details</span>
              </>
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            disabled={loggingOut}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-2.5 px-4 text-sm font-semibold text-white shadow-lg shadow-red-600/25 hover:from-red-500 hover:to-rose-500 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loggingOut ? (
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
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Log Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}