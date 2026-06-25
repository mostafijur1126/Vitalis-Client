"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaDumbbell, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] flex items-center justify-center px-4 py-12 transition-colors duration-300">
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
          </div>
          <div className="absolute -top-2 -right-2 bg-[#D4845A] text-white text-sm font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
            404
          </div>
        </div>

        {/* Error Message */}
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] mb-3">
          Page Not Found
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] text-base md:text-lg leading-relaxed">
          Oops! The page you're looking for seems to have taken a rest day.
          Let's get you back on track.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-md hover:shadow-lg"
        >
          <FaHome className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Subtle footer */}
        <p className="mt-8 font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
          © 2026 VITALIS Fitness. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
