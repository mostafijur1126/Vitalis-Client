"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

const posts = [
  {
    id: 1,
    category: "NUTRITION",
    date: "Oct 10, 2024",
    title: "5 Pre-Workout Meals to Fuel Your HIIT",
    description:
      "Discover the perfect balance of carbs and protein to maximize your gym performance without feeling heavy or sluggish.",
    author: "Dr. Julian Hart",
    slug: "pre-workout-meals-hiit",
  },
  {
    id: 2,
    category: "WELLNESS",
    date: "Oct 10, 2024",
    title: "The Psychology of Consistency",
    description:
      "Learn how small habits loops can transform your fitness journey from a chore into a lifelong passion you actually look forward to.",
    author: "Coach Linda M.",
    slug: "psychology-consistency",
  },
  {
    id: 3,
    category: "TRAINING",
    date: "Oct 9, 2024",
    title: "Perfect Your Squat Form in 5 Steps",
    description:
      "Master the squat with these expert tips that will improve your mobility, strength, and overall lower body development.",
    author: "Coach Mike R.",
    slug: "perfect-squat-form",
  },
  {
    id: 4,
    category: "RECOVERY",
    date: "Oct 8, 2024",
    title: "Why Sleep is Your Secret Weapon",
    description:
      "Learn how quality sleep enhances muscle recovery, mental clarity, and overall athletic performance.",
    author: "Dr. Sarah K.",
    slug: "sleep-secret-weapon",
  },
];

export default function CommunityBuzz() {
  return (
    <section className="py-16 md:py-20 bg-[#FCF9F6] dark:bg-[#1E1C18] transition-colors duration-300">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Community Buzz
          </h2>
          <p className="font-['Inter'] text-lg text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            Stay inspired with latest stories and fitness tips from our
            community.
          </p>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white dark:bg-[#2D2A24] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8E0D8] dark:border-[#3A3530]"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[#D4845A] bg-[#D4845A]/10 dark:bg-[#D4845A]/20 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] flex items-center gap-1">
                  <FaCalendarAlt className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>

              <h3 className="font-['Inter'] text-xl font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mb-2">
                <Link
                  href={`/forum/${post.slug}`}
                  className="hover:text-[#D4845A] transition-colors"
                >
                  {post.title}
                </Link>
              </h3>

              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] leading-relaxed line-clamp-2 mb-3">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] flex items-center gap-1">
                  <FaUser className="w-3.5 h-3.5" />
                  <strong className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                    {post.author}
                  </strong>
                </span>
                <Link
                  href={`/forum/${post.slug}`}
                  className="font-['Inter'] text-sm font-medium text-[#D4845A] hover:text-[#B86A42] transition-colors flex items-center gap-1"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Optional "View All" link */}
        <div className="text-center mt-10">
          <Link
            href="/forum"
            className="font-['Inter'] text-[#D4845A] hover:text-[#B86A42] transition-colors font-medium inline-flex items-center gap-1"
          >
            View all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
