import React from "react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-[120px]" />

      {/* User Profile Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300">
        <div className="text-center mb-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/25 mb-4">
            <svg
              className="h-7 w-7 text-white"
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
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            User Profile
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Dynamic Route: <span className="font-mono text-zinc-300">/profile/[id]</span>
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4 mb-6">
          <span className="text-xs uppercase tracking-wider text-zinc-400 block mb-1 font-medium">
            User ID Parameter
          </span>
          <div className="font-mono text-sm text-indigo-300 break-all bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-750">
            {id}
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/profile"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 py-2.5 px-4 text-sm font-medium text-zinc-200 hover:bg-zinc-750 hover:border-zinc-600 transition-all duration-200"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Main Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}