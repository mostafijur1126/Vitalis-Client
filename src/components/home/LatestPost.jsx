"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalendarAlt,
  FaArrowRight,
  FaHeart,
  FaComment,
} from "react-icons/fa";
import { getLatestPosts } from "@/lib/api/forumPosts";
import { useEffect, useState } from "react";

export default function LatestPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fatchData = async () => {
      const data = await getLatestPosts();
      setPosts(data);
    };
    fatchData();
  }, []);

  // If no data, return nothing or a fallback
  if (!posts || posts.length === 0) {
    return null;
  }

  // Only take the 3 most recent posts
  const latest = posts.slice(0, 3);

  // Helper to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Truncate description to ~100 characters
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="py-16 px-4 sm:px-6 bg-white dark:bg-[#1E1C18] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Latest Forum Posts
          </h2>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-2">
            Stay inspired with the freshest discussions from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((post, index) => {
            const likeCount = post.likes?.length || 0;
            const commentCount = post.comments?.length || 0;

            return (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#FCF9F6] dark:bg-[#2D2A24] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E8E0D8] dark:border-[#3A3530] group flex flex-col"
              >
                {/* Post Image */}
                {post.image ? (
                  <div className="relative h-48 w-full bg-[#F5EDE6] dark:bg-[#3A3530] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-[#F5EDE6] dark:bg-[#3A3530] flex items-center justify-center text-[#6B655A] dark:text-[#B8B0A6]">
                    <span className="font-['Inter'] text-sm">No image</span>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col">
                  {/* Author & Date */}
                  <div className="flex items-center gap-2 mb-2 text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                    <div className="flex items-center gap-1.5">
                      <FaUser className="w-3.5 h-3.5 text-[#D4845A]" />
                      <span className="font-['Inter'] font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                        {post.userName || "Anonymous"}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3.5 h-3.5 text-[#D4845A]" />
                      <span className="font-['Inter']">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] leading-tight mb-2">
                    <Link
                      href={`/forum/${post._id}`}
                      className="hover:text-[#D4845A] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* Description (truncated) */}
                  <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] leading-relaxed flex-1 line-clamp-3">
                    {truncateText(post.description || "", 120)}
                  </p>

                  {/* Like & Comment Counts + Read More */}
                  <div className="mt-4 pt-3 border-t border-[#E8E0D8] dark:border-[#3A3530] flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                      <span className="flex items-center gap-1.5">
                        <FaHeart className="w-4 h-4 text-[#D4845A]" />
                        {likeCount}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaComment className="w-4 h-4 text-[#D4845A]" />
                        {commentCount}
                      </span>
                    </div>
                    <Link
                      href={`/forum/${post._id}`}
                      className="inline-flex items-center gap-1.5 font-['Inter'] text-sm font-medium text-[#D4845A] hover:text-[#B86A42] transition-colors"
                    >
                      Read More
                      <FaArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Optional "View All" link */}
        <div className="text-center mt-10">
          <Link
            href="/forum"
            className="font-['Inter'] text-[#D4845A] hover:text-[#B86A42] transition-colors font-medium inline-flex items-center gap-1"
          >
            Browse all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
