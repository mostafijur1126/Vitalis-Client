"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/banner-bg.jpg')`,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
      >
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Transform Your Body, <br />
          <span className="text-[#D4845A]">Transform Your Life</span>
        </h1>
        <p className="font-['Inter'] text-lg sm:text-xl mt-4 text-gray-200 max-w-2xl mx-auto">
          Join thousands of fitness enthusiasts finding their best selves
          through expert‑led classes, mindful movement, and a supportive
          community designed for wellness.
        </p>
        <div className="mt-8">
          <Link
            href="/all-classes"
            className="inline-flex items-center px-8 py-3 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors text-base sm:text-lg shadow-md hover:shadow-lg"
          >
            Explore Classes
            <FiArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
