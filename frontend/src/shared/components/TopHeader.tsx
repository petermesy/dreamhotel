import React from "react";

export default function TopHeader() {
  return (
    <div className="w-full bg-[#c19d5d] px-4 py-2 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs text-white sm:text-sm">

        {/* Email */}
        <a
          href="mailto:reservations@dreamhotelsawla.com"
          className="flex min-w-0 items-center gap-2 hover:opacity-80"
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>

          <span className="truncate">
            reservations@dreamhotelsawla.com
          </span>
        </a>

        {/* Phone */}
        <a
          href="tel:+251911768699"
          className="flex items-center gap-2 whitespace-nowrap hover:opacity-80"
        >
          <svg
            className="h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>

          <span>+251 91 176 8699</span>
        </a>
      </div>
    </div>
  );
}