"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaTrash,
  FaUser,
  FaCalendarAlt,
  FaTag,
  FaPlus,
} from "react-icons/fa";
import { getForumPosts, deleteForumPost } from "@/lib/api/forumPosts";
import toast from "react-hot-toast";

export default function ForumPostsManagePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getForumPosts();
        setPosts(data);
      } catch (err) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleDelete = async (postId) => {
    setActionLoading(postId);
    try {
      await deleteForumPost(postId);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      toast.error("Failed to delete post: " + (err.message || "Unknown error"));
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#A68B6E]/20 text-[#A68B6E] dark:bg-[#A68B6E]/30 dark:text-[#A68B6E]">
            Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#D4A050]/20 text-[#D4A050] dark:bg-[#D4A050]/30 dark:text-[#D4A050]">
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#C47A6A]/20 text-[#C47A6A] dark:bg-[#C47A6A]/30 dark:text-[#C47A6A]">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#6B655A]/20 text-[#6B655A] dark:bg-[#6B655A]/30 dark:text-[#B8B0A6]">
            {status?.toUpperCase() || "UNKNOWN"}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="w-8 h-8 text-[#D4845A] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#C47A6A] font-['Inter']">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 px-4 sm:px-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Forum Posts
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            {posts.length} {posts.length === 1 ? "post" : "posts"} on the
            platform
          </p>
        </div>
        <Link
          href="/dashboard/admin/add-forum-post"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
        >
          <FaPlus className="w-4 h-4" />
          Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="text-[#6B655A] dark:text-[#B8B0A6] font-['Inter']">
            No posts found.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Author</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    <td className="py-3 px-4">
                      {post.image ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F5EDE6] dark:bg-[#3A3530]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#F5EDE6] dark:bg-[#3A3530] flex items-center justify-center text-[#6B655A] dark:text-[#B8B0A6] text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/forum/${post._id}`}
                        className="font-medium text-[#2D2A24] dark:text-[#EAE5DE] hover:text-[#D4845A] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {post.userImage ? (
                          <img
                            src={post.userImage}
                            alt={post.userName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-4 h-4 text-[#6B655A] dark:text-[#B8B0A6]" />
                        )}
                        <span className="text-[#2D2A24] dark:text-[#EAE5DE]">
                          {post.userName}
                        </span>
                        <span className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                          ({post.userRole})
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {post.category ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-full text-xs text-[#D4845A]">
                          <FaTag className="w-3 h-3" />
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-[#6B655A] dark:text-[#B8B0A6] text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE] text-xs">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(post.status)}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(post._id)}
                        disabled={actionLoading === post._id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C47A6A] text-[#C47A6A] rounded-lg text-xs font-medium hover:bg-[#C47A6A] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading === post._id ? (
                          <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FaTrash className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
