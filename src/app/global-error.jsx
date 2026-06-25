"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDumbbell, FaSync, FaExclamationTriangle } from "react-icons/fa";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-[#FCF9F6] dark:bg-[#1E1C18] transition-colors duration-300">
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg"
          >
            {/* Illustration */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-white dark:bg-[#2D2A24] rounded-full flex items-center justify-center shadow-lg border border-[#E8E0D8] dark:border-[#3A3530]">
                <FaDumbbell className="w-20 h-20 text-[#D4845A] opacity-60" />
                <div className="absolute -top-2 -right-2 bg-[#C47A6A] text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                  <FaExclamationTriangle className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] mb-3">
              Something Went Wrong
            </h1>
            <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] text-base md:text-lg leading-relaxed">
              We hit a snag while loading this page. Don't worry – our team has
              been notified. Please try again or return home.
            </p>

            {/* Optional: Show error details in development */}
            {process.env.NODE_ENV === "development" && error?.message && (
              <div className="mt-4 p-3 bg-[#C47A6A]/10 dark:bg-[#C47A6A]/20 border border-[#C47A6A] rounded-lg text-left">
                <p className="font-['Inter'] text-sm text-[#C47A6A] font-mono break-all">
                  {error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-md hover:shadow-lg"
              >
                <FaSync className="w-4 h-4" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#D4845A] text-[#D4845A] font-['Inter'] font-medium rounded-lg hover:bg-[#D4845A] hover:text-white transition-colors"
              >
                Go Home
              </Link>
            </div>

            {/* Footer */}
            <p className="mt-8 font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              © 2026 VITALIS Fitness. All rights reserved.
            </p>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
