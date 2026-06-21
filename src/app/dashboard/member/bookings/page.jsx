"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSpinner, FaCalendarAlt, FaClock } from "react-icons/fa";
import { getMyBookings } from "@/lib/api/myBookingClass";
import { authClient } from "@/lib/auth-client";

// Helper to format date/time from ISO string
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: sessions } = authClient.useSession();
  const user = sessions?.user;

  useEffect(() => {
    if (!user?.id) return;

    const fetchBookings = async () => {
      try {
        const result = await getMyBookings(user.id);
        // Only keep bookings with paymentStatus === "paid"
        const paidBookings = Array.isArray(result)
          ? result.filter((b) => b.paymentStatus?.toLowerCase() === "paid")
          : [];
        setBookings(paidBookings);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);

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
          Error loading bookings: {error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6 px-4 sm:px-0"
    >
      {/* Header */}
      <div>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
          My Bookings
        </h1>
        <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
          All your registered and paid classes.
        </p>
      </div>

      {/* Table */}
      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6]">
            You haven't booked any classes yet.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Class Name</th>
                  <th className="py-3 px-4 font-semibold">Trainer</th>
                  <th className="py-3 px-4 font-semibold">Schedule</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    <td className="py-4 px-4">
                      {booking.image ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5EDE6] dark:bg-[#3A3530]">
                          <Image
                            src={booking.image}
                            alt={booking.className}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#F5EDE6] dark:bg-[#3A3530] flex items-center justify-center text-[#6B655A] dark:text-[#B8B0A6] text-xs">
                          No img
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                      {booking.className}
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      {booking.trainer}
                    </td>
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3.5 h-3.5 text-[#D4845A]" />
                          {formatDate(booking.bookedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="w-3.5 h-3.5 text-[#D4845A]" />
                          {formatTime(booking.bookedAt)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/dashboard/bookings/${booking._id}`}
                        className="inline-block px-4 py-1.5 border border-[#D4845A] text-[#D4845A] rounded-lg text-xs font-medium hover:bg-[#D4845A] hover:text-white transition-colors"
                      >
                        View Details
                      </Link>
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
