"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaUsers,
  FaSpinner,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { TfiMoney } from "react-icons/tfi";
import { authClient } from "@/lib/auth-client";
import { getMyBookedclasses, getMyclasses } from "@/lib/api/allClass";
import EditModal from "@/components/dashboard/trainer/EditModal";
import { DeleteClassModal } from "@/components/dashboard/trainer/DeleteClassModal";
import toast from "react-hot-toast";

export default function MyClassesPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const trainerId = user?.id;

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    if (!trainerId) return;

    const loadClasses = async () => {
      try {
        const { data: token } = await authClient.token();
        if (!token) {
          toast.error("authentication faild. please login again.");
        }
        // const data = await getMyclasses(trainerId, token.token);
        const data = await getMyBookedclasses(trainerId, token.token);
        setClasses(data);
      } catch (err) {
        setError(err.message || "Failed to load classes");
      } finally {
        setLoading(false);
      }
    };

    loadClasses();
  }, [trainerId, refresh]);

  const activeClasses = classes.filter(
    (cls) => cls.status === "active" || cls.status === "approved",
  ).length;

  // Calculate total enrollments across all classes
  const totalEnrollments = classes.reduce(
    (sum, cls) => sum + (cls.bookedCount || 0),
    0,
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "approved":
        return "bg-[#A68B6E] text-white";
      case "pending":
        return "bg-[#D4A050] text-white";
      case "rejected":
        return "bg-[#C47A6A] text-white";
      case "inactive":
        return "bg-[#6B655A] text-white";
      default:
        return "bg-[#6B655A] text-white";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "active":
      case "approved":
        return "ACTIVE";
      case "pending":
        return "PENDING";
      case "rejected":
        return "REJECTED";
      case "inactive":
        return "INACTIVE";
      default:
        return status.toUpperCase();
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
          Error loading classes: {error}
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#2D2A24] dark:text-[#EAE5DE]">
            My Managed Classes
          </h1>
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6] mt-1">
            {activeClasses} Active Sessions · {totalEnrollments} Total
            Enrollments · Updated just now
          </p>
        </div>
        <Link
          href="/dashboard/trainer/add-class"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors shadow-sm hover:shadow-md whitespace-nowrap"
        >
          <FaPlus className="w-4 h-4" />
          Create New Class
        </Link>
      </div>

      {/* Table */}
      {classes.length === 0 ? (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl p-12 text-center shadow-sm border border-[#E8E0D8] dark:border-[#3A3530]">
          <p className="font-['Inter'] text-[#6B655A] dark:text-[#B8B0A6]">
            You haven't created any classes yet.
          </p>
          <Link
            href="/dashboard/trainer/add-class"
            className="inline-block mt-4 px-5 py-2.5 bg-[#D4845A] text-white font-['Inter'] font-medium rounded-lg hover:bg-[#B86A42] transition-colors"
          >
            Create Your First Class
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#2D2A24] rounded-xl shadow-sm border border-[#E8E0D8] dark:border-[#3A3530] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['Inter'] text-sm">
              <thead className="bg-[#F5EDE6] dark:bg-[#3A3530] text-[#6B655A] dark:text-[#B8B0A6]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Class Name</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Bookings</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr
                    key={cls._id}
                    className="border-b border-[#E8E0D8] dark:border-[#3A3530] hover:bg-[#F5EDE6] dark:hover:bg-[#3A3530] transition-colors"
                  >
                    {/* Image */}
                    <td className="py-3 px-4">
                      {cls.classImage ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5EDE6] dark:bg-[#3A3530]">
                          <Image
                            src={cls.classImage}
                            alt={cls.className}
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

                    {/* Class Name */}
                    <td className="py-4 px-4">
                      <p className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                        {cls.className}
                      </p>
                      <p className="text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                        {cls.category} · {cls.difficultyLevel}
                      </p>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3 text-[#D4845A]" />
                          {cls.classSchedule}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#6B655A] dark:text-[#B8B0A6]">
                          <FaClock className="w-3 h-3 text-[#D4845A]" />
                          {cls.time} · {cls.duration} min
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-[#2D2A24] dark:text-[#EAE5DE]">
                      <span className="flex items-center gap-1">
                        <TfiMoney className="w-3 h-3 text-[#D4845A]" />$
                        {cls.price}
                      </span>
                    </td>

                    {/* Bookings */}
                    <td className="py-4 px-4">
                      <span className="font-medium text-[#2D2A24] dark:text-[#EAE5DE]">
                        {cls.totalBookings || 0}
                      </span>
                      <span className="text-[#6B655A] dark:text-[#B8B0A6]">
                        /{cls.slot}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          cls.status,
                        )}`}
                      >
                        {getStatusLabel(cls.status)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/all-classes/${cls._id}`}
                          className="p-1.5 text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </Link>
                        <EditModal
                          classes={cls}
                          onUpdated={() => setRefresh((r) => r + 1)}
                        ></EditModal>

                        <DeleteClassModal
                          onDelete={() => setRefresh((r) => r + 1)}
                          classes={cls}
                        ></DeleteClassModal>
                        <Link
                          href={`/dashboard/trainer/my-classes/${cls._id}/students`}
                          className="p-1.5 text-[#6B655A] dark:text-[#B8B0A6] hover:text-[#D4845A] transition-colors"
                          title="View Students"
                        >
                          <FaUsers className="w-4 h-4" />
                        </Link>
                      </div>
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
