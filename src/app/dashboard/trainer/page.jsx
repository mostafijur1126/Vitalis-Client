"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlus, FaList, FaEdit, FaSpinner, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { getMyclasses, getTrainerTotalBookings } from "@/lib/api/allClass";
import { getMyForumPost } from "@/lib/api/forumPosts";
import toast from "react-hot-toast";

export default function TrainerDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const trainerId = user?.id;

  const [classes, setClasses] = useState({});
  const [forunPosts, setForumPosts] = useState({});
  const [totalBookings, setTotalBookings] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!trainerId) return;
    const loadData = async () => {
      try {
        const { data: token } = await authClient.token();
        if (!token) {
          toast.error("Authentication faild, please login again");
        }
        const myclasses = await getMyclasses(trainerId, token.token);
        const myForumPosts = await getMyForumPost(trainerId, token.token);
        const myTotalBookings = await getTrainerTotalBookings(trainerId);
        setTotalBookings(myTotalBookings);
        setForumPosts(myForumPosts);
        setClasses(myclasses);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [trainerId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-[#A68B6E] text-white";
      case "pending":
        return "bg-[#D4A050] text-white";
      case "rejected":
        return "bg-[#C47A6A] text-white";
      default:
        return "bg-[#6B655A] text-white";
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
        <p className="font-['Inter'] text-[#C47A6A]">
          Error loading dashboard: {error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6 px-4 sm:px-0"
    >
      {/* Welcome */}
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
          Trainer Dashboard
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
          Welcome back, {user?.name?.split(" ")[0] || "Trainer"}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] text-center">
          <p className="font-['Playfair_Display'] text-3xl font-bold text-[#D4845A]">
            {classes.length}
          </p>
          <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
            Total Classes Created
          </p>
        </div>
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] text-center">
          <p className="font-['Playfair_Display'] text-3xl font-bold text-[#D4845A]">
            {totalBookings.totalBookings}
          </p>
          <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
            Total Students Enrolled
          </p>
        </div>
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] text-center">
          <p className="font-['Playfair_Display'] text-3xl font-bold text-[#D4845A]">
            {forunPosts.length}
          </p>
          <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
            Forum Posts
          </p>
        </div>
      </div>

      {/* Profile & Quick Actions */}
      <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-4 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#D4845A]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#F5EDE6] dark:bg-[#3A3530] flex items-center justify-center text-[#6B655A] dark:text-[#B8B0A6]">
              <FaUser className="w-6 h-6" />
            </div>
          )}
          <div>
            <p className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
              {user?.name || "Trainer"}
            </p>
            <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
              {user?.email || "trainer@example.com"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          <span className="px-3 py-1 bg-[#D4845A] text-white text-xs font-semibold rounded-full">
            Trainer
          </span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/trainer/add-class"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-sm"
        >
          <FaPlus className="w-4 h-4" /> Add New Class
        </Link>
        <Link
          href="/dashboard/trainer/my-classes"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2D2A24] border border-[#D4845A] text-[#D4845A] font-['Inter'] font-medium rounded-lg hover:bg-[#D4845A] hover:text-white transition-colors shadow-sm"
        >
          <FaList className="w-4 h-4" /> My Classes
        </Link>
        <Link
          href="/dashboard/trainer/forum-posts"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2D2A24] border border-[#D4845A] text-[#D4845A] font-['Inter'] font-medium rounded-lg hover:bg-[#D4845A] hover:text-white transition-colors shadow-sm"
        >
          <FaPlus className="w-4 h-4" /> Add Forum Post
        </Link>
        <Link
          href="/dashboard/trainer/my-posts"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2D2A24] border border-[#D4845A] text-[#D4845A] font-['Inter'] font-medium rounded-lg hover:bg-[#D4845A] hover:text-white transition-colors shadow-sm"
        >
          <FaEdit className="w-4 h-4" /> My Posts
        </Link>
      </div>

      {/* Recent Classes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-['Inter'] text-lg font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
            Recent Classes
          </h2>
          <Link
            href="/dashboard/trainer/my-classes"
            className="font-['Inter'] text-sm text-[#D4845A] hover:text-[#B86A42] transition-colors"
          >
            View all {classes.length} classes →
          </Link>
        </div>
        {classes.length === 0 ? (
          <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
            <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6]">
              No classes created yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...classes]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map((cls) => (
                <div
                  key={cls._id}
                  className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden hover:shadow-md transition-shadow"
                >
                  {cls.classImage && (
                    <div className="relative w-full h-40 bg-[#F5EDE6] dark:bg-[#3A3530]">
                      <Image
                        src={cls.classImage}
                        alt={cls.className}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                          {cls.className}
                        </h3>
                        <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                          {cls.category} · {cls.difficultyLevel}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          cls.status,
                        )}`}
                      >
                        {cls.status.charAt(0).toUpperCase() +
                          cls.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-['Inter'] text-sm font-medium text-[#D4845A]">
                        ${cls.price}
                      </span>
                      <span className="font-['Inter'] text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                        {cls.classSchedule}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
