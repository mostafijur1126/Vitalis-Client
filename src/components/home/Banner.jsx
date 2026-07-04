"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi"; // Reuse your ember component
import FireEmberBackground from "./FireEmberBackground";

export default function Hero() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1a1a1a]" />
      {/* Soft radial highlights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(212,160,80,0.08),transparent_70%)]" />

      {/* Animated Ember Background */}
      {/* <FireEmberBackground /> */}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
            <motion.h1
              variants={itemVariants}
              className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-[#D4A050]">FITNESS</span>
              <br />
              <span className="text-white">GYM</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-['Inter'] text-lg md:text-xl text-[#a0a0a0] max-w-md mx-auto lg:mx-0"
            >
              YOUR TEXTHERE
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-['Inter'] text-base md:text-lg text-[#8a8a8a] max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              Join thousands of fitness enthusiasts finding their best selves
              through expert‑led classes, mindful movement, and a supportive
              community designed for wellness.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-2">
              <Link
                href="/all-classes"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D4A050] text-black font-['Inter'] font-semibold rounded-full hover:bg-[#e6b84a] transition-colors shadow-lg hover:shadow-xl text-base md:text-lg"
              >
                Get Started
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Right Hero Image */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/hero-image.jpg"
                alt="Fitness hero"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider Indicators – bottom-center */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3"
      >
        <span className="w-3 h-3 rounded-full bg-[#D4A050]" />
        <span className="w-3 h-3 rounded-full bg-white/30" />
        <span className="w-3 h-3 rounded-full bg-white/30" />
      </motion.div>
    </section>
  );
}
