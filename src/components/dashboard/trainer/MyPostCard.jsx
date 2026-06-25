"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaHeart,
  FaComment,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
import { DeletePostModal } from "./DeletePostModal";

export default function MyPostCard({ post }) {
  const {
    status,
    _id,
    title,
    description,
    userName,
    role,
    userImage,
    createdAt,
    image,
    likes = [],
    comments = [],
  } = post;

  const totalLikes = likes?.length || 0;
  const totalComments = comments?.length || 0;

  // Format time ago
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#2D2A24] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8E0D8] dark:border-[#3A3530] flex flex-col relative"
    >
      {/* Delete Button */}

      <DeletePostModal post={post}></DeletePostModal>

      {/* Post Image */}
      {image && (
        <div className="relative w-full h-48 bg-[#F5EDE6] dark:bg-[#3A3530]">
          <Image
            src={image}
            alt={title}
            unoptimized
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Author & Date */}
        <div className="flex items-center gap-3 mb-3">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#D4845A]"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-[#D4845A]" />
          )}
          <div>
            <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
              {userName || "Anonymous"}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#6B655A] dark:text-[#B8B0A6]">
              {role && (
                <span className="font-['Inter'] font-medium text-[#D4845A] bg-[#D4845A]/10 dark:bg-[#D4845A]/20 px-2 py-0.5 rounded-full">
                  {role}
                </span>
              )}
              <span>•</span>
              <span className="font-['Inter']">{timeAgo(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] mb-2">
          <Link
            href={`/forum/${_id}`}
            className="hover:text-[#D4845A] transition-colors"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] leading-relaxed line-clamp-3 flex-1 mb-3">
          {description || "No description available."}
        </p>

        {/* Footer: likes, comments, read more */}
        <div className="flex items-center justify-between text-sm font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] pt-3 border-t border-[#E8E0D8] dark:border-[#3A3530]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaHeart className="w-4 h-4 text-[#D4845A]" /> {totalLikes}
            </span>
            <span className="flex items-center gap-1">
              <FaComment className="w-4 h-4 text-[#D4845A]" /> {totalComments}
            </span>
          </div>
          <Link
            href={`/forum/${_id}`}
            className="flex items-center gap-1 text-[#D4845A] hover:text-[#B86A42] font-medium transition-colors"
          >
            Read More <FaArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
