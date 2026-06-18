"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaDumbbell } from "react-icons/fa";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FCF9F6] via-[#F5EDE6] to-[#F0E8E0] dark:from-[#1E1C18] dark:via-[#2D2A24] dark:to-[#1E1C18] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] leading-tight">
              Transform Your Body, <br />
              <span className="text-[#D4845A]">Transform Your Life</span>
            </h1>
            <p className="font-['Inter'] text-lg sm:text-xl text-[#6B655A] dark:text-[#B8B0A6] max-w-lg">
              Join thousands of fitness enthusiasts finding their best selves
              through expert-led classes, mindful movement, and a supportive
              community designed for wellness.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/all-classes"
                className="inline-flex items-center px-6 py-3 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors text-base sm:text-lg shadow-md hover:shadow-lg"
              >
                Explore Classes
                <FiArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-3xl flex items-center justify-center overflow-hidden">
              <Image
                src="/images/yoga.png"
                alt=""
                width={500}
                height={500}
              ></Image>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
