"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaHeart,
  FaComment,
  FaArrowLeft,
  FaShareAlt,
  FaBookmark,
  FaReply,
  FaThumbsUp,
  FaQuoteLeft,
  FaEdit,
} from "react-icons/fa";
import { getForumsPostById } from "@/lib/api/forumPosts";
import { authClient, useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { RiDeleteBin5Line } from "react-icons/ri";

// Sample related articles
const relatedArticles = [
  {
    id: "rel1",
    title: "The Power of Cinnamon Folding for Peak Performance",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: "rel2",
    title: "5 Recovery Myths Debunked by Science",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400",
  },
];

export default function ForumPostDetailsPage() {
  const params = useParams();
  const postId = params?.id;
  const { data: session } = useSession();
  const user = session?.user;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null); // commentId
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [editingComment, setEditingComment] = useState(null); // commentId
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const { data: token } = await authClient.token();

        if (!token) {
          toast.error("Authentication failed. Please login again.");
          return;
        }
        const data = await getForumsPostById(postId, token.token);
        setPost(data);
        setComments(data.comments || []);
        setLikeCount(data.likes?.length || 0);
        if (user?.id && data.likes?.includes(user.id)) {
          setIsLiked(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, user]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const timeAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const handelLike = async () => {
    if (!user) return toast.error("Please login first!");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, userId: user.id }),
        },
      );
      const data = await res.json();
      if (data.liked === true) {
        toast.success("You liked this post!");
      } else {
        toast.error("Your like is removed!");
      }
      setIsLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first!");
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/comment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            userId: user.id,
            userName: user.name,
            userImage: user.image || null,
            role: user.role || "user",
            content: newComment,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Your comment successfully!");
        setComments([data.comment, ...comments]);
        setNewComment("");
      }
    } catch (err) {
      console.error("Comment error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentEdit = async (commentId) => {
    if (!editText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/comment/${postId}/${commentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editText, userId: user.id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setComments(
          comments.map((c) =>
            c._id === commentId ? { ...c, content: editText, edited: true } : c,
          ),
        );
        setEditingComment(null);
        setEditText("");
        toast.success("Comment updated!");
      }
    } catch (err) {
      console.error("Edit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    // if (!confirm("Delete this comment?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/comment/${postId}/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setComments(comments.filter((c) => c._id !== commentId));
        toast.success("Comment deleted!");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCommentLike = async (commentId, currentLikes) => {
    if (!user) return toast.error("Please login first!");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/comment/like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId, commentId, userId: user.id }),
        },
      );
      const data = await res.json();
      // UI update
      setComments(
        comments.map((c) =>
          c._id === commentId
            ? {
                ...c,
                likes: data.liked
                  ? [...(c.likes || []), user.id]
                  : (c.likes || []).filter((id) => id !== user.id),
              }
            : c,
        ),
      );
    } catch (err) {
      console.error("Comment like error:", err);
    }
  };

  // Reply Submit
  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forum/reply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId,
            commentId,
            userId: user.id,
            userName: user.name,
            userImage: user.image || null,
            role: user.role || "user",
            content: replyText,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        // UI update
        setComments(
          comments.map((c) =>
            c._id === commentId
              ? { ...c, replies: [...(c.replies || []), data.reply] }
              : c,
          ),
        );
        setReplyText("");
        setReplyingTo(null);
      }
    } catch (err) {
      console.error("Reply error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D4845A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] flex items-center justify-center">
        <p className="font-['Inter'] text-[#C47A6A]">
          {error || "Post not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/forum"
            className="inline-flex items-center gap-2 text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors font-['Inter'] text-sm"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Forum
          </Link>
        </div>

        {/* Two‑column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column – Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden"
            >
              {/* Post Image */}
              {post.image && (
                <div className="relative w-full h-64 md:h-80 bg-[#F5EDE6] dark:bg-[#3A3530]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE] leading-tight">
                  {post.title}
                </h1>

                {/* Author Byline */}
                <div className="flex items-center gap-3 mt-4">
                  {post.userImage ? (
                    <Image
                      src={post.userImage}
                      alt={post.userName}
                      width={100}
                      height={100}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#D4845A]"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-[#D4845A]" />
                  )}
                  <div>
                    <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                      {post.userName || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                      {post.role && (
                        <span className="font-['Inter'] font-medium text-[#D4845A] bg-[#D4845A]/10 dark:bg-[#D4845A]/20 px-2 py-0.5 rounded-full text-xs">
                          {post.role.charAt(0).toUpperCase() +
                            post.role.slice(1)}
                        </span>
                      )}
                      <span>•</span>
                      <span className="font-['Inter']">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <p className="font-['Inter'] text-[#2D2A24] dark:text-[#EAE5DE] leading-relaxed text-base">
                    {post.description}
                  </p>
                </div>

                {/* Quote Block */}
                <div className="mt-8 p-6 bg-[#F5EDE6] dark:bg-[#3A3530] rounded-xl border-l-4 border-[#D4845A]">
                  <FaQuoteLeft className="text-[#D4845A] w-5 h-5 mb-2 opacity-60" />
                  <p className="font-['Inter'] italic text-[#2D2A24] dark:text-[#EAE5DE] leading-relaxed">
                    "True recovery isn't just about what you eat; it's about the
                    timing and the biological integrity of the nutrient you
                    provide your body after a high-intensity stimulus."
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                  <button
                    onClick={handelLike}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-all ${
                      isLiked
                        ? "bg-[#D4845A] text-white"
                        : "bg-[#F5EDE6] dark:bg-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#E8E0D8] dark:hover:bg-[#4A4540]"
                    }`}
                  >
                    <FaHeart
                      className={`w-4 h-4 ${isLiked ? "text-white" : "text-[#D4845A]"}`}
                    />
                    {isLiked ? "Liked" : "Like"} ({likeCount})
                  </button>
                  <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EDE6] dark:bg-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#E8E0D8] dark:hover:bg-[#4A4540] transition-colors font-['Inter'] text-sm font-medium">
                    <FaComment className="w-4 h-4 text-[#D4845A]" />
                    Comment
                  </button>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-['Inter'] text-sm font-medium transition-all ${
                      isSaved
                        ? "bg-[#D4845A] text-white"
                        : "bg-[#F5EDE6] dark:bg-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#E8E0D8] dark:hover:bg-[#4A4540]"
                    }`}
                  >
                    <FaBookmark
                      className={`w-4 h-4 ${isSaved ? "text-white" : "text-[#D4845A]"}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EDE6] dark:bg-[#3A3530] text-[#2D2A24] dark:text-[#EAE5DE] hover:bg-[#E8E0D8] dark:hover:bg-[#4A4540] transition-colors font-['Inter'] text-sm font-medium ml-auto">
                    <FaShareAlt className="w-4 h-4 text-[#D4845A]" />
                    Share
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-6 md:p-8"
            >
              <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#6B655A] dark:text-[#B8B0A6] mb-6">
                Community Discussion ({comments.length})
              </h3>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                    No comments yet. Be the first!
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-[#E8E0D8] dark:border-[#3A3530] pb-4 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        {comment.userImage ? (
                          <Image
                            src={comment.userImage}
                            alt={comment.userName}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#D4845A] flex-shrink-0"
                          />
                        ) : (
                          <FaUserCircle className="w-10 h-10 text-[#D4845A] flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-sm">
                                {comment.userName}
                              </p>
                              <span className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                                {timeAgo(comment.createdAt)}
                              </span>
                              {comment.edited && (
                                <span className="text-xs text-[#6B655A] dark:text-[#B8B0A6] italic">
                                  (edited)
                                </span>
                              )}
                            </div>

                            {user?.id === comment.userId && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setEditingComment(comment._id);
                                    setEditText(comment.content);
                                  }}
                                  className="text-xs text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors px-2 py-1 rounded hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530]"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() =>
                                    handleCommentDelete(comment._id)
                                  }
                                  className="text-xs text-[#6B655A] dark:text-[#B8B0A6] hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <RiDeleteBin5Line />
                                </button>
                              </div>
                            )}
                          </div>

                          {editingComment === comment._id ? (
                            <div className="mt-2">
                              <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                rows="2"
                                className="w-full px-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#D4845A] rounded-lg text-sm text-[#2D2A24] dark:text-[#EAE5DE] focus:outline-none resize-none"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleCommentEdit(comment._id)}
                                  disabled={submitting || !editText.trim()}
                                  className="px-4 py-1.5 bg-[#D4845A] text-white text-xs font-medium rounded-lg hover:bg-[#B86A42] disabled:opacity-50"
                                >
                                  {submitting ? "Saving..." : "Save"}
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingComment(null);
                                    setEditText("");
                                  }}
                                  className="px-4 py-1.5 bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] text-xs font-medium rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="font-['Inter'] text-sm text-[#2D2A24] dark:text-[#EAE5DE] mt-1">
                              {comment.content}
                            </p>
                          )}

                          <div className="flex items-center gap-4 mt-2">
                            <button
                              onClick={() =>
                                handleCommentLike(comment._id, comment.likes)
                              }
                              className={`flex items-center gap-1 text-xs transition-colors ${
                                comment.likes?.includes(user?.id)
                                  ? "text-[#D4845A]"
                                  : "text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A]"
                              }`}
                            >
                              <FaThumbsUp className="w-3 h-3" />
                              <span>{comment.likes?.length || 0}</span>
                            </button>
                            <button
                              onClick={() =>
                                setReplyingTo(
                                  replyingTo === comment._id
                                    ? null
                                    : comment._id,
                                )
                              }
                              className="flex items-center gap-1 text-xs text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors"
                            >
                              <FaReply className="w-3 h-3" /> Reply
                            </button>
                          </div>

                          {replyingTo === comment._id && (
                            <form
                              onSubmit={(e) =>
                                handleReplySubmit(e, comment._id)
                              }
                              className="mt-3"
                            >
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Write a reply..."
                                rows="2"
                                className="w-full px-3 py-2 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-sm text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] resize-none"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  type="submit"
                                  disabled={submitting || !replyText.trim()}
                                  className="px-4 py-1.5 bg-[#D4845A] text-white text-xs font-medium rounded-lg hover:bg-[#B86A42] disabled:opacity-50"
                                >
                                  {submitting ? "Posting..." : "Post Reply"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText("");
                                  }}
                                  className="px-4 py-1.5 bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] text-xs font-medium rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          )}

                          {comment.replies?.length > 0 && (
                            <div className="mt-3 ml-4 space-y-3 border-l-2 border-[#E8E0D8] dark:border-[#3A3530] pl-4">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply._id}
                                  className="flex items-start gap-2"
                                >
                                  {reply.userImage ? (
                                    <Image
                                      src={reply.userImage}
                                      alt={reply.userName}
                                      width={28}
                                      height={28}
                                      className="w-7 h-7 rounded-full object-cover border border-[#D4845A] flex-shrink-0"
                                    />
                                  ) : (
                                    <FaUserCircle className="w-7 h-7 text-[#D4845A] flex-shrink-0" />
                                  )}
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-xs">
                                        {reply.userName}
                                      </p>
                                      <span className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                                        {timeAgo(reply.createdAt)}
                                      </span>
                                    </div>
                                    <p className="font-['Inter'] text-xs text-[#2D2A24] dark:text-[#EAE5DE] mt-0.5">
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8E0D8] dark:border-[#3A3530]">
                <h4 className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] mb-4">
                  Join the Conversation
                </h4>
                {user ? (
                  <form onSubmit={handleCommentSubmit}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment..."
                      rows="3"
                      className="w-full px-4 py-2.5 bg-[#F5EDE6] dark:bg-[#3A3530] border border-[#E8E0D8] dark:border-[#4A4540] rounded-lg text-[#2D2A24] dark:text-[#EAE5DE] placeholder-[#8A847C] focus:outline-none focus:border-[#D4845A] focus:ring-2 focus:ring-[#D4845A]/20 font-['Inter'] text-sm resize-none"
                      required
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        disabled={submitting || !newComment.trim()}
                        className={`px-6 py-2 font-['Inter'] font-medium rounded-lg transition-all ${
                          newComment.trim() && !submitting
                            ? "bg-[#D4845A] text-white hover:bg-[#B86A42] shadow-md"
                            : "bg-[#E8E0D8] dark:bg-[#3A3530] text-[#8A847C] cursor-not-allowed"
                        }`}
                      >
                        {submitting ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-6 bg-[#F5EDE6] dark:bg-[#3A3530] rounded-xl">
                    <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] mb-3">
                      Please login to join the conversation
                    </p>
                    <Link
                      href="/auth/login"
                      className="px-6 py-2 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column – Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-6"
            >
              <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#6B655A] dark:text-[#B8B0A6] mb-4">
                About this Author
              </h3>
              <div className="flex flex-col items-start">
                {post.userImage ? (
                  <Image
                    src={post.userImage}
                    alt={post.userName}
                    width={800}
                    height={400}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D4845A]"
                  />
                ) : (
                  <FaUserCircle className="w-16 h-16 text-[#D4845A]" />
                )}
                <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE] text-lg mt-3">
                  {post.userName || "Anonymous"}
                </p>
                <p className="font-['Inter'] text-sm text-[#D4845A]">
                  {post.userRole
                    ? post.userRole.charAt(0).toUpperCase() +
                      post.userRole.slice(1)
                    : "User"}
                </p>
                <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6] mt-2">
                  With over 15 years in elite athletic nutrition, this author
                  specializes in metabolic health and dietary precision for
                  high-performance athletes.
                </p>
              </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white dark:bg-[#2D2A24] rounded-2xl shadow-lg border border-[#E8E0D8] dark:border-[#3A3530] p-6"
            >
              <h3 className="font-['Inter'] text-sm font-semibold uppercase tracking-wider text-[#6B655A] dark:text-[#B8B0A6] mb-4">
                Related Articles
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/forum/${article.id}`}
                    className="group flex items-center gap-3 p-3 bg-[#F5EDE6] dark:bg-[#3A3530] rounded-xl hover:bg-[#E8E0D8] dark:hover:bg-[#4A4540] transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-['Inter'] text-sm font-medium text-[#2D2A24] dark:text-[#EAE5DE] group-hover:text-[#D4845A] transition-colors line-clamp-2">
                      {article.title}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
