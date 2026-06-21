"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCalendarPlus,
  FaClock,
  FaHeart,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { getTrainerApplication } from "@/lib/api/getTrainerApplication";
import { getMyBookings } from "@/lib/api/myBookingClass";
import { getFavoriteClass } from "@/lib/api/favoriteClass";

export default function DashboardOverview() {
  const [bookings, setBookings = {}] = useState([]);
  const [favorites, setFavorites = {}] = useState([]);

  const { data } = authClient.useSession();
  const user = data?.user;
  const [application, setApplication] = useState([]);
  const { status, feedback } = ({} = application);
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      const application = await getTrainerApplication(user.id);
      setApplication(application);
    };
    fetchData();
  }, [user?.id]);

  //total-booking
  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const result = await getMyBookings(user.id);
        setBookings(result);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      }
    };

    fetchBookings();
  }, [user?.id, setBookings]);

  //total favorite
  useEffect(() => {
    if (!user?.id) return;
    const favorites = async () => {
      try {
        const result = await getFavoriteClass(user.id);
        setFavorites(result);
      } catch {
        setError(err.message || "Failed to load favorite");
      }
    };
    favorites();
  }, [user.id, setFavorites]);

  // Determine status badge color
  const getStatusColor = (status = "") => {
    switch (status.toLowerCase()) {
      case "Pending":
        return "bg-[#D4A050] text-white";
      case "Approved":
        return "bg-[#A68B6E] text-white";
      case "Rejected":
        return "bg-[#C47A6A] text-white";
      default:
        return "bg-[#6B655A] text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            Welcome back, {user?.name.split(" ")[0]}
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            Your wellness journey continues. You have{" "}
            <span className="font-semibold text-[#D4845A]">2 classes</span>{" "}
            scheduled for this week.
          </p>
        </div>
        <Link
          href="/all-classes"
          className="inline-flex items-center px-5 py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
        >
          <FaCalendarPlus className="mr-2" />
          Book New Class
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-4">
          <div className="p-3 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
            <FaCalendarAlt className="w-6 h-6 text-[#D4845A]" />
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
              Total Booked Classes
            </p>
            <p className="font-['Inter'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
              {bookings.length}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex items-center gap-4">
          <div className="p-3 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 rounded-lg">
            <FaHeart className="w-6 h-6 text-[#D4845A]" />
          </div>
          <div>
            <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
              Total Favorites
            </p>
            <p className="font-['Inter'] text-2xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
              {favorites.length}
            </p>
          </div>
        </div>
      </div>

      {/* Profile + Trainer Status Row (2 columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image
                width={200}
                height={200}
                src={user?.image}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#D4845A]"
              />
            ) : (
              <FaUserCircle className="w-16 h-16 text-[#D4845A]" />
            )}
            <div>
              <h3 className="font-['Inter'] text-xl font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
                {user?.name}
              </h3>
              <p className="font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                {user?.email}
              </p>
              <span className="inline-block mt-1 px-3 py-0.5 bg-[#D4845A]/10 dark:bg-[#D4845A]/20 text-[#D4845A] text-xs font-medium rounded-full">
                {user?.role || "User"}
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6]">
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4 text-[#D4845A]" />
              <span>
                <strong className="text-[#2D2A24] dark:text-[#EAE5DE]">
                  Member Since
                </strong>{" "}
                {user?.memberSince || "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Trainer Application Status */}
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-6 shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] flex flex-col justify-between">
          <div>
            <h4 className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
              Trainer Application Status
            </h4>
            <div className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  status,
                )}`}
              >
                {status}
              </span>
            </div>
            {status === "Rejected" && feedback && (
              <p className="mt-3 font-['Inter'] text-sm text-[#C47A6A]">
                {feedback}
              </p>
            )}
            {status === "Pending" && (
              <p className="mt-3 font-['Inter'] text-sm text-[#6B655A] dark:text-[#B8B0A6]">
                Your application is under review. Expect a response within 48
                hours.
              </p>
            )}
            {status === "Approved" && (
              <p className="mt-3 font-['Inter'] text-sm text-[#A68B6E]">
                Congratulations! You are now a trainer.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
        <div className="p-4 border-b border-[#E8E0D8] dark:border-[#3A3530] flex items-center justify-between">
          <h3 className="font-['Inter'] font-semibold text-[#2D2A24] dark:text-[#EAE5DE]">
            Last booked Classes
          </h3>
          <Link
            href="/dashboard/bookings"
            className="font-['Inter'] text-sm text-[#D4845A] hover:text-[#B86A42] transition-colors"
          >
            Full Calendar &gt;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-['Inter'] text-sm">
            <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
              <tr>
                <th className="py-3 px-4 font-medium">SESSION</th>
                <th className="py-3 px-4 font-medium">DATE & TIME</th>
                <th className="py-3 px-4 font-medium">TRAINER</th>
                <th className="py-3 px-4 font-medium text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-[#6B655A] dark:text-[#B8B0A6]"
                  >
                    No upcoming classes. Book your first class!
                  </td>
                </tr>
              ) : (
                bookings
                  ?.slice(-2)
                  .reverse()
                  .map((cls) => (
                    <tr
                      key={cls._id}
                      className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                          {cls.className}
                        </p>
                        <p className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                          {cls.duration}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                        {cls.bookedAt}
                      </td>
                      <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                        {cls.trainer}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button className="px-4 py-1.5 border border-[#D4845A] text-[#D4845A] rounded-lg text-xs font-medium hover:bg-[#D4845A] hover:text-white transition-colors">
                          Modify
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
